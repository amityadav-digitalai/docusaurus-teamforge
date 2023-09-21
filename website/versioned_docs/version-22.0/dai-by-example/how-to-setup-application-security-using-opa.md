---
id: how-to-setup-application-security-using-opa
title: Enable Application Security using OPA
product:
  - release
category:
  - Digital.ai by Example
subject:
  - Open Policy Agent
tags:
  - opa
  - Security
order: 401
---

## Before you begin

This how-to involves working with a variety of tools and technologies such as Digital.ai Release, Digital.ai Deploy's DevOps as code (YAML files), GitHub, OPA, and so on. You can perform this task by simply following the instructions. However, being familiar with these tools and technologies can help you considerably when you try this out in your test environment.

## What's the objective?

The objective is to set up an automated release and deployment pipeline—a pipeline of tools such as OPA, Application Security, Digital.ai Release, and have your application deployed to the required environment based on policy checks against guards and other security data.

Once you have this setup in place, all you would be doing is to push a code change to trigger a Parsing task in the automated release, evaluate the Application Security application output with predefined OPA policy, use the output to deploy the application in the test environment, verify the deployment to the test environment, and then approve the test deployment task to proceed with the deployment to your production environment.

## What do you need?

- A Linux or Windows server (with root and Internet access) that has both Digital.ai and Release version 23.1.0 (or later) installed
- OPA plugin for Digital.ai Release (installed by default when you install Release)
- An OPA server running on local or remote host.
- An GitHub Actions/Jenkins Job with Application Security enabled (requires license for Application security software).

## What do you have?

- A [xebialabs-community/application-security-opa](https://github.com/nitheshrayuduv/ApplicationSecurityWorkflows) GitHub repository that hosts the workflows and can be used to import the required templates.

- A [xebialabs-community/application-security-opa-policies](https://github.com/xebialabs/OPApolicies) GitHub repository that hosts the policies.

## How does it work?

![Dev-Sec-Ops](/docs/assets/dev-sec-ops-opa.PNG)

Here's a detailed step-by-step.

## Step 1 — Set up Workflows for Templates

In Digital.ai Release,

1. Create a new folder.
2. From within the folder, in the left navigation pane, select **Version control**.
3. Click **Configure**.
   The _Version control settings_ screen opens.
4. Under Git Repository, click on the **New Repository link**.
5. Create a new connection by specifying the details of the GitHub Repository.
6. Specify the branch as **main** and specify the Repository path as **ApplicationSecurityWorkflows** or use **OpaManagementTasks** for management templates.
7. Click **Save**.

> **Note**: In the **Connections** screen, create a connection to the OPA server with the name **OPA Server1**.

![Git-Ops-Versioning](https://raw.githubusercontent.com/xebialabs-community/howto/master/applicationWorkflows/images/gitops-versioning.png)

8. In the _Version Control_ screen, select the latest version displayed and click **Apply this version**.
9. The workflow templates are populated in the _Templates_ screen.

![Git-Ops-Versioning-Post](https://raw.githubusercontent.com/xebialabs-community/howto/master/applicationWorkflows/images/gitops-versioning-versions.PNG)

## Step 2 — Add Policy for Application Security using Create Policy Task

The _Create Policy_ task creates a policy in the OPA server.

Sample Policies are hosted in the [xebialabs-community/application-security-opa-policies](https://github.com/nitheshrayuduv/OPApolicies) repository, which can be used to enforce Android or Ios based application security.

1. In the release flow tab of a Release template, add a task of type **OPA** > **Create Policy**.
2. Click the added task to open it.
3. In the **Server** field, select the configured OPA server.
4. In the **Name of policy to be created** field, add the policy name.
5. For policy that is a string, paste the policy in the **Policy** field.
6. To fetch the policy as a code from the GitHub repository, add the URL of GitHub raw file in the **Git File Url** field, and the GitHub PAT in the **Git PAT** field.

![OPA Create Policy](/docs/assets/xlr-opa-integration/opa-create-policy.png)

## Step 3 — Create Automated Task in Github Actions or Jenkins Jobs to Trigger Based on Job Completion.

1. In the GitHub actions update the manifest for githubactions to trigger automated release on code push.
   **Path**: **\<Repository\>/.github/workflows/manifest.yml**
2. ''' run: |
   run_id=${{ github.run_id }}
        echo "::set-output name=run_id::$run_id"
   echo ${{github.run_id}}
        curl --request POST -u 'admin:admin' --header 'content-type: application/json' --url 'http://111.111.111.111:5516/api/v1/templates/Applications/Folder59347dbf86ec4fb9ba7fa8822c855955/Release995328f6d3b6479993e8ed570b540b05/start' -d '{"releaseTitle":"Release-IOS-AndroidAppProtectionTest-${{github.run_id}}", "releaseVariables": {"REPO_NAME": "AndroidAppProtectionTest","WORKFLOWID": "${{github.run_id}}"}}'  
   '''
3. Similar automation can be created on the Jenkins job with the curl command that is similar to the one above.

## Step 4 — Add Parse GitHub Actions Log Task

To download and parse GitHub actions log task from an Application Security Job, perform the following steps:

> **Note**: This task works only with Application Security Log.

1. In the release flow tab of a Release template, add a task of type **OPA** > **Parse GitHub Actions Log**.
2. Click the added task to open it.
3. In the **Server** field, select the configured OPA server.
4. In the **Application Type** field, select **Android** or **Ios**.
5. In the **Base url** field, enter the GitHub api, for example `https://api.github.com`.
6. In the **Username** field, enter the GitHub username.
7. In the **Git PAT** field, enter the GitHub PAT.
8. In the **Repository Name** field, enter the GitHub repository name.
9. In the **Workflow Run ID** field, enter the GitHub Actions workflow ID.
10. In the **Json Input** output properties field, the output will be assigned to the variable assigned in this field.

> **Note**: The output variable can be used for further evaluation as an input.

![OPA Parse GitHub Actions Log](/docs/assets/xlr-opa-integration/opa-github-actions-parser.png)

## Step 5 — Add Parse Jenkins Log Task

To download and parse Jenkins log task from an Application Security Job, perform the following steps:

> **Note**: This task works only with Application Security Log.

1. In the release flow tab of a Release template, add a task of type **OPA** > **Parse Jenkins Log**.
2. Click the added task to open it.
3. In the **Server** field, select the configured OPA server.
4. In the **Application Type** field, select **Android** or **Ios**.
5. In the **Jenkins Server** field, select the configured Jenkins server.
6. In the **Username** field, enter the Jenkins username.
7. In the **Password** field, enter the Jenkins password, or else use the Token field.
8. In the **API Token** field, enter the Jenkins token, or else use the Password.
9. In the **Job Url** field, enter the Jenkins job URL.
10. In the **Json Input** output properties field, the output will be assigned to the variable assigned in this field.

> **Note**: The output variable can be used for further evaluation as an input.

![OPA Parse Jenkins Actions Log](/docs/assets/xlr-opa-integration/opa-jenkins-parser.png)

## Step 6 — Evaluate Policy Task

The _Evaluate Policy_ task evaluates an input against a policy in the OPA server.

1. In the release flow tab of a Release template, add a task of type **OPA** > **Evaluate Policy**.
2. Click the added task to open it.
3. In the **Server** field, select the configured OPA server.
4. In the **Json Input For Evaluation** field, add the input which will be evaluated against the policy.
5. In the **Name of policy to Check with** field.
6. In the **Expected Output** field, the expected output will be checked with the actual policy check result.

![OPA Evaluate Policy](/docs/assets/xlr-opa-integration/opa-evaluate-policy.png)

## Step 7 — Create an Application Security Evaluation Task with OPA - DevSecOps

To create an _Application Security Evaluation_ task with OPA:

1. Create the required policies following the above-mentioned steps in **Add Create Policy task** and starting the release.
1. Create the required task for parsing GitHub actions logs following the **Add a Parse GitHub Actions Log task** or **How to Add a Parse Jenkins Log task** steps.
1. Create the required Evaluation template with required policy name and input following the above mentioned steps in **Add a Evaluate Policy task**.
1. Add other required tasks.
1. Create and start the release for evaluating.
   Based on the evaluation add further required tasks.

![OPA App security Template](/docs/assets/xlr-opa-integration/opa-app-security-github.png)
