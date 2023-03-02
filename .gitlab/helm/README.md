Please refer to [deployment-profiles](https://gitlab.com/affinidi/foundational/engineering-excellence/-/blob/main/ci-cd/README.md#deployment-profiles)
on more info on how Helm values are calculated.

The deployment profiles can be found [here](https://gitlab.com/affinidi/foundational/foundational-pipeline/-/blob/v2.28.0/templates/configs).

The service deployment profile (`deployment-config-{profile}.yaml`) is defined via `${K8S__DEPLOYMENT__PROFILE}` CI/CD variable.
