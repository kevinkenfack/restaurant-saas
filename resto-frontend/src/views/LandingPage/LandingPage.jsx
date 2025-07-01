import React from "react";
import LNavbar from "./LNavbar";
import { Link } from "react-router-dom";
import {
  IconChefHat,
  IconDeviceIpadHorizontal,
  IconLayout,
  IconCheck,
  IconArrowRight,
} from "@tabler/icons-react";
import Logo from "../../assets/logo.svg";
import { subscriptionPrice, supportEmail } from "../../config/config";
import LanguageChanger from "../../components/LanguageChanger";
import { useTranslation } from "react-i18next";

export default function LadingPage() {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white text-gray-800" id="home">
      {/* navbar */}
      <LNavbar />
      
      {/* hero section */}
      <div className="w-full bg-gradient-to-b from-green-50/30 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 pb-24 sm:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              {t("landing_page.all_in_one_pos")}
              <br />
              <span className="text-[#70B56A]">{t("landing_page.for_your_business")}</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-6 sm:mt-8 max-w-2xl mx-auto leading-relaxed px-2">
              {t("landing_page.hero_description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 px-4 sm:px-0">
              <Link
                className="w-full sm:w-auto bg-[#70B56A] hover:bg-[#70B56A]/90 text-white text-base sm:text-lg font-medium rounded-xl px-6 sm:px-8 py-3 sm:py-4 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 min-w-[160px]"
                to="/login"
              >
                {t("landing_page.get_started")}
                <IconArrowRight size={18} className="sm:w-5 sm:h-5" />
              </Link>
              <a
                className="w-full sm:w-auto border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-base sm:text-lg font-medium rounded-xl px-6 sm:px-8 py-3 sm:py-4 transition-all duration-200 active:scale-95 text-center min-w-[160px]"
                href="#pricing"
              >
                {t("landing_page.view_pricing")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* hero image */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 -mt-12 sm:-mt-16">
        <div className="max-w-5xl mx-auto">
          <img
            src="/assets/hero.png"
            alt="restro pro image"
            className="w-full rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl shadow-gray-900/10"
          />
        </div>
      </div>

      {/* features section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-32" id="features">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            {t("landing_page.features")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            {t("landing_page.features_description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <div className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-[#70B56A]/20 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#70B56A] mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
              <IconLayout size={24} className="sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t("landing_page.minimal_ui")}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {t("landing_page.minimal_ui_description")}
            </p>
          </div>

          <div className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-[#70B56A]/20 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#70B56A] mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
              <IconDeviceIpadHorizontal size={24} className="sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t("landing_page.pos")}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {t("landing_page.pos_description")}
            </p>
          </div>

          <div className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-[#70B56A]/20 hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#70B56A] mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
              <IconChefHat size={24} className="sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t("landing_page.live_updates")}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {t("landing_page.live_updates_description")}
            </p>
          </div>
        </div>
      </div>

      {/* pricing section */}
      <div className="bg-gray-50/50 py-20 sm:py-32" id="pricing">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              {t("landing_page.pricing")}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              {t("landing_page.pricing_description")}
            </p>
          </div>

          <div className="max-w-sm mx-auto px-4">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-4xl sm:text-5xl font-bold text-[#70B56A] mb-2">
                  {subscriptionPrice}
                </div>
                <div className="text-base sm:text-lg text-gray-600">
                  {t("landing_page.per_month")}
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <IconCheck size={12} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">{t("landing_page.unlimited_orders")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <IconCheck size={12} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">{t("landing_page.monthly_renewals")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <IconCheck size={12} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">{t("landing_page.unlimited_devices")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <IconCheck size={12} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">{t("landing_page.live_kitchen_orders")}</span>
                </li>
              </ul>

              <Link
                to="/login"
                className="w-full bg-[#70B56A] hover:bg-[#70B56A]/90 text-white text-base sm:text-lg font-medium rounded-xl px-6 py-3 sm:py-4 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
              >
                {t("landing_page.get_started")}
                <IconArrowRight size={18} className="sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-20 sm:py-32" id="contact">
        <div className="bg-gradient-to-r from-[#243922] to-[#2d4529] rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-20 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            {t("cta.title")}
          </h2>
          <p className="text-lg sm:text-xl text-green-100 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto bg-white text-[#243922] text-base sm:text-lg font-medium rounded-xl px-6 sm:px-8 py-3 sm:py-4 hover:bg-gray-50 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 min-w-[160px]"
            >
              {t("cta.button")}
              <IconArrowRight size={18} className="sm:w-5 sm:h-5" />
            </Link>
            <a
              href={`mailto:${supportEmail}`}
              className="w-full sm:w-auto border border-white/20 text-white text-base sm:text-lg font-medium rounded-xl px-6 sm:px-8 py-3 sm:py-4 hover:bg-white/10 transition-all duration-200 active:scale-95 text-center min-w-[160px]"
            >
              {t("cta.contact")}
            </a>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8">
            <div className="max-w-sm w-full lg:w-auto">
              <img src={Logo} alt="logo" className="h-8 sm:h-10 mb-3 sm:mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-4 sm:mb-6">
                {t('landing_page.footer_description')}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{t("landing_page.language")}</span>
                <LanguageChanger className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-lg px-3 py-1.5 text-sm transition-colors" />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full lg:w-auto">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 px-3 sm:px-4 py-2 rounded-lg hover:bg-white transition-colors text-sm text-center sm:text-left"
              >
                {t("landing_page.privacy_policy")}
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 px-3 sm:px-4 py-2 rounded-lg hover:bg-white transition-colors text-sm text-center sm:text-left"
              >
                {t("landing_page.refund_policy")}
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 px-3 sm:px-4 py-2 rounded-lg hover:bg-white transition-colors text-sm text-center sm:text-left"
              >
                {t("landing_page.terms_conditions")}
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
            <p className="text-sm text-gray-500">
              {t("landing_page.made_with_love")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}