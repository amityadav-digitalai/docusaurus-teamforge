---
id: release-notes-release
hide_table_of_contents: true
title: Digital.ai Release 23.3.x Release Notes
product:
  - release
category:
  - Get Started
subject:
  - Release Notes
tags:
  - release notes
order: 1000
---

Digital.ai Release 23.3.0 includes the following new features:

- Next generation extensibility python sdk tech preview
  - Remote runner for running container-based tasks
- New application onboarding workflows
- Usability and performance enhancements
- Limit folder depth in Release
- Skip Nested variable interpolation for text type variables
- View string type variable values in string type fields
- Time frame last 7 days added for audit reports
- Limit minimal trigger polling interval
- Set expiration period for personal access token
- Log retention policy for container-based tasks
- Reordered sidebar navigation for template release
- Enhanced Release breadcrumbs
- Support personal access tokens for LDAP users
- Enhanced connections page
- Version control enhancements (`releasefile.yaml` file)
- Enhancements to Triggers
- Enhanced XL CLI
- Other enhancements
- New Plugins Introduced: OPA, Bamboo, and JFrog

And more bug fixes and enhancements.

## Support Policy

See [Digital.ai Support Policy](https://support.digital.ai/hc/en-us/articles/360016879780-XebiaLabs-Supported-Product-Versions).

## Upgrade Instructions

The Digital.ai Release upgrade process you use depends on the version from which you are upgrading, and the version to which you want to go.

For upgrade instructions, see:

- [Upgrade Release—on JVM](/release/how-to/upgrade-9.7.x-to-current.html).
- [Upgrade Release—on Kubernetes](/release/operator/xl-op-before-you-begin.html)

Here's what's new with Digital.ai 23.1.0.

## New Application Onboarding Workflows

  <div className="vidWrapper">
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/ZysEN5HPvKg"
      title="digital.ai Deploy Overview"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
  </div>

Digital.ai Release 23.1 brings you the application onboarding workflows, which are a collection of tasks that can be executed in a self-service model.

The new application onboarding workflows in Release makes it easier to seamlessly onboard applications from Deploy and Argo CD without needing to work with the Deploy UIs or APIs.

- Select the [workflows](/release/how-to/application-onboarding-setup-workflow.html) from the self-service catalog and execute them step-by-step to interactively onboard applications from Argo CD and Deploy into Release and manage them via a dashboard.

  ![App Workflows](/docs/assets/cno-app-workflows-list.png)

- Once you onboard the applications, you can quickly discover which application versions are deployed to which environments across Deploy and Argo CD.​
- Deploy's logs are now live-streamed to and visible in Release making it easier to identify and troubleshoot issues.

  ![App Workflows](/docs/assets/cno-view-applications.png)

For more information, see [Application Onboarding Overview](/release/how-to/application-onboarding-overview.html).

## Next Generation​ Extensibility—Python SDK (tech preview)

- Build and test integrations more quickly in Python
- Use containers to eliminate external dependencies for integrations
- Scale integration execution via Remote Runners without provisioning additional server nodes
- Digital.ai Release 23.1 brings you a Python-based integration SDK—a set of tools that Developers can use to build custom integration plugins.
- The Python SDK (`digitalai-release-sdk 23.1.0`) is available in the [PyPI](https://pypi.org/project/digitalai-release-sdk/23.1.0rc1/) repository.
- The [Digital.ai Release Integration Python SDK template](https://github.com/digital-ai/release-integration-template-python) project serves as a template for developing new integration plugins.

For more information, see the quickstart for [Python SDK Tutorial - Development Setup](/release/how-to/quickstart-python-sdk-tutorial..html) or detailed instructions in the [Python SDK Tutorial - Production Setup](/release/how-to/python-sdk-tutorial.html).

### Remote Runner for Running Container-based Tasks

Release 23.1 brings you the new Remote Runner to efficiently and effectively manage the execution of container-based tasks within a Kubernetes cluster. The idea is to isolate the task execution process with remote runners and provide greater stability and scalability for executing tasks.

> **Important**: The container-based task functionality is not compatible with **DB2** database.

Container-based tasks in Release are identifiable via the **Capabilities** field in the _Config_ tab of tasks. These tasks will run only if you have the Remote Runner set up and connected to Release via the _Connections_ page.

![Container](/docs/assets/container-task.png)

For more information, see [Install Remote Runner](/release/how-to/remote-runner-quickstart-sdk.html).

## Usability and Performance Enhancements

Release has introduced some new configurations that can be customized to improve its performance.

### Caching in Release

To enable caching in Release, you must add the following entries to the `xl-release.conf` file.

```
xl.cache.ci-reference-types.enabled=true
xl.cache.task-types.enabled=true
xl.cache.release-rows.enabled=true
xl.cache.security.enabled=true
xl.cache.security-user.enabled=true
```

For more information, see [Caching in Release](/release/how-to/enable-caching-in-release.html).

### Script Execution Backpressure Settings

> **Note**: Prior to Digital.ai Release 23.1, the **Script execution backpressure** configuration cannot be turned off. By default, this configuration is enabled.

You can turn the **Script execution backpressure** setting on or off to delay the execution of scripts in case the Release server is overloaded.

Go to **Settings** > **System settings** > **Feature flags** > **Incubating**.

![Performance Config](/docs/assets/performance-config-flags.png)

Select the **Enable** check box to turn this feature on.

### Release Load Options

- Unlike Release 22.3 and earlier with which task dependencies were loaded one-by-one, you can now batch-load task dependencies with Release 23.1 and later.
- To optimize the number of select statements that are processed, you can batch-load task dependencies along with the Release.
- This means that the dependencies can be loaded simultaneously with the Release, resulting in more efficient processing.
- Enable this feature by selecting the **Batch load dependencies** check box.
- This setting is enabled by default.

### Application Pipeline Tag

In the _Incubating_ tab, under the _DevOps enabled deployments overview_ section, the _Application pipelines templates_ tag is available by default in the **Application pipelines tag** field.

Keep the **Application pipelines tag** handy that is available in the _Incubating_ tab of _Feature Flags_ page. Add this tag to any Release template to run it as a workflow.

### Task Drawer Enhancements

Release has introduced a lot of new enhancements to the new [Task Drawer](/release/how-to/working-with-tasks-using-new-task-drawer.html) to improve the user experience.

### Real-time Task Updates

Real time updates about events like Comments and Container logs are now displayed in the [Task Drawer](/release/how-to/working-with-tasks-using-new-task-drawer.html).

![Task Logs](/docs/assets/task-logs.png)

![Comments](/docs/assets/comment-logs.png)

Additionally, help notification icons are displayed in the _Activity_ and _Attachments_ tabs whenever an event occurs.

![Help notifications](/docs/assets/help-notifications.png)

### Expandable Task Editor to work with Scripts

Script task editor can now be maximized for better usability.

![Script content area](/docs/assets/script-content-area-maximized.png)

### Enhanced Task Details View

The **Task Details** view for the _Task Drawer_ is now enhanced to preview and edit the details of a task.

To enable this feature, click **System setting** > **Feature flags**, navigate to the **Task details (redesigned UI)** section and select the **Use new Task details version** check box. If the Admin clears this check box, individual users cannot enable this feature in the _Personal settings_ screen.

![Task Details](/docs/assets/task-details-new-version.png)

> **Note**: The [Task Drawer](/release/how-to/working-with-tasks-using-new-task-drawer.html) feature was introduced with Release 22.3. However, with every release enhancements are made for better usability. You can switch back to the old view (Task Modal) by clearing the **Use new Task details version** checkbox.

### Enable or Disable Task Drawer for Tasks—Users With Administrator Permissions

1. Log in to Digital.ai Release.
2. On the top-right corner, click **Settings** > **System settings**.

   The **System settings** screen appears.

3. Click **Feature flags** from the left-navigation bar.

   ![Enabled](/docs/assets/FF_Enabled-checkbox.png)

4. Select the **Stable** tab.

   In the _New UI for task details_ section, the **Enabled** check box is selected by default. This means the new Task Drawer for tasks is enabled by default.

   > **Note**: If you want to use the Task Modal for tasks instead of the new Task Drawer, clear the **Enabled** check box and click **Save**.

### Enable or Disable Task Drawer for Tasks—Opt Out of Task Drawer

Digital.ai Release 23.1 and later allows non-admin users to enable or disable the Task Drawer feature. This is possible if and only if your Administrator has enabled the new Task Drawer and you want to opt out of it in favor of the Task Modal.

1. Log in to Digital.ai Release.
2. In the **Profile** page, under the **New UI for task details** section, clear the **Use task drawer** check box to opt out from the Task drawer and use the Task modal instead.

   ![Task drawer individual visible](/docs/assets/enable-task-drawer-individual_visible.png)

### Download Live Logs

You can now click the download button next to the **Runs** drop-down list to download the live logs from the [Task drawer](/release/how-toworking-with-tasks-using-new-task-drawer.html).

![Download logs](/docs/assets/live-logs.png)

### Improved Tooltips and Icons

When you hover over the task details icon, the full text about the task type is displayed now.

![Hover icon](/docs/assets/task-type-icon.png)

Additionally, the following task details tool tips and labels are updated:

- Close icon
- Flag icon
- Script icon
- Lock icon
- Documentation icon
- Failure handler

### Additional Improvements

When you update the _Scheduling_ and _Conditions_ tabs in the Task drawer, small help icons in the form of badges will be displayed.

When the **Check environment availability** toggle is disabled and you hover over it, the toggle must be in _cursor:not-allowed_ state.

![Task Drawer Updates](/docs/assets/task-drawer-updates.png)

Furthermore, the task details' tooltips and labels have been improved to provide a better user experience.

### Release Flow Editor Views Moved to the Sidebar

The [Release Flow Editor](/release/how-to/using-the-release-flow-editor.html) views, selected via the **Show** drop-down list has been moved to the left navigation pane when you select a Release or a Template.

**Release View**

![Show drop-down Release](/docs/assets/show-drop-down-revamped-release.png)

**Template View**

![Show drop-down Template](/docs/assets/show-drop-down-revamped-template.png)

### Other Performance Enhancements

- Reduced the server load when navigating through various _Tasks_ screens.
- Improved the way _Teams and Permissions_ screen handles a large number of users when it comes to task and team assignment.
- Observed increase in performance by implementing an experimental option to cache security data in the server.

## Limit Folder Depth in Release

A nested [folder structure](/release/how-to/manage-templates-and-releases-using-folders.html) with more than five or six levels becomes cumbersome to deal with and can adversely impact the performance and lead to the following issues:

- General slowness
- High CPU usage
- CLI tasks become unreliable
- Create release task is not usable

Configure the folder depth in Release via **Settings** > **System Settings** > **Feature Flags** > **Set Limits within release** section:

- Select the **Enable** checkbox to enable this feature and limit the folder depth based on the value set in the **Max folder depth** field.
- Set the folder depth value in the **Max folder depth** field.

> **Note**: The default folder depth is set to `5`. However, admin users can increase the folder depth to more than `5` based on the requirements.

![Folder Depth Limit in Release](/docs/assets/max-folder-depth-setting.png)

## Limit Minimal Trigger Polling Interval

Currently, the minimum polling interval for [triggers](/release/concept/understanding-triggers.html) is `1` second. This causes increased load in Release and other third-party systems. To overcome this performance issue, the minimum polling interval for triggers is changed to `60` seconds.

Configure the minimum polling interval in Release via **Settings** > **System Settings** > **Feature Flags** > **Set Limits within release** section:

- Set the minimum polling interval value in the **Min trigger interval** field.

![Limit Minimal Trigger Polling Interval](/docs/assets/limit-trigger-polling.png)

## Skip Nested Variable Interpolation for Text Type Variables

You can now skip interpolation of values and prevent Digital.ai Release from creating [variables](/release/concept/variables-in-xl-release.html) out of it for Text variable types.

Configure this setting via **Variables** > **Create variable** dialog > **Prevent variable interpolation** checkbox. This checkbox is enabled only when you select **Text** from the **Type** drop-down list.

**Note**: It is applicable only for Text variables. It can be set at Release, Folder, and Global variable levels.

![Nested Variable Interpolation](/docs/assets/prevent-variable-interpolation.png)

## View String Type Variable Values in String Type Fields

Text type fields, by default, fetch and show the values of the String type variables added to them. Text type fields show the variable's name in case the variable has no values assigned to it.

Here's a Text type field—**${title}**—for example, with a value assigned to it.

![Release variable string](/docs/assets/string-type-variable.png)

Here's how the **Release Title** text field shows the value of the String type variable when you add the variable to the **Release Title** field.

![Release variable string value](/docs/assets/string-type-variable-value.png)

## Time Frame (Last 7 days) Added for Audit Reports

A new value is added to the **Time period** drop-down list to generate [Release audit report](/release/how-to/generate-release-audit-report.html) for the last 7 days. You can now generate an audit report by selecting the last 7 days time period, adding a filter, clicking **Preview results** and then clicking **Generate report**.

![Time period release audit report](/docs/assets/time-period-last-seven-days.png)

Also, the _last 7 days_ filter is the default setting for the **Dashboards** and **Value stream** sections under the _Reports_ group.

![Dashboard](/docs/assets/time-period-last-seven-days-dashboard.png)

![Value stream](/docs/assets/time-period-last-seven-days-valuestream.png)

## Set Expiration Period for Personal Access Token

You can now set an expiration period for the personal access token (PAT) using the **Expiration** dropdown in the [Personal access tokens](/release/how-to/personal-access-tokens-based-authentication.html) screen.

On the top-right corner, click **Profile avatar** > **Access tokens**. In the _Personal access tokens_ screen, enter a token name, select the number of days for token expiration, and click **Generate**. A new PAT with an expiration date is generated.

![PAT Expiry](/docs/assets/pat-expiration.png)

Expiration days can be set as **30 days**, **60 days**, or **1 year**.

> **Note**: You can select **No expiration** from the dropdown to avoid expiration of the PAT.

## Log Retention Policy for Container-based Tasks

Logs in general are purged to free up the hard disk space. The Log Retention Policy is now introduced for Container-based tasks to delete the task execution logs that are stored on the server.

You can set the no of days for deleting the task execution logs in Release via **Settings** > **General** > **Task execution log purging** section:

- Set the no of days for deleting the task execution logs in the **Delete task execution logs older than** field.

**Note**: The default value is `10` days, and the maximum number of days the logs can be retained is `45` days. The logs are purged only if the task is completed or skipped.

![Log Retention Policy](/docs/assets/task-execution-log-purging.png)

## Reordered Sidebar Navigation for Template/Release

The sidebar navigation for templates and releases have been reordered for better user experience.

**Template**

![Template](/docs/assets/template-sidenav-new.png)

**Release**

![Release](/docs/assets/release-sidenav-new.png)

## Enhanced Release Breadcrumbs

Click the release name in the breadcrumbs, and it now redirects you to the _Release flow_ editor screen.

![Breadcrumbs](/docs/assets/release-breadcrumbs.png)

## Support Personal Access Tokens for LDAP Users

Earlier, [personal access token](/release/how-to/personal-access-tokens-based-authentication.html) (PAT) was supported only for internal users. With this EA Release, PAT is supported for LDAP users too.

![PAT LDAP](/docs/assets/pat-ldap-users.png)

## Enhanced Remote Completion Task

When the [Remote completion task](/release/how-to/using-the-remote-completion-plugin.html) is assigned to a user, the action required email to complete or fail the task is received by the user. Also, a valid notification message (`Email sent to user(s): testuser`) is displayed in the _Activity_ tab.

![Remote completion task issue](/docs/assets/remote-completion-task-email.png)

However, when the same Remote completion task is assigned to a team, the action required email to complete or fail the task is not received by the user. Also, a failure notification message `(Notification failed. Reason: 'Task owner's email address and team members email addresses are not configured or not whitelisted`) is displayed in the _Activity_ tab.

> **Note**: In this case, the team must be linked to a global role, and this global role is assigned to multiple users/principals. These users/principals will receive an email stating that the Remote completion task has started and is assigned to you. But, the action required email to complete or fail the task is not sent.

This issue is now fixed, and action required emails are received when the Remote completion task is assigned to a team also.

## Enhanced Connections page

The **Connections** page is now enhanced for better user experience using new components. You can access them via Global or Folder levels.

![New Connections Page](/docs/assets/connections-page-improved.png)

## Version Control Enhancements

When versioning folders, all YAML files used to be dumped into a single file named `Releasefile.yaml`. In order to track changes for separate entities like Templates, Patterns, and so on, and to view them separately the `Releasefile.yaml` file is now split into separate entities. You can configure this versioning style under the _Version control_ settings.

## Enhancements to Triggers

You have the option to set the maximum number of trigger failures that can occur before a trigger is disabled. To configure this value, navigate to **Settings** > **System settings** > **Feature Flags**. In the _Set Limits within release_ section, you can enter a value or select an option from the drop-down menu for the **Consecutive trigger failures** field.

![Task Drawer Updates](/docs/assets/trigger-limits.png)

Furthermore, when a trigger is disabled, a notification is sent to the System Administrator.

## Enhanced XL CLI

List of enhancements to XL CLI in 23.1.0:

- Added support for air-gapped installation of Deploy and Release.
- Added support for custom repositories in the install and upgrade wizards.

## Other Enhancements

- You can now find the identifier of the folder in which the Release is running.
- Improved performance on folders, users, roles, and permissions screens.
- Caching support improved for users, roles, and permissions.
- Improved performance in user assignment when there are bulk users (in thousands).

## Version Upgrades—Supported Databases

Release 23.1 supports the following databases.

<table>
<thead>
  <tr>
    <th>Database</th>
    <th>Versions Supported</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>PostgreSQL</td>
    <td>15.0 and 14.6</td>
  </tr>
  <tr>
    <td>MySQL</td>
    <td>8.0 and 5.7</td>
  </tr>
  <tr>
    <td>Oracle</td>
    <td>19c</td>
  </tr>
  <tr>
    <td>Microsoft SQL Server</td>
    <td>2022 and 2019</td>
  </tr>
  <tr>
    <td>DB2</td>
    <td>11.5 and 11.1</td>
  </tr>
</tbody>
</table>

> **Important**: The container-based task functionality is not compatible with **DB2**.

## Plugins and Integrations

Here's what's new and changed with plugins and integrations.

> **Note**: With Digital.ai Release 23.1, OPA, Bamboo, and JFrog plugins are newly introduced.

### OPA Plugin

The Release [OPA Integration](https://www.openpolicyagent.org/) enables Release to work with Open Policy Agent server to manage policies and to evaluate inputs based on policy language known as REGO, which allows you to write policies for various services utilizing the same language. For more information about the plugin, see [OPA Integration](/release/how-to/opa-plugin.html).

### Bamboo plugin

Bamboo integration enables Release to perform the following tasks:

- Create Release
- Run Plan
- Trigger Deployment

For more information about the plugin, see [Bamboo Integration](/release/how-to/bamboo-plugin.html).

### JFrog Plugin

Two new triggers are introduced with JFrog integration:

- Published Artifact
- Published Image

For more information about the triggers, see [JFrog Triggers](/release/how-to/jfrog-trigger.html).

### Jenkins Plugin

When you abort a Jenkins build task from Digital.ai Release, the task stops immediately but the Jenkins job still runs. This issue is now fixed.

### HashiCorp Vault Plugin

The Hashicorp Vault plugin now includes support for LDAP authentication method.

Along with Token authentication, Basic authentication is now introduced for HashiCorp Vault plugin.

![username-password](/docs/assets/username-password.png)

Various types of authentication are added to the HashiCorp Vault plugin.

![authentication-list](/docs/assets/authentication-list.png)

Read Secret task for KV Version2 mount type is added to the HashiCorp Vault plugin.

![vault-kv-version2](/docs/assets/vault-kv-version2.png)

**Namespace** field is added to the HashiCorp Vault plugin.

> **Note**: Vault should run in Enterprise mode to have a namespace.

![namespace](/docs/assets/namespace.png)

Fixed the **Verify Lookup** module that was not working for UserName and Password.

Fixed the **UserPass** authentication mechanism to revoke tokens once the lifecycle is completed.

### Conjur Plugin

Fixed an issue that allowed the Conjur open-source server to connect with wrong credentials.

### GitHub Plugin

The following 2 new tasks are added to GitHub plugin:

- Trigger Workflow Run
- Enable Disable Workflow

### GitLab Plugin

The **Order by** and **Sorting Order** fields are added for the _Query Tags_ task.

![Query Tags Task](/docs/assets/prevent-variable-interpolation.png)

Fixed issue where the API key specified in GitLab tasks was not overriding the parameters defined in the `Gitlab.Server` configuration.

### Octopus Deploy Plugin

Abort task logic is added to the Octopus Deploy plugin.

### Deploy Plugin

The _Rollback_ task is now fixed and will no longer be stuck in the _Pending_ state, even after the actual deploy task has been rolled back.

### Black Duck Plugin

Fixed vulnerability issue in Black Duck plugin.

### Agility Plugin

Fixed the Agility StoryStatus in the server details that was causing an issue.

### Argo CD Plugin

When creating projects from a Release, there was no option to auto-create namespaces, as namespace creation was disabled by default. However, this issue has now been fixed.

## Known Issues

Some of the install wizard prompts are repeated (along with the user-entered value) when you run the install wizard via the `xl kube install` command on Windows.

## Bug Fixes and Field Incidents—23.1.0

- S-90708 - Fixed the HTTP Host Header Injection issue that was causing random redirects. You can now add the white-listed host names to the `hostnames` key in the `xl-release.conf` file. For more information, see [ HTTP Host Header Protection](/release/how-to/http-host-header-protection-config.html).
- D-23902 - Fixed critical issues that were reported for Spring web in vulnerability scan.
- D-19541 - Fixed the issue where users could see the **Add Task** link without edit permission. It's now restricted to authorized users only.
- D-22379 - Creating a folder in Release with existing **id** and **title** should fail. However, the error response includes excessive information including INSERT SQL query and Database table schema. Fixed the issue where real exceptions were being displayed when creating duplicate folder IDs. Now, the real exception is hidden to improve error handling.
- D-22468 - Fixed the issue where a user without permission to a folder is able to retrieve its details or metadata.
- D-23859 - Upgraded XL CLI libraries and updated Golang to version 1.1.9. Made improvements to blueprints and questions.
- D-23216 - Fixed the _keytool cannot be found_ error that occurs when you run the `xl kube check` command during operator installation.
- D-22766 - Fixed the issue with backspace not working in multiline fields during installer inputs.
- D-23710 - Fixed the missing questions in the release installation wizard.
- D-23797 - Fixed operator installation failure due to storage class defaulting to an incorrect value when no value is selected.
- D-22765 - Fixed Kubernetes setup to prevent new lines from being added when selecting the Cloud provider using arrow keys.
- D-23188 - The Keytool on Windows cannot be found when you run the `xl kube install` command. The issue is fixed by providing a relevant error message when the Keytool is not installed.
- D-24222 - Fixed segmentation fault with XL CLI 22.3.x for Mac OS.
- D-24271 - Fixed an issue with selecting Nginx as the supported ingress type during xl kube installation.
- S-88585 - Added support for custom repositories in the XL CLI install and upgrade wizards to support using images from public and private image registries.
- S-85396 - Back-ported `helmtoOperator`/`OperatorToOperator` upgrader support for OIDC to all supported versions.
