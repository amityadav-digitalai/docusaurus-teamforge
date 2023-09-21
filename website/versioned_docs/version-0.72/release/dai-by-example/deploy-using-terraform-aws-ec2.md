---
id: deploy-using-terraform-aws-ec2
title: Deploy to AWS using Digital.ai Deploy and Terraform
product:
  - deploy
  - release
category:
  - Digital.ai by Example
subject:
  - Amazon EC2
tags:
  - aws
  - terraform
order: 100
---

Here's a video walk-through.

[![](http://img.youtube.com/vi/zaveYy86v7I/0.jpg)](http://www.youtube.com/watch?v=zaveYy86v7I 'How to: Deploy to AWS EC2 Using Digital.ai Deploy and Terraform')

## Before you begin

This how-to demonstrates how you can leverage the Digital.ai Deploy application's DevOps as code capabilities and deploy applications to Amazon Web Services (AWS) using Terraform.

This tutorial involves working with a variety of tools and technologies such as Docker, Docker Compose, Digital.ai Deploy, AWS (EC2 and RDS), Terraform, Digital.ai Deploy's DevOps as code repositories (YAML files), and so on. You can perform this task by simply following the instructions. However, being familiar with these tools and technologies can help you considerably when you try this out in your test environment.

## What's the objective?

Deploy a web application to AWS EC2 and RDS using Digital.ai Deploy and Terraform scripts.

## What do you need?

- A Linux server (with root and Internet access)
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- An AWS account

## What do you have?

We have created a [xebialabs-community/how-to](https://github.com/xebialabs-community/howto) GitHub repository that hosts the following.

- A [demo PetPortal web application](https://github.com/xebialabs-community/howto/tree/master/demoApps/PetPortalApp) for use with this example deployment
- A `howto/terraform/PetPortalHosts/build.sh` script to create Deploy configuration items
- Terraform scripts to provision resources to AWS EC2 and RDS
- A `howto/demoApps/PetPortalApp/build.sh` script to create a deployment package of the demo web application (PetPortal)
- A `howto/terraform/PetPortalHosts/startDemo.sh` script
- A `howto/terraform/PetPortalHosts/docker-compose.yml` file

## How does it work?

Here's a high-level overview of how this works. A more elaborate step-by-step is available later in this topic.

![Deployment summary](/docs/assets/aws-ec2-flowchart.png)

### Step 1—Prepare your setup

1. You set out by installing the Digital.ai Deploy v10.0 Docker image.
2. Set up:
   - `secrets.xlvals` file—AWS secrets and RDS database password.
   - `values.xlvals` file—values for AWS variables (such as `ssh_key`, `ami`, `aws_region`, and `ami_size`). For more information, see [values.xlvals](/deploy/how-to/manage-values-devops-as-code/).
3. Copy the AWS `ssh-key.pem` file to the `howto/terraform/PetPortalHosts/xebialabs/artifacts/ssh-key/` directory.
4. Run the `howto/terraform/PetPortalHosts/startDemo.sh` script. This script:
   - Downloads the `terraform_0.14.7_linux_amd64.zip` file and installs (unzip) the same.
   - Runs the `docker-compose.yml`.

     The `docker-compose.yml` file:

     - Downloads and installs the officially supported Digital.ai Deploy version 10.0 Docker image (includes all relevant plugins).

       **Note:** The Digital.ai Deploy v10.0 Docker image comes with a 7 day free trial license, which you can use to evaluate this example deployment exercise.

     - Mounts the Terraform v0.14.7 volume.

### Step 2—Create the Configuration Items using the DevOps As Code YAML

Run the `howto/terraform/PetPortalHosts/build.sh` script. This script:

- Downloads and installs the XL CLI
- Creates the Application, Environment and Infrastructure configuration items—using the DevOps as code YAML files—in Digital.ai Deploy.

### Step 3—Provision resources to AWS EC2 and RDS using Terraform

Log on to Digital.ai Deploy and provision the AWS resources—Deploy uses the Terraform scripts to provision resources such as a web server (AWS EC2), a Jboss application server (AWS EC2) and an RDS MySQL database to AWS.

### Step 4—Create a deployment package

Run the `howto/demoApps/PetPortalApp/build.sh` script to create a deployment package of the PetPortal application.

### Step 5—Deploy the PetPortal application to AWS EC2

1. Start a deployment in Digital.ai Deploy and deploy the PetPortal application to the AWS EC2 instances.
2. Get the web server address and open the URL in a browser to verify the PetPortalApp's deployment.

## DevOps As Code YAML files and Terraform AWS modules

**Tip:** This section discusses the [Terraform AWS Modules](https://registry.terraform.io/namespaces/terraform-aws-modules) and Deploy's [DevOps as code YAML files](/release/concept/get-started-with-devops-as-code.html). Skip this section if you are familiar with Terraform AWS Modules and Deploy's DevOps as code feature.

### DevOps As Code YAML files

The [xebialabs-community/how-to](https://github.com/xebialabs-community/howto) GitHub repository consists of a `howto/terraform/PetPortalHosts/xebialabs.yaml` file that imports a set of as code YAML files as illustrated in the following code snippet.

`howto/terraform/PetPortalHosts/xebialabs.yaml`:

```
apiVersion: xl/v1
kind: Import
metadata:
  imports:
    - xebialabs/xld-infrastructure.yaml
    - xebialabs/xld-environment.yaml
    - xebialabs/petportalhosts.yaml
    - xebialabs/ssh-key.yaml
```

The `howto/terraform/PetPortalHosts/build.sh` script calls the `howto/terraform/PetPortalHosts/xebialabs.yaml` file, which in turn imports these YAML files in Step 2 (of the `How Does It Work?` section) as discussed earlier and are used to create the Application, Environment and Infrastructure configuration items in Digital.ai Deploy.

### Terraform AWS Modules

The approach here is to follow one of the best practices of having individual [Terraform AWS Modules](https://registry.terraform.io/namespaces/terraform-aws-modules) to create resources on AWS and then calling those modules from the `main.tf` configuration file in Step 3 (of the `How Does It Work?` section) as discussed earlier.

The [xebialabs-community/how-to](https://github.com/xebialabs-community/howto) GitHub repository consists of:

- `howto/terraform/PetPortalHosts/xebialabs/artifacts/aws.ec2_instance/main.tf`—the main Terraform configuration file
- `howto/terraform/PetPortalHosts/xebialabs/artifacts/aws.ec2_instance/appserver/appserver.tf`—the Terraform module to provision an EC2 application server resource
- `howto/terraform/PetPortalHosts/xebialabs/artifacts/aws.ec2_instance/webserver/webserver.tf`—the Terraform module to provision an EC2 web server resource
- `howto/terraform/PetPortalHosts/xebialabs/artifacts/aws.ec2_instance/db/db.tf`—the Terraform module to create an RDS MySQL database server resource

Here's a look at the `main.tf` Terraform configuration file.

```
# Terraform configuration
provider "aws" {
  region = "{{aws_region}}"
  access_key = "{{AWS_ACCESS_KEY}}"
  secret_key = "{{AWS_SECRET_KEY}}"
}

##########################################################################
#  Webserver
#
module "webserver" {
    source = "./webserver"
    my-ami = var.ami
    my-sg = var.my-sg
    ami-size = var.ami-size
    ssh-key  = var.ssh-key
}
##########################################################################
#  Appserver
#
module "appserver" {
    source   = "./appserver"
    my-ami   = var.ami
    my-sg    = var.my-sg
    ami-size = var.ami-size
    ssh-key  = var.ssh-key
}

##########################################################################
#  RDS Database
#
module "db" {
    source = "./db"
    my-sg = var.my-sg
}
© 2021 GitHub, Inc.
```

## Deploy step-by-step

1. Prepare your Digital.ai Deploy Linux host.
   1. Install [Docker](https://docs.docker.com/engine/install/) if not done already.
   2. Install [Docker Compose](https://docs.docker.com/compose/install/) if not done already.
2. Clone the [xebialabs-community/how-to](https://github.com/xebialabs-community/howto) GitHub repository. Suppose you clone the repository to the user's home directory (for example, `/home/john`).
3. Log on to your AWS account and gather the `AWSAccessKeyId` and `AWSSecretKey`.

   Create an access key if you do not have one already. For more information, see [Managing access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey).

   **Important:** It is recommended to download and save the AWS access key file immediately after creating the access key as you cannot retrieve your Secret Access Key later.

   ![Aws access key](/docs/assets/aws-ec2-03.png)

4. Add your AWS account secrets and the database password to the `howto/terraform/PetPortalHosts/xebialabs/secrets.xlvals` file.

   ![secrets.xlvals](/docs/assets/aws-ec2-04.png)

5. Add values for AWS variables to the `howto/terraform/PetPortalHosts/xebialabs/values.xlvals` file.

   ![values.xlvals](/docs/assets/aws-ec2-05.png)

6. Copy your AWS `ssh-key.pem` public key file to the `howto/terraform/PetPortalHosts/xebialabs/artifacts/ssh-key/` directory.

7. Go to `howto/terraform/PetPortalHosts` directory.
   ```
   cd /home/<usr>/howto/terraform/PetPortalHosts
   ```
8. Run the `startDemo.sh` script.
   ```
   ./startDemo.sh
   ```
9. Press `y` if prompted for an input—this installs Terraform v0.14.7.

   **Note:** Wait for Digital.ai Deploy application to start. Use the `docker-compose logs -f xl-deploy` command and look for the `point your browser to...` output to show up.

   ![Digital.ai Deploy installation](/docs/assets/aws-ec2-06.png)

10. Create Deploy configuration items—run the `howto/terraform/PetPortalHosts/build.sh` script.

    ```
    ./build.sh
    ```

    ![Create Deploy Configuration Items](/docs/assets/aws-ec2-07.png)

    The Application, Environment and Infrastructure configuration items are now created.

    You can now verify that the values you passed via the `values.xlvals` file are available as input variables in Deploy.

    ![Input variables](/docs/assets/aws-ec2-11.png)

11. Log on to Deploy.
    - `http://deploy-server-domain:4516`
    - Username: `admin`
    - Password: `admin`
12. Deploy the `PetPortalHosts/servers/1.0.0` application to the `aws_terraform` environment.

    1. Select `PetPortalHosts/servers/1.0.0`, select the `aws_terraform` environment, and click **Continue**.

       ![Select environment](/docs/assets/aws-ec2-08.png)

    2. Preview the deployment, if required (click **Preview**), and click **Deploy**.

       ![Provision servers to AWS](/docs/assets/aws-ec2-09.png)

    3. Wait for the deployment process to complete.

       ![Provisioning in progress](/docs/assets/aws-ec2-10.png)

       You now have the resources provisioned to AWS and a `TEST` environment created to deploy your application.

       ![Provision done](/docs/assets/aws-ec2-13.png)

    4. Click **Finish**.

13. You can now log on to AWS and verify the provisioned servers.

    ![AWS EC2 servers](/docs/assets/aws-ec2-14.png)

    ![RDS DB instance](/docs/assets/aws-ec2-15.png)

14. Select the `TEST` environment and add the following containers from the drop-down list:

    - Infrastructure/aws/TEST/webserver/apache
    - Infrastructure/aws/TEST/appserver/jboss
    - Infrastructure/aws/TEST/appserver/mysqldb

      ![Add the containers to the TEST environment](/docs/assets/aws-ec2-16.png)

15. Create a deployment package—run the `howto/demoApps/PetPortalApp/build.sh` script.

    ```
    cd /home/<usr>/howto/demoApps/PetPortalApp
    ./build.sh
    ```

    You now have a deployable version of the PetPortal application.

    ![Deployable PetPortal application package](/docs/assets/aws-ec2-17.png)

16. Click **Start a deployment**.
17. Select, drag, and drop the `Applications/PetPortalApps/PetPortal/1.0.0` node from the **Packages** pane.
18. Select, drag, and drop the `Environments/aws/TEST` node from the **Environments** pane.

    ![Deploy the PetPortal application to the TEST environment](/docs/assets/aws-ec2-20.png)

19. Click **Deploy** and wait for the deployment process to complete.

    ![Deploy the PetPortal application](/docs/assets/aws-ec2-21.png)

20. Click **Finish**.
21. Open the `Infrastructure/aws/TEST/webserver` node from the left pane and copy the web server URL.

    ![Web server address](/docs/assets/aws-ec2-19.png)

22. Open the URL in a browser to verify the successful deployment of the PetPortalApp.

    ![PetPortal application deployed successfully](/docs/assets/aws-ec2-22.png)

## Undeploy your PetPortal application and deprovision your AWS resources

Finally, you can also undeploy the PetPortal application and deprovision your AWS resources.

1. Select the **Environments > aws > TEST > PetPortal** node and select **Undeploy** from the shortcut menu.

   ![Undeploy the PetPortal application](/docs/assets/aws-ec2-23.png)

2. Click **Undeploy**.

   ![Undeploy the PetPortal application](/docs/assets/aws-ec2-24.png)

   ![Undeploy the PetPortal application](/docs/assets/aws-ec2-25.png)

3. Click **Finish**.
4. Open **Environments > TEST**, click **Edit Properties**, and delete the containers you added in Step 14 earlier.
5. Select the **Environments > Amazon > aws_terraform > servers (1.0.0)** node and select **Undeploy** from the shortcut menu.

   ![Undeploy the PetPortal servers](/docs/assets/aws-ec2-26.png)

6. Click **Undeploy**.

   ![Undeploy the PetPortal servers](/docs/assets/aws-ec2-27.png)

   ![Undeploy the PetPortal servers](/docs/assets/aws-ec2-28.png)

7. Click **Finish**.

## Quick links and further reading

- [xebialabs-community/how-to GitHub repository](https://github.com/xebialabs-community/howto)
- [Install Docker](https://docs.docker.com/engine/install/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)
- [Get started with Digital.ai Deploy's DevOps as code](/deploy/concept/get-started-with-devops-as-code.html)
- [Terraform AWS Modules](https://registry.terraform.io/namespaces/terraform-aws-modules)
