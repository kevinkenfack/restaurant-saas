import React from "react";
import { useTranslation } from "react-i18next";
import { IconStar, IconQuote, IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = t("landing_page.testimonials.testimonials_list", { returnObjects: true });

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <IconStar
        key={index}
        size={16}
        className="text-yellow-400 fill-current"
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#70B56A]/10 text-[#70B56A] rounded-full text-sm font-medium mb-4">
            <IconQuote size={16} />
            {t("landing_page.testimonials.subtitle")}
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t("landing_page.testimonials.title")}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("landing_page.testimonials.description")}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {Object.entries(testimonials).map(([key, testimonial]) => (
            <div
              key={key}
              className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#70B56A]/30 hover:shadow-lg transition-all duration-200 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-[#70B56A] rounded-full flex items-center justify-center">
                <IconQuote size={16} className="text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6 mt-2">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-[#70B56A] to-[#4E944F] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 relative overflow-hidden rounded-2xl border-2 border-[#70B56A]/30">
          {/* Background avec tes couleurs */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#70B56A]/10 via-[#70B56A]/10 to-[#70B56A]/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(112,181,106,0.1),transparent_50%)]"></div>
          
          <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge simple */}
              <div className="inline-flex items-center gap-2 bg-[#70B56A]/10 px-4 py-2 rounded-full mb-8">
                <div className="w-2 h-2 bg-[#70B56A] rounded-full"></div>
                <span className="text-sm font-medium text-[#70B56A]">
                  {t("landing_page.testimonials.title")}
                </span>
              </div>
              
              {/* Titre */}
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 leading-tight">
                {t("landing_page.testimonials.trust_title")}
              </h3>
              
              {/* Cartes restaurants */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-[#70B56A] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                        LPB
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {t("landing_page.testimonials.trust_restaurants.restaurant_1")}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {t("landing_page.testimonials.trust_partners")}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center gap-4 w-max">
                    <div className="relative">
                      <div className="w-12 h-12 bg-[#70B56A] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                        CC
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {t("landing_page.testimonials.trust_restaurants.restaurant_2")}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {t("landing_page.testimonials.trust_partners")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bouton CTA */}
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-3 bg-[#70B56A] text-white text-lg font-semibold rounded-xl px-8 py-4 hover:bg-[#5fa75a] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>{t("landing_page.testimonials.trust_button")}</span>
                <IconArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 