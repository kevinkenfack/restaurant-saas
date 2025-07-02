import React from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import LNavbar from '../LandingPage/LNavbar';
import LandingFooter from '../LandingPage/LandingFooter';

export default function TermsConditionsPage() {
  const { t } = useTranslation();

  return (
    <Page className="w-full min-h-screen bg-gradient-to-b from-green-50/30 to-white pt-20 pb-0">
      {/* navbar fixed en haut */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LNavbar />
      </div>

      {/* padding top pour ne pas être caché par la navbar */}
      <div className="container mx-auto px-4 max-w-3xl mt-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('terms.title') || 'Terms & Conditions'}
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            {t('terms.intro_title') || 'Introduction'}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t('terms.intro_text') || 
              "These terms and conditions govern your use of our services. By accessing or using our services, you agree to these terms."}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            {t('terms.user_responsibilities_title') || 'User Responsibilities'}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            {t('terms.user_responsibilities_text') || 
              "You agree to use our services lawfully and not to misuse them in any way."}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            {t('terms.limitation_of_liability_title') || 'Limitation of Liability'}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t('terms.limitation_of_liability_text') || 
              "We are not liable for any damages resulting from the use or inability to use our services."}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            {t('terms.contact_title') || 'Contact Us'}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t('terms.contact_text') || 
              "If you have any questions about these terms, please contact us at support@yourcompany.com."}
          </p>
        </section>
      </div>
      <LandingFooter />
    </Page>
  );
}
