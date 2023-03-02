# firebase-service

This is a repository that contains all the necessary configuration you need to successfully start development of a new service according to the standards defined by our group.

## Run the application

Add line to `~/.npmrc` where TOKEN is your Github personal access token: to include affinityProject relative common libs
`//npm.pkg.github.com/:_authToken=TOKEN`
[Howto create your Github personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

```shell script
$ npm install
$ npm run dev
```

## How to use this

1. Clone the project to a new folder
2. Edit `package.json` to indicate the correct *package name, description and author*, and make sure you are using the correct or most current stable versions of the Affinity packages
3. Remove `.git` folder if you need a clean history, otherwise it's going to contain an initial commit reference
4. Initialize a new git repository if you deleted the `.git` folder
5. Delete `example` folder, it's there just so you can see the simplest setup
6. Create new controllers for your service following the [nestjs](https://docs.nestjs.com/controllers) way (e.g. see src/example/examples.controller.ts).  Open API spec will automatically be generated from code.  See [here](https://docs.nestjs.com/openapi/introduction) for more info


### CD and Infra Settings 

#### Terrafrom/Terragrunt

###### Info

`Terraform/Terragrunt` is our tool of choice to manage the entire lifecycle of infrastructure using infrastructure as code.
That means declaring infrastructure components in configuration files that are then used by `Terraform` to provision, adjust and tear down infrastructure in cloud provider.
`Terragrunt` is a thin wrapper that provides extra tools for keeping your configurations DRY, working with multiple `Terraform` modules, and managing remote state.

###### How to

For launching infra using Terragrant, please see [manual](https://replika.atlassian.net/wiki/spaces/NETCORE/pages/708510278/Onboarding+an+Application+with+Terragrunt).
Current project provides predefined infrastructure under the folder [terraform](./terraform).
*Please, delete `terraform` folder if current infra part not needed.*

#### AWS-CLI/AWS-Vault

###### Info

`AWS Vault` is a tool to securely store and access AWS credentials in a development environment.
Firstly `AWS CLI` needed to be installed.

###### How to

To set up and configure `AWS CLI` and `AWS-Vault` on local machine, please see [manual](https://replika.atlassian.net/wiki/spaces/NETCORE/pages/780927138/How+to+configure+AWS+CLI+on+a+local+machine).

## Frameworks and tools

1. Typescript
2. NestJS for REST APIs
3. Native library nestjs/swagger for OpenAPI spec generation
4. `dotenv` for `.env` file configuration
5. `pino` for logging
6. `ESLint` for code analysis
7. `husky` for git hooks
8. `jest` for testing
