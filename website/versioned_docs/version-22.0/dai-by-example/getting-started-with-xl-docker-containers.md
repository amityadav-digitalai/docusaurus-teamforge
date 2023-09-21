---
id: getting-started-with-xl-docker-containers
title: Run the Docker containers with Docker Compose
product:
  - deploy
  - release
category:
  - Digital.ai by Example
subject:
  - Docker Containers
tags:
  - docker
  - containers
  - docker-compose
order: 300
---

This topic guides you to run the Docker Containers with Docker Compose for both Digital.ai Release and Digital.ai Deploy.

- To run the Docker image with Digital.ai Release, see [Docker images for Release](/release/docker/docker-images-for-xl-release.html)
- To run the Docker image with Digital.ai Deploy, see [Docker images for Deploy](/deploy/docker/docker-images-for-xl-deploy.html)

Version-specific Docker images for Digital.ai Release and Digital.ai Deploy are published to Docker Hub:

- [Release](https://hub.docker.com/r/xebialabs/xl-release/)
- [Deploy](https://hub.docker.com/r/xebialabs/deploy/)

## Run the containers using the `docker-compose.yaml` file

To start both Digital.ai Deploy and Digital.ai Release with a persistent setup:

1.  Download the Docker Compose file using the following command:

        $ curl https://raw.githubusercontent.com/xebialabs/xl-docker-images/master/docker-compose-example/docker-compose.yaml > docker-compose.yaml

1.  Open the `docker-compose.yaml` file and change the ADMIN_PASSWORD for both servers to a secure password.
1.  Run the file with Docker Compose:

        $ docker-compose up -d

1.  Access Release at `http://localhost:5516/` and Deploy at `http://localhost:4516/`.

You can now remove the passwords from the `docker-compose.yaml` file.

You must provide a valid license before you can log in. Browse to the above URLs and paste the licenses for the appropriate product. If you do not have a license yet, apply for an [Release trial license](https://info.digital.ai/release-trial-free.html) or an [Deploy trial license](https://info.digital.ai/deploy-trial-free.html) on the XebiaLabs web site.

## Set up Digital.ai Release and Digital.ai Deploy using Docker Compose

If you want to use Digital.ai Deploy and Digital.ai Release together, both servers need to be able identify each other. When you start a single instance of a Docker container, the network is not configured to allow the two servers to identify each other. To link the instances of the two servers, you can use Docker Compose. This also allows you to start both containers at the same time and move all command line options into a file.

1.  Create a file called `docker-compose.yaml` and copy the following contents inside:

        xld:
          image: xebialabs/xl-deploy:8.2
          container_name: xld
          ports:
           - "4516:4516"

        xlr:
          image: xebialabs/xl-release:8.2
          container_name: xlr
          ports:
           - "5516:5516"
          links:
           - xld

1.  Start both containers with this single command:

           $ docker-compose up -d

1.  Both containers will start and the password can be viewed using these commands:

           $ docker logs xlr
           $ docker logs xld

1.  Log in to Digital.ai Release with the admin password. You can configure the Digital.ai Deploy server under **Configuration** > **Connections** of the navigation pane. Use the following settings:

    ![image](/docs/assets/xld-shared-configuration-docker-compose.png)

> **Note:** You can run Deploy or Release containers individually by modifying the `docker-compose.yaml` file to contain only the code specific for each product.
