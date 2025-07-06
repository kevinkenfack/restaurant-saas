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
  IconShoppingCart,
  IconPackage,
  IconTable,
  IconChartBar,
  IconMenu2,
  IconUsers,
  IconBell,
  IconReceipt,
  IconMessage
} from "@tabler/icons-react";
import Logo from "../../assets/logo.svg";
import { subscriptionPrice, supportEmail } from "../../config/config";
import LanguageChanger from "../../components/LanguageChanger";
import { useTranslation } from "react-i18next";
import ProductDemo from "./components/ProductDemo";
import TestimonialsSection from "./components/TestimonialsSection";
import FeaturesBlocks from "./components/FeaturesBlocks";
import LandingFooter from "./LandingFooter";
import RecommendedSetup from "./components/RecommendedSetup";

export default function LandingPage() {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Gestion du scroll fluide pour les ancres
    const handleAnchorClick = (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        const targetId = href === '#' ? 'top' : href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Bloquer temporairement le scroll automatique
          document.documentElement.style.scrollBehavior = 'auto';
          
          // Scroll immédiat sans animation
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'auto'
          });
          
          // Réactiver le smooth scroll après un court délai
          setTimeout(() => {
            document.documentElement.style.scrollBehavior = 'smooth';
          }, 100);
          
          // Mettre à jour l'URL
          window.history.pushState({}, '', href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Gestion du chargement initial avec ancre
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Désactiver temporairement le smooth scroll
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Scroll immédiat
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'auto'
        });
        
        // Réactiver le smooth scroll après
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = 'smooth';
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
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
      <div className="py-20 bg-gray-50" id="features">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("landing_page.features_heading")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("landing_page.features_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(t("landing_page.features_list", { returnObjects: true })).map(([key, feature]) => {
              const IconComponent = {
                IconShoppingCart: IconShoppingCart,
                IconPackage: IconPackage,
                IconTable: IconTable,
                IconChartBar: IconChartBar,
                IconMenu2: IconMenu2,
                IconUsers: IconUsers,
                IconBell: IconBell,
                IconReceipt: IconReceipt,
                IconMessage: IconMessage,
              }[feature.icon] || IconLayout;

              return (
                <div 
                  key={key}
                  className="group bg-white p-8 rounded-xl border border-gray-100 hover:border-[#70B56A]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center text-[#70B56A] mb-6 group-hover:bg-green-100 transition-colors duration-300">
                    <IconComponent size={28} className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Blocks Section */}
      <FeaturesBlocks />

      {/* Testimonials Section */}
      <TestimonialsSection />

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

          <div className="w-full max-w-3xl mx-auto px-2 md:px-4">
            <div className="relative bg-white rounded-2xl border border-[#70B56A]/30 pt-14 p-8 sm:p-10 shadow-2xl shadow-green-900/10 overflow-visible flex flex-col items-center">
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
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-2 mb-8 w-full">
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
                <li className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <IconCheck size={18} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-base font-medium">{t("landing_page.reservation_order")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <IconCheck size={18} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-base font-medium">{t("landing_page.pos_system")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <IconCheck size={18} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-base font-medium">{t("landing_page.inventory_stock")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <IconCheck size={18} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-base font-medium">{t("landing_page.employer_management")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <IconCheck size={18} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-base font-medium">{t("landing_page.real_time_reports")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <IconCheck size={18} className="text-[#70B56A]" />
                  </div>
                  <span className="text-gray-700 text-base font-medium">{t("landing_page.priority_support")}</span>
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

      {/* Product Demo Section */}
      <ProductDemo />

      {/* Recommended Setup Section */}
      <RecommendedSetup />

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
      <div className="relative overflow-hidden py-20 sm:py-32 bg-gradient-to-br from-green-50 to-white" id="contact">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#70B56A] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4E944F] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-gradient-to-r from-[#243922] to-[#2d4529] rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-400/10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2 leading-tight">
                {t("cta.title")}
              </h2>
              <p className="text-lg sm:text-xl text-green-100 mb-8 sm:mb-10 max-w-2xl mx-auto px-2 leading-relaxed">
                {t("cta.description")}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link
                  to="/register"
                  className="group relative w-full sm:w-auto bg-[#70B56A] text-white text-base sm:text-lg font-semibold rounded-xl px-8 py-4 hover:bg-gray-50 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 min-w-[180px] shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10">{t("cta.button")}</span>
                  <IconArrowRight size={20} className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-[#70B56A]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </Link>
                
                <a
                  href={`mailto:${supportEmail}`}
                  className="group relative w-full sm:w-auto border-2 border-white/30 text-white text-base sm:text-lg font-semibold rounded-xl px-8 py-4 hover:bg-white/10 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 min-w-[180px] hover:border-white/50 hover:shadow-lg"
                >
                  <span className="relative z-10">{t("cta.contact")}</span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </a>
              </div>
              
              <div className="mt-8 flex items-center justify-center space-x-4">
                <div className="flex -space-x-2">
                  <img
                    src="/assets/customers/client1.png"
                    alt="Client 1"
                    className="w-8 h-8 rounded-full border-2 border-white/30 object-cover bg-white/20 backdrop-blur-sm"
                  />
                  <img
                    src="/assets/customers/client2.png"
                    alt="Client 2"
                    className="w-8 h-8 rounded-full border-2 border-white/30 object-cover bg-white/20 backdrop-blur-sm"
                  />
                  <img
                    src="/assets/customers/client3.png"
                    alt="Client 3"
                    className="w-8 h-8 rounded-full border-2 border-white/30 object-cover bg-white/20 backdrop-blur-sm"
                  />
                </div>
                <p className="text-sm text-green-100">
                  {t("cta.trusted_by")} <span className="font-semibold">20+</span> {t("cta.businesses")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
