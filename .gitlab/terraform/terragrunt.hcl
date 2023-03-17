locals {
  # For loading account-level, region-level and common configuration
  account_vars = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  region_vars  = read_terragrunt_config(find_in_parent_folders("region.hcl"))
  common_vars  = yamldecode(file("${find_in_parent_folders("common.yml")}"))
  # override prefix to have a custom value for the TF state bucket prefix
  original_prefix       = try("${local.account_vars.locals.prefix}-", "")
  prefix                = "safetravel"
  suffix                = try("-${local.account_vars.locals.suffix}", "")
  application           = local.common_vars.application
  aws_region            = local.region_vars.locals.aws_region
  account_id            = local.account_vars.locals.account_id
  environment           = local.account_vars.locals.environment
  original_bucket_name  = "${local.prefix}${local.application}-${local.environment}-tf-states-${local.aws_region}${local.suffix}"
  shortened_bucket_name = "${local.prefix}${local.application}-${local.environment}-tfs-${local.aws_region}${local.suffix}"
  bucket_name           = length(local.original_bucket_name) <= 63 ? local.original_bucket_name : local.shortened_bucket_name
}

generate "version" {
  path      = "versions.tf"
  if_exists = "overwrite"
  contents  = <<EOF
terraform {
  required_version = "~> 1.1.6"

  experiments = [module_variable_optional_attrs]

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.75.0"
    }
  }
}
EOF
}

generate "provider" {
  path      = "providers.tf"
  if_exists = "overwrite"
  contents  = <<EOF
provider "aws" {
  region = "${local.aws_region}"
  assume_role {
    role_arn = "arn:aws:iam::${local.account_id}:role/BuilderAccountAccessRole"
  }
}
EOF
}

remote_state {
  backend  = "s3"
  config   = {
    bucket         = local.bucket_name
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = local.aws_region
    encrypt        = true
    dynamodb_table = "${local.application}-terraform-state-lock"
    role_arn       = "arn:aws:iam::${local.account_id}:role/BuilderAccountAccessRole"
  }
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
}

inputs = merge(
  local.account_vars.locals,
  local.region_vars.locals,
  yamldecode(
    file("${find_in_parent_folders("common.yml")}"),
  ),
)
