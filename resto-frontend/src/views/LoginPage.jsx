import React, { useEffect } from "react";
import { clsx } from "clsx";
import Logo from "../assets/logo.svg";
import LogoDark from "../assets/LogoDark.svg"
import { toast } from "react-hot-toast";
import { signIn } from "../controllers/auth.controller";
import { Link, useNavigate } from "react-router-dom";
import { isRestroUserAuthenticated } from "../helpers/AuthStatus";
import {
  getUserDetailsInLocalStorage,
  saveUserDetailsInLocalStorage,
} from "../helpers/UserDetails";
import { SCOPES } from "../config/scopes";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function LoginPage() {
  const { t } = useTranslation();
  const {theme} = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const restroAuthenticated = isRestroUserAuthenticated();
    if (restroAuthenticated) {
      const { role, scope } = getUserDetailsInLocalStorage();
      if (role == "superadmin") {
        navigate("/superadmin/dashboard/home", {
          replace: true,
        });
        return;
      }
      if (role == "admin") {
        navigate("/dashboard/home", {
          replace: true,
        });
        return;
      }
      const userScopes = scope.split(",");
      if (userScopes.includes(SCOPES.DASHBOARD)) {
        navigate("/dashboard/home", {
          replace: true,
        });
        return;
      } else {
        navigate("/dashboard/profile", {
          replace: true,
        });
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username) {
      e.target.username.focus();
      toast.error(t("login.username_error"));
      return;
    }

    if (!password) {
      e.target.password.focus();
      toast.error(t("login.password_error"));
      return;
    }

    try {
      toast.loading(t("login.loading_message"));

      const res = await signIn(username, password);

      if (res.status == 200) {
        toast.dismiss();
        toast.success(t("login.success_message"));

        const user = res.data.user;
        saveUserDetailsInLocalStorage(user);

        const { role, scope } = getUserDetailsInLocalStorage();
        if (role == "admin") {
          navigate("/dashboard/home", {
            replace: true,
          });
          return;
        }
        const userScopes = scope.split(",");
        if (userScopes.includes(SCOPES.DASHBOARD)) {
          navigate("/dashboard/home", {
            replace: true,
          });
          return;
        } else {
          navigate("/dashboard/profile", {
            replace: true,
          });
        }

        return;
      } else {
        const message = res.data.message;
        toast.dismiss();
        toast.error(message);
        return;
      }
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.message || t("login.error_message");

      toast.dismiss();
      toast.error(message);
      return;
    }
  };

  return (
    <div className='relative overflow-x-hidden md:overflow-hidden bg-restro-green-light dark:bg-restro-card-bg'>
      
      <img
        src="/assets/circle_illustration.svg"
        alt="illustration"
        className='absolute w-96 lg:w-[1024px] h-96 lg:h-[1024px] lg:-bottom-96 lg:-right-52 -right-36 black:opacity-80'
      />

      <div className="flex flex-col md:flex-row items-center justify-end md:justify-between gap-10 h-screen container mx-auto px-4 md:px-0 py-4 md:py-0 relative">
        <div className="lg:mx-12 w-full md:w-auto flex flex-col items-start justify-center">
          <h3 className='text-3xl md:text-5xl lg:text-7xl font-black text-restro-green-dark dark:text-restro-green-dark-mode mb-2 md:mb-4'>
            {t("home.cafe_restaurant")}
          </h3>
          <h3 className='text-2xl md:text-4xl lg:text-6xl font-black outline-text text-restro-green-light dark:text-restro-green mt-2 md:mt-6'>
            {t("home.hotel_bar")}
          </h3>
        </div>

        <div className='sm:w-96 mx-8 sm:mx-0 shadow-2xl lg:mx-12 rounded-2xl px-8 py-8 w-full bg-white dark:bg-black border border-restro-green-light'
          style={{ maxWidth: '540px', minWidth: '320px', width: '100%' }}>
          <div className="flex items-center justify-between">
            <div className='text-xl md:text-2xl font-medium'>
              {t("login.title")}
            </div>
            <div>
              <img src={theme === "black" ? LogoDark : Logo} className="h-16" />
            </div>
          </div>

          <form className="mt-8" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className='text-restro-text'
              >
                {t("login.email_label")}
              </label>
              <input
                type="email"
                id="username"
                name="username"
                required
                placeholder={t("login.email_placeholder")}
                className='mt-2 block w-full px-4 py-3 rounded-xl outline-none focus-visible:ring-1 bg-restro-gray focus-visible:ring-restro-ring text-base md:text-lg'
                tabIndex={1}
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className= 'text-restro-text'
                >
                  {t("login.password_label")}
                </label>
                <Link
                  tabIndex={5}
                  className = 'block text-xs text-restro-text'
                  to="/forgot-password"
                >
                  {t("login.forgot_password")}
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder={t("login.password_placeholder")}
                  className='mt-2 block w-full px-4 py-3 rounded-xl outline-none focus-visible:ring-1 bg-restro-gray focus-visible:ring-restro-ring text-base md:text-lg pr-12'
                  tabIndex={2}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? t("login.hide_password") : t("login.show_password")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-restro-green dark:hover:text-green-400 transition p-1 bg-transparent"
                  onClick={() => setShowPassword(v => !v)}
                >
                  {showPassword ? <IconEye size={22} /> : <IconEyeOff size={22} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className='block w-full mt-6 text-white rounded-xl px-4 py-3 transition hover:scale-105 active:scale-95 hover:shadow-md outline-none focus-visible:ring-1 bg-restro-green focus-visible:ring-restro-ring hover:bg-restro-green-button-hover text-base md:text-lg'
              tabIndex={3}
            >
              {t("login.login_button")}
            </button>

            <div className="flex items-center gap-4 my-4">
              <div className = 'flex-1 border-b border-restro-gray'></div>
              <p className = 'text-sm text-gray-400' >
                {t("login.or")}
              </p>
              <div className='flex-1 border-b border-restro-gray'></div>
            </div>

            <Link
              to="/register"
              className='block w-full text-center rounded-xl px-4 py-3 transition hover:scale-105 active:scale-95 hover:shadow-xl outline-none focus-visible:ring-1 bg-restro-gray hover:bg-restro-button-hover focus-visible:ring-restro-ring dark:focus-visible:ring-restro-ring-dark text-base md:text-lg'
              tabIndex={4}
            >
              {t("login.create_account")}
            </Link>
          </form>
        </div>
      </div>
    </div>

  );
}
