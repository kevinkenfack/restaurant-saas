import React from "react";
import Logo from "../assets/logo.svg";
import LogoDark from "../assets/LogoDark.svg"
import { toast } from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../controllers/auth.controller";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { getPasswordStrength } from "../utils/strongPasswordValidation";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { theme } = useTheme();

  const [passwordStrength, setPasswordStrength] = React.useState({ score: 0, level: "faible" });
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    const confirmPassword = e.target.confirm_password.value;

    if(!token) {
      toast.error(t("reset_password.invalid_request"));
      return;
    }
    
    if (!password) {
      e.target.password.focus();
      toast.error(t("reset_password.new_password_error"));
      return;
    }

    // Vérifie la force du mot de passe
    const strength = getPasswordStrength(password);
    if (strength.score < 2) {
      toast.error(t("register.password_too_weak"));
      return;
    }

    if (!confirmPassword) {
      e.target.confirm_password.focus();
      toast.error(t("reset_password.confirm_password_error"));
      return;
    }
    if (password !== confirmPassword) {
      toast.error(t("reset_password.passwords_do_not_match"));
      return;
    }

    try {
      toast.loading(t("reset_password.loading_message"));

      const res = await resetPassword(token, password);
      if(res.status == 200) {
        toast.dismiss();
        toast.success(t("reset_password.success_message"));
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.message || t("reset_password.error_message");
      toast.dismiss();
      toast.error(message);
    }
  };

  return (
    <div className="bg-restro-green-light relative overflow-x-hidden md:overflow-hidden">
      <img src="/assets/circle_illustration.svg" alt="illustration" className="absolute w-96 lg:w-[1024px] h-96 lg:h-[1024px]  lg:-bottom-96 lg:-right-52 -right-36 " />

      <div className="flex flex-col md:flex-row items-center justify-end md:justify-between gap-10 h-screen container mx-auto px-4 md:px-0 py-4 md:py-0 relative">
        <div className="w-full md:w-auto flex flex-col items-start justify-center">
          <h3 className="text-3xl md:text-5xl lg:text-7xl font-black text-restro-green-dark mb-2 md:mb-4">{t("home.cafe_restaurant")}</h3>
          <h3 className="text-2xl md:text-4xl lg:text-6xl font-black text-restro-green-light outline-text mt-2 md:mt-6">{t("home.hotel_bar")}</h3>
        </div>
        <div className="bg-white rounded-2xl px-8 py-8 w-full sm:w-96 mx-8 sm:mx-0 shadow-2xl"
          style={{ maxWidth: '540px', minWidth: '320px', width: '100%' }}>
          <div className="flex items-center justify-between">
            <div className="text-restro-green-dark text-xl md:text-2xl font-medium">
              {t("reset_password.title")}
            </div>
            <div>
            <img src={theme === "black" ? LogoDark : Logo} className="h-16" />
            </div>
          </div>

          <form className="mt-8" onSubmit={handleSubmit}>
            <div>
              <label className="block" htmlFor="password">
                {t("reset_password.new_password_label")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder={t("reset_password.new_password_placeholder")}
                  className="mt-2 block w-full bg-gray-100 px-4 py-3 rounded-xl text-base md:text-lg pr-12"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setPasswordStrength(getPasswordStrength(e.target.value));
                  }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? t("register.hide_password") : t("register.show_password")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-restro-green dark:hover:text-green-400 transition p-1 bg-transparent"
                  onClick={() => setShowPassword(v => !v)}
                >
                  {showPassword ? <IconEye size={22} /> : <IconEyeOff size={22} />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <span className={`text-xs font-semibold 
                    ${passwordStrength.level === 'faible' ? 'text-red-500' : ''}
                    ${passwordStrength.level === 'moyen' ? 'text-yellow-500' : ''}
                    ${passwordStrength.level === 'fort' ? 'text-green-600' : ''}
                    ${passwordStrength.level === 'très fort' ? 'text-green-800' : ''}
                  `}>
                    {t('register.password_strength')}: {t(`register.strength_${passwordStrength.level.replace(' ', '_')}`)}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="confirm_password">
                {t("reset_password.confirm_password_label")}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  required
                  placeholder={t("reset_password.confirm_password_placeholder")}
                  className="mt-2 block w-full bg-gray-100 px-4 py-3 rounded-xl text-base md:text-lg pr-12"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? t("register.hide_password") : t("register.show_password")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-restro-green dark:hover:text-green-400 transition p-1 bg-transparent"
                  onClick={() => setShowConfirmPassword(v => !v)}
                >
                  {showConfirmPassword ? <IconEye size={22} /> : <IconEyeOff size={22} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full mt-6 bg-restro-green text-white rounded-xl px-4 py-3 transition hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-green-800/20 text-base md:text-lg"
            >
              {t("reset_password.reset_button")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
