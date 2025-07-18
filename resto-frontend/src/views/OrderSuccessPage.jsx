import React, { useEffect } from "react";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

function OrderSuccessPage() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  // Obtenir la date et l'heure actuelle selon la langue
  const getCurrentDateTime = () => {
    const now = new Date();
    const locale = i18n.language === 'fr' ? 'fr-FR' : 'en-US';
    
    const date = now.toLocaleDateString(locale, { 
      day: 'numeric',
      month: 'long', 
      year: 'numeric'
    });
    const time = now.toLocaleTimeString(locale, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    return { date, time };
  };

  const { date, time } = getCurrentDateTime();

  // Fonction pour créer les confettis
  const createConfetti = () => {
    const colors = ['#70B56A', '#4CAF50', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#9C27B0'];
    const shapes = ['circle', 'square', 'triangle'];
    const confettiCount = 60;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = (Math.random() * 8 + 6) + 'px';
      confetti.style.height = (Math.random() * 8 + 6) + 'px';
      confetti.style.backgroundColor = color;
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      
      // Formes différentes
      if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
      } else if (shape === 'triangle') {
        confetti.style.width = '0';
        confetti.style.height = '0';
        confetti.style.backgroundColor = 'transparent';
        confetti.style.borderLeft = '6px solid transparent';
        confetti.style.borderRight = '6px solid transparent';
        confetti.style.borderBottom = `12px solid ${color}`;
      }
      
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      // Animation
      confetti.animate([
        {
          transform: `translateY(-10px) rotate(0deg)`,
          opacity: 1
        },
        {
          transform: `translateY(100vh) rotate(${Math.random() * 720 + 360}deg)`,
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
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 dark:bg-black p-4 md:w-96 mx-auto">
      <div className="w-full md:w-96 mx-auto max-w-sm rounded-xl px-10 py-8 flex flex-col justify-between bg-white dark:bg-black border border-[#70B56A]">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("order_success.thank_you_message")}
          </p>
        </div>

        <div className="text-center mb-6">
          <IconCircleCheckFilled className="text-[#70B56A] mx-auto animate-pulse" size={150} />
          <p className="text-lg tracking-wide mt-4 font-bold text-[#70B56A] dark:text-[#70B56A]">
            {t("order_success.order_placed_message")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {t("order_success.preparing_message") || "Votre commande est en cours de préparation"}
          </p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-full py-2 px-4 bg-[#70B56A]/10 dark:bg-[#70B56A]/20 rounded-lg">
            <span className="text-[#70B56A] font-semibold text-sm">
              {t("order_success.estimated_time")} {time} - {date}
            </span>
          </div>
        </div>
        {/* Bouton retour au menu : double retour dans l'historique */}
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => navigate(-2)}
            className="inline-block py-3 px-6 rounded-lg font-bold bg-restro-green text-white hover:bg-green-700 transition text-center"
          >
            {t("order_success.back_to_menu") || "Retour au menu"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;