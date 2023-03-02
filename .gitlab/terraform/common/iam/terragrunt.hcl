include {
  path = find_in_parent_folders()
}

terraform {
  source = "git::https://gitlab.com/affinidi/platform/terraform-modules/affinidi-terraform-iam-assumable-role.git//.?ref=v0.5.0"
}

locals {
  common_vars = yamldecode(file(find_in_parent_folders("common.yml")))
  application = local.common_vars.application

  account_vars       = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  environment        = local.account_vars.locals.environment
  account_id         = local.account_vars.locals.account_id

  region_vars        = read_terragrunt_config(find_in_parent_folders("region.hcl"))
  environment_prefix = local.region_vars.locals.environment_prefix
  create_sa          = local.region_vars.locals.create_sa
  eks_cluster_name   = local.region_vars.locals.eks_cluster_name
  region             = local.region_vars.locals.aws_region
  eks_namespace_name = local.region_vars.locals.eks_namespace_name
  oidc_id            = local.region_vars.locals.oidc_id

  role_name = "${local.environment_prefix}${local.application}-${local.environment}"

  s3_bucket_suffix = ""

  policy = yamldecode(templatefile(find_in_parent_folders("policy.yaml"), {
    region             = local.region
    account_id         = local.account_id
    environment        = local.environment
    environment_prefix = local.environment_prefix
    s3_bucket_suffix   = local.s3_bucket_suffix
  }))
}

inputs = {
  create_service_account = local.create_sa
  cluster_name           = local.eks_cluster_name
  service_account_name   = local.application
  role_name              = local.role_name
  oidc_url               = "oidc.eks.${local.region}.amazonaws.com/id/${local.oidc_id}"
  policy                 = local.policy
  namespace_name         = local.eks_namespace_name
}
