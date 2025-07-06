import React from "react";
import { useTranslation } from "react-i18next";
// Animation CSS à ajouter dans le global.css/tailwind.config.js si besoin :
// .animate-fade-in { animation: fadeIn 0.8s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
export default function RecommendedSetup() {
  const { t } = useTranslation();
  return (
    <section
      className="w-full flex justify-center py-16 relative animate-fade-in"
      aria-labelledby="recommended-setup-title"
    >
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl max-w-full mx-auto w-full">
        <div className="absolute inset-0"></div>
        <div className="absolute inset-0"></div>
      </div>
      <div className="relative z-10 bg-[#70B56A]/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 max-w-3xl w-full flex flex-col items-center">
        <h2
          id="recommended-setup-title"
          className="text-2xl sm:text-3xl font-bold text-[#243922] mb-4 text-center drop-shadow"
        >
          {t("landing_page.recommended_setup.title")}
        </h2>
        <p className="text-[#243922] text-base sm:text-lg mb-8 text-center max-w-2xl">
          {t("landing_page.recommended_setup.description")}
        </p>
        <figure className="w-full flex flex-col items-center">
          <img
            src="/assets/setup-recommended.png"
            alt={t("landing_page.recommended_setup", "Diagramme de l'installation recommandée pour le logiciel de gestion de restaurant.")}
            className="w-full max-w-2xl h-auto rounded-2xl border-2 border-[#70B56A] shadow-lg transition-transform duration-300 hover:scale-105 bg-white"
            loading="lazy"
          />
          <figcaption className="text-[#243922] text-sm mt-2 text-center">
            {t("landing_page.recommended_setup.img_caption", "Schéma de l'installation recommandée.")}
          </figcaption>
        </figure>
        <button
          className="mt-8 px-8 py-3 bg-[#70B56A] text-white text-base font-semibold rounded-xl shadow-lg hover:bg-[#5ea45a] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 min-w-[180px]"
        >
          {t("landing_page.recommended_setup.cta", "Découvrir le guide complet")}
        </button>
      </div>
    </section>
  );
}