import React from "react";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { IconMenu, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import LanguageChanger from "../../components/LanguageChanger";

export default function LNavbar() {
  const { t } = useTranslation();

  const closeDrawer = () => {
    document.getElementById("my-drawer").checked = false;
  };

  return (
    <div className="w-full backdrop-blur-md sticky top-0 bg-white/95 border-b border-gray-100/50 z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="flex items-center justify-between gap-4 container mx-auto px-6 lg:px-12 py-4">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="logo" className="h-12" />
        </Link>

        {/* Desktop Navigation */}
        <div className="items-center hidden lg:flex gap-2">
          <Link
            className="hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-xl px-4 py-2.5 transition-all duration-200 font-medium"
            to="/#features"
          >
            {t("landing_page.features")}
          </Link>
          <Link
            className="hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-xl px-4 py-2.5 transition-all duration-200 font-medium flex items-center gap-1.5"
            to="/#pricing"
          >
            {t("landing_page.pricing_link")}
            <span className="bg-[#70B56A]/10 text-[#70B56A] text-xs font-medium px-2 py-0.5 rounded-full border border-[#70B56A]/20">
              {t("landing_page.pricing_gift")}
            </span>
          </Link>
          <Link
            className="hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-xl px-4 py-2.5 transition-all duration-200 font-medium"
            to="/#faq"
          >
            {t("landing_page.faq")}
          </Link>
          <Link
            className="hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-xl px-4 py-2.5 transition-all duration-200 font-medium"
            to="/#contact"
          >
            {t("landing_page.contact")}
          </Link>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl px-4 py-2.5 transition-all duration-200 font-medium"
            to="/login"
          >
            {t("landing_page.login")}
          </Link>
          <Link
            className="bg-[#70B56A] hover:bg-[#70B56A]/90 text-white rounded-xl px-6 py-2.5 transition-all duration-200 active:scale-95 font-medium"
            to="/register"
          >
            {t("landing_page.get_started")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="block lg:hidden">
          <label
            aria-label="open sidebar"
            htmlFor="my-drawer"
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 active:scale-95 text-gray-600 transition-all duration-200 cursor-pointer"
          >
            <IconMenu size={20} />
          </label>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className="drawer-side lg:hidden">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="w-80 min-h-full bg-white shadow-xl">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link to="/" onClick={closeDrawer}>
              <img src={Logo} alt="logo" className="h-10" />
            </Link>
            <label
              htmlFor="my-drawer"
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 active:scale-95 text-gray-500 transition-all duration-200 cursor-pointer"
            >
              <IconX size={20} />
            </label>
          </div>

          {/* Mobile Menu Items */}
          <div className="p-6">
            <nav className="space-y-2">
              <Link
                onClick={closeDrawer}
                className="block hover:bg-gray-50 text-gray-700 hover:text-gray-900 rounded-xl px-4 py-3 transition-all duration-200 font-medium"
                to="/#features"
              >
                {t("landing_page.features")}
              </Link>
               <Link
                onClick={closeDrawer}
                className="flex items-center justify-between hover:bg-gray-50 text-gray-700 hover:text-gray-900 rounded-xl px-4 py-3 transition-all duration-200 font-medium"
                to="/#pricing"
              >
                <span>{t("landing_page.pricing_link")}</span>
                <span className="bg-[#70B56A]/10 text-[#70B56A] text-xs font-medium px-2 py-0.5 rounded-full border border-[#70B56A]/20">
                  {t("landing_page.pricing_gift")}
                </span>
              </Link>
               <Link
                onClick={closeDrawer}
                className="block hover:bg-gray-50 text-gray-700 hover:text-gray-900 rounded-xl px-4 py-3 transition-all duration-200 font-medium"
                to="/#faq"
              >
                {t("landing_page.faq")}
              </Link>
              <Link
                onClick={closeDrawer}
                className="block hover:bg-gray-50 text-gray-700 hover:text-gray-900 rounded-xl px-4 py-3 transition-all duration-200 font-medium"
                to="/#contact"
              >
                {t("landing_page.contact")}
              </Link>
            </nav>

            {/* Language Selector - Mobile */}
            <div className="mt-6 mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{t("landing_page.language")}</span>
              </div>
              <LanguageChanger className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-lg px-4 py-2.5 text-sm transition-colors" />
            </div>

            {/* Mobile CTA Buttons */}
            <div className="space-y-3">
              <Link
                onClick={closeDrawer}
                className="block text-center border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl px-4 py-3 transition-all duration-200 font-medium"
                to="/login"
              >
                {t("landing_page.login")}
              </Link>
              <Link
                onClick={closeDrawer}
                className="block text-center bg-[#70B56A] hover:bg-[#70B56A]/90 text-white rounded-xl px-4 py-3 transition-all duration-200 active:scale-95 font-medium"
                to="/register"
              >
                {t("landing_page.get_started")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
