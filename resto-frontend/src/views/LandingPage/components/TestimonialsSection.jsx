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
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl p-8 border-2 border-[#70B56A]/20 shadow-sm relative">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t("landing_page.testimonials.trust_title")}
            </h3>
            
            <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
              {/* Logos fictifs - vous pouvez les remplacer par de vrais logos */}
              <div className="flex items-center gap-3 text-gray-700 font-semibold">
                <div className="w-10 h-10 bg-[#70B56A]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#70B56A] font-bold text-sm">LPB</span>
                </div>
                <span className="text-base">{t("landing_page.testimonials.trust_restaurants.restaurant_1")}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-semibold">
                <div className="w-10 h-10 bg-[#70B56A]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#70B56A] font-bold text-sm">CC</span>
                </div>
                <span className="text-base">{t("landing_page.testimonials.trust_restaurants.restaurant_2")}</span>
              </div>
            </div>

            {/* Bouton d'inscription */}
            <div className="mt-8">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-[#70B56A] hover:bg-[#70B56A]/90 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-200 active:scale-95"
              >
                {t("landing_page.get_started")}
                <IconArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 