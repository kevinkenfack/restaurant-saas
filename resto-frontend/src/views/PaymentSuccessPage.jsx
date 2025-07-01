import React, { useEffect } from 'react'
import AppBarDropdown from '../components/AppBarDropdown'
import Page from "../components/Page";
import Logo from "../assets/logo.svg";
import LogoDark from "../assets/LogoDark.svg"
import { IconCircleCheckFilled, IconLogout } from '@tabler/icons-react';
import { iconStroke } from '../config/config';
import toast from 'react-hot-toast';
import { signOut } from '../controllers/auth.controller';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useTheme } from '../contexts/ThemeContext';

export default function PaymentSuccessPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Fonction pour créer les confettis
  const createConfetti = () => {
    const colors = ['#70B56A', '#4CAF50', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      // Animation
      confetti.animate([
        {
          transform: `translateY(-10px) rotate(0deg)`,
          opacity: 1
        },
        {
          transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`,
          opacity: 0
        }
      ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'cubic-bezier(0.5, 0, 0.5, 1)',
        fill: 'forwards'
      });
      
      document.body.appendChild(confetti);
      
      // Supprimer l'élément après l'animation
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 5000);
    }
  };

  // Déclencher les confettis au montage du composant
  useEffect(() => {
    const timer = setTimeout(() => {
      createConfetti();
    }, 300); // Petit délai pour que la page se charge d'abord

    return () => clearTimeout(timer);
  }, []);

  const btnLogout = async () => {
    try {
      toast.loading(t("loading_message"));
      const response = await signOut();
      if (response.status == 200) {
        toast.dismiss();
        toast.success(response.data.message);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || t("error_message");
      console.error(error);
      toast.dismiss();
      toast.error(message);
    }
  };

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
          <IconCircleCheckFilled className='text-restro-green mb-2 animate-bounce' size={64} />
          <h1 className="text-3xl font-extrabold text-center mt-2">{t("payment_success.title")}</h1>
          <p className="text-restro-dark-700 dark:text-restro-light-200 text-center text-base mt-2 mb-4">
            {t("payment_success.message")}
          </p>
          <button onClick={btnLogout} className='block w-full max-w-xs mt-2 bg-red-50 text-red-500 rounded-xl px-6 py-3 hover:scale-105 active:scale-95 outline-none focus-visible:ring-1 dark:bg-red-600 dark:text-white focus-visible:ring-restro-ring transition hover:bg-red-200 dark:hover:bg-red-700 text-base font-semibold'>
            <span className="flex items-center justify-center gap-2">
              <IconLogout stroke={iconStroke} /> {t("payment_success.logout_button")}
            </span>
          </button>
        </div>
      </div>
    </Page>
  )
}