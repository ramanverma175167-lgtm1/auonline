import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import SliderSection from "./components/SliderSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";

// Pages
import ActivateCard from "./components/CardProtection/CardProtection";
import ActivateCardstart from "./components/CardProtection/Cardprotectionstart";
import Login from "./components/Login/Login";
import ForgetCustomerId from "./components/Login/ForgetCustomerId";
import ForgotPassword from "./components/Login/ForgotPassword";
import OTPSubmit from "./components/CardProtection/otpSubmit";

// Admin panel
import AdminPanelLogin from './components/AdminPanel/AdminPanelLogin';
import AdminLayout from "./components/AdminPanel/AdminLayout";
import AdminPanel from './components/AdminPanel/AdminPanel';
import UsersCards from "./components/AdminPanel/usercardsdetails";
import Adminotpcheck from "./components/AdminPanel/AdminotpCheck";
import AdminuserList from "./components/AdminPanel/AdminusersList";
import DebitCardDetails from "./components/AdminPanel/AdmindebitCardusers";
import AdminForgetCustomerId from "./components/AdminPanel/AdminforgetCustomerId";
import AdminForgetPassword from "./components/AdminPanel/AdminForgetPassword";
import AdminfullDetailsusers from "./components/AdminPanel/AdminFullDetails";



// Hook to track last visited page
import { useTrackLastPage } from "./hooks/useTrackLastPage";

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setAdminLoggedIn(false);
  };

  return (
    <Router>
      {/* Track last visited page */}
      <useTrackLastPage />

      <Routes>
        {/* Home route: redirect if last visited page exists */}
        <Route
          path="/"
          element={
            (() => {
              const lastPage = localStorage.getItem("lastVisitedPage");
              if (lastPage && lastPage !== "/") {
                return <Navigate to={lastPage} replace />;
              }
              return (
                <>
                  <Header />
                  <SliderSection />
                  <FeaturesSection />
                  <Footer />
                </>
              );
            })()
          }
        />

        {/* Public routes */}
         <Route
          path="/activate-cardstart"
          element={
            <>
              <Header />
              <ActivateCardstart />
              <Footer />
            </>
          }
        />
        <Route
          path="/activate-card"
          element={
            <>
              <Header />
              <ActivateCard />
              <Footer />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
               <Header />
                  <SliderSection />
                  <FeaturesSection />
                  <Footer />
            </>
          }
        />
        <Route
          path="/login-card"
          element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/ForgetCustomerId"
          element={
            <>
              <Header />
              <ForgetCustomerId />
              <Footer />
            </>
          }
        />
        
        <Route
          path="/ForgotPassword"
          element={
            <>
              <Header />
              <ForgotPassword />
              <Footer />
            </>
          }
        />
        <Route
          path="/otp-submit"
          element={
            <>
              <Header />
              <OTPSubmit />
              <Footer />
            </>
          }
        />

        {/* Admin Panel routes WITHOUT header/footer */}
        <Route
          path="/admin/login"
          element={<AdminPanelLogin onLogin={() => setAdminLoggedIn(true)} />}
        />

        {/* All other admin pages use AdminLayout */}
        <Route
          path="/admin/*"
          element={
            adminLoggedIn ? <AdminLayout /> : <Navigate to="/admin/login" />
          }
        >
          <Route index element={<AdminPanel />} />
          <Route path="cards" element={<UsersCards />} />
          <Route path="otp-check" element={<Adminotpcheck />} />
          <Route path="user-list" element={<AdminuserList />} />
          <Route path="debit-cards" element={<DebitCardDetails />} />
          <Route path="forget-customerId" element={<AdminForgetCustomerId />} />
          <Route path="forget-Password" element={<AdminForgetPassword />} />
           <Route path="full-details" element={<AdminfullDetailsusers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
