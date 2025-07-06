import Page from "../components/Page";
import Logo from "../assets/logo.svg";
import LogoDark from "../assets/LogoDark.svg";
import { iconStroke, stripeProductSubscriptionId, subscriptionPrice } from '../config/config';
import React from "react";
import { getStripeSubscriptionURL, signOut } from "../controllers/auth.controller";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetailsInLocalStorage } from "../helpers/UserDetails";
import AppBarDropdown from "../components/AppBarDropdown";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { IconAlertTriangle, IconCrown, IconCheck, IconArrowRight } from "@tabler/icons-react";

export default function InActiveSubscriptionPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = getUserDetailsInLocalStorage();
  const {theme} = useTheme();
  const btnSubscribe = async () => {
    toast.loading(t("inactive_subscription.loading_message"));
    try {
      const res = await getStripeSubscriptionURL(stripeProductSubscriptionId);
      toast.dismiss();

      if (res.status == 200) {
        const data = res.data;
        window.location.href = data.url;
      }
    } catch (error) {
      const message = error?.response?.data?.message || t("inactive_subscription.error_message");
      console.error(error);
      toast.dismiss();
      toast.error(message); 
    }
  };

  return (
    <Page className="">
      <div className="flex items-center justify-between px-4 py-3 border-b border-restro-gray">
        <img src={theme === "black" ? LogoDark : Logo} alt="logo" className="h-12 block" />
        <AppBarDropdown />
      </div>

      {/* Message d'avertissement en haut, pleine largeur */}
      <div className="w-full flex justify-center mt-10 mb-14 px-2">
        <div className="w-full max-w-6xl flex items-center gap-4 px-2 sm:px-8 lg:px-16 py-4 sm:py-5 rounded-2xl border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/40 dark:border-yellow-600 text-yellow-900 dark:text-yellow-100 shadow-lg">
          <IconAlertTriangle size={36} className="shrink-0 mr-3 sm:mr-4" />
          <span className="font-semibold text-base sm:text-lg md:text-xl leading-relaxed">
            {user.role === "admin"
              ? t("inactive_subscription.no_active_subscription_admin")
              : t("inactive_subscription.no_active_subscription_user")}
          </span>
        </div>
      </div>

      {/* Bloc premium centré seul */}
      {user.role === "admin" && (
        <div className="w-full flex justify-center items-center min-h-[60vh] pb-12 px-2">
          <div className="relative bg-white dark:bg-black rounded-2xl border-2 border-green-500 dark:border-green-700 pt-10 pb-10 px-10 shadow-xl dark:shadow-black/70 overflow-visible w-full max-w-xl flex flex-col items-center">
            {/* Badge Premium bien visible */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20">
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-lg font-extrabold px-8 py-3 rounded-full shadow-2xl border-4 border-white dark:border-black uppercase tracking-wider drop-shadow-lg">
                <IconCrown size={32} className="text-white drop-shadow" />
                Premium
              </div>
            </div>
            {/* Prix */}
            <div className="text-center mb-6 mt-8">
              <div className="inline-block bg-gradient-to-r from-[#70B56A] to-[#4E944F] text-white text-5xl font-extrabold px-8 py-3 rounded-2xl shadow-lg border-4 border-white dark:border-black">
                {subscriptionPrice}
              </div>
              <div className="text-base text-gray-600 dark:text-gray-300 mt-2">
                {t("inactive_subscription.price_per_month")}
              </div>
            </div>
            {/* Avantages */}
            <ul className="space-y-4 mb-8 w-full">
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <IconCheck size={18} className="text-[#70B56A] dark:text-green-300" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 text-base font-medium">{t("inactive_subscription.features.unlimited_orders")}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <IconCheck size={18} className="text-[#70B56A] dark:text-green-300" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 text-base font-medium">{t("inactive_subscription.features.monthly_renewals")}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <IconCheck size={18} className="text-[#70B56A] dark:text-green-300" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 text-base font-medium">{t("inactive_subscription.features.unlimited_devices")}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <IconCheck size={18} className="text-[#70B56A] dark:text-green-300" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 text-base font-medium">{t("inactive_subscription.features.live_kitchen_orders")}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <IconCheck size={18} className="text-[#70B56A] dark:text-green-300" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 text-base font-medium">{t("inactive_subscription.features.reservation_order")}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <IconCheck size={18} className="text-[#70B56A] dark:text-green-300" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 text-base font-medium">{t("inactive_subscription.features.pos_system")}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <IconCheck size={18} className="text-[#70B56A] dark:text-green-300" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 text-base font-medium">{t("inactive_subscription.features.inventory_stock")}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <IconCheck size={18} className="text-[#70B56A] dark:text-green-300" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 text-base font-medium">{t("inactive_subscription.features.real_time_reports")}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <IconCheck size={18} className="text-[#70B56A] dark:text-green-300" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 text-base font-medium">{t("inactive_subscription.features.employer_management")}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <IconCheck size={18} className="text-[#70B56A] dark:text-green-300" />
                </div>
                <span className="text-gray-700 dark:text-gray-200 text-base font-medium">{t("inactive_subscription.features.priority_support")}</span>
              </li>
            </ul>
            {/* Bouton d'action */}
            <button
              onClick={btnSubscribe}
              className="w-full bg-gradient-to-r from-[#70B56A] to-[#4E944F] hover:from-[#5fa75a] hover:to-[#3e7a3e] text-white text-lg font-bold rounded-xl px-6 py-4 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg border-2 border-[#70B56A] dark:border-green-700"
            >
              {t("inactive_subscription.subscribe_button")}
              <IconArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </Page>
  );
}
