import React from 'react'
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

export default function FeedbackCollectSuccessPage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  // Confetti logic (copied from OrderSuccessPage.jsx)
  React.useEffect(() => {
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
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }, 5000);
      }
    };
    const timer = setTimeout(() => { createConfetti(); }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 dark:bg-black p-4 md:w-96 mx-auto">
      <div className="w-full md:w-96 mx-auto max-w-sm rounded-xl px-10 py-8 flex flex-col justify-between bg-white dark:bg-black border border-[#70B56A]">
        <div className="text-center mb-6">
          <p className="text-sm text-[#70B56A] dark:text-white">
            {t('feedback_success.thank_you_message')}
          </p>
        </div>
        <div className="text-center mb-6">
          <IconCircleCheckFilled className="text-[#70B56A] mx-auto animate-pulse" size={150} />
          <p className="text-lg tracking-wide mt-4 font-bold text-[#70B56A] dark:text-[#70B56A]">
            {t('feedback_success.feedback_saved_message')}
          </p>
        </div>
      </div>
    </div>
  )
}
