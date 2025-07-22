import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./helpers/PrivateRoute";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage";
import DashboardLayout from "./views/DashboardLayout";
import DashboardPage from "./views/DashboardPage";
import POSPage from "./views/POSPage";
import OrdersPage from "./views/OrdersPage";
import KitchenPage from "./views/KitchenPage";
import ReservationPage from "./views/ReservationPage";
import CustomersPage from "./views/CustomersPage";
import InvoicesPage from "./views/InvoicesPage";
import UsersPage from "./views/UsersPage";
import ReportsPage from "./views/ReportsPage";
import SettingsPage from "./views/SettingsPage";
import SettingDetailsPage from "./views/SettingsViews/SettingDetailsPage";
import PrintSettingsPage from "./views/SettingsViews/PrintSettingsPage";
import TablesSettingsPage from "./views/SettingsViews/TableSettingsPage";
import MenuItemsSettingsPage from "./views/SettingsViews/MenuItemsSettingsPage";
import TaxSetupPage from "./views/SettingsViews/TaxSetupPage";
import PaymentTypesPage from "./views/SettingsViews/PaymentTypesPage";
import DevicesPage from "./views/SettingsViews/DevicesPage";
import ContactSupport from "./views/SettingsViews/ContactSupportPage";
import CategoriesPage from "./views/SettingsViews/CategoriesPage";
import MenuItemViewPage from "./views/SettingsViews/MenuItemViewPage";
import { NavbarContext } from "./contexts/NavbarContext";
import { getIsNavbarCollapsed } from "./helpers/NavbarSettings";
import PrintReceiptPage from "./views/PrintReceiptPage";
import PrintTokenPage from "./views/PrintTokenPage";
import NoAccessPage from "./views/ErrorsPages/NoAccessPage";
import NotFoundPage from "./views/ErrorsPages/NotFoundPage";
import ProfilePage from "./views/ProfilePage";
import { SCOPES } from "./config/scopes";
import ScopeProtectedRoute from "./helpers/ScopeProtectedRoute";
import { SocketProvider } from "./contexts/SocketContext";
import RegistrationPage from "./views/RegistrationPage";
import ForgotPasswordPage from "./views/ForgotPasswordPage";
import InActiveSubscriptionPage from "./views/InActiveSubscriptionPage";
import PaymentSuccessPage from "./views/PaymentSuccessPage";
import PaymentCancelledPage from "./views/PaymentCancelledPage";
import ResetPasswordPage from "./views/ResetPasswordPage";
import QRMenuPage from "./views/QRMenuPage";
import SuperAdminProtectedRoute from "./helpers/SuperAdminProtectedRoute";
import SuperAdminLoginPage from "./views/SuperAdmin/LoginPage";
import SuperAdminDashboadLayout from "./views/SuperAdmin/SuperAdminDashboadLayout";
import SuperAdminDashboardPage from "./views/SuperAdmin/SuperAdminDashboardPage";
import SuperAdminContactSupportPage from "./views/SuperAdmin/SuperAdminContactSupportPage";
import SuperAdminTenantsPage from "./views/SuperAdmin/SuperAdminTenantsPage";
import SuperAdminReportsPage from "./views/SuperAdmin/SuperAdminReportsPage";
import SuperAdminTenantSubscriptionHistoryPage from "./views/SuperAdmin/SuperAdminTenantSubscriptionHistoryPage";
import CartPage from "./views/CartPage";
import OrderSuccessPage from "./views/OrderSuccessPage";
import OrderFailedPage from "./views/OrderFailedPage";
import CustomersImportPage from "./views/CustomersImportPage";
import FeedbackCollectPage from "./views/FeedbackCollectPage";
import FeedbackCollectSuccessPage from "./views/FeedbackCollectSuccessPage";
import FeedbackPage from "./views/FeedbackPage";
import LanguagePage from "./views/LanguagePage";
import InventoryPage from "./views/InventoryPage";
import InventoryLogsPage from "./views/InventoryLogsPage";
import InventoryDashboardPage from "./views/InventoryDashboard";
import { ThemeProvider } from "./contexts/ThemeContext";
import MyToaster from "./components/MyToaster";
import RefundPolicyPage from "./views/LegalPages/RefundPolicyPage";
import PrivacyPolicyPage from "./views/LegalPages/PrivacyPolicyPage";
import TermsConditionsPage from "./views/LegalPages/TermsConditionsPage";
import SuperAdminExchangeRatesPage from "./views/SuperAdmin/SuperAdminExchangeRatesPage";


export default function App() {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(
    getIsNavbarCollapsed()
  );

  return (
    <SocketProvider>
      <ThemeProvider>
        <NavbarContext.Provider value={[isNavbarCollapsed, setIsNavbarCollapsed]}>
          <BrowserRouter>
            <Routes>
              {/* ================== PAGES PUBLIQUES ================== */}
              <Route path="/" element={<LandingPage />} />
              
              {/* ================== AUTHENTIFICATION ================== */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              {/* ================== PAGES D'ERREUR ================== */}
              <Route path="/no-access" element={<NoAccessPage />} />
              <Route path="*" element={<NotFoundPage />} />

              {/* ================== PAGES LÉGALES ================== */}
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-conditions" element={<TermsConditionsPage />} />

              {/* ================== PAIEMENTS ================== */}
              <Route path="/success" element={<PaymentSuccessPage />} />
              <Route path="/cancelled-payment" element={<PaymentCancelledPage />} />
              <Route path="/dashboard/inactive-subscription" element={<InActiveSubscriptionPage />} />

              {/* ================== IMPRESSION ================== */}
              <Route path="/print-receipt" element={<PrintReceiptPage />} />
              <Route path="/print-token" element={<PrintTokenPage />} />

              {/* ================== MENU QR CODE (CLIENT) ================== */}
              <Route path="/m/:qrcode" element={<QRMenuPage />} />
              <Route path="/m/:qrcode/cart" element={<CartPage />} />
              <Route path="/m/order-success" element={<OrderSuccessPage />} />
              <Route path="/m/order-failed" element={<OrderFailedPage />} />
              <Route path="/m/:qrcode/feedback" element={<FeedbackCollectPage />} />
              <Route path="/m/:qrcode/feedback/success" element={<FeedbackCollectSuccessPage />} />

              {/* ================== TABLEAU DE BORD PRINCIPAL ================== */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardLayout />
                  </PrivateRoute>
                }
              >
                {/* Dashboard Home */}
                <Route
                  path=""
                  element={
                    <ScopeProtectedRoute scopes={[SCOPES.DASHBOARD]}>
                      <DashboardPage />
                    </ScopeProtectedRoute>
                  }
                />
                <Route
                  path="home"
                  element={
                    <ScopeProtectedRoute scopes={[SCOPES.DASHBOARD]}>
                      <DashboardPage />
                    </ScopeProtectedRoute>
                  }
                />

                {/* Profile */}
                <Route path="profile" element={<ProfilePage />} />

                {/* ========== GESTION DES VENTES ========== */}
                <Route
                  path="pos"
                  element={
                    <ScopeProtectedRoute scopes={[SCOPES.POS]}>
                      <POSPage />
                    </ScopeProtectedRoute>
                  }
                />
                <Route
                  path="orders"
                  element={
                    <ScopeProtectedRoute
                      scopes={[
                        SCOPES.POS,
                        SCOPES.ORDERS,
                        SCOPES.ORDER_STATUS,
                        SCOPES.ORDER_STATUS_DISPLAY,
                      ]}
                    >
                      <OrdersPage />
                    </ScopeProtectedRoute>
                  }
                />
                <Route
                  path="kitchen"
                  element={
                    <ScopeProtectedRoute
                      scopes={[SCOPES.KITCHEN, SCOPES.KITCHEN_DISPLAY]}
                    >
                      <KitchenPage />
                    </ScopeProtectedRoute>
                  }
                />

                {/* ========== GESTION DES CLIENTS ========== */}
                <Route
                  path="customers"
                  element={
                    <ScopeProtectedRoute
                      scopes={[
                        SCOPES.CUSTOMERS,
                        SCOPES.VIEW_CUSTOMERS,
                        SCOPES.MANAGE_CUSTOMERS,
                      ]}
                    >
                      <CustomersPage />
                    </ScopeProtectedRoute>
                  }
                />
                <Route
                  path="customers/import"
                  element={
                    <ScopeProtectedRoute
                      scopes={[
                        SCOPES.CUSTOMERS,
                        SCOPES.VIEW_CUSTOMERS,
                        SCOPES.MANAGE_CUSTOMERS,
                      ]}
                    >
                      <CustomersImportPage />
                    </ScopeProtectedRoute>
                  }
                />

                {/* ========== RÉSERVATIONS ========== */}
                <Route
                  path="reservation"
                  element={
                    <ScopeProtectedRoute
                      scopes={[
                        SCOPES.RESERVATIONS,
                        SCOPES.VIEW_RESERVATIONS,
                        SCOPES.MANAGE_RESERVATIONS,
                      ]}
                    >
                      <ReservationPage />
                    </ScopeProtectedRoute>
                  }
                />

                {/* ========== INVENTAIRE ========== */}
                <Route
                  path="inventory"
                  element={
                    <ScopeProtectedRoute scopes={[SCOPES.INVENTORY]}>
                      <InventoryPage />
                    </ScopeProtectedRoute>
                  }
                />
                <Route
                  path="inventory/dashboard"
                  element={
                    <ScopeProtectedRoute scopes={[SCOPES.INVENTORY]}>
                      <InventoryDashboardPage />
                    </ScopeProtectedRoute>
                  }
                />
                <Route
                  path="inventory/stock-movements"
                  element={
                    <ScopeProtectedRoute scopes={[SCOPES.INVENTORY]}>
                      <InventoryLogsPage />
                    </ScopeProtectedRoute>
                  }
                />

                {/* ========== FINANCES ========== */}
                <Route
                  path="invoices"
                  element={
                    <ScopeProtectedRoute scopes={[SCOPES.INVOICES]}>
                      <InvoicesPage />
                    </ScopeProtectedRoute>
                  }
                />
                <Route
                  path="reports"
                  element={
                    <ScopeProtectedRoute scopes={[SCOPES.REPORTS]}>
                      <ReportsPage />
                    </ScopeProtectedRoute>
                  }
                />

                {/* ========== FEEDBACK ========== */}
                <Route
                  path="feedbacks"
                  element={
                    <ScopeProtectedRoute scopes={[SCOPES.FEEDBACK]}>
                      <FeedbackPage />
                    </ScopeProtectedRoute>
                  }
                />

                {/* ========== ADMINISTRATION ========== */}
                <Route 
                  path="users" 
                  element={
                    <ScopeProtectedRoute scopes={[SCOPES.SETTINGS]}>
                      <UsersPage />
                    </ScopeProtectedRoute>
                  } 
                />

                {/* ========== PARAMÈTRES ========== */}
                <Route
                  path="settings"
                  element={
                    <ScopeProtectedRoute scopes={[SCOPES.SETTINGS]}>
                      <SettingsPage />
                    </ScopeProtectedRoute>
                  }
                >
                  <Route path="" element={<SettingDetailsPage />} />
                  <Route path="details" element={<SettingDetailsPage />} />
                  <Route path="print-settings" element={<PrintSettingsPage />} />
                  <Route path="tables" element={<TablesSettingsPage />} />
                  <Route path="menu-items" element={<MenuItemsSettingsPage />} />
                  <Route path="menu-items/:id" element={<MenuItemViewPage />} />
                  <Route path="menu-items/categories" element={<CategoriesPage />} />
                  <Route path="tax-setup" element={<TaxSetupPage />} />
                  <Route path="payment-types" element={<PaymentTypesPage />} />
                </Route>

                {/* ========== UTILITAIRES ========== */}
                <Route path="devices" element={<DevicesPage />} />
                <Route path="contact-support" element={<ContactSupport />} />
                <Route path="language" element={<LanguagePage />} />
              </Route>

              {/* ================== SUPER ADMIN ================== */}
              <Route path="/superadmin" element={<SuperAdminLoginPage />} />
              <Route path="/superadmin/login" element={<SuperAdminLoginPage />} />
              <Route 
                path="/superadmin/dashboard" 
                element={
                  <PrivateRoute>
                    <SuperAdminDashboadLayout />
                  </PrivateRoute>
                }
              >
                <Route 
                  path="" 
                  element={
                    <SuperAdminProtectedRoute>
                      <SuperAdminDashboardPage />
                    </SuperAdminProtectedRoute>
                  } 
                />
                <Route 
                  path="home" 
                  element={
                    <SuperAdminProtectedRoute>
                      <SuperAdminDashboardPage />
                    </SuperAdminProtectedRoute>
                  } 
                />
                <Route 
                  path="tenants" 
                  element={
                    <SuperAdminProtectedRoute>
                      <SuperAdminTenantsPage />
                    </SuperAdminProtectedRoute>
                  } 
                />
                <Route 
                  path="tenants/:id/subscription-history" 
                  element={
                    <SuperAdminProtectedRoute>
                      <SuperAdminTenantSubscriptionHistoryPage />
                    </SuperAdminProtectedRoute>
                  } 
                />
                <Route 
                  path="reports" 
                  element={
                    <SuperAdminProtectedRoute>
                      <SuperAdminReportsPage />
                    </SuperAdminProtectedRoute>
                  } 
                />
                <Route 
                  path="contact-support" 
                  element={
                    <SuperAdminProtectedRoute>
                      <SuperAdminContactSupportPage />
                    </SuperAdminProtectedRoute>
                  } 
                />
                <Route 
                  path="exchange-rates" 
                  element={
                    <SuperAdminProtectedRoute>
                      <SuperAdminExchangeRatesPage />
                    </SuperAdminProtectedRoute>
                  } 
                />
                <Route path="language" element={<LanguagePage />} />
              </Route>
            </Routes>
            
            <MyToaster />
          </BrowserRouter>
        </NavbarContext.Provider>
      </ThemeProvider>
    </SocketProvider>
  );
}