import React , { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import LNavbar from '../LandingPage/LNavbar';
import LandingFooter from '../LandingPage/LandingFooter';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Page className="w-full min-h-screen bg-gradient-to-b from-green-50/30 to-white pt-20 pb-0">
      {/* navbar fixed en haut */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LNavbar />
      </div>

      {/* padding top pour ne pas être caché par la navbar */}
      <div className="container mx-auto px-4 max-w-3xl mt-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('privacy.title') || 'Politique de confidentialité'}
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            {t('privacy.intro_title') || 'Introduction'}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t('privacy.intro_text') || 
              "Votre vie privée est importante pour nous. Cette politique explique quelles données nous collectons, pourquoi nous les collectons, et comment nous les utilisons."}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            {t('privacy.data_collection_title') || 'Données collectées'}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            {t('privacy.data_collection_text') || 
              "Nous collectons des informations que vous nous fournissez directement (comme votre nom et email) ainsi que des données automatiquement recueillies lors de l'utilisation du service."}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            {t('privacy.use_of_data_title') || "Utilisation des données"}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t('privacy.use_of_data_text') || 
              "Les données collectées sont utilisées pour fournir et améliorer nos services, communiquer avec vous, et assurer la sécurité de la plateforme."}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            {t('privacy.security_title') || "Sécurité des données"}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t('privacy.security_text') || 
              "Nous prenons des mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé."}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            {t('privacy.contact_title') || "Nous contacter"}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t('privacy.contact_text') || 
              "Pour toute question sur cette politique, veuillez nous contacter à l'adresse email support@votreentreprise.com."}
          </p>
        </section>
      </div>
      <LandingFooter />
    </Page>
  );
}
