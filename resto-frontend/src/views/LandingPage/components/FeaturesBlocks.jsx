import React from "react";
import { useTranslation } from "react-i18next";

export default function FeaturesBlocks() {
  const { t } = useTranslation();

  const features = t("landing_page.features_blocks.blocks", { returnObjects: true });

  return (
    <section className="py-20 bg-white" id="features-blocks">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("landing_page.features_blocks.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("landing_page.features_blocks.subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="flex flex-col gap-10 max-w-6xl mx-auto">
          {Object.entries(features).map(([key, feature], idx) => (
            <div
              key={key}
              className="group flex flex-col md:flex-row items-center relative overflow-hidden rounded-2xl border-2 border-[#70B56A]/30 p-5 md:p-12 gap-8 md:gap-12 shadow-lg"
            >
              {/* Background overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#70B56A]/10 via-[#70B56A]/10 to-[#70B56A]/10 pointer-events-none"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(112,181,106,0.10),transparent_50%)] pointer-events-none"></div>
              {/* Contenu principal */}
              <div className="relative z-10 flex-1 md:pr-8 text-left w-full md:self-start mt-4 md:mt-15">
                <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-10 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-base md:text-xl text-gray-600 mb-6">
                  {feature.description}
                </p>
                {feature.cta && (
                  <a
                    href={feature.cta.url || '#'}
                    className="inline-flex items-center px-5 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-semibold shadow-sm hover:bg-gray-100 transition group"
                  >
                    {feature.cta.label || 'En savoir plus'}
                    <span className="ml-2 text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                )}
              </div>
              {/* Image à droite, sans fond ni padding */}
              <div className="relative z-10 flex-1 flex justify-center items-stretch w-full h-full">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}