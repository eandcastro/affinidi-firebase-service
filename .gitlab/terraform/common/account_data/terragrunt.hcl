include {
  path = find_in_parent_folders()
}

terraform {
  source = "git::https://gitlab.com/affinidi/platform/terraform-modules/affinidi-terraform-account-data.git//.?ref=v1.12.0"
}

locals {
  account_vars        = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  region_vars         = read_terragrunt_config(find_in_parent_folders("region.hcl"))
  
  account_id          = local.account_vars.locals.account_id
  environment         = local.account_vars.locals.environment
  region              = local.region_vars.locals.aws_region
  vpc_name            = local.region_vars.locals.vpc_name
  eks_worker_tag_name = local.region_vars.locals.eks_worker_tag_name
  eks_cluster_name    = local.region_vars.locals.eks_cluster_name
  rds_tag_name        = try(local.region_vars.locals.rds_tag_name, null)
  rds_tag_value       = try(local.region_vars.locals.rds_tag_value, null)
}

inputs = {
  switch_options = {
    vpc = true,
    eks = true,
  }
  vpc_name            = local.vpc_name
  aws_region          = local.region
  environment         = local.environment
  eks_cluster_name    = local.eks_cluster_name
  eks_worker_tag_name = local.eks_worker_tag_name
  rds_tag_name        = local.rds_tag_name
  rds_tag_value       = local.rds_tag_value
}
