include {
  path = find_in_parent_folders()
}

terraform {
  source = "git::https://gitlab.com/affinidi/platform/terraform-modules/affinidi-terraform-account-data.git//.?ref=v1.1.0"
}

inputs = {
  switch_options = {
    vpc = true,
    eks = true,
  }
}
