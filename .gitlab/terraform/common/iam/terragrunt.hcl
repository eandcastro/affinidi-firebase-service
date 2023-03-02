include {
  path = find_in_parent_folders()
}

terraform {
  source = "git::https://gitlab.com/affinidi/platform/terraform-modules/affinidi-terraform-iam-assumable-role.git//.?ref=v0.0.1"
}

locals {
  common_vars  = yamldecode(file("${find_in_parent_folders("common.yml")}"))
  application = local.common_vars.application

  region_vars = read_terragrunt_config("../region.hcl")
  region = local.region_vars.locals.aws_region
  
  account_vars = read_terragrunt_config("../../account.hcl")
  eks_cluster_name = local.account_vars.locals.eks_cluster_name
  account_id = local.account_vars.locals.account_id
  environment = local.account_vars.locals.environment
  oidc_id = local.account_vars.locals.oidc_id

  policy = yamldecode(templatefile(
    find_in_parent_folders("policy.yaml"),
    {
      region = local.region
      account_id = local.account_id
      environment = local.environment
    }))
}

inputs = {
  cluster_name         = local.eks_cluster_name
  service_account_name = local.application
  role_name            = "${local.application}-${local.environment}"
  oidc_url             = "oidc.eks.${local.region}.amazonaws.com/id/${local.oidc_id}"
  policy               = local.policy
}
