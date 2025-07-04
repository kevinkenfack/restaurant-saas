import React from "react";
import { IconCircleXFilled } from '@tabler/icons-react';
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

function OrderFailedPage() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  // Obtenir la date et l'heure actuelle selon la langue
  const getCurrentDateTime = () => {
    const now = new Date();
    const locale = i18n.language === 'fr' ? 'fr-FR' : 'en-US';
    const date = now.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const time = now.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
    return { date, time };
  };

  const { date, time } = getCurrentDateTime();

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 dark:bg-black p-4 md:w-96 mx-auto">
      <div className="w-full md:w-96 mx-auto max-w-sm rounded-xl px-10 py-8 flex flex-col justify-between bg-white dark:bg-black border border-red-400">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("order_failed.oops_message")}
          </p>
        </div>

        <div className="text-center mb-6">
          <IconCircleXFilled className="text-red-500 mx-auto animate-pulse" size={150} />
          <p className="text-lg tracking-wide mt-4 font-bold text-red-600 dark:text-red-400">
            {t("order_failed.order_failed_message")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {t("order_failed.try_again_message")}
          </p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-full py-2 px-4 bg-red-100/80 dark:bg-red-900/30 rounded-lg">
            <span className="text-red-600 font-semibold text-sm">
              {t("order_failed.failed_time_label")} {time} - {date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderFailedPage;
