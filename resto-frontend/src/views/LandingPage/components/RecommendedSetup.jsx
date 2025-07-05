import React from "react";
import { useTranslation } from "react-i18next";
export default function RecommendedSetup() {
const { t } = useTranslation();
  return (
    <section className="w-full flex justify-center py-16 bg-gray-50">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 max-w-3xl w-full flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
          {t("landing_page.recommended_setup.title")}
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-8 text-center max-w-2xl">
          {t("landing_page.recommended_setup.description")}
        </p>
        <img
          src="/assets/setup-recommended.png"
          alt="Recommended Setup Diagram"
          className="w-full max-w-2xl h-auto rounded-2xl border border-gray-100 shadow-md"
        />
      </div>
    </section>
  );
} 