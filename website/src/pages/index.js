/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useEffect} from 'react';
import GitHubButton from 'react-github-btn';

import '@fortawesome/fontawesome-free/css/all.min.css';
import {MDBBadge} from 'mdb-react-ui-kit';
import {MDBCard, MDBListGroup, MDBListGroupItem} from 'mdb-react-ui-kit';
import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem,
  MDBBtn,
} from 'mdb-react-ui-kit';

import {MDBAccordion, MDBAccordionItem, MDBIcon} from 'mdb-react-ui-kit';

import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';

import CrossPlatformSVG from '../../static/img/homepage/cross-platform.svg';
import {setupDissectionAnimation} from './animations/_dissectionAnimation';
import {setupHeaderAnimations} from './animations/_headerAnimation';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

const textContent = {
  intro: `
  Digital.ai TeamForge 23.1.0 includes the following new features:

  <ul>
    <li>Next generation extensibility python sdk tech preview</li>
      <li>Remote runner for running container-based tasks</li>
    <li>New application onboarding workflows</li>
    <li>Usability and performance enhancements</li>
    <li>Limit folder depth in Release</li>
    <li>Skip Nested variable interpolation for text type variables</li>
    <li>View string type variable values in string type fields</li>
    <li>Time frame last 7 days added for audit reports</li>
    <li>Limit minimal trigger polling interval</li>
    <li>Set expiration period for personal access token</li>
    <li>Log retention policy for container-based tasks</li>
    <li>Reordered sidebar navigation for template release</li>
  </ul>
  
  And more features, bug fixes, and enhancements. 
  <br /><br />
  See <a href="/docs/next/release-notes/release-notes-release"><b>Release Notes</b></a> for more information.
  `,
  nativeCode: `
React primitives render to native platform UI, meaning your app uses the
same native platform APIs other apps do.
<br/><br/>
<strong>Many platforms</strong>, one React. Create platform-specific versions of components
so a single codebase can share code across platforms. With React Native,
one team can maintain multiple platforms and share a common technology—React.
  `,
  codeExample: `
import React from 'react';
import {Text, View} from 'react-native';
import {Header} from './Header';
import {heading} from './Typography';

const WelcomeScreen = () => (
  <View>
    <Header title="Welcome to React Native"/>
    <Text style={heading}>Step One</Text>
    <Text>
      Edit App.js to change this screen and turn it
      into your app.
    </Text>
    <Text style={heading}>See Your Changes</Text>
    <Text>
      Press Cmd + R inside the simulator to reload
      your app’s code.
    </Text>
    <Text style={heading}>Debug</Text>
    <Text>
      Press Cmd + M or Shake your device to open the
      React Native Debug Menu.
    </Text>
    <Text style={heading}>Learn</Text>
    <Text>
      Read the docs to discover what to do next:
    </Text>
   </View>
);
  `,
  forEveryone: `
React Native lets you create truly native apps and doesn't compromise your users' experiences.
It provides a core set of platform agnostic native components like <code>View</code>, <code>Text</code>, and <code>Image</code>
that map directly to the platform’s native UI building blocks.
  `,
  crossPlatform: `
React components wrap existing native code and interact with native APIs via
React’s declarative UI paradigm and JavaScript. This enables native app development
for whole new teams of developers, and can let existing native teams work much faster.
  `,
  fastRefresh: `
<strong>See your changes as soon as you save.</strong> With the power of JavaScript,
React Native lets you iterate at lightning speed. No more waiting for native builds to finish.
Save, see, repeat.
  `,
  talks: `
  Digital.ai Release product helps you orchestrate simple or complex application changes while reducing the risks of application failure.
  `,
};

function Heading({text}) {
  return <h1 className="Heading">{text}</h1>;
}

function ActionButton({href, type = 'primary', target, children}) {
  return (
    <a className={`ActionButton ${type}`} href={href} target={target}>
      {children}
    </a>
  );
}

function TextColumn({title, text, moreContent}) {
  return (
    <>
      <Heading text={title} />
      <div dangerouslySetInnerHTML={{__html: text}} />
      {moreContent}
    </>
  );
}

function HomeCallToActionRelease() {
  return (
    <>
      <h2>
        TeamForge 23.1{' '}
        <MDBBadge className="mx-2" color="info" light>
          New
        </MDBBadge>
      </h2>
      <br />
      <ActionButton
        type="primary"
        href={useBaseUrl('docs/release-notes/release-notes-release')}
        target="_self">
        Release Notes
      </ActionButton>
      <br />
      <br />
      <ActionButton
        type="tertiary"
        href={useBaseUrl('/versions')}
        target="_self">
        Get Started
      </ActionButton>
      <br />
      <ActionButton
        type="tertiary"
        href={useBaseUrl('/versions')}
        target="_self">
        Install/Upgrade
      </ActionButton>
      <br />
      <ActionButton
        type="tertiary"
        href={useBaseUrl('/versions')}
        target="_self">
        Plugins and Integrations
      </ActionButton>
      <br />
      <ActionButton
        type="tertiary"
        href={useBaseUrl('/versions')}
        target="_self">
        Digital.ai by Example
      </ActionButton>
      <br />
      <ActionButton
        type="tertiary"
        href={useBaseUrl('/versions')}
        target="_self">
        REST API Docs
      </ActionButton>
      <br />
      <ActionButton
        type="tertiary"
        href={useBaseUrl('/versions')}
        target="_self">
        Jython API Docs
      </ActionButton>
      <br />
      <ActionButton
        type="tertiary"
        href={useBaseUrl('/versions')}
        target="_self">
        DSL API Docs
      </ActionButton>
      <hr />
      <h3>Other Versions</h3>
      <ActionButton
        type="secondary"
        href={useBaseUrl('docs/22.3/release-notes/release-notes-release')}
        target="_self">
        22.3
      </ActionButton>
      <ActionButton
        type="secondary"
        href={useBaseUrl('docs/22.2/release-notes/release-notes-release')}
        target="_self">
        22.2
      </ActionButton>
      <ActionButton
        type="secondary"
        href={useBaseUrl('docs/22.1/release-notes/release-notes-release')}
        target="_self">
        22.1
      </ActionButton>
      <ActionButton
        type="secondary"
        href={useBaseUrl('docs/22.0/release-notes/release-notes-release')}
        target="_self">
        22.0
      </ActionButton>
      {/* <br />
      <ActionButton
        type="secondary"
        href={useBaseUrl('/versions')}
        target="_self">
        Archived Docs
      </ActionButton> */}
      <hr />
    </>
  );
}

function ReleaseCard1() {
  return (
    <Section className="GetStarted" background="light">
      <div className="cards">
        <MDBRow>
          <MDBCol sm="6">
            <MDBCard>
              {/* <MDBCardImage position='top' alt='...' src='img/homepage/deploy-logo.png' /> */}
              <MDBCardBody>
                <MDBCardTitle>TeamForge 22.3</MDBCardTitle>
                <MDBCardText>
                  <p>GA Oct 10, 2022</p>
                  <p>
                    With Digital.ai TeamForge, software teams have the
                    flexibility to choose the best possible workflows without
                    risking overall process compliance.
                  </p>
                </MDBCardText>
              </MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Get Started
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Install/Upgrade
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Plugins and Integrations
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Digital.ai by Example
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    REST API Docs
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Jython API Docs
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    DSL API Docs
                  </ActionButton>
                </MDBListGroupItem>
              </MDBListGroup>
              <MDBCardBody>
                {/* <ActionButton
                  type="tertiary"
                  href={useBaseUrl('/versions')}
                  target="_self">
                  Other Versions
                </ActionButton> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm="6">
            <MDBCard>
              {/* <MDBCardImage position='top' alt='...' src='img/homepage/deploy-logo.png' /> */}
              <MDBCardBody>
                <MDBCardTitle>TeamForge 22.2</MDBCardTitle>
                <MDBCardText>
                  <p>GA Jul 01, 2022</p>
                  <p>
                    With Digital.ai TeamForge, software teams have the
                    flexibility to choose the best possible workflows without
                    risking overall process compliance.
                  </p>
                </MDBCardText>
              </MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Get Started
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Install/Upgrade
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Plugins and Integrations
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Digital.ai by Example
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    REST API Docs
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Jython API Docs
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    DSL API Docs
                  </ActionButton>
                </MDBListGroupItem>
              </MDBListGroup>
              <MDBCardBody>
                {/* <ActionButton
                  type="tertiary"
                  href={useBaseUrl('/versions')}
                  target="_self">
                  Other Versions
                </ActionButton> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    </Section>
  );
}

function ReleaseCard2() {
  return (
    <Section className="GetStarted" background="light">
      <div className="cards">
        <MDBRow>
          <MDBCol sm="6">
            <MDBCard>
              {/* <MDBCardImage position='top' alt='...' src='img/homepage/release-logo.png' /> */}
              <MDBCardBody>
                <MDBCardTitle>TeamForge 22.1</MDBCardTitle>
                <MDBCardText>
                  <p>GA Apr 05, 2022</p>
                  <p>
                    With Digital.ai TeamForge, software teams have the
                    flexibility to choose the best possible workflows without
                    risking overall process compliance.
                  </p>
                </MDBCardText>
              </MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Get Started
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Install/Upgrade
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Plugins and Integrations
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Digital.ai by Example
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    REST API Docs
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Jython API Docs
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    DSL API Docs
                  </ActionButton>
                </MDBListGroupItem>
              </MDBListGroup>
              <MDBCardBody>
                {/* <ActionButton
                  type="tertiary"
                  href={useBaseUrl('/versions')}
                  target="_self">
                  Other Versions
                </ActionButton> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm="6">
            <MDBCard>
              {/* <MDBCardImage position='top' alt='...' src='img/homepage/deploy-logo.png' /> */}
              <MDBCardBody>
                <MDBCardTitle>TeamForge 22.0</MDBCardTitle>
                <MDBCardText>
                  <p>GA Jan 25, 2022</p>
                  With Digital.ai TeamForge, software teams have the flexibility
                  to choose the best possible workflows without risking overall
                  process compliance.
                </MDBCardText>
              </MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Get Started
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Install/Upgrade
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Plugins and Integrations
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Digital.ai by Example
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    REST API Docs
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    Jython API Docs
                  </ActionButton>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  <ActionButton
                    type="tertiary"
                    href={useBaseUrl('/versions')}
                    target="_self">
                    DSL API Docs
                  </ActionButton>
                </MDBListGroupItem>
              </MDBListGroup>
              <MDBCardBody>
                {/* <ActionButton
                  type="tertiary"
                  href={useBaseUrl('/versions')}
                  target="_self">
                  Other Versions
                </ActionButton> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    </Section>
  );
}

function TwitterButton({accountName}) {
  return (
    <a
      href={`https://twitter.com/intent/follow?screen_name=${accountName}&region=follow_link`}
      className="twitter-follow-button">
      <div className="icon" />
      Follow @{accountName}
    </a>
  );
}

// function GitHubStarButton() {
//   return (
//     <div className="github-button">
//       <GitHubButton
//         href="https://github.com/facebook/react-native"
//         data-icon="octicon-star"
//         data-size="large"
//         aria-label="Star facebook/react-native on GitHub">
//         Star
//       </GitHubButton>
//     </div>
//   );
// }

export function Section({
  element = 'section',
  children,
  className,
  background = 'light',
}) {
  const El = element;
  return (
    <El
      className={
        className
          ? `Section ${className} ${background}`
          : `Section ${background}`
      }>
      {children}
    </El>
  );
}

function TwoColumns({columnOne, columnTwo, reverse}) {
  return (
    <div className={`TwoColumns ${reverse ? 'reverse' : ''}`}>
      <div className={`column first ${reverse ? 'right' : 'left'}`}>
        {columnOne}
      </div>
      <div className={`column last ${reverse ? 'left' : 'right'}`}>
        {columnTwo}
      </div>
    </div>
  );
}

function ScreenRect({className, fill, stroke}) {
  return (
    <rect
      className={`screen ${className || ''}`}
      rx="3%"
      width="180"
      height="300"
      x="-90"
      y="-150"
      fill={fill}
      stroke={stroke}
    />
  );
}

// function LogoAnimation() {
//   return (
//     <svg
//       className="LogoAnimation init"
//       width={350}
//       height={350}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="-200 -200 400 400">
//       <title>React Logo</title>
//       <clipPath id="screen">
//         <ScreenRect fill="none" stroke="gray" />
//       </clipPath>
//       <rect
//         x="-25"
//         y="120"
//         width="50"
//         height="25"
//         rx="2"
//         fill="white"
//         stroke="none"
//         className="stand"
//       />
//       <polygon
//         points="-125,90 125,90 160,145 -160,145"
//         fill="white"
//         stroke="white"
//         strokeWidth="5"
//         strokeLinejoin="round"
//         className="base"
//       />
//       <ScreenRect className="background" stroke="none" />
//       <g clipPath="url(#screen)" className="logo">
//         <g className="logoInner">
//           <circle cx="0" cy="0" r="30" fill="#61dafb" />
//           <g stroke="#61dafb" strokeWidth="15" fill="none" id="logo">
//             <ellipse rx="165" ry="64" />
//             <ellipse rx="165" ry="64" transform="rotate(60)" />
//             <ellipse rx="165" ry="64" transform="rotate(120)" />
//           </g>
//         </g>
//         <line
//           x1="-30"
//           x2="30"
//           y1="130"
//           y2="130"
//           stroke="white"
//           strokeWidth="8"
//           strokeLinecap="round"
//           className="speaker"
//         />
//       </g>
//       <ScreenRect fill="none" stroke="white" />
//     </svg>
//   );
// }

function HeaderHero() {
  return (
    <Section background="tint" className="HeaderHero">
      <div className="socialLinks">
        <TwitterButton accountName="digitaldotai" />
      </div>
      <TwoColumns
        reverse
        columnTwo={
          <>
            <h1 className="title">Product Documentation</h1>
            <p className="tagline">
              Find answers to your technical questions and learn how to use our
              products
            </p>
            {/* <div className="buttons">
              <HomeCallToAction />
            </div> */}
          </>
        }
      />
    </Section>
  );
}

function NativeAppsRelease() {
  return (
    <Section className="NativeApps" background="light">
      <TwoColumns
        reverse
        columnOne={
          <>
            {/* <h2 className="title">Digital.ai TeamForge 23.1</h2> */}
            <div className="buttons">
              <HomeCallToActionRelease />
            </div>
          </>
          // <TextColumn
          //   title="Create native apps for Android, iOS, and more using React"
          //   text={textContent.intro}

          // />
        }
        columnTwo={
          <>
            <img alt="" src={useBaseUrl('img/homepage/teamforge-logo.jpg')} />
            <p className="tagline">
              Ensure governance, compliance, and code security standards are
              maintained in development.
            </p>
            <div className="vidWrapper">
              <iframe
                width="400"
                height="215"
                src="https://www.youtube.com/embed/N2kHTAck1LE"
                title="digital.ai TeamForge Overview"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            </div>
          </>
        }
      />
      {/* <br />
      <br />
      <br />

      <TwoColumns
        reverse
        columnOne={
          <>
            <h1 className="title">Deploy</h1>
            <p className="tagline">
              Improve DevOps efficiency by automating software deployment at
              scale across your multi-cloud infrastructure
            </p>
            <div className="buttons">
              <HomeCallToAction />
            </div>
          </>
          // <TextColumn
          //   title="Create native apps for Android, iOS, and more using React"
          //   text={textContent.intro}

          // />
        }
        columnTwo={
          <img alt="" src={useBaseUrl('img/homepage/deploy-logo.png')} />
        }
      /> */}
    </Section>
  );
}

function NativeAppsRN() {
  return (
    <Section className="NativeApps" background="light">
      <TwoColumns
        reverse
        columnOne={
          <TextColumn
            title="What's New in Digital.ai TeamForge 23.1?"
            text={textContent.intro}
          />
        }
        columnTwo={
          <img
            alt=""
            src={useBaseUrl('img/homepage/xl-kube-install-logo.jpg')}
          />
        }
      />
    </Section>
  );
}

function NativeCode() {
  return (
    <Section className="NativeCode" background="tint">
      <TwoColumns
        columnOne={
          <TextColumn
            title="Written in JavaScript—rendered with native code"
            text={textContent.nativeCode}
          />
        }
        columnTwo={
          <CodeBlock language="jsx">{textContent.codeExample}</CodeBlock>
        }
      />
    </Section>
  );
}

function NativeDevelopment() {
  return (
    <Section className="NativeDevelopment" background="light">
      <TwoColumns
        reverse
        columnOne={
          <TextColumn
            title="Native Development For Everyone"
            text={textContent.forEveryone}
          />
        }
        columnTwo={
          <div className="dissection">
            {[0, 1, 2, 3].map(i => (
              <img
                alt=""
                key={i}
                src={useBaseUrl(`img/homepage/dissection/${i}.png`)}
              />
            ))}
          </div>
        }
      />
    </Section>
  );
}

function CrossPlatform() {
  return (
    <Section className="CrossPlatform" background="tint">
      <TwoColumns
        columnOne={
          <TextColumn
            title="Seamless Cross-Platform"
            text={textContent.crossPlatform}
          />
        }
        columnTwo={<CrossPlatformSVG />}
      />
    </Section>
  );
}

function FastRefresh() {
  return (
    <Section className="FastRefresh" background="light">
      <TwoColumns
        reverse
        columnOne={
          <TextColumn title="Fast Refresh" text={textContent.fastRefresh} />
        }
        columnTwo={
          <video
            muted
            autoPlay
            loop
            playsInline
            src={useBaseUrl(`img/homepage/ReactRefresh.mp4`)}
          />
        }
      />
    </Section>
  );
}

function VideoContent() {
  return (
    <div>
      <Section className="VideoContent" background="tint">
        <br />
        <TwoColumns
          columnOne={
            <TextColumn
              title="Release and Deploy Overview"
              text={textContent.talks}
            />
          }
          columnTwo={
            <div className="vidWrapper">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/N2kHTAck1LE"
                title="digital.ai TeamForge Overview"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            </div>
          }
        />
        <br />
        <TwoColumns
          columnOne={
            <>
              <p>
                Digital.ai Deploy enables organizations to achieve fast, secure,
                and reliable deployments to multiple environments—including
                containers, private and public clouds, middleware, and
                mainframe.
                <br />
                Using simple self-service workflows, developers can spin new
                environments with governance and easily roll back if deployment
                failure happens.
              </p>
            </>
          }
          columnTwo={
            <div className="vidWrapper">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/-r3HJxbqK-o"
                title="digital.ai Deploy Overview"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            </div>
          }
        />
      </Section>
    </div>
  );
}

/* Community */

function AppList() {
  const {siteConfig} = useDocusaurusContext();
  const apps = Object.values(siteConfig.customFields.users)
    .flat()
    .filter(app => app.pinned);

  return (
    <ul className="AppList">
      {apps.map((app, i) => {
        const imgSource = !app.icon.startsWith('http')
          ? useBaseUrl('img/showcase/' + app.icon)
          : app.icon;
        return (
          <li key={i} className="item">
            {app.infoLink ? (
              <a href={app.infoLink}>
                <img src={imgSource} alt={app.name} />
              </a>
            ) : (
              <img src={imgSource} alt={app.name} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Community() {
  return (
    <Section className="Community" background="light">
      <div className="content">
        <Heading text="Facebook Supported, Community Driven" />
        <TwoColumns
          columnOne={
            <>
              <p className="firstP">
                <img src={useBaseUrl(`img/homepage/fb-logo.svg`)} alt="" />
                <span>
                  Facebook released React Native in 2015 and has been
                  maintaining it ever since.
                </span>
              </p>
              <p>
                In 2018, React Native had the{' '}
                <a href="https://octoverse.github.com/2018/projects#repositories">
                  2nd highest
                </a>{' '}
                number of contributors for any repository in GitHub. Today,
                React Native is supported by contributions from individuals and
                companies around the world including{' '}
                <span>
                  <a href="https://callstack.com/">Callstack</a>
                </span>
                ,{' '}
                <span>
                  <a href="https://expo.io/">Expo</a>
                </span>
                , <a href="https://infinite.red/">Infinite Red</a>,{' '}
                <a href="https://www.microsoft.com/">Microsoft</a> and{' '}
                <a href="https://swmansion.com/">Software Mansion</a>.
              </p>
              <p>
                Our community is always shipping exciting new projects and
                exploring platforms beyond Android and iOS with repos like{' '}
                <span>
                  <a href="https://github.com/microsoft/react-native-windows#readme">
                    React Native Windows
                  </a>
                </span>
                ,{' '}
                <a href="https://github.com/microsoft/react-native-macos#readme">
                  React Native macOS
                </a>{' '}
                and{' '}
                <a href="https://github.com/necolas/react-native-web#readme">
                  React Native Web
                </a>
                .
              </p>
            </>
          }
          columnTwo={
            <>
              <p>
                React Native is being used in thousands of apps, but it's likely
                you've already used it in one of these apps:
              </p>
              <AppList />
              <p>
                and <a href={useBaseUrl(`showcase`)}>many more</a>.
              </p>
            </>
          }
        />
      </div>
    </Section>
  );
}

function GetStarted() {
  return (
    <Section className="GetStarted" background="tint">
      <div className="content">
        <Heading text="What's New in Digital.ai TeamForge 23.1?" />
        {/* <ol className="steps">
          <li>
            <p>Run this</p>
            <div className="terminal">
              <code>npx react-native init MyTestApp</code>
            </div>
          </li>
          <li>
            <p>Read these</p>
            <HomeCallToAction />
          </li>
        </ol> */}
        Digital.ai TeamForge 23.1.0 includes the following new features:
        <ul>
          <li>Next generation extensibility python sdk tech preview</li>
          <li>Remote runner for running container-based tasks</li>
          <li>New application onboarding workflows</li>
          <li>Usability and performance enhancements</li>
          <li>Limit folder depth in Release</li>
          <li>Skip Nested variable interpolation for text type variables</li>
          <li>View string type variable values in string type fields</li>
          <li>Time frame last 7 days added for audit reports</li>
          <li>Limit minimal trigger polling interval</li>
          <li>Set expiration period for personal access token</li>
          <li>Log retention policy for container-based tasks</li>
          <li>Reordered sidebar navigation for template release</li>
        </ul>
        And more features, bug fixes, and enhancements.
        <br />
        <br />
        <p>
          See{' '}
          <a href="/docs/next/release-notes/release-notes-release">
            <b>Release Notes</b>
          </a>{' '}
          for more information.
        </p>
      </div>
    </Section>
  );
}

function RNCard() {
  return (
    <Section className="GetStarted" background="light">
      <div className="cards">
        <MDBRow>
          <MDBCol sm="12">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>Release Notes</MDBCardTitle>
                <MDBCardText>
                  <p>
                    Here's the list of Release Notes of all supported Release
                    Versions.
                  </p>
                </MDBCardText>
                <ActionButton
                  type="tertiary"
                  href="https://stage.docs.digital.ai/release/docs/release-notes/release-notes-release"
                  target="_self">
                  23.1
                </ActionButton>
                <ActionButton
                  type="tertiary"
                  href="https://stage.docs.digital.ai/release/docs/22.3/release-notes/release-notes-release"
                  target="_self">
                  22.3
                </ActionButton>
                <ActionButton
                  type="tertiary"
                  href="https://stage.docs.digital.ai/release/docs/22.2/release-notes/release-notes-release"
                  target="_self">
                  22.2
                </ActionButton>
                <ActionButton
                  type="tertiary"
                  href="https://stage.docs.digital.ai/release/docs/22.1/release-notes/release-notes-release"
                  target="_self">
                  22.1
                </ActionButton>
                <ActionButton
                  type="tertiary"
                  href="https://stage.docs.digital.ai/release/docs/22.0/release-notes/release-notes-release"
                  target="_self">
                  22.0
                </ActionButton>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    </Section>
  );
}

const Index = () => {
  return (
    <Layout
      description="Find answers to your technical questions and learn how to use our products"
      wrapperClassName="homepage">
      <Head>
        <title>digital.ai - Product Documentation</title>
        <meta
          property="og:title"
          content="digital.ai · Product Documentation"
        />
        <meta
          property="twitter:title"
          content="digital.ai · Product Documentation"
        />
      </Head>
      <NativeAppsRelease />
      <RNCard />
      {/* <GetStarted /> */}
      <ReleaseCard1 />
      <ReleaseCard2 />
      {/* <NativeAppsRN /> */}
      {/* <NativeCode />
      <NativeDevelopment />
      <CrossPlatform />
      <FastRefresh /> */}
      {/* <VideoContent /> */}
      {/* <Community /> */}
    </Layout>
  );
};

export default Index;
