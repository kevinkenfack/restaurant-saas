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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {Object.entries(features).map(([key, feature]) => (
            <div
              key={key}
              className="group bg-white p-5 rounded-2xl border border-[#70B56A]/30 hover:border-[#70B56A]/30 hover:shadow-lg duration-300"
            >
              {/* Image */}
              <div className="mb-6">
                <div className="relative overflow-hidden rounded-xl min-h-64">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div 
                    className="hidden w-full h-full bg-gradient-to-br from-[#70B56A]/20 to-[#4E944F]/20 rounded-xl items-center justify-center"
                    style={{ display: 'none' }}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#70B56A] rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {feature.title.charAt(0)}
                        </span>
                      </div>
                      <p className="text-[#70B56A] font-semibold text-sm">{feature.title}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#70B56A] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 