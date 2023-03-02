locals {
  # Automatically load region-level and common configuration
  account_vars = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  region_vars  = read_terragrunt_config(find_in_parent_folders("region.hcl"))
  common_vars  = yamldecode(file("${find_in_parent_folders("common.yml")}"))
  # Assign specific vars to locals for easy access
  prefix = "affinidi"
  application = local.common_vars.application
  aws_region  = local.region_vars.locals.aws_region
  account_id  = local.account_vars.locals.account_id
  environment = local.account_vars.locals.environment
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite"
  contents  = <<EOF
provider "aws" {
  region = "${local.aws_region}"
  assume_role {
    role_arn = "arn:aws:iam::${local.account_id}:role/ProvisionerAccountAccessRole"
  }
}
EOF
}

remote_state {
  backend = "s3"
  config = {
    bucket         = "${local.prefix}-${local.application}-${local.environment}-tf-states-${local.aws_region}"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = local.aws_region
    encrypt        = true
    dynamodb_table = "${local.application}-terraform-state-lock"
    role_arn       = "arn:aws:iam::${local.account_id}:role/ProvisionerAccountAccessRole"
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
