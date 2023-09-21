---
id: release-and-deploy-to-aws-eks
title: Deploy to Amazon EKS using Digital.ai Deploy and Release
product:
  - deploy
  - release
category:
  - Digital.ai by Example
subject:
  - Amazon EKS
tags:
  - aws
  - eks
  - kubernetes
order: 100
---

Here's a video walk-through.

[![](https://img.youtube.com/vi/pZl7rx-v-Xo/0.jpg)](https://www.youtube.com/watch?v=pZl7rx-v-Xo 'How-to: Deploy to Amazon EKS using Digital.ai Deploy and Release')

This how-to demonstrates how you can leverage the Digital.ai Deploy and Release applications' capabilities and deploy your application to the Amazon EKS `test` and `prod` namespaces.

This how-to is built using Amazon EKS as the platform of choice for illustrative purposes.

## Before you begin

This how-to involves working with a variety of tools and technologies such as Digital.ai Deploy and Release, the XL CLI, Digital.ai Deploy's DevOps as code (YAML files), GitHub, Amazon EKS, AWS CLI, kubectl, and so on. You can perform this task by simply following the instructions. However, being familiar with these tools and technologies can help you considerably when you try this out in your test environment.

## What's the objective?

The objective is to set up an automated release and deployment pipeline—a pipeline of tools such as GitHub, DockerHub, Digital.ai Release, Digital.ai Deploy, and Amazon EKS—and have your application deployed to the Amazon EKS cluster with little human intervention.

Once you have this setup in place, all you would be doing is pushing a code change to trigger a deployment job in the automated release and deployment pipeline and have your application deployed to your test environment, verify the deployment to the test environment, and then approve the test deployment task to proceed with the deployment to your production environment.

## What do you need?

- A Linux or Windows server (with root and Internet access) that has both Digital.ai Deploy and Release version 10.2.1 (or later) installed
- XL CLI
- Kubernetes plugin for Digital.ai Deploy (installed by default when you install Deploy)
- An AWS account
- An Amazon EKS cluster—with two namespaces—`test` and `prod`
- AWS CLI and kubectl—to create the `test` and `prod` namespaces on your EKS cluster
- A [Docker Hub](https://hub.docker.com/) account—to push every new version of the demo application you generate to the Docker Hub repository

## What do you have?

![Repo-file-structure](/docs/assets/eks-04.png)

We have created a [xebialabs-community/deploy-to-k8s](https://github.com/xebialabs-community/deploy-to-k8s) GitHub repository that hosts the following.

- A [Flask application](https://github.com/xebialabs-community/deploy-to-k8s/blob/master/app/main.py) for use with this example deployment.
- A [build.sh](https://github.com/xebialabs-community/deploy-to-k8s/blob/master/build.sh) script to create a new image of the Flask application using GitHub Actions.
- Digital.ai As-code YAML file for [Deploy](https://github.com/xebialabs-community/deploy-to-k8s/blob/master/awseks/deploy/daideploy.yaml) and [Release](https://github.com/xebialabs-community/deploy-to-k8s/blob/master/awseks/release/dairelease.yaml) to create:
  - configuration items such as the Infrastructure, Environment, and Application in Digital.ai Deploy.
  - the Digital.ai Release template, Deploy server configuration, webhook trigger, and Digital.ai Release webhook endpoint in Digital.ai Release.
- A [build.yml](https://github.com/xebialabs-community/deploy-to-k8s/blob/master/.github/workflows/build.yml) file for use by GitHub Actions for creating new versions of the web application.
- A [values.xlvals](/deploy/how-to/manage-values-devops-as-code/) file—one each for both [Deploy](https://github.com/xebialabs-community/deploy-to-k8s/blob/master/awseks/deploy/values.xlvals) and [Release](https://github.com/xebialabs-community/deploy-to-k8s/blob/master/awseks/release/values.xlvals)—used to pass values for dictionary variables used in the As-code YAML files.
- A `secrets.xlvals` file—one each for both [Deploy](https://github.com/xebialabs-community/deploy-to-k8s/blob/master/awseks/deploy/secrets.xlvals) and [Release](https://github.com/xebialabs-community/deploy-to-k8s/blob/master/awseks/release/secrets.xlvals)—used to store and pass values for Amazon EKS, Digital.ai Deploy and Release secrets.

## How does it work?

Here's a high-level overview of what you would do to set this up and what happens when you start the deployment process with a simple code commit/merge.

At the end of this exercise you would have:

- forked the [xebialabs-community/deploy-to-k8s](https://github.com/xebialabs-community/deploy-to-k8s) GitHub repository and cloned the same to your Digital.ai Deploy/Release server.
- installed and configured Digital.ai Deploy and Release 10.2.1 (or later).
- installed XL CLI.
- created and configured an Amazon EKS cluster.
- installed AWS CLI and kubectl.
- configured AWS CLI and kubectl.
- created two namespaces—`test` and `prod`—using AWS CLI/kubectl.
- created the Digital.ai Deploy configuration items (using the As-code YAML file) such as Infrastructure, Environment (both `test` and `prod` deployment environments), and Application.
- created the webhook HTTP endpoint (using the As-code YAML file) in Digital.ai Release.
- created the Deploy server configuration, the Digital.ai Release template and the webhook trigger (using As-code YAML files) required for orchestrating your application deployments to the `test` and `prod` environments.

The deployment process starts when you make a code change to your web application, create a new pull request, and merge your pull request. Here's what the automated deployment workflow does when you merge your changes.

1. **You**—Commit and merge your Flask application's code changes to GitHub
2. **Automated deployment workflow**—Builds your application to create a new version and adds the new version to the Docker Hub repository
3. **Automated deployment workflow**—Triggers a new release in Digital.ai Release to deploy the new version of the Flask application
4. **Automated deployment workflow**—Deploys the new application version to your `test` environment in Amazon EKS
5. **You**—Verify the deployment and mark the verification task complete, which triggers the next phase of the release—deploy to `prod`
6. **Automated deployment workflow**—Deploys the new application version to your `prod` environment
7. **You**—Verify the deployment to `prod` and complete the release process

Here's a detailed step-by-step.

## Step 1—Create an Amazon EKS Cluster

**Note:** For illustrative purposes, this topic deals with Amazon EKS. You can have your cluster in other cloud platforms such as GKE too.

1. Log on to your AWS account and gather the `AWSAccessKeyId` and `AWSSecretKey`.

   Create an access key if you do not have one already. For more information, see [Managing access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey).

   **Important:** It is recommended to download and save the AWS access key file immediately after creating the access key as you cannot retrieve your Secret Access Key later.

   ![Aws access key](/docs/assets/aws-ec2-03.png)

2. Create an Amazon EKS Cluster. For more information, see [Creating an Amazon EKS cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html).

   While there are innumerable configurations possible for your EKS cluster, this topic assumes the EKS cluster is made up of:

   - A cluster with three nodes of instance type `t2.medium`
   - Two namespaces—`test` and `prod`. You may choose to create two separate EKS clusters instead of sharing the same cluster with two namespaces. To keep the setup simple, this topic deals with a single cluster with two namespaces.

3. Gather the following information about your Amazon EKS cluster and keep them handy. The values you gather for these properties are added to the `values.xlvals` file and are passed to the As-code YAML files while creating the Deploy configuration items.

   - Your Amazon account's `AWSAccessKeyId` and `AWSSecretKey`
   - The AWS region code (for example, `eu-west-2`) that hosts the EKS cluster
   - The EKS cluster's name
   - The API server endpoint URL
   - The Certificate Authority (CA) cert

   Here's an example Amazon EKS cluster and its configuration—`qe-cluster`.

   <br />

   **Cluster Name:** `qe-cluster`
   <br />
   ![EKS cluster overview](/docs/assets/eks-01.png)
   <br />

   **Cluster Configuration**
   <br />

   ![EKS cluster configuration](/docs/assets/eks-02.png)

## Step 2—Install the NGINX ingress controller

The next step is to install an NGINX ingress controller to provide external access to the Kubernetes services in your Amazon EKS cluster.

For more information about installing the Bitnami/NGINX ingress controller, see [INSTALL BITNAMI/NGINX](https://www.eksworkshop.com/beginner/060_helm/helm_nginx/installnginx/). While this how-to uses the Bitnami/NGINX, you can install any other flavor of NGINX too.

### Configure a domain name for your Amazon EKS cluster using Amazon Route 53

This is required to map the IP addresses of your `test` and `prod` NGINX ingress controllers to fully qualified domain names (FQDNs).

You must choose two FQDNs, one for the `test` ingress controller and the other for the `prod` ingress controller and configure the domain name mapping for the ingress controllers using Amazon Route 53.

Let's use the following two FQDNs for this tutorial.

- `test` ingress controller's FQDN: `testdigitalai.xldevinfra.com`
- `prod` ingress controller's FQDN: `proddigitalai.xldevinfra.com`

For more information about how to configure the FQDNs in Route 53, see [Configuring Amazon Route 53 as your DNS service](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html).

## Step 3—Set up your Digital.ai Deploy and Release servers

1. Log on to your Linux/Windows server as a root user.
2. Install [Digital.ai Release](https://docs.xebialabs.com/v.10.1/release/how-to/install-xl-release-basic/).
3. Install [Digital.ai Deploy](https://docs.xebialabs.com/v.10.1/deploy/how-to/install-xl-deploy-basic/).

   - You mush have a database (including the database driver), PostgreSQL for example, installed and configured for use with Digital.ai Deploy

   **Tip**: If you want to install Deploy and Release using Docker images:

   - Install [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
   - See [Install Deploy](https://docs.xebialabs.com/v.10.2/deploy/docker/single-node-docker-deployments/#docker-compose) and [Install Release](https://docs.xebialabs.com/v.10.2/release/docker/single-node-docker-deployments/).

4. Start your Digital.ai Deploy and Release servers and log on to them.
5. Fork the [xebialabs-community/deploy-to-k8s](https://github.com/xebialabs-community/deploy-to-k8s) GitHub repository and clone it. Suppose you clone the repository to the your home directory (for example, `/home/john`).
6. Go to the forked repository in GitHub and enable GitHub Actions for the forked repository.
7. Install [XL CLI](https://docs.xebialabs.com/v.10.1/release/how-to/install-the-xl-cli/).

   **Tip:** Add the XL CLI (xl) binary's location to the `$PATH` environment variable to be able to run it from the following folders:

   - Deploy: `/deploy-to-k8s/awseks/deploy`
   - Release: `/deploy-to-k8s/awseks/release`

## Step 4—Update the values.xlvals and secrets.xlvals files

- Do this on the local `.xlvals` files.
- Do not commit the `secrets.xlvals` file to your GitHub repository. Always manage the `secrets.xlvals` file locally.
- Do not change the names of any variables such as `REGION_NAME` or `API_SERVER_URL` or secrets such as `AWS_ACCESS_KEY` or `AWS_SECRET_KEY`.

1. Open the Deploy's `values.xlvals` and Release's `values.xlvals` files and update the files with all the required values.

   Here's an example `values.xlvals` file with values.
   <br />

   **Deploy's values.xlvals**

   ```yaml
   # This file includes all non-secret values, you can add variables here and then refer them with '!value' tag in YAML files

   REGION_NAME=eu-west-2

   CLUSTER_NAME=qe-cluster

   API_SERVER_URL=https://A9C912D6785C0AD9C144C7056440E559.gr7.eu-west-2.eks.amazonaws.com

   CA_CERT=LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUM1ekNDQWMrZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRJeE1EVXdNekEwTlRrd01Gb1hEVE14TURVd01UQTBOVGt3TUZvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTXZICnR1alhCSE5NWDdWT0pSbVRKUFUyVkVib2E5S3psdkd5OFF6Q1VSR2dLY1E0QlRvclh2cmJ0MzY4Y0xoOEF0REEKOUQ2emExZFh2YW1IWkg1WG1ldWI1MCs3ZFRLSDVXQWdZeWlvM1hRak9vZWpBMzlUYUx3eU9CNVAzcWJRczlpSwpJN3VlbzlZKzNiUEdZbGVMa2RuelhhSE04bnNYRU1Wek4xQzhQdENTZVluQlZHQ3R1elVTd3pNWHZDS1NsS0tECmc4ZjUxMXViK3d5YllpOEVESVc2UjN6b2JWK200NUZrUHVCTXFQek9heEQxeHdqMTIzKzFkMFByWHNlRHBBYTEKeFIyVHVnRVd6ZEVDTTFtK3QzclQ4Z1BhVHRWWkJRUVp5dlVacXBPaHhnMFlyWTAvczRtUXZiOUlDbjhONkVjMwpoWis3b3BFaTgxRm0wRWw1UUZFQ0F3RUFBYU5DTUVBd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0hRWURWUjBPQkJZRUZIWXMxQlF4SWJxQ3kvMEpMS3BqR25HOFl1YW1NQTBHQ1NxR1NJYjMKRFFFQkN3VUFBNElCQVFBRlZDdjVhN0Q2L0tMdUdvaEM0aWJlcHkyZVprRCtNNFBCSjFoTWNYcS8vck53a284cwp0OW40WDJrcDh1L1lkOGhJZ1paODlzMmRvaVJEc0dOejRQNUFnbkU3RXhnTUYxSDV0ejFxSHpDVXp1dXdYbmJLCm9TWkhFRFdLKzhsc3ZjVVNkTUNtZ2RPUDNza1dQNjNJazNqcFlwQUNnUUxYemk==

   #FQDN of test ingress host
   TEST_INGRESS_HOST=testdigitalai.xldevinfra.com

   #FQDN of prod ingress host
   PROD_INGRESS_HOST=proddigitalai.xldevinfra.com
   ```

   <br />

   **Release's values.xlvals**
   <br />

   ```yaml
   # This file includes all non-secret values, you can add variables here and then refer them with '!value' tag in YAML files

   #DAI Deploy server URL
   DEPLOY_SERVER_URL=http://localhost:4516

   #DAI Deploy server username
   DEPLOY_SERVER_USERNAME=admin
   ```

2. Open the Deploy's `secrets.xlvals` and Release's `secrets.xlvals` and update the files with all the required values.

   **Caution** Do not commit the `secrets.xlvals` file to your GitHub repository. Always manage the `secrets.xlvals` file locally. Add `secrets.xlvals` to the `.gitignore` file to prevent it from being committed to your GitHub repository.

   Here's an example `secrets.xlvals` file with values.
   <br />

   **Deploy's secrets.xlvals**
   <br />

   ```yaml
   #Secrets

   AWS_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXX

   AWS_SECRET_KEY=XXXXXXXXXXXXXXXXXXXXXX
   ```

   <br />

   **Release's secrets.xlvals**
   <br />

   ```yaml
   #Secrets

   #Dai release admin password, required to run automated task in template
   RELEASE_ADMIN_PASSWORD=<password>

   #DAI Deploy server password
   DEPLOY_SERVER_PASSWORD=<password>
   ```

3. Run the `xl apply` command to apply the As-code YAML file, which creates the release template and webhook triggers in Digital.ai Release.
   [![apply-yaml-release](/docs/assets/eks-06.png)](/digital.ai-by-example/images/eks-06.png)

   Log on to Digital.ai Release and verify if the following are created:

   - `digital.ai` release folder
     ![apply-yaml-release](/docs/assets/eks-07.png)
   - `K8 deployment Solution using Release and Deploy` release template
     ![apply-yaml-release](/docs/assets/eks-08.png)
   - Deploy server configuration and HTTP endpoint
     ![apply-yaml-release](/docs/assets/eks-09.png)
   - A GitHub webhook trigger for the `K8 deployment Solution using Release and Deploy` release template
     ![apply-yaml-release](/docs/assets/eks-10.png)

     ![apply-yaml-release](/docs/assets/eks-11.png)

4. Run the `xl apply` command to apply the As-code YAML file, which creates the Infrastructure, Environment, and Application configuration items in Digital.ai Deploy.
   ![apply-yaml-deploy](/docs/assets/eks-05.png)

   Log on to Digital.ai Deploy and verify if the Application, Environment, and Infrastructure configuration items are created.

   ![apply-yaml-deploy](/docs/assets/eks-12.png)

5. Check connection to the Amazon EKS cluster.

   ![apply-yaml-deploy](/docs/assets/eks-13.png)

   <br />

   ![apply-yaml-deploy](/docs/assets/eks-14.png)

## Step 5—Install and configure AWS CLI and kubectl

1. Log on to your Linux/Windows server as a root user.
2. Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).
3. Run the following command to configure the AWS CLI. Enter the values when prompted

   ```
   $ aws configure
   AWS Access Key ID [None]: XXXXXEXAMPLEACCESSKEYIDXXXXXXXXXXX
   AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
   Default region name [None]: us-west-2
   Default output format [None]: json
   ```

   - For more information, see [Quick configuration with aws configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config).
   - By default, the AWS CLI uses the default profile. FOr illustrative purposes, let us use the default profile.

4. Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/).
5. Configure the [kubeconfig file](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) with the EKS cluster's details.

   Here's a sample `kubeconfig` file:

   ```conf
   apiVersion: v1
   clusters:
   - cluster:
      certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUM1ekNDQWMrZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRJeE1EVXdNekEwTlRrd01Gb1hEVE14TURVd01UQTBOVGt3TUZvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTXZICnR1alhCSE5NWDdWT0pSbVRKUFUyVkVib2E5S3psdkd5OFF6Q1VSR2dLY1E0QlRvclh2cmJ0MzY4Y0xoOEF0REEKOUQ2emExZFh2YW1IWkg1WG1ldWI1MCs3ZFRLSDVXQWdZeWlvM1hRak9vZWpBMzlUYUx3eU9CNVAzcWJRczlpSwpJN3VlbzlZKzNiUEdZbGVMa2RuelhhSE04bnNYRU1Wek4xQzhQdENTZVluQlZHQ3R1elVTd3pNWHZDS1NsS0tECmc4ZjUxMXViK3d5YllpOEVESVc2UjN6b2JWK200NUZrUHVCTXFQek9heEQxeHdqMTIzKzFkMFByWHNlRHBBYTEKeFIyVHVnRVd6ZEVDTTFtK3QzclQ4Z1BhVHRWWkJRUVp5dlVacXBPaHhnMFlyWTAvczRtUXZiOUlDbjhONkVjMwpoWis3b3BFaTgxRm0wRWw1UUZFQ0F3RUFBYU5DTUVBd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0hRWURWUjBPQkJZRUZIWXMxQlF4SWJxQ3kvMEpMS3BqR25HOFl1YW1NQTBHQ1NxR1NJYjMKRFFFQkN3VUFBNElCQVFBRlZDdjVhN0Q2L0tMdUdvaEM0aWJlcHkyZVprRCtNNFBCSjFoTWNYcS8vck53a284cwp0OW40WDJrcDh1L1lkOGhJZ1paODlzMmRvaVJEc0dOejRQNUFnbkU3RXhnTUYxSDV0ejFxSHpDVXp1dXdYbmJLCm9TWkhFRFdLKzhsc3ZjVVNkTUNtZ2RPUDNza1dQNjNJazNqcFlwQUNnUUxYemkxMmNQTVBuVEtPekVULzNQcmIKYmV5ZzJGZ1pCWW0rVE15Wi93ektGb2hGV3Z1WW1oSWFHUkRkeUpENmZBdWFKOG9rYTFnVXBKZ0pqTkhOWmJ6dgppNmMyVTIwS0M1aUhiTFdkRnkvb3YxaktYMzBUMk9qV0wxSG13TzR6SHZ2UjFHLy84RGxkNEpSQnVha283S1FhCk5qQnE2R1F6bEdsT2FScXFPVXNzSC9kUXRNdEFvbk1KeVpwWgotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==
      server: https://A9C912D6785C0AD9C144C7056440E559.gr7.eu-west-2.eks.amazonaws.com
   name: arn:aws:eks:eu-west-2:274820375133:cluster/qe-cluster
   contexts:
   - context:
      cluster: arn:aws:eks:eu-west-2:274820375133:cluster/qe-cluster
      user: arn:aws:eks:eu-west-2:274820375133:cluster/qe-cluster
   name: arn:aws:eks:eu-west-2:274820375133:cluster/qe-cluster
   current-context: arn:aws:eks:eu-west-2:274820375133:cluster/qe-cluster
   kind: Config
   preferences: {}
   users:
   - name: arn:aws:eks:eu-west-2:274820375133:cluster/qe-cluster
   user:
      exec:
         apiVersion: client.authentication.k8s.io/v1alpha1
         args:
         - --region
         - eu-west-2
         - eks
         - get-token
         - --cluster-name
         - qe-cluster
         command: aws
   ```

6. Verify the kubectl configuration by getting your EKS cluster state, for example.
   ```
   kubectl cluster-info
   ```

## Step 6—Create Amazon EKS namespaces

With AWS CLI and `kubectl` utilities installed and configured, let us now create two namespaces, `test` and `prod`, on the EKS cluster.

Run the following commands to create two namespaces—`test` and `prod`

```
kubectl create namespace test
kubectl create namespace prod
```

## Step 7—GitHub—Configure Webhook and add secrets

1. Go to **Settings > Secrets** of your forked GitHub repository and add the following secrets.

   - DOCKER_USER—your Docker Hub user name
   - DOCKER_PASSWORD—your Docker Hub password
   - DOCKER_REPO—your Docker Hub repository name, `hello-py`, for example
   - XLD_USER—your Digital.ai Deploy user name
   - XLD_PASSWD—your Digital.ai Deploy password
   - XLD_URL—your Digital.ai URL (should be a publicly accessible FQDN)
   - XLR_URL—your Digital.ai Release URL (should be a publicly accessible FQDN)

   **Important: ** Both the Release and Deploy servers must have public IP addresses assigned to them. If you are trying this out for testing purposes and if you run the Deploy and Release servers in your `localhost` (in the absence of public IPs), use utilities such as [ngrok](https://ngrok.com/) to create a tunnel to expose your localhost (ports: 4516 and 5516 for Deploy and Release respectively) to the internet.<br />

   ![apply-yaml-deploy](/docs/assets/eks-15.png)

2. Go to **Settings > Webhooks** and click **Add webhook**.
3. Type the webhooks URL for Digital.ai Release in the **Payload URL** field.

   **Important:** The webhook's name (at the end of the payload URL) must be `hellopy` as shown in the following illustration.

4. Select **application/json** from the **Content Type** drop-down list.
5. Select **Let me select individual events** option from **Which events would you like to trigger this webhook?** section.
6. Select the **Pull Requests** check box.

   ![apply-yaml-deploy](/docs/assets/eks-16.png)

7. Click **Add webhook**.

YOu are all set. Now let's create a new Pull Request and witness how the deployment happens.

## Step 8—Create a new version of the application and deploy it to Amazon EKS

1. Open the `main.py` file of the Flask application, edit it, and commit the changes to the GitHub repo.
2. Create a pull request and merge the pull request.
3. A new build is triggered by GitHub Actions, a new version of the Flask application is created using the `build.sh` file, and the new version is added to the Docker Hub repository.
4. The Digital.ai Release's Webhooks trigger kick-starts a new release using the release template as soon as it detects a new version of the application in Docker Hub.
5. The deployment process starts and the application deployed to the `test` environment in Amazon EKS.
6. Open the release task to get the URL for the deployed application, open the URL in a browser and verify that the application has been deployed successfully to the `test` environment.
7. Complete the verification task in the release process, which triggers the next phase of the release process—deploy to the `prod` environment.
8. Open the release task to get the URL for the deployed application, open the URL in a browser and verify that the application has been deployed successfully to the `prod` environment.
9. Complete the verification task and the release itself.

<!-- <center><h3>Here's a video of the automated deployment process</h3></center> -->

<!-- <center>
<video width="660" height="415">
  <source src="../../videos/aws-eks-deployment-pipeline.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>
</center> -->

<!-- <center><video class="video_player" id="player" width="100%" controls="controls" autoplay="autoplay">
  <source src="../../videos/aws-eks-deployment-pipeline.mp4"/>
  Your browser does not support the video tag.
</video>
<button onclick="goFullscreen('player'); return false">
  View Fullscreen!
</button></center> -->

<!-- <center><iframe width="560" height="315" src="https://www.youtube.com/embed/bQAeCGRRw60" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center> -->

## Quick links and further reading

- [xebialabs-community/deploy-to-k8s](https://github.com/xebialabs-community/deploy-to-k8s) GitHub repository
- [Get started with Digital.ai Deploy's DevOps as code](/deploy/concept/get-started-with-devops-as-code/)
- [Install XL CLI](https://docs.xebialabs.com/v.10.1/release/how-to/install-the-xl-cli/)
- [INSTALL BITNAMI/NGINX](https://www.eksworkshop.com/beginner/060_helm/helm_nginx/installnginx/) ingress controller
- [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- [Quick configuration with aws configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config)
- [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
