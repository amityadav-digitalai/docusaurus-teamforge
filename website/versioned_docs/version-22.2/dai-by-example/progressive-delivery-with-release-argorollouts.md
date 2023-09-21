---
id: progressive-delivery-with-release-argorollouts
title: Progressive Delivery Using Release and Argo Rollouts
product:
  - release
category:
  - Digital.ai by Example
subject:
  - Argo Rollouts
tags:
  - aws
  - eks
  - kubernetes
  - argo rollouts
  - progressive delivery
  - blue-green
  - canary
  - pods
  - kubectl
order: 400
---

## Before You Begin

This how-to involves working with a variety of tools and technologies such as Digital.ai Release, Argo Rollouts, GitHub, Digital.ai Release templates as code (`.xlr` files), Amazon EKS, kubectl, and so on. You can perform this task by simply following the instructions. However, being familiar with these tools and technologies can help you considerably when you try this out in your test environment.

To know more about Amazon EKS and Argo Rollouts, see:

- [Amazon EKS Workshop](https://www.eksworkshop.com/010_introduction/)
- [Argo Rollouts - Kubernetes Progressive Delivery Controller](https://argoproj.github.io/argo-rollouts/)

## What's the objective?

The objective is to illustrate:

- how you can carry out Blue-Green and Canary deployments of an application (the [Guestbook application](https://hub.docker.com/r/xldevdocker/guestbook) in this how-to) to an Amazon EKS cluster using Digital.ai Release and Argo Rollouts.
- the release management and deployment capabilities of Digital.ai Release and Argo Rollouts respectively.

Digital.ai Release integrates with Argo Rollouts and supports the following roll out strategies:

- Blue-Green
- Canary

Once you have this setup in place, all you would be doing is starting a new release—Canary or Blue-Green—whenever you have a new image to deploy.

> **Note:** Though the Digital.ai Release's Argo Rollout plugin supports all popular cloud platforms such as Amazon, GCP, Azure, and so on, this how-to is based on Amazon EKS for illustrative purposes.

## What do you need?

You need the following to set up a Canary/Blue-Green deployment pipeline:

- Digital.ai Release—acts as the deployment orchestrator. You need Digital.ai Release 22.3.x or later with the following plugins installed:

  - [xlr-argo-rollouts-integration](/release/how-to/argo-rollout-plugin.html)
  - [xlr-kubernetes-plugin](/release/how-to/kubernetes-plugin.html)

- A Kubernetes cluster—[Amazon EKS in this how-to](https://www.eksworkshop.com/)—with [Argo Rollouts](https://argoproj.github.io/argo-rollouts/) installed.
- An [AWS Load Balancer Controller](https://www.eksworkshop.com/beginner/180_fargate/prerequisites-for-alb/).
- A Linux host with Kubectl and Kubectl plugin for Argo Rollouts installed.

## What do you have?

This how-to has been built with an example [GitHub how-to repository](https://github.com/xebialabs-community/howto/tree/master/argoRollouts) that hosts the following:

- [Digital.ai Release templates](https://github.com/xebialabs-community/howto/tree/master/argoRollouts/templates):
  - Argo_Rollouts_Initial_BlueGreen_Rollout_Setup.xlr
  - Argo Rollouts\_ BlueGreen Deployment.xlr
  - Argo_Rollouts_BlueGreen_Rollout_Teardown.xlr
  - Argo_Rollouts_Initial_Canary_Rollout_Setup.xlr
  - Argo*Rollouts* Canary Deployment.xlr
  - Argo_Rollouts_Canary_Rollout_Teardown.xlr
- [Kubernetes deployment manifest files](https://github.com/xebialabs-community/howto/tree/master/argoRollouts/manifests):
  - guestbook-bluegreen-rollout.yaml
  - guestbook-bluegreen-service.yaml
  - guestbook-canary-rollout.yaml
  - guestbook-canary-service.yaml
  - redis.yaml

This how-to illustrates how you can deploy the [Guestbook application](https://hub.docker.com/r/xldevdocker/guestbook) following the Blue-Green and Canary deployment strategies.

## How does it work?

Here's a high-level overview of what you would do to set this up and what happens when you start a new Blue-Green or Canary deployment of an image.

At the end of this exercise you would have:

- forked the [xebialabs-community/howto](https://github.com/xebialabs-community/howto) GitHub repository and cloned the same to your Digital.ai Release server.
- installed and configured Digital.ai Release 22.2.0 (or later).
- installed the [xlr-argo-rollouts-integration](/release/how-to/argo-rollout-plugin.html) and [xlr-kubernetes-plugin](/release/how-to/kubernetes-plugin.html) plugins.
- created and configured an Amazon EKS cluster.
- installed Argo Rollouts on the Amazon EKS cluster.
- installed and configured a Linux host with Kubectl and Kubectl plugin for Argo Rollouts.
- set up connections between the DIgital.ai Release and Kubectl host.
- set up connections between the DIgital.ai Release and Argo Rollouts.
- created Release global variables and imported the Release templates.

Once you have the setup in place, you must start a new release to set up the environment for Blue-Green and Canary deployments using the following templates.

- **Argo_Rollouts_Initial_BlueGreen_Rollout_Setup.xlr**—Use this template to:
  - Create a namespace—_guestbook-bluegreen_.
  - Create two services—_guestbook-bluegreen-active_ and _guestbook-bluegreen-preview_.
  - Create a rollout—_guestbook-bluegreen-rollout_—using the Blue-Green strategy with a replica set of two pods with the image _guestbook:blue_.
  - Create a _redis_ pod and a _redis_ service.
- **Argo_Rollouts_Initial_Canary_Rollout_Setup.xlr**—Use this template to:
  - Create a namespace—_guestbook-canary_.
  - Create two services—_guestbook-stable_ and _guestbook-canary_.
  - Create a rollout—_guestbook-canary-rollout_—using the Canary strategy with a replica set of five pods with the image _guestbook:blue_.
  - Create a _redis_ pod and a _redis_ service.

Once the initial setup is complete, all it takes to deploy a new image of the Guestbook application is to start a new release with one of the following templates.

- **Argo Rollouts\_ BlueGreen Deployment.xlr**—Use this template to:
  - Check which version of the application is live at the moment and set a new image for deployment.
  - Test and promote or abort the new image for a Blue-Green rollout.
  - Roll out or abort the new image of the Guestbook application depending on whether you promoted or aborted the rollout.
  - Send notifications.
- **Argo*Rollouts* Canary Deployment.xlr**—Use this template to:
  - Check which version of the application is live at the moment and set a new image for deployment.
  - Test and promote or abort the new image for a Canary rollout.
  - Roll out or abort the new image of the Guestbook application depending on whether you promoted or aborted the rollout.
  - Send notifications.

Once you have had a trial run of the procedure you can use the following Release templates to remove all the namespaces, services and rollouts so that you can free up your cloud resources or start all over again from the scratch if you want.

- **Argo_Rollouts_BlueGreen_Rollout_Teardown.xlr**—removes the namespace, service, rollout and so on for Blue-Green
- **Argo_Rollouts_Canary_Rollout_Teardown.xlr**—removes namespace, service, rollout and so on for Canary

Here's a detailed step-by-step.

## Step 1—Create an Amazon EKS Cluster

**Note:** For illustrative purposes, this topic deals with Amazon EKS. You can have your Kubernetes cluster in other cloud platforms such as GCP or Azure too.

1. Log on to your AWS account and gather the `AWSAccessKeyId` and `AWSSecretKey`.

   Create an access key if you do not have one already. For more information, see [Managing access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey).

   **Important:** It is recommended to download and save the AWS access key file immediately after creating the access key as you cannot retrieve your Secret Access Key later.

2. Create an Amazon EKS Cluster. For more information, see [Creating an Amazon EKS cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html).

   While there are innumerable configurations possible for your EKS cluster, this topic assumes the EKS cluster is made up of a cluster with three nodes of instance type `t2.medium`

3. Gather the following information about your Amazon EKS cluster and keep them handy.

   - Your Amazon account's `AWSAccessKeyId` and `AWSSecretKey`
   - The AWS region code (for example, `eu-west-2`) that hosts the EKS cluster
   - The EKS cluster's name
   - The API server endpoint URL
   - The Certificate Authority (CA) cert

## Step 2-Install Argo Rollouts In Your Cluster

See [Install Argo Rollouts](https://argoproj.github.io/argo-rollouts/installation/).

## Step 3—Install the AWS-LB Controller in the Amazon EKS Cluster

See [Installing the AWS Load Balancer Controller](https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html).

## Step 4—Set up the Kubectl Linux host

1. Log on to the Linux host.
2. Install Kubectl and the Kubectl plugin for Argo Rollouts.

   See:

   - [Install kubectl](https://www.eksworkshop.com/020_prerequisites/k8stools/)
   - [Install Kubectl Plugin for Argo Rollouts](https://argoproj.github.io/argo-rollouts/installation/#kubectl-plugin-installationhttps://argoproj.github.io/argo-rollouts/features/kubectl-plugin)

3. Connect the Kubectl host to the Amazon EKS cluster. See [Update kubeconfig](https://docs.aws.amazon.com/cli/latest/reference/eks/update-kubeconfig.html).

## Step 5—Set up the Digital.ai Release Server and Fork the how-to GitHub Repository

1. Log on to your Digital.ai Release server (Linux) as a root user.
2. Install [Digital.ai Release](/release/how-to/install-xl-release-basic.html).

   **Tip**: If you want to install Release using Docker images:

   - Install [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
   - See [Install Release](/release/docker/single-node-docker-deployments.html).

3. Start your Digital.ai Release server and log on.
4. Install the following Release plugins.

   - xlr-argo-rollouts-integration—see [xlr-argo-rollouts-integration](/release/how-to/argo-rollout-plugin.html)
   - xlr-kubernetes-plugin—see [Kubernetes Plugin](/release/how-to/kubernetes-plugin.html)

5. Fork the [xebialabs-community/howto](https://github.com/xebialabs-community/howto) GitHub repository and clone the forked repository. Suppose you clone the repository to the your home directory (for example, `/home/john`).

## Step 6—Set up Connections

Log on to the Digital.ai Release application and set up connections to the Kubectl host and Kubectl Argo Rollouts.

![connections](/docs/assets/progressive-delivery-with-release-argorollouts/1662011693710.png)

### Step 6.1—Set up Connection to the Kubectl Host

1. Click **Connections** from the left navigation pane.
2. Click the _+_ icon next to **Kubectl Host**.
3. Type the values for the following fields:

   - Title
   - Address (IP address of the Kubectl host)
   - Port
   - Username
   - Password or Private Key File (depending on what you use)

   ![kubectl host connection](/docs/assets/progressive-delivery-with-release-argorollouts/1661844458477.png)

4. Click **Test**.

   ![kubectl host connection test](/docs/assets/progressive-delivery-with-release-argorollouts/1661844699365.png)

5. Click **Save**.

### Step 6.2—Set up Connection to the Kubectl Argo Rollouts

1. Click **Connections** from the left navigation pane.
2. Click the + icon next to **Kubectl Argo Rollouts**.
3. Type the values for the following fields:

   - Title
   - Host
   - Local Kubeconfig
   - Context
   - Kubectl Path
   - Kubectl Argo Rollouts Path

   ![argo rollouts connection](/docs/assets/progressive-delivery-with-release-argorollouts/1661844910565.png)

4. Click **Test**.

   ![argo rollouts connection test](/docs/assets/progressive-delivery-with-release-argorollouts/1661844948424.png)

5. Click **Save**.

## Step 7—Create Release Global Variables

1. Click **Global Variables** from the left navigation pane.
2. Click **New global variable** and create the following global variables.

| Variable Name                       | Value                       | Type |
| :---------------------------------- | --------------------------- | ---- |
| ${global.blue-green.container-name} | guestbook-container         | Text |
| ${global.blue-green.current-image}  | xldevdocker/guestbook:green | Text |
| ${global.blue-green.rollout-name}   | guestbook-bluegreen-rollout | Text |
| ${global.canary.container-name}     | guestbook-container         | Text |
| ${global.canary.current-image}      | xldevdocker/guestbook:blue  | Text |
| ${global.canary.rollout-name}       | guestbook-canary-rollout    | Text |

## Step 8—Import the Release Templates

1. Click **Folders > Add Folder** and create the folders you need.

   ![create folders](/docs/assets/progressive-delivery-with-release-argorollouts/1661845194598.png)

2. Import the [Release templates](https://github.com/xebialabs-community/howto/tree/master/argoRollouts/templates) from the [xebialabs-community/howto](https://github.com/xebialabs-community/howto) GitHub repository that you forked. See [Import a Release Template](/release/how-to/import-a-release-templat.html) for more information.

   **Templates for Blue-Green deployments**

   ![blue-green templates](/docs/assets/progressive-delivery-with-release-argorollouts/1661845261321.png)

   **Templates for Canary deployments**

   ![canary templates](/docs/assets/progressive-delivery-with-release-argorollouts/1661845296960.png)

3. After importing the templates, open the tasks in these templates and select the value for the **Kubectl Conf** and **Rollouts Config** fields as required.

   ![rollouts config field](/docs/assets/progressive-delivery-with-release-argorollouts/1661845482811.png)

   ![kubectl conf field](/docs/assets/progressive-delivery-with-release-argorollouts/1661873768923.png)

## Step 9—Set up the Dashboard for Blue-Green and Canary Deployments

1. Click **Dashboards > Add custom dashboard** from the left navigation pane.
2. Type the name, description and so on for the dashboard.

   ![dashboard](/docs/assets/progressive-delivery-with-release-argorollouts/1661861831612.png)

3. Click **Add tiles** and add **ArgoRollouts Blue Green details** and **ArgoRollouts Canary details**.

   ![add tiles](/docs/assets/progressive-delivery-with-release-argorollouts/1661861924841.png)

4. Configure the tiles as shown in the following illustration and save the tiles.

   **Blue Green tile**

   ![blue green tile config](/docs/assets/progressive-delivery-with-release-argorollouts/1661863775058.png)

   **Canary tile**

   ![canary tile config](/docs/assets/progressive-delivery-with-release-argorollouts/1661863844698.png)

5. Click **Back to view mode** to view the dashboard.

## Step 10—Blue-Green Strategy—Initial Roll Out of the Guestbook Application

The following tasks are part of the _Argo Rollouts: Initial Blue-Green Rollout Setup_ template.

- Create a namespace—_guestbook-bluegreen_.
- Create two services—_guestbook-bluegreen-active_ and _guestbook-bluegreen-preview_.
- Create a rollout—_guestbook-bluegreen-rollout_—using the Blue-Green strategy with a replica set of two pods with the image _guestbook:blue_.
- Create a _redis_ pod and a _redis_ service.

1. Go to the **Folders > Blue-Green Deployment** folder.
2. Select the **Argo Rollouts: Initial Blue-Green Rollout Setup** template.
3. Click **New Release**.
4. Type a name for the new release, select a user for the **Run automated tasks as user** field and type the password.

   ![bg new release](/docs/assets/progressive-delivery-with-release-argorollouts/1661864186000.png)

5. Click **Create**.
6. Click **Start release** and click **Start** from the dialog box and have the initial rollout completed.

   ![bg initial rollout done](/docs/assets/progressive-delivery-with-release-argorollouts/1661864264348.png)

7. Go to the dashboard and verify the initial rollout with two pods.

   ![bg initial rollout](/docs/assets/progressive-delivery-with-release-argorollouts/1661865180978.png)

8. You can also go to the url https://your-aws-eks-domain-name:8080/index.html to view the deployed Guest Book application (in blue).

   ![bg initial deployment browser view](/docs/assets/progressive-delivery-with-release-argorollouts/1661866426449.png)

### Step 10.1—Roll out New Versions of the Guestbook Application Using the Blue-Green Strategy

The following tasks are part of the _Argo Rollouts: Blue-Green Deployment_ template.

- Check which version of the application is live at the moment and set a new image for deployment.
- Test and promote or abort the new image for a Blue-Green rollout.
- Roll out or abort the new image of the Guestbook application depending on whether you promoted or aborted the rollout.
- Send notifications.

1. Go to the **Folders > Blue-Green Deployment** folder.
2. Select the **Argo Rollouts: Blue-Green Deployment** template.
3. Click **New Release**.
4. Type a name for the new release, select a user for the **Run automated tasks as user** field and type the password.

   ![bg roll out green](/docs/assets/progressive-delivery-with-release-argorollouts/1661882890444.png)

5. Type the new image's tag in the **New image to deploy** field.
6. Select **Promote Rollout** or **Abort Rollout** from the **Action** drop-down list.
7. Click **Create**.
8. Click **Start release** and click **Start** from the dialog box.
9. Click the **Confirm new image** manual task, assign it to yourself and complete the task.

   ![confirm new image green](/docs/assets/progressive-delivery-with-release-argorollouts/1661883152843.png)

   ![deploy the green image](/docs/assets/progressive-delivery-with-release-argorollouts/1661883185611.png)

10. Once you confirm the new image, and once the _Set Image_ task succeeds, you can view the dashboard to know that the new image _xldevdocker/guestbook:green_ has been rolled out as Revision 2 for you to preview.

    ![bg rollout in progress](/docs/assets/progressive-delivery-with-release-argorollouts/1662377854295.png)

11. Assign the **Run tests on xldevdocker/guestbook:green** manual task to yourself and complete it.

    ![test done](/docs/assets/progressive-delivery-with-release-argorollouts/1661883343006.png)

12. Assign the **Confirm Promotion?** manual task to yourself and either promote or abort the rollout.

    ![promote](/docs/assets/progressive-delivery-with-release-argorollouts/1661883448151.png)

    Wait for the rollout to complete.

    ![green roll out done](/docs/assets/progressive-delivery-with-release-argorollouts/1661883512510.png)

13. Go to the dashboard and verify the new rollout (Revision:2) with two pods running as Stable, Active.

![green rollout success](/docs/assets/progressive-delivery-with-release-argorollouts/1662378059072.png)

11. You can also go to the url https://your-aws-eks-domain-name:8080/index.html to view the deployed Guest Book application (in green).

    ![green in browser](/docs/assets/progressive-delivery-with-release-argorollouts/1661884105503.png)

## Step 11—Canary Strategy—Initial Roll Out of the Guestbook Application

The following tasks are part of the _Argo Rollouts: Initial Canary Rollout Setup_ release template.

- Create a namespace—_guestbook-canary_.
- Create two services—_guestbook-stable_ and _guestbook-canary_.
- Create a rollout—_guestbook-canary-rollout_—using the Canary strategy with a replica set of five pods with the image _guestbook:blue_.
- Create a _redis_ pod and a _redis_ service.

1. Go to the **Folders > Canary Deployment** folder.
2. Select the **Argo Rollouts: Initial Canary Rollout Setup** template.
3. Click **New Release**.
4. Type a name for the new release, select a user for the **Run automated tasks as user** field and type the password.

   ![canary new release](/docs/assets/progressive-delivery-with-release-argorollouts/1661867325143.png)

5. Click **Create**.
6. Click **Start release** and click **Start** from the dialog box and have the initial setup completed.

   ![canary initial rollout done](/docs/assets/progressive-delivery-with-release-argorollouts/1661867382648.png)

7. Go to the dashboard and verify the initial rollout with five pods.

   ![canary initial rollout](/docs/assets/progressive-delivery-with-release-argorollouts/1661868764367.png)

8. You can also go to the url https://your-aws-eks-domain-name:8080/index.html to view the deployed Guest Book application (in blue).

   ![canary initial deployment browser view](/docs/assets/progressive-delivery-with-release-argorollouts/1661866426449.png)

### Step 11.1—Roll out New Versions of the Guestbook Application Using the Canary Strategy

The following tasks are part of the _Argo Rollouts: Canary Deployment_ template.

- Check which version of the application is live at the moment and set a new image for deployment.
- Test and promote or abort the new image for a Canary rollout.
- Roll out or abort the new image of the Guestbook application depending on whether you promoted or aborted the rollout.
- Send notifications.

1. Go to the **Folders > Canary Deployment** folder.
2. Select the **Argo Rollouts: Canary Deployment** template.
3. Click **New Release**.
4. Type a name for the new release, select a user for the **Run automated tasks as user** field and type the password.
5. Type the new image's tag in the **New image to deploy** field.
6. Select **Promote Rollout** or **Abort Rollout** from the **Action** drop-down list.
7. Click **Create**.

   ![canary rollout green](/docs/assets/progressive-delivery-with-release-argorollouts/1661884380982.png)

8. Click **Start release** and click **Start** from the dialog box.
9. Click the **Confirm new image** manual task, assign it to yourself and complete the task.

   ![confirm image](/docs/assets/progressive-delivery-with-release-argorollouts/1661884493658.png)

10. Once you confirm the new image, and once the _Set Image_ task succeeds, you can view the dashboard to know that the new image _xldevdocker/guestbook:green_ has been rolled out (to 20% weight and paused) as Revision 2.

    ![1662378278982](/docs/assets/progressive-delivery-with-release-argorollouts/1662378278982.png)

11. Assign the **Run tests on xldevdocker/guestbook:green** manual task to yourself and complete it.

    ![test done](/docs/assets/progressive-delivery-with-release-argorollouts/1661884550380.png)

12. Assign the **Confirm Promotion?** manual task to yourself and either promote or abort the rollout.

    ![promote green](/docs/assets/progressive-delivery-with-release-argorollouts/1661884592714.png)

    Wait for the rollout to complete.

13. Go to the dashboard and verify the new rollout (Revision:2, Stable) with five pods.

    ![canary deployment success](/docs/assets/progressive-delivery-with-release-argorollouts/1662378532133.png)

14. You can also go to the url https://your-aws-eks-domain-name:8080/index.html to view the deployed Guest Book application (in green).

    ![green in browser](/docs/assets/progressive-delivery-with-release-argorollouts/1661884105503.png)

## Step 12—Set up Linkerd

You can also set up [Linkerd](https://linkerd.io/2.11/getting-started/) to observe the deployments, traffic splits, and analyze the data.

Once you have Linkerd set up, use the `linkerd viz dashboard &` command to view the pods and traffic splits.

![Linkerd 1](/docs/assets/progressive-delivery-with-release-argorollouts/1661886687947.png)

![Linkerd 2](/docs/assets/progressive-delivery-with-release-argorollouts/1661886710879.png)

![Linkerd 3](/docs/assets/progressive-delivery-with-release-argorollouts/1661886734153.png)

## Quick Links and Further Reading

- [xebialabs-community/howto](https://github.com/xebialabs-community/howto) GitHub repository
- [Amazon EKS Workshop](https://www.eksworkshop.com/010_introduction/)
- [Argo Rollouts - Kubernetes Progressive Delivery Controller](https://argoproj.github.io/argo-rollouts/)
- [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
- [Linkerd](https://linkerd.io/2.11/getting-started/)
