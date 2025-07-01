import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LNavbar from "./LNavbar";
import { Link } from "react-router-dom";
import {
  IconChefHat,
  IconDeviceIpadHorizontal,
  IconLayout,
  IconCheck,
  IconArrowRight,
  IconPlus,
  IconMinus,
} from "@tabler/icons-react";
import Logo from "../../assets/logo.svg";
import { subscriptionPrice, supportEmail } from "../../config/config";
import LanguageChanger from "../../components/LanguageChanger";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Scroll smooth vers la section
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Scroll en haut si pas de hash
      window.scrollTo(0, 0);
    }
  }, [location]);

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
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-7 px-2 drop-shadow-lg">
              <span className="text-gray-900">
                {t("landing_page.pricing").split(' ')[0]}
              </span>
              <span className="bg-gradient-to-r from-[#70B56A] to-[#4E944F] bg-clip-text text-transparent ml-2">
                {t("landing_page.pricing").split(' ').slice(1).join(' ')}
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4 mt-2 sm:mt-3">
              {t("landing_page.pricing_description")}
            </p>
          </div>

          <div className="w-full max-w-full md:max-w-lg mx-auto px-2 md:px-4">
            <div className="relative bg-white rounded-2xl border border-gray-200 pt-14 p-8 sm:p-10 shadow-2xl shadow-green-900/10 overflow-visible flex flex-col items-center">
              {/* Badge Special Offer */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 bg-gradient-to-r from-[#4E944F] to-[#70B56A] text-white text-xs sm:text-sm font-semibold px-5 py-2 min-w-[210px] rounded-full shadow-lg border-2 border-white uppercase tracking-wide z-10 flex items-center justify-center">
                {t("landing_page.special_badge")}
              </span>
              {/* Prix */}
              <div className="text-center mb-6 sm:mb-8 mt-6">
                <div className="inline-block bg-gradient-to-r from-[#70B56A] to-[#4E944F] text-white text-5xl sm:text-6xl font-extrabold px-8 py-3 rounded-2xl shadow-lg border-4 border-white">
                  {subscriptionPrice}
                </div>
                <div className="text-base sm:text-lg text-gray-600 mt-2">
                  {t("landing_page.per_month")}
                </div>
              </div>

              {/* Avantages */}
              <ul className="space-y-4 mb-8 w-full">
                <li className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <IconCheck size={18} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-base font-medium">{t("landing_page.unlimited_orders")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <IconCheck size={18} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-base font-medium">{t("landing_page.monthly_renewals")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <IconCheck size={18} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-base font-medium">{t("landing_page.unlimited_devices")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <IconCheck size={18} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-base font-medium">{t("landing_page.live_kitchen_orders")}</span>
                </li>
              </ul>

              {/* Bouton d'action */}
              <Link
                to="/login"
                className="w-full bg-gradient-to-r from-[#70B56A] to-[#4E944F] hover:from-[#5fa75a] hover:to-[#3e7a3e] text-white text-lg font-bold rounded-xl px-6 py-4 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-green-200/40 border-2 border-[#70B56A]"
              >
                {t("landing_page.get_started")}
                <IconArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-gray-50/50" id="faq">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#243922] mb-3 sm:mb-4">
              {t("landing_page.faq_title")}
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl">
              {t("landing_page.faq_subtitle")}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-5">
            {[1, 2, 3, 4, 5, 6].map((item) => {
              const [isOpen, setIsOpen] = React.useState(item === 1);
              return (
                <div 
                  key={item} 
                  className={`border border-gray-200/80 bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'shadow-sm' : 'hover:shadow-sm hover:border-gray-300/70'
                  }`}
                >
                  <button
                    className={`w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none transition-colors duration-300 ease-in-out ${
                      isOpen ? 'bg-[#f8fbf8]' : 'bg-white hover:bg-gray-50/80'
                    }`}
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    <span className="text-lg font-medium text-[#243922] transition-colors duration-200">
                      {t(`landing_page.faq_question_${item}`)}
                    </span>
                    <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      {isOpen ? (
                        <IconMinus className="w-5 h-5 text-[#70B56A] flex-shrink-0" />
                      ) : (
                        <IconPlus className="w-5 h-5 text-[#70B56A] flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-600 text-base leading-relaxed">
                        {t(`landing_page.faq_answer_${item}`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
            {/* Colonne de gauche - Logo et description */}
            <div className="max-w-md w-full">
              <img 
                src={Logo} 
                alt="logo" 
                className="h-8 sm:h-10 w-auto mb-4"
              />
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('landing_page.footer_description')}
              </p>
            </div>

            {/* Colonne de droite - Liens */}
            <div className="w-full lg:w-auto">
              <div className="grid grid-cols-2 gap-6">
                {/* Liens rapides */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">
                    {t('landing_page.rapid_link_title_footer')}
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <a href="#features" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                        {t('landing_page.features')}
                      </a>
                    </li>
                    <li>
                      <a href="#pricing" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                        {t('landing_page.pricing_link')}
                      </a>
                    </li>
                    <li>
                      <a href="#faq" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                        {t('landing_page.faq')}
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Légaux */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">
                    {t('landing_page.legal_title_footer')}
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        to="/privacy-policy"
                        className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                      >
                        {t("landing_page.privacy_policy")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/refund-policy"
                        className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                      >
                        {t("landing_page.refund_policy")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/terms-conditions"
                        className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                      >
                        {t("landing_page.terms_conditions")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bas du footer */}
          <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} {t('landing_page.made_with_love')}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{t("landing_page.language")}</span>
              <LanguageChanger className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-lg px-3 py-1.5 text-sm transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
