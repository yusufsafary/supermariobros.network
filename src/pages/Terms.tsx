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

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="pt-14 flex-1">
        <section className="bg-primary py-12 px-4 text-center border-b-8 border-black">
          <h1 className="font-display text-white text-xl md:text-3xl uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-3">
            Terms of Use
          </h1>
          <p className="text-white/80 text-sm">Last updated: June 2024</p>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="max-w-3xl mx-auto space-y-6">

            <Section title="Agreement to Terms">
              <p className="text-gray-800 text-base leading-relaxed">
                By accessing and using SuperMarioBros.Network, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please stop using the site. Given that this is a free fan project with no accounts or purchases, these terms are intentionally simple.
              </p>
            </Section>

            <Section title="Nature of This Site">
              <p className="text-gray-800 text-base leading-relaxed mb-3">
                SuperMarioBros.Network is a fan-made, non-commercial tribute website. It is:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-base mb-3">
                <li>Completely free to use</li>
                <li>Not affiliated with Nintendo in any way</li>
                <li>Not endorsed by or connected to any video game company</li>
                <li>Not used for any commercial or revenue-generating purpose</li>
              </ul>
              <p className="text-gray-800 text-base leading-relaxed">
                Super Mario Bros is a registered trademark of Nintendo Co., Ltd. All rights to the original game, characters, and intellectual property belong to Nintendo.
              </p>
            </Section>

            <Section title="Permitted Use">
              <p className="text-gray-800 text-base leading-relaxed mb-3">
                You are welcome to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-base mb-3">
                <li>Play the game for personal entertainment</li>
                <li>Share the link to this site with friends and family</li>
                <li>Reference or discuss this site in non-commercial contexts</li>
              </ul>
              <p className="text-gray-800 text-base leading-relaxed">
                You are not permitted to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-base mt-2">
                <li>Use this site or its code for commercial purposes</li>
                <li>Attempt to access, interfere with, or disrupt the site's hosting infrastructure</li>
                <li>Use automated scripts or bots to interact with the site in a way that imposes an unreasonable load</li>
              </ul>
            </Section>

            <Section title="Intellectual Property">
              <p className="text-gray-800 text-base leading-relaxed mb-3">
                The source code for this site, including the React components, TypeScript files, and CSS, is the work of the developer and is available on GitHub. You may view, study, and adapt the code for personal non-commercial learning purposes.
              </p>
              <p className="text-gray-800 text-base leading-relaxed">
                The game concept, character designs, and general aesthetic are inspired by Nintendo's Super Mario Bros series. These elements remain the intellectual property of Nintendo Co., Ltd.
              </p>
            </Section>

            <Section title="No Warranties">
              <p className="text-gray-800 text-base leading-relaxed mb-3">
                This site is provided "as is" without any warranties of any kind, either express or implied. We do not guarantee that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 text-base">
                <li>The site will be available at all times</li>
                <li>The site will be free from bugs or errors</li>
                <li>The site will work on all browsers and devices</li>
              </ul>
            </Section>

            <Section title="Limitation of Liability">
              <p className="text-gray-800 text-base leading-relaxed">
                This is a hobby project with no commercial dimension. To the fullest extent permitted by law, the site owner shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this site or your inability to access it.
              </p>
            </Section>

            <Section title="Changes to These Terms">
              <p className="text-gray-800 text-base leading-relaxed">
                We may update these Terms of Use from time to time. Continued use of the site after any changes are posted constitutes your acceptance of the new terms. We will update the date at the top of this page when changes are made.
              </p>
            </Section>

            <Section title="Governing Law">
              <p className="text-gray-800 text-base leading-relaxed">
                These terms are governed by and construed in accordance with applicable law. Any disputes will be handled in good faith on a case-by-case basis. Again, since this is a free fan project with no transactions involved, significant disputes are very unlikely.
              </p>
            </Section>

            <Section title="Contact">
              <p className="text-gray-800 text-base leading-relaxed">
                For any questions about these Terms of Use, please reach out via GitHub at github.com/yusufsafary.
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
