import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const SecurityPolicy = () => (

    <Layout>
    <Seo title="Security Policy" />
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-left lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-5xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-6xl md:mx-auto">
          Security Policy
        </h2>
      </div>
      <div className="prose max-w-full">
          Note: this policy has been adapted from the&nbsp;
          <a href="https://sylabs.io/security-policy">Sylabs security policy</a>.
          <h2><strong>Apptainer Security</strong></h2>
          <p>
              HPCng has delegated the responsibility of managing the security of Apptainer to a few of us from the Apptainer community who are collectively known as the Apptainer Security team, and this web page documents the security policy we follow.
          </p>
          <h3><b>Do you think you found a vulnerability?</b></h3>
          <p>
              If you believe you have discovered a vulnerability in Apptainer, please let us know. You can notify our team by email at <a href="mailto:security@apptainer.org">security@apptainer.org</a>.
          </p>
          <p>
              We encourage people who contact the Apptainer Security team to use email encryption. <a href="/singularity-security.pub">Get our PGP public key</a> and verify the fingerprint:
          </p>
          <p>F642 B2B2 5989 AA44 D987  225C 6F21 6032 31A3 462A</p>
          <h3><b>The goals of a standardized security response procedure</b></h3>
          <p>
            Before we cover the procedure that the Apptainer Security team takes to mitigate newly discovered vulnerabilities, let's talk about the goals we're trying to achieve. 
          </p>
          <ul>
              <li>
                  <strong><b>Fast turnaround: </b></strong>
                  Even vulnerabilities that have not been announced publicly are a
                  potential source of danger because a savvy hacker may be able to
                  discover and exploit them independently. Our procedures are
                  designed to first understand and then quickly remediate as primary
                  goals.
              </li>
          </ul>
          <ul>
              <li>
                  <strong><b>Limited exposure: </b></strong>
                  Before patches are developed and made available, our goal is to limit
                  the spread of information until after a patch is available and key
                  stakeholders are protected
              </li>
          </ul>
          <ul>
              <li>
                  <strong><b>Transparency: </b></strong>
                  The open-source community must know exactly what the Apptainer Security team intends to do
                  about vulnerabilities and how we are are carrying out our commitment
                  to security. Vulnerabilities are documented using the Common
                  Vulnerabilities and Exposures (CVE) system to provide a permanent
                  searchable record allowing administrators to accurately judge the
                  risks of running a particular version of Apptainer within their
                  environment.
              </li>
          </ul>
          <ul>
              <li>
                  <strong><b>Enable stakeholders over malicious actors: </b></strong>
                  When a new vulnerability is publicly announced, a race begins between
                  system administrators and those with nefarious intent. HPCng
                  collaborators that distribute Apptainer only in binary form are provided security patches prior to security
                  announcements.  They then distribute patched binaries to their stakeholders as a head start in the security race. Although
                  patched binaries are made available to Apptainer stakeholders first, they
                  are provided without releasing security-related information.
                  This limits exposure to the open source community while still
                  providing a way of remediation for Apptainer stakeholders, with a
                  level of proactive measure.
              </li>
          </ul>
          <h3><b>Apptainer vulnerability procedure</b></h3>
          <p>
              When a vulnerability is discovered, the Apptainer Security team takes the following
              steps:
          </p>
          <ol>
              <li>
                  Perform due diligence to fully replicate and describe the scope and
                  severity of the bug. (This step is expected to take hours, not
                  days.)
              </li>
              <li>
                  A CVE number is requested and embargoed until public release is
                  made.
              </li>
              <li>
                  Security patch(es) are confidentially developed. (This step is
                  expected to take hours or days and will be carried out with
                  appropriate urgency.)
              </li>
              <li>
                  Security patches are merged into test versions of Apptainer and
                  testing commences. Bugs related to patch(es) are fixed
                  and testing is repeated as necessary. (This process is expected to
                  take days.)
              </li>
              <li>
                  Once patch(es) are developed and fully tested, they are pushed to a&nbsp;
                  <a href="https://docs.github.com/en/code-security/security-advisories/about-github-security-advisories">GitHub Security Advisory</a>
                  &nbsp;which keeps them hidden until ready for public disclosure.
              </li>
              <li>
                  The GitHub Security Advisory is shared with HPCng collaborators that distribute binary versions of Apptainer.
              </li>
              <li>
                  The HPCng collaborators then prepare their binaries and notify their stakeholders only with a standard notification that
                  there is a new binary and they should
                  upgrade. This notice will NOT contain any sensitive information
                  and will NOT disclose the presence of a security-related patch.
              </li>
              <li>
                  The stakeholders of HPCng collaborators are given a reasonable amount of time to
                  upgrade their installations so that when details of the exploit are
                  revealed they are already protected.
              </li>
              <li>
                  After a reasonable period of time has elapsed and stakeholders
                  have likely upgraded (and on a Tuesday where possible as
                  several administrators have&nbsp;
                  <a href="https://groups.google.com/a/lbl.gov/forum/#!topic/singularity/FgHj7WhqIE8">suggested</a>),
                  the patches will be merged from the private development space into the
                  public repository and a release will immediately be made. The
                  release notes will do the following:
                  <ol type="a">
                      <li>
                          Describe the issue in sufficient detail so that affected parties
                          can judge whether to upgrade.
                      </li>
                      <li>
                          If there is a mitigation or workaround detail it. If there
                          is not, explicitly say there is no known workaround.
                      </li>
                      <li>
                          State whether a malicious user needs access to the system to
                          exploit the vulnerability or whether it can be exploited
                          remotely.
                      </li>
                      <li>
                          State which versions of Apptainer are affected and which
                          OS-es/kernels are affected.
                      </li>
                      <li>
                          Reference relevant CVE number(s).
                      </li>
                  </ol>
              </li>
              <li>
                  At the same time that a release is being made, the CVE(s) will be
                  filled out with all relevant information and released from embargo.
              </li>
              <li>
                  Announcements will be made on Slack and on the Google Group that a new
                  version of Apptainer is available with all relevant security
                  information and links to release notes.
              </li>
          </ol>
      </div>
  </div>
  </Layout>
)
export default SecurityPolicy
