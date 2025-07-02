import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import LanguageChanger from "../../components/LanguageChanger";
import { useTranslation } from "react-i18next";

export default function LandingFooter() {
  const { t } = useTranslation();
  return (
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
  );
} 
