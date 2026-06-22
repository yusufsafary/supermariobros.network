import React from 'react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,1)] bg-white p-8 space-y-3">
      <h2 className="font-display text-primary text-sm uppercase mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="pt-14 flex-1">
        <section className="bg-secondary py-12 px-4 text-center border-b-8 border-black">
          <h1 className="font-display text-white text-xl md:text-3xl uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-3">
            Privacy Policy
          </h1>
          <p className="text-white/80 text-sm">Last updated: June 2024</p>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="max-w-3xl mx-auto space-y-6">

            <Section title="Our Commitment">
              <p className="text-gray-800 text-base leading-relaxed">
                Your privacy matters. SuperMarioBros.Network is a fan-made project that exists purely for entertainment. We have designed this site to be as privacy-friendly as possible. We do not collect, store, or sell any personal information about you.
              </p>
            </Section>

            <Section title="What Information We Collect">
              <p className="text-gray-800 text-base leading-relaxed mb-3">
                <strong>Nothing directly.</strong> This site does not have a server that logs your visits, a database that stores user data, a registration system, or any forms that collect personal information.
              </p>
              <p className="text-gray-800 text-base leading-relaxed">
                All game data such as your score and number of lives exists only in your browser's memory for the duration of your session and is automatically gone when you close or refresh the page.
              </p>
            </Section>

            <Section title="Third-Party Services">
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                While we do not collect data ourselves, the following third-party services are involved in delivering this site to you:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 border-2 border-gray-300 p-4">
                  <p className="font-bold text-black text-sm mb-1">GitHub Pages</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    This site is hosted by GitHub Pages, a service provided by GitHub, Inc. GitHub may collect your IP address and other technical data as part of its infrastructure. GitHub's Privacy Statement is available at docs.github.com/site-policy/privacy-policies/github-general-privacy-statement.
                  </p>
                </div>
                <div className="bg-gray-50 border-2 border-gray-300 p-4">
                  <p className="font-bold text-black text-sm mb-1">Google Fonts</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    We use the Google Fonts API to load custom typefaces. When your browser requests a font file, Google may log your IP address and browser information. Google's Privacy Policy is available at policies.google.com/privacy.
                  </p>
                </div>
              </div>
            </Section>

            <Section title="Cookies">
              <p className="text-gray-800 text-base leading-relaxed">
                We do not set any cookies on your device. Third-party services loaded by this site may set their own cookies. Please refer to our{' '}
                <Link href="/cookie-policy" className="text-primary underline font-medium hover:text-red-700">Cookie Policy</Link>
                {' '}for full details.
              </p>
            </Section>

            <Section title="Children's Privacy">
              <p className="text-gray-800 text-base leading-relaxed">
                This site does not knowingly collect any information from children under the age of 13. If you are a parent or guardian and believe that your child has provided personal information to us, please contact us and we will take steps to remove that information. In practice, since we collect no information at all, this is not a concern.
              </p>
            </Section>

            <Section title="Links to Other Sites">
              <p className="text-gray-800 text-base leading-relaxed">
                This site contains a link to GitHub (github.com/yusufsafary). Once you leave this site and visit an external site, this Privacy Policy no longer applies. We encourage you to review the privacy policies of any external websites you visit.
              </p>
            </Section>

            <Section title="Your Rights">
              <p className="text-gray-800 text-base leading-relaxed mb-3">
                Because we do not collect any personal data, there is nothing to access, correct, or delete. That said, you have the following rights regardless:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-base">
                <li>You can clear your browser cache and local data at any time</li>
                <li>You can block third-party cookies via your browser settings</li>
                <li>You can use a browser extension to block Google Fonts requests</li>
              </ul>
            </Section>

            <Section title="Changes to This Policy">
              <p className="text-gray-800 text-base leading-relaxed">
                We may update this Privacy Policy if our practices change or if required by law. Any updates will be posted on this page. Since this is a simple fan project, significant changes are unlikely.
              </p>
            </Section>

            <Section title="Contact">
              <p className="text-gray-800 text-base leading-relaxed">
                For any questions or concerns about privacy on this site, please contact us via GitHub at github.com/yusufsafary.
              </p>
            </Section>

            <div className="text-center pt-4">
              <Link href="/" className="inline-flex bg-primary text-white font-bold px-8 py-4 border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,1)] hover:bg-red-600 transition-colors uppercase text-sm">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
