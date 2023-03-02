include {
  path = find_in_parent_folders()
}

terraform {
  source = "git::https://gitlab.com/affinidi/platform/terraform-modules/affinidi-terraform-prometheus-alerts.git//.?ref=v1.2.0"
}

locals {
  service_info_vars = yamldecode(file(find_in_parent_folders("service-info.yaml")))
  team_name         = lookup(local.service_info_vars, "team-name")
  service_name      = local.service_info_vars.name

  account_vars = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  account_id   = local.account_vars.locals.account_id
  workspace_id = local.account_vars.locals.workspace_id
  environment  = local.account_vars.locals.environment

  region_vars   = read_terragrunt_config(find_in_parent_folders("region.hcl"))
  aws_region    = local.region_vars.locals.aws_region
  enable_alerts = try(local.region_vars.locals.enable_alerts, false)

  alert_file = try(
    templatefile(
    find_in_parent_folders("alert_rules.yaml"),
  	  {
	    region       = local.aws_region
	    account_id   = local.account_id
	    environment  = local.environment
	    team_name    = local.team_name
	    service_name = local.service_name
	  }),
	"{}")

    alert_rules = (local.enable_alerts && local.aws_region == local.account_vars.locals.workspace_region) ? local.alert_file : ""
}

generate "provider" {
  path = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents = <<EOF
provider "aws" {
  region = "${local.account_vars.locals.workspace_region}"
  assume_role {
    role_arn = "arn:aws:iam::${local.account_id}:role/BuilderAccountAccessRole"
  }
}
EOF
}

inputs = {
  prometheus_team_default_alerts = local.enable_alerts
  team_name                      = local.team_name
  service_name                   = local.service_name
  workspace_id                   = local.workspace_id
  alert_rules                    = local.alert_rules
}
