import React from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import LNavbar from '../LandingPage/LNavbar';

export default function RefundPolicyPage() {
  const { t } = useTranslation();

  return (
    <Page className="w-full min-h-screen bg-gradient-to-b from-green-50/30 to-white py-12">
      {/* navbar fixed en haut */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LNavbar />
      </div>

      {/* padding top pour ne pas être caché par la navbar */}
      <div className="pt-20 container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('refund.title') || 'Politique de remboursement'}
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            {t('refund.intro_title') || 'Introduction'}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t('refund.intro_text') || 
              "Nous voulons que vous soyez entièrement satisfait de votre achat. Si vous n'êtes pas satisfait, voici notre politique de remboursement."}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            {t('refund.conditions_title') || 'Conditions de remboursement'}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            {t('refund.conditions_text') || 
              "Les remboursements sont possibles dans les 14 jours suivant l'achat, à condition que le produit/service n'ait pas été utilisé ou consommé."}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            {t('refund.process_title') || 'Processus de remboursement'}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t('refund.process_text') || 
              "Pour demander un remboursement, veuillez contacter notre support client avec les détails de votre achat. Nous traiterons votre demande dans les plus brefs délais."}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">
            {t('refund.contact_title') || 'Nous contacter'}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t('refund.contact_text') || 
              "Pour toute question concernant cette politique, contactez-nous à support@votreentreprise.com."}
          </p>
        </section>
      </div>
    </Page>
  );
}
