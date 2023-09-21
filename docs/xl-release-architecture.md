---
id: xl-release-architecture
title: Release architecture
product:
  - release
category:
  - Get started
subject:
  - Product overview
tags:
  - system administration
  - customization
  - architecture
  - system
order: 400
---

Digital.ai Release has a modular architecture that provides flexibility to change and extend components while keeping the system consistent. Here's a high-level overview of the system architecture:

![Release architecture](/docs/assets/xl-release-architecture.png)

Release's central component is called the _core_, and has the following functionalities:

- Templates and releases
- Release archiving
- Security
- Reporting

The Release core is accessed using a REST service. It includes a REST service client in the form of a graphical user interface (GUI) that runs in browsers.

In addition, Release offers plugins that support various third-party tools. These plugins provide additional capabilities to Release and can be delivered by Digital.ai or custom-built by Release users.
