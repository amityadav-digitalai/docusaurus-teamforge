---
id: xl-kube
title: XL Kube Command Reference
---

The `xl` command line tool provides a fast and straightforward method for provisioning Digital.ai Release or Deploy or Remote Runner using YAML files. The YAML files can include items such as releases, pipelines, applications, infrastructure, and target environments.

The XL CLI's `xl kube` command (available in XL CLI 22.3.0 or later versions) is used for installing or upgrading Digital.ai Deploy or Release or Remote Runner on Kubernetes environments.

## Download and Install the XL CLI

See [Install the XL CLI](/xl-platform/how-to/install-the-xl-cli.html).

## xl kube

- The `xl kube` command installs, upgrades, or cleans Digital.ai Deploy or Release or Remote Runner on a Kubernetes environment using the Operator.
- The `xl kube` command acts as an installation wizard, prompting you for values that it cannot determine on its own and providing reasonable default values for the remaining parameters. In other words, installing Digital.ai Deploy or Release or Remote Runner can be as simple as running the `xl kube install` or `xl kube upgrade` commands and answering a set of questions asked by the installation wizard along the way.
- This command uses the Operator blueprints at https://dist.xebialabs.com/public/xl-op-blueprints/ for installing or upgrading Digital.ai Deploy or Release or Remote Runner.

### Usage

```shell
xl kube [command] [flags]
```

### Available Commands

| Command | Description                                                                                                                                                                                                                             |
| :------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| check   | Check if the installation of Deploy or Release or Remote Runner was successful and collect troubleshooting information in case of errors                                                                                                |
| clean   | Remove Deploy or Release or Remote Runner and the associated resources from a Kubernetes cluster                                                                                                                                        |
| install | Install Deploy or Release or Remote Runner on a Kubernetes cluster. You need to have kubectl installed and configured for the target Kubernetes cluster.                                                                                |
| upgrade | Upgrade an existing installation of Deploy or Release or Remote Runner on a Kubernetes cluster. Supports upgrades of both Operator and Helm Chart installations. Running the command will generate new files in the `digitalai` folder. |

### Flags

| Flag         | Description                    |
| ------------ | ------------------------------ |
| `-h, --help` | Help for the `xl kube` command |

<!-- ### Global Flags

| Flag                                    | Description                                                            |
|-----------------------------------------|------------------------------------------------------------------------|
| `--blueprint-current-repository` string | Current active blueprint repository name                               |
| `--config` string                       | config file (default: $HOME/.xebialabs/config.yaml)                    |
| `-q, --quiet`                           | suppress all output, except for errors                                 |
| `-v, --verbose`                         | verbose output                                                         |
| `--xl-deploy-authmethod` string         | Authentication method to access the XL Deploy server (default "http")  |
| `--xl-deploy-password` string           | Password to access the XL Deploy server (default "admin")       Basic  |
| `--xl-deploy-url` string                | URL to access the XL Deploy server (default `http://localhost:4516/`)  |
| `--xl-deploy-username` string           | Username to access the XL Deploy server (default "admin")              |
| `--xl-release-authmethod` string        | Authentication method to access the XL Release server (default "http") |
| `--xl-release-password` string          | Password to access the XL Release server (default "admin")             |
| `--xl-release-url` string               | URL to access the XL Release server (default `http://localhost:5516/`) |
| `--xl-release-username` string          | Username to access the XL Release server (default "admin")             | -->

## xl kube install

- Use the `xl kube install` command for fresh installation of Digital.ai Deploy or Release or Remote Runner.
- Run the `xl kube install --help` command for more information about the available flags and usage examples for this command.
- The `xl kube install` command can install Digital.ai Deploy or Release or Remote Runner by taking you through a series of questions that you must answer to set the stage for your installation.
- See the installation instructions for different cloud platform to know more about the installation questions and answers for different cloud setups.

> **Important**: We highly recommend you to go through the [xl kube workshop](https://github.com/xebialabs/xl-kube-workshop) to gain a comprehensive understanding on how to install or upgrade Digital.ai Deploy or Release or Remote Runner on a kubernetes cluster and how it can benefit you.

### Usage

```
xl kube install [flags]
```

### Examples

- The command to start installation of Digital.ai Deploy or Release or Remote Runner.

  ```
  xl kube install
  ```

- The command to do the installation by answering only a few absolutely required questions.

  ```
  xl kube install --quick-setup
  ```

- The command to install Digital.ai Deploy or Release or Remote Runner using the downloaded xl-op-blueprints (in case https://dist.xebialabs.com/ is inaccessible from your site).

  ```
  xl kube install --local-repo ./xl-op-blueprints
  ```

- The command to install Deploy or Release or Remote Runner and wait for all the installed resources to be up and running. In this example, the installation times out with an error if the resources are not up and running after 5 minutes.

  ```
  xl kube install --wait-for-ready 5
  ```

- The command to install Digital.ai Deploy or Release or Remote Runner after cleaning all the existing resources in the target namespace of the Kubernetes cluster.

  ```
  xl kube install --clean-before
  ```

- The commands to do a dry run of the installation, validate the generated installation YAML files, and then apply the files later to the cluster to create the resources.

  ```
  xl kube install --dry-run
  xl kube install --files 20221004-101151
  ```

  - Use the `xl kube install --dry-run` command to generate the answers file, preview the installation, and if ok proceed with the `xl kube install --files <ref-run-id>` to apply the generated YAML files.
  - Once you run the `xl kube install --dry-run` command and answer the prompts, you can confirm the configuration as shown in the following illustration, for example.

    <!-- ![1665219509062](../../images/1665219509062.png) -->

  - Once you confirm, the answers file is generated and stored in the root `digitalai` folder.
  - For example, the `generated_answers_dai-release_digitalai_install-20221019-150930.yaml` file is generated in the `digitalai` folder.

    <!-- ![1666172495440](../../images/1666172495440.png) -->

  - The other YAML files are generated and stored in a folder called `digitalai/.../20221004-101151/kubernetes`.
  - You can also find that all the YAML apply steps were skipped as this was simply a dry run.
  - Once you verify the generated answers file, you can proceed with the `xl kube install --files` command to complete the installation.
  - For example, use the command `xl kube install --files 20221004-101151` to apply the files stored in the `.../20221004-101151/kubernetes` folder.
  - You can also use the `xl kube install --files 20221004-101151` command if you want to repeat the installation using the existing YAML files.

- The command to install Digital.ai Deploy or Release or Remote Runner using additional logging for debugging purposes.

  ```
  xl kube install --verbose
  ```

- Here's a command that you can use to install Digital.ai Deploy or Release or Remote Runner:
  - using the downloaded xl-op-blueprints files (`--local-repo`)
  - using the answers file you have from previous runs (`--answers`)
  - with additional logging (`--verbose`)
  - skipping any prompts during installation (it will skip any questions for overridden resources too) (`--skip-prompts`)

    ```
    xl kube install --local-repo ./xl-op-blueprints --verbose --skip-prompts --answers ./answers.yaml
    ```

### Flags

<table>
<thead>
  <tr>
    <th>Flag</th>
    <th>Decsription</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>-a, --answers string</td>
    <td>The file containing answers for the questions. When using an answers file, new yaml files will be generated from the installation blueprints</td>
  </tr>
  <tr>
    <td>-C, --clean-before</td>
    <td>Before install do clean of the resources from the cluster</td>
  </tr>
  <tr>
    <td>-D, --dry-run</td>
    <td>Create files only. Nothing will be applied to the Kubernetes cluster. Apply the generated files to the cluster by using the --files</td>
  </tr>
  <tr>
    <td>-f, --files string</td>
    <td>Do the installation using previously generated yaml files. Use the unique part of any generated answers file in the 'digitalai' folder as the argument. For example: "--files 20220824-153907". The yaml files from in the same folder will be applied to the cluster. Use this option after customizing the generated yaml files.</td>
  </tr>
  <tr>
    <td>-h, --help</td>
    <td>help for install</td>
  </tr>
  <tr>
    <td>-l, --local-repo string</td>
    <td>Provide local folder path where blueprints are located. By default a remote repository is used.</td>
  </tr>
  <tr>
    <td>-t, --log-since-time int32</td>
    <td>Collect Kubernetes logs for the specified time when waiting for resources or running the check command. Specify time in minutes. (default 60)</td>
  </tr>
  <tr>
    <td>-Q, --quick-setup</td>
    <td>Do the installation with the minimal amount of questions, using default values where possible.</td>
  </tr>
  <tr>
    <td>-S, --skip-prompts</td>
    <td>Skip confirmation prompts</td>
  </tr>
  <tr>
    <td>-o, --wait-for-operator uint</td>
    <td>Wait for availability of the Digital.ai operator that manages product installation. Specify the time to wait in minutes before timing out.</td>
  </tr>
  <tr>
    <td>-w, --wait-for-ready uint</td>
    <td>Wait for product deployments and pods to be started. Specify the time to wait in minutes before timing out.</td>
  </tr>
</tbody>
</table>

<!-- ### Global Flags

<table>
    <thead>
        <tr>
            <th style="width:40%">Flag</th>
            <th>Description</th>
        </tr>
    </thead>
    <tr>
        <td>--blueprint-current-repository string</td>
        <td>Current active blueprint repository name</td>
    </tr>
    <tr>
        <td>--config string</td>
        <td>config file (default: $HOME/.xebialabs/config.yaml)</td>
    </tr>
    <tr>
        <td>-q, --quiet</td>
        <td>suppress all output, except for errors</td>
    </tr>
    <tr>
        <td>-v, --verbose</td>
        <td>verbose output</td>
    </tr>
    <tr>
        <td>--xl-deploy-authmethod string</td>
        <td>Authentication method to access the XL Deploy server (default "http")</td>
    </tr>
    <tr>
        <td>--xl-deploy-password string</td>
        <td>Password to access the XL Deploy server (default "admin")</td>
    </tr>
    <tr>
        <td>--xl-deploy-url string</td>
        <td>URL to access the XL Deploy server (default "http://localhost:4516/")</td>
    </tr>
    <tr>
        <td>--xl-deploy-username string</td>
        <td>Username to access the XL Deploy server (default "admin")</td>
    </tr>
    <tr>
        <td>--xl-release-authmethod string</td>
        <td>Authentication method to access the XL Release server (default "http")</td>
    </tr>
    <tr>
        <td>--xl-release-password string</td>
        <td>Password to access the XL Release server (default "admin")</td>
    </tr>
</table> -->

## xl kube upgrade

- Use the `xl kube upgrade` command to upgrade Digital.ai Deploy or Release or Remote Runner to a later (or latest) version.
- Run the `xl kube upgrade --help` command for more information about the available flags and usage examples for this command.
- The `xl kube upgrade` command can upgrade Digital.ai Deploy or Release or Remote Runner by taking you through a series of questions that you must answer to set the stage for your upgrade.
- See the upgrade instructions for different cloud platform to know more about the upgrade questions and answers for different cloud setups.

### Usage

```
xl kube upgrade [flags]
```

### Examples

- The command to upgrade Digital.ai Deploy or Release or Remote Runner.

  ```
  xl kube upgrade
  ```

- The command to do the upgrade by answering only a few absolutely required questions.

  ```
  xl kube upgrade --quick-setup
  ```

- The command to upgrade Digital.ai Deploy or Release or Remote Runner using the downloaded xl-op-blueprints (in case https://dist.xebialabs.com/ is inaccessible from your site).

  ```
  xl kube upgrade --local-repo ./xl-op-blueprints
  ```

- The command to upgrade Deploy or Release or Remote Runner and wait for all the upgraded resources to be up and running. In this example, the upgrade times out with an error if the resources are not up and running after 5 minutes.

  ```
  xl kube upgrade --wait-for-ready 5
  ```

- The command to upgrade Digital.ai Deploy or Release or Remote Runner after cleaning all the existing resources in the target namespace of the Kubernetes cluster.

  ```
  xl kube upgrade --clean-before
  ```

- The commands to do a dry run of the upgrade, validate the generated upgrade YAML files, and then apply the files later to the cluster to create the resources.

  ```
  xl kube upgrade --dry-run
  xl kube install --files 20221004-101151
  ```

  - Use the `xl kube upgrade --dry-run` command to generate the answers file, preview the upgrade, and if ok proceed with the `xl kube install --files <ref-run-id>` to apply the generated YAML files.
  - Once you run the `xl kube upgrade --dry-run` command and answer the prompts, you can confirm the configuration.
  - Once you confirm, the answers file is generated and stored in the root `digitalai` folder. For example, the answers file `generated_answers_dai-release_digitalai_upgrade-20221019-145919.yaml` is generated and stored in the `digitalai` folder as shown in the following illustration.

    <!-- ![1666171947604](../../images/1666171947604.png) -->

  - The other YAML files are generated and stored in a folder under the `digitalai` root folder, for example, `digitalai/dai-release/digitalai/20221019-145919/kubernetes`.
  - Once you verify the generated answers and YAML files, you can proceed with the `xl kube install --files` command to complete the upgrade.
  - For example, use the command `xl kube install --files 20221004-101151` to apply the files stored in the `.../20221004-101151/kubernetes` folder.
  - You can also use the `xl kube install --files 20221004-101151` command if you want to repeat the upgrade using the existing YAML files.

- The command to upgrade Digital.ai Deploy or Release or Remote Runner using additional logging for debugging purposes.

  ```
  xl kube upgrade --verbose
  ```

- Here's a command that you can use to upgrade Digital.ai Deploy or Release or Remote Runner:

  - using the downloaded xl-op-blueprints files (`--local-repo`)
  - using the answers file you have from previous runs (`--answers`)
  - with additional logging (`--verbose`)
  - skipping any prompts during installation (it will skip any questions for overridden resources too) (`--skip-prompts`)

  ```
  xl kube upgrade --local-repo ./xl-op-blueprints --verbose --skip-prompts --answers ./answers.yaml
  ```

### Flags

<table>
<thead>
  <tr>
    <th>Flag</th>
    <th>Decsription</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>-a, --answers string</td>
    <td>The file containing answers for the questions. When using an answers file, new yaml files will be generated from the installation blueprints</td>
  </tr>
  <tr>
    <td>-D, --dry-run</td>
    <td>Create files only. Nothing will be applied to the Kubernetes cluster. Apply the generated files to the cluster by using the --files</td>
  </tr>
  <tr>
    <td>-f, --files string</td>
    <td>Do the upgrade using previously generated yaml files. Use the unique part of any generated answers file in the 'digitalai' folder as the argument. For example: "--files 20220824-153907" . The yaml files from in the same folder will be applied to the cluster. Use this option after customizing the generated yaml files.</td>
  </tr>
  <tr>
    <td>-h, --help</td>
    <td>help for upgrade</td>
  </tr>
  <tr>
    <td>-l, --local-repo string</td>
    <td>Provide local folder path where blueprints are located. By default a remote repository is used.</td>
  </tr>
  <tr>
    <td>-t, --log-since-time int32</td>
    <td>Collect Kubernetes logs for the specified time when waiting for resources or running the check command. Specify time in minutes. (default 60)</td>
  </tr>
  <tr>
    <td>-Q, --quick-setup</td>
    <td>Do the installation with the minimal amount of questions, using default values where possible.</td>
  </tr>
  <tr>
    <td>-S, --skip-prompts</td>
    <td>Skip confirmation prompts</td>
  </tr>
  <tr>
    <td>-o, --wait-for-operator uint</td>
    <td>Wait for availability of the Digital.ai operator that manages product installation. Specify the time to wait in minutes before timing out.</td>
  </tr>
  <tr>
    <td>-w, --wait-for-ready uint</td>
    <td>Wait for product deployments and pods to be started. Specify the time to wait in minutes before timing out.</td>
  </tr>
</tbody>
</table>

<!-- ### Global Flags

<table>
    <thead>
        <tr>
            <th style="width:40%">Flag</th>
            <th>Description</th>
        </tr>
    </thead>
    <tr>
        <td>--blueprint-current-repository string</td>
        <td>Current active blueprint repository name</td>
    </tr>
    <tr>
        <td>--config string</td>
        <td>config file (default: $HOME/.xebialabs/config.yaml)</td>
    </tr>
    <tr>
        <td>-q, --quiet</td>
        <td>suppress all output, except for errors</td>
    </tr>
    <tr>
        <td>-v, --verbose</td>
        <td>verbose output</td>
    </tr>
    <tr>
        <td>--xl-deploy-authmethod string</td>
        <td>Authentication method to access the XL Deploy server (default "http")</td>
    </tr>
    <tr>
        <td>--xl-deploy-password string</td>
        <td>Password to access the XL Deploy server (default "admin")</td>
    </tr>
    <tr>
        <td>--xl-deploy-url string</td>
        <td>URL to access the XL Deploy server (default "http://localhost:4516/")</td>
    </tr>
    <tr>
        <td>--xl-deploy-username string</td>
        <td>Username to access the XL Deploy server (default "admin")</td>
    </tr>
    <tr>
        <td>--xl-release-authmethod string</td>
        <td>Authentication method to access the XL Release server (default "http")</td>
    </tr>
    <tr>
        <td>--xl-release-password string</td>
        <td>Password to access the XL Release server (default "admin")</td>
    </tr>
    <tr>
        <td>--xl-release-url string</td>
        <td>URL to access the XL Release server (default "http://localhost:5516/")</td>
    </tr>
    <tr>
        <td>--xl-release-username string</td>
        <td>Username to access the XL Release server (default "admin")</td>
    </tr>
</table> -->

## xl kube check

- Use the `xl kube check` command to troubleshoot issues with Digita.ai Deploy or Release or Remote Runner instances running on Kubernetes environment.
- This command collects logs and troubleshooting information—which could also be saved as a zip file for use by the Support team—to identify and troubleshoot problems.
- Run the `xl kube check --help` command for more information about the available flags and usage examples for this command.

### Usage

```
xl kube check [flags]
```

### Examples

- Basic command to check everything related to the operator and storing the resources describe details, yaml and logs

  ```
  xl kube check
  ```

- Basic command to check everything related to the operator, with additional checking and waiting 5 minutes for all resources if they are running (timeout with error is after 5 minutes on each resource)

  ```
  xl kube check --wait-for-ready 5 --wait-for-operator 5
  ```

- Do check by using locally downloaded xl-op-blueprints (in case https://dist.xebialabs.com/ is inaccessible from your site)

  ```
  xl kube check --local-repo ./xl-op-blueprints
  ```

- Do check with waiting for all resources to be up and running, it will timeout with error after 5 minutes and on the end zip the collected data to the zip in the working directory

  ```
  xl kube check --wait-for-ready 5 --wait-for-operator 5 --zip-files
  ```

- Using additional logging for debugging purposes

  ```
  xl kube check --verbose
  ```

### Flags

<table>
<thead>
  <tr>
    <th>Flag</th>
    <th>Decsription</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>-a, --answers string</td>
    <td>The file containing answers for the questions. When using an answers file, new yaml files will be generated from the installation blueprints</td>
  </tr>
  <tr>
    <td>-h, --help</td>
    <td>help for check</td>
  </tr>
  <tr>
    <td>-i, --include-secrets</td>
    <td>Also do a dump of the secrets data, by default disabled</td>
  </tr>
  <tr>
    <td>-l, --local-repo string</td>
    <td>Provide local folder path where blueprints are located. By default a remote repository is used.</td>
  </tr>
  <tr>
    <td>-t, --log-since-time int32</td>
    <td>Collect Kubernetes logs for the specified time when waiting for resources or running the check command. Specify time in minutes. (default 60)</td>
  </tr>
  <tr>
    <td>-Q, --quick-setup</td>
    <td>Do the installation with the minimal amount of questions, using default values where possible.</td>
  </tr>
  <tr>
    <td>-s, --skip-collecting</td>
    <td>Do no collect the describe details, yaml and logs from the resources available in the deployment</td>
  </tr>
  <tr>
    <td>-S, --skip-prompts</td>
    <td>Skip confirmation prompts</td>
  </tr>
  <tr>
    <td>-o, --wait-for-operator uint</td>
    <td>Wait for availability of the Digital.ai operator that manages product installation. Specify the time to wait in minutes before timing out. (default 2)</td>
  </tr>
  <tr>
    <td>-w, --wait-for-ready uint</td>
    <td>Wait for product deployments and pods to be started. Specify the time to wait in minutes before timing out. (default 2)</td>
  </tr>
  <tr>
    <td>-z, --zip-files</td>
    <td>Store the results of the check and all collected files as a zip file in the working directory</td>
  </tr>
</tbody>
</table>

<!-- ### Global Flags

<table>
    <thead>
        <tr>
            <th style="width:40%">Flag</th>
            <th>Description</th>
        </tr>
    </thead>
    <tr>
        <td>--blueprint-current-repository string</td>
        <td>Current active blueprint repository name</td>
    </tr>
    <tr>
        <td>--config string</td>
        <td>config file (default: $HOME/.xebialabs/config.yaml)</td>
    </tr>
    <tr>
        <td>-q, --quiet</td>
        <td>suppress all output, except for errors</td>
    </tr>
    <tr>
        <td>-v, --verbose</td>
        <td>verbose output</td>
    </tr>
    <tr>
        <td>--xl-deploy-authmethod string</td>
        <td>Authentication method to access the XL Deploy server (default "http")</td>
    </tr>
    <tr>
        <td>--xl-deploy-password string</td>
        <td>Password to access the XL Deploy server (default "admin")</td>
    </tr>
    <tr>
        <td>--xl-deploy-url string</td>
        <td>URL to access the XL Deploy server (default "http://localhost:4516/")</td>
    </tr>
    <tr>
        <td>--xl-deploy-username string</td>
        <td>Username to access the XL Deploy server (default "admin")</td>
    </tr>
    <tr>
        <td>--xl-release-authmethod string</td>
        <td>Authentication method to access the XL Release server (default "http")</td>
    </tr>
    <tr>
        <td>--xl-release-password string</td>
        <td>Password to access the XL Release server (default "admin")</td>
    </tr>
    <tr>
        <td>--xl-release-url string</td>
        <td>URL to access the XL Release server (default "http://localhost:5516/")</td>
    </tr>
    <tr>
        <td>--xl-release-username string</td>
        <td>Username to access the XL Release server (default "admin")</td>
    </tr>
    <tr>
        <td>-z, --zip-files</td>
        <td>Zip all collected files and results of the check</td>
    </tr>
</table> -->

## xl kube clean

- Use the `xl kube clean` command to clean or remove existing Deploy or Release or Remote Runner deployments from a cluster.
- During this process, you can select the namespace to delete the resources from.
- As the Custom Resource Definition file (CRD) is shared between installations on the cluster, you can choose to delete or keep (reuse) it.
- Also, you can choose to preserve the persistent volume claims (PVCs).
- Run the `xl kube clean --help` command for more information about the available flags and usage examples for this command.
- In addition to this `xl kube clean` command, which is used post install/upgrade, you also have the `xl kube install --clean-before` and `xl kube upgrade --clean-before` commands to clean the existing resources from the cluster before installation or upgrade.

### Usage

```
xl kube clean [flags]
```

Running the `xl kube clean` command takes you through a wizard of questions. Here's the list of questions you would be prompted with for answers.

- ? Following kubectl context will be used during execution: the kubectl context? (Y/n)
- ? Select the Kubernetes setup where the Digital.ai Devops Platform will be installed, updated or cleaned: [Use arrows to move, enter to select, type to filter, ? for more help]
- ? Do you want to use an custom Kubernetes namespace (current default is 'digitalai')
- ? Product server you want to perform clean for
- ? Enter the name of custom resource definition you want to reuse or replace: [Use arrows to move, enter to select, type to filter, ? for more help]
- ? Should CRD be reused, if No we will delete the CRD digitalaideployocps.xldocp.digital.ai, and all related CRs will be deleted with it
- ? Enter the name of custom resource
- ? Should we preserve persisted volume claims? If not all volume data will be lost

### Examples

- Basic command to start clean of a product from the selected namespace on the cluster

  ```
  xl kube clean
  ```

- Clean by using locally downloaded xl-op-blueprints (in case https://dist.xebialabs.com/ is inaccessible from your site)

  ```
  xl kube clean --local-repo ./xl-op-blueprints
  ```

- The process will just ask the questions and generate the answer file, nothing will be changed on the cluster

  ```
  xl kube clean --dry-run
  ```

- Using additional logging for debugging purposes

  ```
  xl kube clean --verbose
  ```

- Using prepared answers file from previous runs and skipping any prompts during clean (it will skip any questions for deleting resources too)

  ```
  xl kube clean --local-repo ./xl-op-blueprints --verbose --skip-prompts --answers ./answers.yaml
  ```

### Flags

<table>
<thead>
  <tr>
    <th>Flag</th>
    <th>Decsription</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>-a, --answers string</td>
    <td>The file containing answers for the questions. When using an answers file, new yaml files will be generated from the installation blueprints</td>
  </tr>
  <tr>
    <td>-D, --dry-run</td>
    <td>Create files only. Nothing will be applied to the Kubernetes cluster. Apply the generated files to the cluster by using the --files</td>
  </tr>
  <tr>
    <td>-h, --help</td>
    <td>help for clean</td>
  </tr>
  <tr>
    <td>-l, --local-repo string</td>
    <td>Provide local folder path where blueprints are located. By default a remote repository is used.</td>
  </tr>
  <tr>
    <td>-Q, --quick-setup</td>
    <td>Do the installation with the minimal amount of questions, using default values where possible.</td>
  </tr>
  <tr>
    <td>-S, --skip-prompts</td>
    <td>Skip confirmation prompts</td>
  </tr>
</tbody>
</table>

<!-- ### Global Flags

<table>
    <thead>
        <tr>
            <th style="width:40%">Flag</th>
            <th>Description</th>
        </tr>
    </thead>
    <tr>
        <td>--blueprint-current-repository string</td>
        <td>Current active blueprint repository name</td>
    </tr>
    <tr>
        <td>--config string</td>
        <td>config file (default: $HOME/.xebialabs/config.yaml)</td>
    </tr>
    <tr>
        <td>-q, --quiet</td>
        <td>suppress all output, except for errors</td>
    </tr>
    <tr>
        <td>-v, --verbose</td>
        <td>verbose output</td>
    </tr>
    <tr>
        <td>--xl-deploy-authmethod string</td>
        <td>Authentication method to access the XL Deploy server (default "http")</td>
    </tr>
    <tr>
        <td>--xl-deploy-password string</td>
        <td>Password to access the XL Deploy server (default "admin")</td>
    </tr>
    <tr>
        <td>--xl-deploy-url string</td>
        <td>URL to access the XL Deploy server (default "http://localhost:4516/")</td>
    </tr>
    <tr>
        <td>--xl-deploy-username string</td>
        <td>Username to access the XL Deploy server (default "admin")</td>
    </tr>
    <tr>
        <td>--xl-release-authmethod string</td>
        <td>Authentication method to access the XL Release server (default "http")</td>
    </tr>
    <tr>
        <td>--xl-release-password string</td>
        <td>Password to access the XL Release server (default "admin")</td>
    </tr>
    <tr>
        <td>--xl-release-url string</td>
        <td>URL to access the XL Release server (default "http://localhost:5516/")</td>
    </tr>
    <tr>
        <td>--xl-release-username string</td>
        <td>Username to access the XL Release server (default "admin")</td>
    </tr>
</table> -->
