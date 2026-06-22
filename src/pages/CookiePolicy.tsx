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

export default function CookiePolicy() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="pt-14 flex-1">
        <section className="bg-muted py-12 px-4 text-center border-b-8 border-black">
          <h1 className="font-display text-white text-xl md:text-3xl uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-3">
            Cookie Policy
          </h1>
          <p className="text-white/80 text-sm">Last updated: June 2024</p>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="max-w-3xl mx-auto space-y-6">

            <Section title="What Are Cookies">
              <p className="text-gray-800 text-base leading-relaxed">
                Cookies are small text files that websites store on your device when you visit them. They are widely used to make websites work properly, remember your preferences, and provide information to the website owner about how visitors use the site.
              </p>
            </Section>

            <Section title="Does This Site Use Cookies?">
              <p className="text-gray-800 text-base leading-relaxed mb-3">
                SuperMarioBros.Network is a static fan site hosted on GitHub Pages. We do not run any servers of our own, we do not use tracking cookies, and we do not collect any personal data from visitors.
              </p>
              <p className="text-gray-800 text-base leading-relaxed">
                We do not use advertising networks, analytics platforms, or any third-party services that would place tracking cookies on your device.
              </p>
            </Section>

            <Section title="Third-Party Cookies">
              <p className="text-gray-800 text-base leading-relaxed mb-3">
                While we do not place any cookies ourselves, some third-party services that the site loads may set their own cookies:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-800 text-base">
                <li>
                  <strong>Google Fonts</strong> - We use Google Fonts to display the Press Start 2P and Inter typefaces. Google may set cookies or log your IP address when your browser requests these fonts. You can read more in Google's Privacy Policy at policies.google.com.
                </li>
                <li>
                  <strong>GitHub Pages</strong> - This site is hosted on GitHub Pages. GitHub may collect basic technical data such as your IP address for security and operational purposes. See GitHub's Privacy Statement at docs.github.com/site-policy/privacy-policies for more information.
                </li>
              </ul>
            </Section>

            <Section title="How to Control Cookies">
              <p className="text-gray-800 text-base leading-relaxed mb-3">
                You can control and manage cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-base">
                <li>View cookies stored on your device</li>
                <li>Delete all or specific cookies</li>
                <li>Block cookies from all sites or specific sites</li>
                <li>Set preferences for how cookies are handled</li>
              </ul>
              <p className="text-gray-800 text-base leading-relaxed mt-3">
                Please note that blocking cookies may affect how some websites function. For this site specifically, it will have no impact since we do not rely on cookies for any functionality.
              </p>
            </Section>

            <Section title="Changes to This Policy">
              <p className="text-gray-800 text-base leading-relaxed">
                We may update this Cookie Policy from time to time if our practices change. Any updates will be reflected on this page. Since this is a small fan project that does not collect data, significant changes are unlikely.
              </p>
            </Section>

            <Section title="Contact">
              <p className="text-gray-800 text-base leading-relaxed">
                If you have any questions about cookies or this policy, you are welcome to reach out via GitHub at github.com/yusufsafary.
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
