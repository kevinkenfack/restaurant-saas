import React from 'react'
import AppBarDropdown from '../components/AppBarDropdown'
import Page from "../components/Page";
import Logo from "../assets/logo.svg";
import LogoDark from "../assets/LogoDark.svg"
import { IconChevronLeft, IconCircleXFilled } from '@tabler/icons-react';
import { iconStroke } from '../config/config';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useTheme } from '../contexts/ThemeContext';

export default function PaymentCancelledPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <Page className=''>
      <div className="fixed flex items-center justify-between px-4 py-3 border-b border-restro-border-green w-full dark:bg-black">
        <img src={theme === "black" ? LogoDark : Logo} alt="logo" className="h-12 block" />

        {/* profile */}
        <AppBarDropdown />
        {/* profile */}
      </div>

      <div className="min-h-screen container mx-auto flex items-center justify-center flex-col">
        <div className="w-full max-w-md bg-white dark:bg-black border border-restro-border-green rounded-2xl flex flex-col items-center px-8 py-10 mt-16 mb-8">
          <IconCircleXFilled className='text-red-500 mb-2' size={64} />
          <h1 className="text-3xl font-extrabold text-center mt-2">{t("payment_cancelled.title")}</h1>
          <p className="text-restro-dark-700 dark:text-restro-light-200 text-center text-base mt-2 mb-4">
            {t("payment_cancelled.message")}
          </p>
          <button onClick={() => { navigate("/dashboard/profile") }} className='block w-full max-w-xs mt-2 bg-gray-50 text-gray-600 rounded-xl px-6 py-3 hover:scale-105 active:scale-95 outline-none focus-visible:ring-1 dark:bg-gray-700 dark:text-white focus-visible:ring-restro-ring transition hover:bg-gray-200 dark:hover:bg-gray-600 text-base font-semibold'>
            <span className="flex items-center justify-center gap-2">
              <IconChevronLeft stroke={iconStroke} /> {t("payment_cancelled.go_back_button")}
            </span>
          </button>
        </div>
      </div>
    </Page>
  )
}