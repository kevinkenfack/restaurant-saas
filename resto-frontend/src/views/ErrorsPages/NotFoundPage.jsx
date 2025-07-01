import React from 'react';
import { useTranslation } from 'react-i18next';
import Page from "../../components/Page";
import { IconChevronLeft, IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Page className='w-full min-h-screen bg-gradient-to-b from-green-50/30 to-white'>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen text-center max-w-lg">

        {/* Icon */}
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-6">
          <IconSearch size={36} />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {t('not_found.title') || 'Page non trouvée'}
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg mb-8 px-4">
          {t('not_found.description') || 
            'Désolé, la page que vous recherchez n’existe pas ou a été déplacée. Vérifiez l’URL ou retournez à l’accueil.'}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
          <button 
            onClick={() => navigate(-1)} 
            className='bg-[#70B56A] hover:bg-[#70B56A]/90 text-white rounded-xl px-6 py-3 text-base font-medium transition active:scale-95 flex items-center justify-center gap-2'
          >
            <IconChevronLeft size={18} /> {t('not_found.go_back') || 'Retour'}
          </button>

          <button 
            onClick={() => navigate('/')} 
            className='border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl px-6 py-3 text-base font-medium transition active:scale-95'
          >
            {t('not_found.go_home') || 'Accueil'}
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-10">
          {t('not_found.error_code') || 'Erreur 404'}
        </p>
      </div>
    </Page>
  );
}
