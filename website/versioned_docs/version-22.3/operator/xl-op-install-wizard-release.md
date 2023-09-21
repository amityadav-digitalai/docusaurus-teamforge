---
id: xl-op-install-wizard-release
title: Install Wizard for Digital.ai Release and Remote Runner
hide_table_of_contents: false
product:
  - release
  - xl-platform
category:
  - Install or Upgrade on Kubernetes
subject:
  - Install Wizard
tags:
  - install
  - upgrade
  - operator
  - kubernetes
  - release
  - remote runner
since:
  - 22.3
order: 2000
---

- Here's a list of questions that you would have to answer to install Digital.ai Deploy or Release or Remote Runner using the [xl kube install](/xl-platform/operator/xl-kube.html) command.
- While some of the following questions are common for Deploy or Release or Remote Runner, some are relevant only for Deploy or Release or Remote Runner and that has been called out in the descriptions accordingly.
- You must select one of the available options for some of the questions.
- Use the arrow keys to move up or down and press enter to select an option.

:::tip
We highly recommend you to go through the [xl kube workshop](https://github.com/xebialabs/xl-kube-workshop) to gain a comprehensive understanding on how to install or upgrade Digital.ai Deploy or Release or Remote Runner on a kubernetes cluster and how it can benefit you.
:::

## Installation Wizard

Here's a list of questions that you would have to answer to install Digital.ai Release or Remote Runner using the [xl kube install](/xl-platform/operator/xl-kube.html) command.

Here's the list of questions

### Confirm the kubectl Context

<!-- ? Following kubectl context will be used during execution: <kubectl-context/username>? -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Following kubectl context will be used during execution: `&lt;kubectl-context/username&gt;`? (Y/n)</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">kubectl current context</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">kubectl current context</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Confirm the kubectl context to proceed. </td>
  </tr>
</tbody>
</table>

### Choose a Kubernetes Platform

<!-- ? Select the Kubernetes setup where the Digital.ai Devops Platform will be installed, updated or cleaned: -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Select the Kubernetes setup where the Digital.ai Devops Platform will be installed, updated or cleaned:</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">Openshift [Openshift]<br />AWSEKS [AWS EKS]<br />PlainK8s [Plain multi-node K8s cluster]<br />AzureAKS [Azure AKS]<br />GoogleGKE [Google Kubernetes Engine]</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">Openshift [Openshift]</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">You must have your cluster ready before you select an answer for this prompt. </td>
  </tr>
</tbody>
</table>

### Choose a Kubernetes Namespace

:::info
If you want to enable the TLS protocol in your cluster, you must have the TLS secret created in the namespace before you start the installation or upgrade. This means that you must have created the namespace and the TLS secret already. Use the same namespace when you answer this prompt.
:::

<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Do you want to use an custom Kubernetes namespace (current default is <i>digitalai</i> ): [? for help] (y/N)</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">digitalai</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type the name of a custom namespace where you want to install or upgrade Deploy or Release or go with the default namespace, which is <i>digitalai</i>.<br />If you are going to enable the TLS protocol in your cluster, you must have created the namespace and the TLS secret already. Use the same namespace where you have the TLS secret created.</td>
  </tr>
</tbody>
</table>

### Choose the Product to Install

<!-- ? Product server you want to perform install for [Use arrows to move, enter to select, type to filter, ? for more help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Product server you want to perform install for [Use arrows to move, enter to select, type to filter, ? for more help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">daiRelease [Digital.ai Release]<br />daiDeploy [Digital.ai Deploy]<br />dai-release-runner [Remote Runner for Digital.ai Release]</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">daiRelease [Digital.ai Release]</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Select a product—Digital.ai Release or Digital.ai Deploy or Remote Runner for Digital.ai Release</td>
  </tr>
</tbody>
</table>

> **Important**: The following prompt (**Select Type of Image Registry**) is specific to installing **Remote Runner** and will not be available when you install **Release**.

### Select Type of Image Registry

<!-- ? Select type of image registry: -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">Select type of image registry (current default is <i>default</i>): [? for help] (xebialabs)</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">default</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type the image repository. It is recommended to go with the default, which is <i>xebialabs</i>. This is specific to Remote Runner.</td>
  </tr>
</tbody>
</table>

### Enter the Repository Name

<!-- ? Enter the repository name (eg: &lt;repositoryName&gt; from &lt;repositoryName&gt;/&lt;imageName&gt;:&lt;tagName&gt;): [? for help] (xebialabs) -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Enter the repository name (eg: &lt;repositoryName&gt; from &lt;repositoryName&gt;/&lt;imageName&gt;:&lt;tagName&gt;): [? for help] (xebialabs)</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">xebialabs</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type the repository name. It is recommended to go with the default, which is <i>xebialabs</i></td>
  </tr>
</tbody>
</table>

### Enter the Image Name

<!-- ? Enter the image name (eg: &lt;imageName&gt; from &lt;repositoryName&gt;/&lt;imageName&gt;:&lt;tagName&gt;): [? for help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Enter the image name (eg: &lt;imageName&gt; from &lt;repositoryName&gt;/&lt;imageName&gt;:&lt;tagName&gt;): [? for help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">(xl-release)<br />(xl-deploy)<br />(xlr-remote-runner)</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">(xl-release) or (xl-deploy) or (xlr-remote-runner)<br /><br />Depending on the product you chose to install earlier, the default value would either be xl-release or xl-deploy or xlr-remote-runner for Digital.ai Release, Deploy, and Remote Runner respectively.</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type the name of the image you want to use for installation.</td>
  </tr>
</tbody>
</table>

### Enter the Image Tag

<!-- ? Enter the image tag (eg: &lt;tagName&gt; from &lt;repositoryName&gt;/&lt;imageName&gt;:&lt;tagName&gt;): [? for help] -->

The `xl kube install` and `xl kube upgrade` wizards let you go with the default (latest) docker image tags available when you install or upgrade Digital.ai Deploy or Release or Remote Runner. However, here are the Docker Hub links to verify all the the available image tags.

- [Digital.ai Deploy Operator Image](https://hub.docker.com/r/xebialabs/deploy-operator/tags)
- [Digital.al Release Operator Image](https://hub.docker.com/r/xebialabs/release-operator/tags)
- [Digital.ai Deploy Image](https://hub.docker.com/r/xebialabs/xl-deploy/tags)
- [Digital.ai Release Image](https://hub.docker.com/r/xebialabs/xl-release/tags)
- [Digital.ai Remote Runner](https://hub.docker.com/r/xebialabs/xlr-remote-runner/tags)
- [Digital.ai Deploy Task Engine Image](https://hub.docker.com/r/xebialabs/deploy-task-engine/tags)
- [Digital.ai Deploy Central Configuration Image](https://hub.docker.com/r/xebialabs/central-configuration)

<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Enter the image tag (eg: &lt;tagName&gt; from &lt;repositoryName&gt;/&lt;imageName&gt;:&lt;tagName&gt;): [? for help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">The latest release available in the repository, for example 23.1.0</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type the product version number you want to install, for example, 23.1.0 or 22.3.0 or 0.1.34.</td>
  </tr>
</tbody>
</table>

> **Important**: The next 3 prompts are specific to installing **Remote Runner** and will not be available when you install **Release**.

### Enter the Remote Runner Helm Chart path

<!-- ? Enter the Remote Runner Helm Chart path (URL or local path): -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Enter the Remote Runner Helm Chart path (URL or local path): [? for help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Enter the Helm chart path of the Remote Runner. This is specific to Remote Runner.</td>
  </tr>
</tbody>
</table>

### Enter the Release URL used by Remote Runner

<!-- ? Enter the Release URL that will be used by remote runner: -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Enter the Release URL that will be used by the remote runner: [? for help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Enter the Release URL that will be used by remote runner. This is specific to Remote Runner.</td>
  </tr>
</tbody>
</table>

### Enter the Release Token used by Remote Runner

<!-- ? Enter the Release Token that will be used by remote runner: -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Enter the Release Token that will be used by remote runner: [? for help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Enter the Release Token that will be used by remote runner. This is specific to Remote Runner.</td>
  </tr>
</tbody>
</table>

### Enter the Release Server Replica Count

<!-- ? Enter the release server replica count: [? for help] (3) -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Enter the release server replica count: [? for help] (3)</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">3</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type the number of Release server replicas you want. </td>
  </tr>
</tbody>
</table>

### Enter the PVC Size for Release

<!-- ? Enter PVC size for Release (Gi): [? for help] (8) -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Enter PVC size for Release (Gi): [? for help] (8)</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">8</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type the persistent volume claim (PVC) size for Release. </td>
  </tr>
</tbody>
</table>

### Select Access Modes

<!-- ? Select between supported Access Modes:  [Use arrows to move, enter to select, type to filter, ? for more help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Select between supported Access Modes:  [Use arrows to move, enter to select, type to filter, ? for more help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">ReadWriteOnce [ReadWriteOnce]<br />ReadWriteMany [ReadWriteMany]</td>
  </tr>
  <tr>
    <td colspan="2">Default value for Release</td>
    <td colspan="5">ReadWriteMany [ReadWriteMany]</td>
  </tr>
  <tr>
    <td colspan="2">Default value for Deploy</td>
    <td colspan="5">ReadWriteOnce [ReadWriteOnce]</td>
  </tr>  
  <tr>
    <td>Remarks</td>
    <td colspan="6">Select the access mode. </td>
  </tr>
</tbody>
</table>

> **Tip**: Before you enable HTTP2 for Release, you must understand its prerequisites. For detailed information and understanding, read through the [Enable HTTP2 to Install Digital.ai Release on Kubernetes Cluster](/xl-platform/operator/xl-op-install-release-enable-http2.html) page.

> **Important**: If you want to enable the HTTP2, you must create the keystore file in pkcs12 (**p12**) format before you start the installation or upgrade. Additionally, you must create a secret, if you are going to use the secret to provide the keystore file. For more information, see the **Configuring Keystore for Release Server to Enable HTTP2** section in [Enable HTTP2 to Install Digital.ai Release on Kubernetes Cluster](/xl-platform/operator/xl-op-install-release-enable-http2.html) page.

### Enable HTTP2

<!-- ? Do you want to enable http2 for release:  [? for help] (y/N) -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Do you want to enable http2 for release:  [? for help] (y/N) </th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">No</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Select Yes to enable HTTP2 or No otherwise. The default is No. If you want to enable HTTP2, keep the server keystore secret handy to enter at the next prompt.<br />For the Release server to start with HTTP2, an external ingress type needs to be selected. Additionally, an IngressClass resource must be configured to handle HTTP2 backend of the Release server.</td>
  </tr>
</tbody>
</table>

> **Important**: The next 4 prompts are enabled when you enable _Http2_ to install **Release**.

### Select Source of the Keystore

<!-- ? Select source of the keystore for the server: [Use arrows to move, type to filter, ? for more help] -->

Before you complete this step, see the **Configuring Keystore for Release Server to Enable HTTP2** section in [Enable HTTP2 to Install Digital.ai Release on Kubernetes Cluster](/xl-platform/operator/xl-op-install-release-enable-http2.html) page.

<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6"> Select source of the keystore for the server: [Use arrows to move, type to filter, ? for more help] </th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">file [Path to the keystore file (the file can be in the raw format or base64 encoded)]<br />editor [Copy/Paste the keystore to editor (the content needs to be base64 encoded)]<br />secret [Generic Secret containing keystore file with key as ssl-keystore.p12].</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">file [Path to the keystore file (the file can be in the raw format or base64 encoded)]</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">If you have an existing keystore file in p12 format, you can either choose to type in the path of the Release server keystore file.<br />Copy and paste the base64 encoded string of keystore file in the editor.<br />Select the generic secret created for the `ssl-keystore.p12` file</td>
  </tr>
</tbody>
</table>

### Keystore File for the Server

<!-- ? Provide keystore file for the server: [? for help] -->

> **Important**: The keystore file must be in pkcs12 **(p12)** format.

<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Provide keystore file for the server: [? for help] </th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">A keystore file for the server is used to securely store the private keys. Here, it indicates that the keystore file for the server is received.</td>
  </tr>
</tbody>
</table>

> **Tip**: The **keystore password** and **keystore key passphrase** are generated after running the `openssl` command. Keep these handy. For more information, see the see the **Create Keystore and Certificate Using OpenSSL** section in [Enable HTTP2 to Install Digital.ai Release on Kubernetes Cluster](/xl-platform/operator/xl-op-install-release-enable-http2.html) page.

### Server Keystore Password

<!-- ? Provide the server keystore password: [? for help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Provide the server keystore password: [? for help] </th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">A server keystore password is used to protect the keystore file and its contents from unauthorized access. Here, enter the server keystore password.</td>
  </tr>
</tbody>
</table>

### Server Keystore Key Passphrase

<!-- ? Provide the server keystore key passphrase: [? for help] -->

> **Note**: This step is optional.

<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Provide the server keystore key passphrase: [? for help] </th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">A server keystore key passphrase is required only if provided during keystore file creation. Here, enter the server keystore key passphrase.</td>
  </tr>
</tbody>
</table>

### Select Ingress Type

<!-- ? Select between supported ingress types:  [Use arrows to move, enter to select, type to filter, ? for more help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Select between supported ingress types:  [Use arrows to move, enter to select, type to filter, ? for more help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>No</td>
    <td>No</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">nginx [NGINX]<br />haproxy [HAProxy]<br />external [External - IngressClass resource should already exist]<br />none [None - Ingress will not be set up during installation]</td>
  </tr>
  <tr>
    <td colspan="2">Default value for Release</td>
    <td colspan="5">nginx [NGINX]</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Select one of the ingress controllers—nginx or haproxy. <br />You can also choose not to set up the ingress controller at the time of installation or choose to use an external ingress controller.<br />When HTTP2 is enabled, select external. Note that, the IngressClass resource must be available to handle HTTP2 backends.<br />No ingress controller needed if you were to use an OpenShift cluster.&nbsp;&nbsp;</td>
  </tr>
</tbody>
</table>

### Enable TLS/SSL

<!-- ? Do you want to enable an TLS/SSL configuration (if yes, requires existing TLS secret in the namespace): [? for help] (y/N) -->

> **Important**: If you want to enable the TLS protocol in your cluster, you must have the TLS secret created in the namespace before you start the installation or upgrade. This means that you must have created the namespace and the TLS secret already. Use the same TLS secret when you answer this prompt.

<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Do you want to enable an TLS/SSL configuration (if yes, requires existing TLS secret in the namespace): [? for help] (y/N)</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>No</td>
    <td>No</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">No</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type Yes to enable TLS/SSL or No otherwise. The default is No. If you want to enable TLS/SSL, keep the TLS secret handy to enter at the next prompt. </td>
  </tr>
</tbody>
</table>

### Enter the Domain Name

<!-- ? Provide DNS name for accessing UI of the server: [? for help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Provide DNS name for accessing UI of the server: [? for help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type the domain name for accessing the Digital.ai Deploy or Release server. For example, xlr-operator.apps.opcluster.p1.openshiftapps.com</td>
  </tr>
</tbody>
</table>

### Enter the Administrator Password

<!-- ? Provide administrator password: [? for help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Provide administrator password: [? for help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">Randomly generated administrator password. </td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">A default password is generated randomly and you can use it if you choose to, in which case you must copy the password and keep it handy.<br />You can also type your own administrator password at the prompt. </td>
  </tr>
</tbody>
</table>

### Select the OIDC Configuration

<!-- ? Type of the OIDC configuration:  [Use arrows to move, enter to select, type to filter, ? for more help] -->
<table >
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Type of the OIDC configuration:  [Use arrows to move, enter to select, type to filter, ? for more help]</th>
  </tr>
</thead>
<tbody >

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>  
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">external [External OIDC Configuration]<br />identity-service [Identity Service Configuration]<br />embedded [Embedded Keycloak Configuration]<br />no-oidc [No OIDC Configuration]</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">no-oidc [No OIDC Configuration]</td>
  </tr>
  <tr >
    <td>Remarks</td>
    <td colspan="6" >Choose one of the options based on the OIDC authentication setup you have or want to have.</td>
  </tr>  
</tbody>
</table>

For more information, see [Select the Type of OIDC Configuration](/xl-platform/operator/xl-op-install-oidc-configuration.html).

### Enter the Operator Image to Use

<!-- ? Enter the operator image to use (eg: &lt;repositoryName&gt;/&lt;imageName&gt;:&lt;tagName&gt;): [? for help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Enter the operator image to use (eg: &lt;repositoryName&gt;/&lt;imageName&gt;:&lt;tagName&gt;): [? for help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">The latest image from the xebialabs repository, for example, (xebialabs/release-operator:22.3.0-openshift)</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type the Kubernetes Operator Docker Hub image name you want to use. <br />By default, the latest image for the product—Deploy or Release—which you install—would be used.<br />Example: (xebialab/release-operator:22.3.0-openshift), if you are installing Digital.ai Release on OpenShift. <br />However, you can change it to an older image if required. </td>
  </tr>
</tbody>
</table>

### Enter the Product License

<!-- ? Select source of the license:  [Use arrows to move, enter to select, type to filter, ? for more help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Select source of the license:  [Use arrows to move, enter to select, type to filter, ? for more help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">file [Path to the license file (the file can be in clean text or base64 encoded)]<br />editor [Copy/Paste the license to editor (the text can be in clean text or base64 encoded)]</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">file [Path to the license file (the file can be in clean text or base64 encoded)]</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">You can either choose to type in the path to the license file (for example, `/home/jmahendran/xl-release-license.lic`) or choose to copy and paste the license information in the editor. <br />The license file can be in plain text format or in base64 encoded format.</td>
  </tr>
</tbody>
</table>

### Select the Java Repository Keystore

<!-- ? Select source of the repository keystore:  [Use arrows to move, enter to select, type to filter, ? for more help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Select source of the repository keystore:  [Use arrows to move, enter to select, type to filter, ? for more help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">generate [Generate the repository keystore during installation (you need to have keytool utility installed in your path)]<br />file [Path to the repository keystore file (the file can be in the raw format or base64 encoded)]<br />editor [Copy/Paste the repository keystore to editor (the content needs to be base64 encoded)]</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">generate [Generate the repository keystore during installation (you need to have keytool utility installed in your path)]</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Select if you want to generate a new JDK keystore file or use an existing one. The default is to generate a new JDK keystore. <br />If you have an existing keystore file, you can either choose to type in the path to the repository keystore file or copy and paste the keystore file in the editor. </td>
  </tr>
</tbody>
</table>

### Enter the Keystore Passphrase

<!-- ? Provide keystore passphrase: [? for help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Provide keystore passphrase: [? for help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">A randomly generated password. </td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type a password for the JDK repository keystore. <br />A random password is auto-generated by default. <br />Copy the auto-generated password and keep it safe if you were to use the auto-generated password. </td>
  </tr>
</tbody>
</table>

### Select the Storage Class

<!-- ? Provide storage class for the server:  [Use arrows to move, enter to select, type to filter, ? for more help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Provide storage class for the server:  [Use arrows to move, enter to select, type to filter, ? for more help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">As set up by the cluster administrator</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">As set up by the cluster administrator</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Select a storage class that you want to use for Digital.ai Deploy or Release or Remote Runner.</td>
  </tr>
</tbody>
</table>

### Create New PostgreSQL Server? Or Use Existing One?

<!-- ? Do you want to install a new PostgreSQL on the cluster: [? for help] (Y/n) -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Do you want to install a new PostgreSQL on the cluster: [? for help] (Y/n)</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">Yes</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type Yes to install a new PostgreSQL database server in your cluster or No to use an existing PostgreSQL server. <br />Keep the following information handy in case you want to use an existing PostgreSQL server:<br /><br />For Release:<br /><br />XLR_DB_URL: jdbc:postgresql://&lt;xlr-db-host&gt;:5432/&lt;xlr-database-name&gt;<br />XLR_DB_USER: &lt;xlr-username&gt;<br />XLR_DB_PASS: &lt;xlr-password&gt;<br />XLR_REPORT_DB_URL: jdbc:postgresql://&lt;xlr-report-db-host&gt;:5432/&lt;xl-report-database-name&gt;<br />XLR_REPORT_DB_USER: &lt;xl-report-username&gt;<br />XLR_REPORT_DB_PASS: &lt;xl-report-password&gt;<br /><br />For Deploy:<br />XL_DB_URL: jdbc:postgresql://&lt;xld-db-host&gt;:5432/&lt;xlr-database-name&gt;<br />XL_DB_USERNAME: &lt;xld-username&gt;<br />XL_DB_PASSWORD: &lt;xld-password&gt;<br /><br />Enter the external PostgreSQL server details at the following prompt.&nbsp;&nbsp;<br /><br />? Edit database external setup: [? for help] [Enter to launch editor]</td>
  </tr>
</tbody>
</table>

### Select the PostgreSQL Storage Class

<!-- ? Provide Storage Class to be defined for PostgreSQL:  [Use arrows to move, enter to select, type to filter, ? for more help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Storage Class to be defined for PostgreSQL:  [Use arrows to move, enter to select, type to filter, ? for more help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">As set up by the cluster administrator</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">As set up by the cluster administrator</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Select a storage class that you want to use for PostgreSQL. </td>
  </tr>
</tbody>
</table>

### Enter the PostgreSQL PVC size

<!-- ? Provide PVC size for PostgreSQL (Gi): [? for help] (8) -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Provide PVC size for PostgreSQL (Gi): [? for help] (8)</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">8</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type the persistent volume claim for PostgreSQL. The default is 8. </td>
  </tr>
</tbody>
</table>

### Create New RabbitMQ Server? Or Use Existing One?

<!-- ? Do you want to install a new RabbitMQ on the cluster: [? for help] (Y/n) -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Do you want to install a new RabbitMQ on the cluster: [? for help] (Y/n)</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">Yes</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type Yes to install a new RabbitMQ server in your cluster or No to use an existing RabbitMQ server. <br />Keep the following information handy in case you want to use an existing RabbitMQ server:<br /><br />For Release:<br />XLR_TASK_QUEUE_USERNAME: &lt;username&gt;<br />XLR_TASK_QUEUE_PASSWORD: &lt;password&gt;<br />XLR_TASK_QUEUE_NAME: &lt;queue-name&gt;<br />XLR_TASK_QUEUE_URL: &lt;queue-url&gt;<br /><br />For Deploy:<br />XLD_TASK_QUEUE_DRIVER_CLASS_NAME: &lt;driver-class-name&gt;<br />XLD_TASK_QUEUE_PASSWORD: &lt;password&gt;<br />XLD_TASK_QUEUE_URL: &lt;queue-url&gt;<br />XLD_TASK_QUEUE_USERNAME: &lt;username&gt;<br /><br /><br />Enter the external RabbitMQ server details at the following prompt.<br /><br />? Edit RabbitMQ external setup: [? for help] [Enter to launch editor]</td>
  </tr>
</tbody>
</table>

### Enter the RabbitMQ Replica Count

<!-- ? Replica count to be defined for RabbitMQ: [? for help] (3) -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Replica count to be defined for RabbitMQ: [? for help] (3)</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">3</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type the number of replicas you need for RabbitMQ server. </td>
  </tr>
</tbody>
</table>

### Select the RabbitMQ Storage Class

<!-- ? Storage Class to be defined for RabbitMQ:  [Use arrows to move, enter to select, type to filter, ? for more help] -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Storage Class to be defined for RabbitMQ:  [Use arrows to move, enter to select, type to filter, ? for more help]</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">As set up by the cluster administrator</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">As set up by the cluster administrator</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Select a storage class that you want to use for RabbitMQ. </td>
  </tr>
</tbody>
</table>

### Enter the RabbitMQ PVC Size

<!-- ? Provide PVC size for RabbitMQ (Gi): [? for help] (8) -->
<table>
<thead>
  <tr>
    <th>Prompt</th>
    <th colspan="6">? Provide PVC size for RabbitMQ (Gi): [? for help] (8)</th>
  </tr>
</thead>
<tbody>

  <tr>
    <td colspan="2" rowspan="2">Prompt valid for—platform</td>
    <td>EKS</td>
    <td>AKS</td>
    <td>GKE</td>
    <td>OpenShift on AWS</td>
    <td>Plain Multi-node Kubernetes<br />Cluster On-premise</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td colspan="2">Available values</td>
    <td colspan="5">NA</td>
  </tr>
  <tr>
    <td colspan="2">Default value</td>
    <td colspan="5">8</td>
  </tr>
  <tr>
    <td>Remarks</td>
    <td colspan="6">Type the persistent volume claim for RabbitMQ. The default is 8. </td>
  </tr>
</tbody>
</table>

Once you are done answering the questions, the installer provides a summary of the installation choices you made. Here's an example.

![1665217557157](/docs/assets/xl-op-install-wizard/1665217557157.png)

It then proceeds with the installation by applying the resources to the cluster and completes the installation of the product. Here's an example.

![1665217708304](/docs/assets/xl-op-install-wizard/1665217708304.png)
