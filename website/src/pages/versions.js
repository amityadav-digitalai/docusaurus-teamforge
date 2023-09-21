/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '@theme/Layout';

import useBaseUrl from '@docusaurus/useBaseUrl';
const versions = require('../../versions.json');

const VersionItem = ({version, currentVersion}) => {
  const versionName = version === 'next' ? 'Master' : version;

  const isCurrentVersion = currentVersion === version;
  const isNext = version === 'next';
  const isRC = version.toUpperCase().indexOf('-RC') !== -1;

  const latestMajorVersion = versions[0].toUpperCase().replace('-RC', '');
  const documentationLink = (
    <a
      href={useBaseUrl(
        'docs/' + (isCurrentVersion ? '' : version + '/') + 'getting-started'
      )}>
      Documentation
    </a>
  );
  // let releaseNotesURL = 'https://github.com/facebook/react-native/releases';
  // let releaseNotesTitle = 'Changelog';
  // if (isNext) {
  //   releaseNotesURL = `https://github.com/facebook/react-native/compare/${latestMajorVersion}-stable...main`;
  //   releaseNotesTitle = 'Commits since ' + latestMajorVersion;
  // } else if (!isRC) {
  //   releaseNotesURL = `https://github.com/facebook/react-native/releases/tag/v${version}.0`;
  // }

  // const releaseNotesLink = <a href={releaseNotesURL}>{releaseNotesTitle}</a>;

  return (
    <tr>
      <th>{versionName}</th>
      <td>{documentationLink}</td>
      {/* <td>{releaseNotesLink}</td> */}
    </tr>
  );
};

const Versions = () => {
  const currentVersion = versions.length > 0 ? versions[0] : null;
  const latestVersions = ['next'].concat(
    versions.filter(version => version.indexOf('-RC') !== -1)
  );
  const stableVersions = versions.filter(
    version => version.indexOf('-RC') === -1 && version !== currentVersion
  );

  return (
    <Layout title="Versions" wrapperClassName="versions-page">
      <h1>Digital.ai Release Versions</h1>
      <p>
        <ul>
          <li>
            The last released production version is Digital.ai Release 23.1.
          </li>
          <li>
            The upcoming release in Oct 2023 (Next version) is Digital.ai
            Release 23.3.
          </li>
        </ul>
      </p>
      <h2>Next version (Unreleased—GA on Oct2023)</h2>
      <p>
        To see what changes are coming and provide better feedback to
        digital.ai, use the last released GA version.
      </p>
      <table className="versions">
        <tbody>
          {latestVersions.map(version => (
            <VersionItem
              key={'version_' + version}
              version={version}
              currentVersion={currentVersion}
            />
          ))}
        </tbody>
      </table>
      <h2>Latest version</h2>
      <table className="versions">
        <tbody>
          <VersionItem
            key={'version_' + currentVersion}
            version={currentVersion}
            currentVersion={currentVersion}
          />
        </tbody>
      </table>
      <h2>Previous versions</h2>
      <table className="versions">
        <tbody>
          {stableVersions.map(version => (
            <VersionItem
              key={'version_' + version}
              version={version}
              currentVersion={currentVersion}
            />
          ))}
        </tbody>
      </table>
      <h2>Archived versions</h2>
      <p>
        The documentation for versions below <code>10.3</code> can be found on
        the separate website called{' '}
        <a href="https://archive.reactnative.dev/versions">
          Digital.ai Archived Docs
        </a>
        .
      </p>
    </Layout>
  );
};

export default Versions;
