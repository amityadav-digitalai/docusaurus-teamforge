---
id: cd-with-release-argocd
title: Continuous Delivery Using Release and Argo CD
product:
  - release
category:
  - Digital.ai by Example
subject:
  - Argo CD
tags:
  - aws
  - eks
  - kubernetes
  - argo CD
  - continuous delivery
order: 400
---

<!-- Here's a video walk-through. -->

<!-- [![](https://img.youtube.com/vi/pZl7rx-v-Xo/0.jpg)](https://www.youtube.com/watch?v=pZl7rx-v-Xo "How-to: Deploy to Amazon EKS using Digital.ai Deploy and Release") -->

## Before You Begin

This how-to involves working with a variety of tools and technologies such as Digital.ai Release, Argo CD, Digital.ai Release templates as code (`.xlr` files), GitHub, Amazon EKS, AWS CLI, kubectl, and so on. You can perform this task by simply following the instructions. However, being familiar with these tools and technologies can help you considerably when you try this out in your test environment.

To know more about Amazon EKS and Argo CD, see:

- [Amazon EKS Workshop](https://www.eksworkshop.com/010_introduction/)
- [Argo CD - Declarative GitOps CD for Kubernetes](https://argo-cd.readthedocs.io/en/stable/)

## What's the objective?

The objective is to illustrate how to set up a continuous delivery (CD) pipeline—for deploying applications to a Kubernetes cluster—that leverages the Release Management and CD capabilities of Digital.ai Release and Argo CD respectively.

Once you have this setup in place, all you would be doing is pushing a code change to trigger a release job in the continuous delivery pipeline and have your application deployed to the _dev_ environment, verify the deployment, and then trigger another release job for one of the qualified dev images and promote your application to the next environment such as _uat_ or _prod_.

- Though the Digital.ai Release's Argo CD plugin supports GitHub, GitLab, and BitBucket repositories, this how-to is built with the GitHub repository for illustrative purposes.
- Though the Digital.ai Release's Argo CD plugin supports all the popular cloud platforms such as AWS, GKE, and so on, this how-to is built with Amazon EKS for illustrative purposes.

## What do you need?

This CD pipeline is built with:

- Digital.ai Release as the CD orchestrator.

  Digital.ai Release 22.0 or later with the following plugins installed:

  - [xlr-argocd-integration](/release/how-to/argocd-plugin.html)
  - [xlr-github-plugin](/release/how-to/github-plugin.html)
  - [xlr-kubernetes-plugin](/release/how-to/kubernetes-plugin.html)

- [Argo CD](https://argo-cd.readthedocs.io/en/stable/getting_started/) as the CD tool of choice.
- GitHub as the repository that hosts the _helloworld_ application code and Kubernetes manifest files.
- GitHub Actions as the CI tool to build the _helloworld_ application.
- Docker Hub as the docker image repository.
- Amazon EKS as the Kubernetes cluster where the _helloworld_ application is deployed.

![CD Pipeline](/docs/assets/argocd-continuous-delivery.png)

Keep these handy:

- Digital.ai Release credentials
- GitHub credentials
- Docker Hub credentials
- AWS credentials
- Argo CD credentials

## What do you have?

This how-to has been built with an example [GitHub how-to repository](https://github.com/xebialabs-community/howto/tree/master/argocd) that hosts the following:

- An example [_helloworld_ Springboot web application](https://github.com/xebialabs-community/howto/tree/master/argocd/helloworld), which we would deploy to the Kubernetes cluster
- The Digital.ai [Release templates](https://github.com/xebialabs-community/howto/tree/master/argocd/templates/github/22.0.x) used to:
  - Set up the application in Argo CD initially—[Initial Application Setup in Argo.xlr](https://github.com/xebialabs-community/howto/blob/master/argocd/templates/github/22.0.x/Initial%20Application%20Setup%20in%20Argo.xlr)
  - Continuously deploy the _helloworld_ application to the Kubernetes—[Continuous Delivery.xlr](https://github.com/xebialabs-community/howto/blob/master/argocd/templates/github/22.0.x/Continuous%20Delivery.xlr)
  - Promote the application version to _uat_ and _prod_ environments—[Environment Promotion.xlr](https://github.com/xebialabs-community/howto/blob/master/argocd/templates/github/22.0.x/Environment%20Promotion.xlr)
    ![Release templates](/docs/assets/xlr-templates.png)
- Kubernetes deployment manifest files for deploying the application to the [dev](https://github.com/xebialabs-community/howto/blob/master/argocd/helloworld-cd/dev/helloworld.yaml), [uat](https://github.com/xebialabs-community/howto/blob/master/argocd/helloworld-cd/uat/helloworld.yaml), and [production](https://github.com/xebialabs-community/howto/blob/master/argocd/helloworld-cd/production/helloworld.yaml) environments
- A [start-release.yaml](https://github.com/xebialabs-community/howto/blob/master/argocd/helloworld/start-release.yaml) file to start a new release in Digital.ai Release for every new version of the application
- A [continuous-deployment.yml](https://github.com/xebialabs-community/howto/blob/master/.github/workflows/continuous-deployment.yml) file (for use by GitHub Actions) to start a new build of the _helloworld_ application when you merge a commit to the `argocd/helloworld/**` path of the `master` branch

## How does it work?

Here's a high-level overview of what you would do to set this up and what happens when you start the deployment process with a simple code commit/merge.

At the end of this exercise you would have:

- forked the [xebialabs-community/howto](https://github.com/xebialabs-community/howto) GitHub repository and cloned the same to your Digital.ai Release server.
- installed and configured Digital.ai Release 22.0.0 (or later).
- created and configured an Amazon EKS cluster.
- installed and configured the AWS CLI and kubectl.
- installed Argo CD on the EKS cluster.
- connected Release and Argo CD servers.
- created three namespaces—_uat_, _dev_, and _prod_—using AWS CLI/kubectl.

The continuous deployment process starts when you make a code change to your _helloworld_ Springboot web application, create a new pull request, and merge your pull request.

Here's what the continuous delivery workflow does when you merge your changes.

1. **You**—Start a release using the [Initial Application Setup in Argo.xlr](https://github.com/xebialabs-community/howto/blob/master/argocd/templates/github/22.0.x/Initial%20Application%20Setup%20in%20Argo.xlr) template to set up the application in Argo CD initially
2. **You**—Make a code change, commit the changes, and merge your Springboot application's code changes to GitHub
3. **Continuous delivery pipeline**—Triggers a new release in Digital.ai Release using the [Continuous Delivery.xlr](https://github.com/xebialabs-community/howto/blob/master/argocd/templates/github/22.0.x/Continuous%20Delivery.xlr) template—builds your application using GitHub Actions—creates a new Docker image—adds the new image to the Docker Hub repository—and deploys the _helloworld_ application to the _dev_ environment of the Kubernetes cluster using Argo CD
4. **You**—Verify the deployments to the _dev_ environment and pick one of the stable versions for promoting to _uat_ or _prod_ environments
5. **You**—Start a new release in Digital.ai Release using the [Environment Promotion.xlr](https://github.com/xebialabs-community/howto/blob/master/argocd/templates/github/22.0.x/Environment%20Promotion.xlr) template to promote your application to the next environment such as _uat_ or _prod_
6. **Continuous delivery pipeline**—Deploys the new application version to the _uat_ or _prod_ environment in Amazon EKS
7. **You**—Verify the deployment and iterate the continuous release process

Here's a detailed step-by-step.

## Step 1—Create an Amazon EKS Cluster

**Note:** For illustrative purposes, this topic deals with Amazon EKS. You can have your cluster in other cloud platforms such as GKE too.

1. Log on to your AWS account and gather the `AWSAccessKeyId` and `AWSSecretKey`.

   Create an access key if you do not have one already. For more information, see [Managing access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey).

   **Important:** It is recommended to download and save the AWS access key file immediately after creating the access key as you cannot retrieve your Secret Access Key later.

2. Create an Amazon EKS Cluster. For more information, see [Creating an Amazon EKS cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html).

   While there are innumerable configurations possible for your EKS cluster, this topic assumes the EKS cluster is made up of:

   - A cluster with three nodes of instance type `t2.medium`
   - Three namespaces—_uat_, _dev_ and _prod_. You may choose to create three separate EKS clusters instead of sharing the same cluster with three namespaces. To keep the setup simple, this topic deals with a single cluster with three namespaces.

3. Gather the following information about your Amazon EKS cluster and keep them handy.
   <!-- The values you gather for these properties are added to the `values.xlvals` file and are passed to the As-code YAML files while creating the Deploy configuration items. -->
   - Your Amazon account's `AWSAccessKeyId` and `AWSSecretKey`
   - The AWS region code (for example, `eu-west-2`) that hosts the EKS cluster
   - The EKS cluster's name
   - The API server endpoint URL
   - The Certificate Authority (CA) cert

## Step 2—Install and Configure AWS CLI and kubectl

See [Install Kubernetes Tools](https://www.eksworkshop.com/020_prerequisites/k8stools/).

## Step 3-Install Argo CD

See [Install Argo CD](https://www.eksworkshop.com/intermediate/290_argocd/install/).

## Step 4—Create Amazon EKS Namespaces

With AWS CLI and `kubectl` utilities installed and configured, let us now create three namespaces, _uat_, _dev_, and _prod_, on the EKS cluster.

Run the following commands to create three namespaces—_uat_, _dev_, and _prod_

```
kubectl create namespace uat
kubectl create namespace dev
kubectl create namespace prod
```

## Step 5—Install the NGINX Ingress Controller

The next step is to install an NGINX ingress controller to provide external access to the Kubernetes services in your Amazon EKS cluster.

For more information about installing the Bitnami/NGINX ingress controller, see [INSTALL BITNAMI/NGINX](https://www.eksworkshop.com/beginner/060_helm/helm_nginx/installnginx/). While this how-to uses the Bitnami/NGINX, you can install any other flavor of NGINX too.

### Configure Domain Names for Your Amazon EKS Cluster Using Amazon Route 53

This is required to map the IP addresses of your _uat_, _dev_ and _prod_ NGINX ingress controllers to fully qualified domain names (FQDNs). You must also map the IP address of the Argo CD's ingress controller to an FQDN.

You must choose four FQDNs, one each for the _uat_, _dev_, _prod_, and Argo CD ingress controllers and configure the domain name mapping for the ingress controllers using Amazon Route 53.

Let's use the following FQDNs for this tutorial.

- Argo CD ingress controller's FQDN: `argocddigitalai.xldevinfra.com`
- _uat_ ingress controller's FQDN: `uatdigitalai.xldevinfra.com`
- _dev_ ingress controller's FQDN: `devdigitalai.xldevinfra.com`
- _prod_ ingress controller's FQDN: `proddigitalai.xldevinfra.com`

For more information about how to configure the FQDNs in Route 53, see [Configuring Amazon Route 53 as your DNS service](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html).

## Step 6—Set Up Your Digital.ai Release Server and GitHub Actions

1. Log on to your Linux server as a root user.
2. Install [Digital.ai Release](/release/how-to/install-xl-release-basic.html).

   **Tip**: If you want to install Release using Docker images:

   - Install [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
   - See [Install Release](/release/docker/single-node-docker-deployments.html).

3. Start your Digital.ai Release server and log on.
4. Install the following Release plugins.

   - xlr-argocd-integration—see [Argo CD Plugin](/release/how-to/argocd-plugin.html)
   - xlr-github-plugin—see [GitHub Plugin](/release/how-to/github-plugin.html)
   - xlr-kubernetes-plugin—see [Kubernetes Plugin](/release/how-to/kubernetes-plugin.html)

5. Fork the [xebialabs-community/howto](https://github.com/xebialabs-community/howto) GitHub repository and clone it. Suppose you clone the repository to the your home directory (for example, `/home/john`).
6. Go to the forked repository in GitHub and enable GitHub Actions for the forked repository.
7. Edit the [start-release.yml](https://github.com/xebialabs-community/howto/blob/master/argocd/helloworld/start-release.yaml) file and add values for the following variables and commit the changes.

   Here's an example:

   ```yaml
   apiVersion: xl-release/v1
   kind: Release
   spec:
     name: Trigger Continuous Delivery
     template: <Release-folder-name>/Continuous Delivery # argocd/Continuous Delivery for example
     variables:
       ARGO_APP_NAME: 'helloworld-dev' # The application name
       GIT_REPO_URL: 'https://github.com/isaacsathish/howto.git' # The repo URL
       GIT_REPO_NAME: 'howto' # The repo name
       LOCAL_GIT_CLONE_PATH: '/home/ubuntu/git-temp-dir' # The path to the folder on the Digital.ai Release server where the revision branch of the repo is cloned
       MANIFEST_PATH_IN_GIT: 'argocd/helloworld-cd/dev' # The path of the folder that contains the deployment manifest file
       MANIFEST_FILE: 'helloworld.yaml' # The deployment manifest file name
       NEW_TAG: PLACEHOLDER
   ```

8. Connect Release to the [GitHub](/release/how-to/github-plugin.html) and [Argo CD](/release/how-to/argocd-plugin.html) servers.

   > **Tip**: Use the Argo CD ingress controller's FQDN to connect Argo CD to Release.

## Step 7—Add Secrets to GitHub

1. Go to **Settings > Secrets** of your forked GitHub repository and add the following secrets.

   - DOCKER_USER—your Docker Hub user name
   - DOCKER_PASSWORD—your Docker Hub password
   - DOCKER_REPO—your Docker Hub repository name
   - DOCKER_REGISTRY_HOST—Docker Hub host name—`hub.docker.com`, for example
   - XLR_USER—your Digital.ai Release user name
   - XLR_PASS—your Digital.ai Release password
   - XLR_URL—your Digital.ai Release URL (should be a publicly accessible FQDN)

   > **Important:** The Release server must have public IP addresses assigned to it. If you are trying this out for testing purposes and if you run the Release server in your `localhost` (in the absence of public IPs), use utilities such as [ngrok](https://ngrok.com/) to create a tunnel to expose your localhost (port: 5516 for Release) to the internet.<br />

## Step 8—Import the Digital.ai Release Templates

1. See [Import a Release Template](https://docs.xebialabs.com/v.22.1/release/how-to/import-a-release-template/) and import the three [Release templates](https://github.com/xebialabs-community/howto/tree/master/argocd/templates/github/22.0.x) from the [xebialabs-community/howto](https://github.com/xebialabs-community/howto) GitHub repository.
2. Once imported, you must open the tasks in these templates and add/select values for fields such as the GitHub server name, Argo CD server name and project name, and so on.

   ![task set up](/docs/assets/2022-04-28_15_01_41-cd-argocd_InitialApplicationSetup-Release.png)

## Step 9—Initial Application Configuration in Argo CD

Use the [Initial Application Setup in Argo.xlr](https://github.com/xebialabs-community/howto/blob/master/argocd/templates/github/22.0.x/Initial%20Application%20Setup%20in%20Argo.xlr) release to configure the application's source code repo in Argo CD and deploy the application initially.

![initial Setup](/docs/assets/2022-04-28_14_50_52-cd-argocd_InitialApplicationSetup-Release.png)

This Release contains tasks to:

1. Add a repository connection to Argo CD.
2. Create a project in Argo CD.
3. Create an Argo CD Application.
4. Sync the created application (in Kubernetes to the definition in GitHub).
5. Get the Sync Status.

When you run this release, it is going to ask you for inputs such as the Git Repository URL that has the Kubernetes deployment manifest files, the path of the manifest file in the repository, the application name and project name.

![Enter Values](/docs/assets/2022-04-29_17_03_19-Releases-Digital.ai-Release.png)

Enter these values and start the Release. The application will be set up in Argo CD.

Run this release for all the three environments, _dev_, _uat_, and _prod_ by changing the values appropriately for the **MANIFEST_PATH_IN_GIT**, **ARGO_APP_NAME**, and **KUBE_NAMESPACE** fields.

Here's an example set of values for the three environment variables:

**_dev_**

- GIT_REPO_URL : forked repo url (for example, `https://github.com/isaacsatish/howto.git`)
- MANIFEST_PATH_IN_GIT : argocd/helloworld-cd/dev
- ARGO_PROJECT_NAME : helloworld
- ARGO_APP_NAME : helloworld-dev
- KUBE_SERVER_URL : `https://kubernetes.default.svc`
- KUBE_NAMESPACE : dev

**_uat_**

- GIT_REPO_URL : forked repo url (for example, `https://github.com/isaacsatish/howto.git`)
- MANIFEST_PATH_IN_GIT : argocd/helloworld-cd/uat
- ARGO_PROJECT_NAME : helloworld
- ARGO_APP_NAME : helloworld-uat
- KUBE_SERVER_URL : `https://kubernetes.default.svc`
- KUBE_NAMESPACE : uat

**_prod_**

- GIT_REPO_URL : forked repo url (for example, `https://github.com/isaacsatish/howto.git`)
- MANIFEST_PATH_IN_GIT : argocd/helloworld-cd/prod
- ARGO_PROJECT_NAME : helloworld
- ARGO_APP_NAME : helloworld-prod
- KUBE_SERVER_URL : `https://kubernetes.default.svc`
- KUBE_NAMESPACE : prod

## Step 10—Continuous Delivery

Use the [Continuous Delivery.xlr](https://github.com/xebialabs-community/howto/blob/master/argocd/templates/github/22.0.x/Continuous%20Delivery.xlr) release to continuously deploy the _helloworld_ application to the _dev_ environment of the Kubernetes cluster.

![CD](/docs/assets/2022-04-28_14_54_27-cd-argocd_ContinuousDelivery-Release.png)

This release contains tasks to:

1. Create a revision branch in the repository with manifest files.
2. Clone the revision branch locally.
3. Update the new image in the kubernetes manifest file.
4. Commit and push the change.
5. Create a pull request.
6. Approve the pull request.
7. Merge the pull request.
8. Sync the application.
9. Get the Sync Status.

Now, whenever a code change is merged into the `master` branch of the _helloworld_ application's source code repository, the source code is built and tested and wrappred into a docker image and pushed to the docker hub repository. Then a new revision branch is created and cloned, the application is built and wrapped as a docker image, and the image is deployed to the target kubernetes environment, which in this case is the _dev_ environment, all through the Release template run.

## Step 11—Environment Promotion

Use the [Environment Promotion.xlr](https://github.com/xebialabs-community/howto/blob/master/argocd/templates/github/22.0.x/Environment%20Promotion.xlr) release to manually deploy an image of the _helloworld_ application to the _uat_ or _prod_ environment of the Kubernetes cluster.

![promotion](/docs/assets/2022-04-28_14_58_31-cd-argocd_EnvironmentPromotion-Release.png)

- This release is similar to the Continuous Delivery release discussed in Step 10.
- The difference is that this release is triggered manually whenever you have an image that's ready to be deployed to the _uat_ or _prod_ environments.
- The path of the manifest file to be updated determines the environment to which the image is promoted.
- Run this release, enter the values, and start the Release.

  ![env promotion](/docs/assets/2022-04-29_17_28_54-promo.png)

- Note that the:
  - **CONTAINER_NAME** variable takes the following values from the deployment manifest files:
    - [uat](https://github.com/xebialabs-community/howto/blob/master/argocd/helloworld-cd/uat/helloworld.yaml)—`helloworld-uat-container`
    - [prod](https://github.com/xebialabs-community/howto/blob/master/argocd/helloworld-cd/production/helloworld.yaml)—`helloworld-prod-container`
  - **NEW_TAG** variable takes the commit tag (SHA) of the image

The image will be deployed to the desired environment, which can be _uat_ or _prod_ in this case.

## Quick Links and Further Reading

- [xebialabs-community/howto](https://github.com/xebialabs-community/howto) GitHub repository
- [Amazon EKS Workshop](https://www.eksworkshop.com/010_introduction/)
- [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- [Quick configuration with aws configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config)
- [Configuring Amazon Route 53 as your DNS service](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html)
- [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
