import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";

export const metadata = {
  title: "Terms of Service - CREFinderAI",
  description: "Terms of service for CREfinder.ai - your agreement for using our commercial real estate platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col light">
      <NavBar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="space-y-8 text-gray-700">
              <section>
                <p className="mb-4 font-semibold">Effective Date: August 1, 2025</p>
                <p className="mb-4">
                  These Terms of Service ("Agreement") govern your use of the CREfinder.ai platform and services provided by aipixel L.L.C. ("Company," "we," "our," or "us").
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing or using CREfinder.ai, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="mb-4">
                  CREfinder.ai is a commercial real estate platform that provides property data, owner information, and related services to help users identify and connect with commercial property opportunities.
                </p>
                <p className="mb-4">
                  The Services include but are not limited to:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Property search and discovery tools</li>
                  <li>Property owner contact information</li>
                  <li>Market data and analytics</li>
                  <li>Lead generation and management tools</li>
                  <li>Communication and outreach capabilities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
                <p className="mb-4">
                  To access certain features of the Services, you must register for an account. You agree to:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
                <p className="mb-4">
                  You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Use the Services for any illegal or unauthorized purpose</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Transmit spam, unsolicited communications, or malicious content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the Services</li>
                  <li>Use automated tools to access the Services without permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data and Privacy</h2>
                <p className="mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy located at{" "}
                  <a href="https://crefinder.ai/privacy" className="text-blue-600 hover:text-blue-800 underline">
                    https://crefinder.ai/privacy
                  </a>
                  , which is hereby incorporated into this Agreement.
                </p>
                <p className="mb-4">
                  You retain ownership of any data you provide to us. We may use aggregated, anonymized data for improving our Services and developing new features.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Fees and Payment</h2>
                <p className="mb-4">
                  Certain features of the Services may require payment of fees. All fees are non-refundable unless otherwise specified. We reserve the right to change our pricing at any time with reasonable notice.
                </p>
                <p className="mb-4">
                  Payment processing is handled by third-party providers. We do not store your payment information on our servers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                <p className="mb-4">
                  The Services and all content, features, and functionality are owned by Company and are protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p className="mb-4">
                  You are granted a limited, non-exclusive, non-transferable license to use the Services for your personal or business use in accordance with these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers and Limitations</h2>
                <p className="mb-4">
                  The Services are provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of any information provided through the Services.
                </p>
                <p className="mb-4">
                  To the maximum extent permitted by law, Company shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
                <p className="mb-4">
                  We may terminate or suspend your account and access to the Services at any time, with or without notice, for any reason, including violation of these Terms.
                </p>
                <p className="mb-4">
                  You may terminate your account at any time by contacting us or using the account deletion features in the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
                <p className="mb-4">
                  We reserve the right to modify these Terms at any time. We will notify you of any material changes by email or through the Services. Your continued use of the Services after such changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
                <p className="mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us at{" "}
                  <a href="mailto:support@crefinder.ai" className="text-blue-600 hover:text-blue-800 underline">
                    support@crefinder.ai
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
