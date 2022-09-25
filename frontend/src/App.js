import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import CompanyDetails from "./components/company/CompanyDetails";
import Login from "./components/investor/Login";
import Register from "./components/investor/Register";
import Profile from "./components/investor/Profile";
import ProtectedRoute from "./components/routes/ProtectedRoute.js";
import data from "./data";
import { loadInvester } from "./actions/investorActions";
import UpdateProfile from "./components/investor/UpdateProfile";
import UpdatePassword from "./components/investor/UpdatePassword";
import ForgotPassword from "./components/investor/ForgotPassword";
import NewPassword from "./components/investor/NewPassword";
import Assets from "./components/investor/Assets";
import Deposit from "./components/investor/Deposit";
import TopUp from "./components/investor/TopUp";
import Withdraw from "./components/investor/Withdraw";
import SellingOrder from "./components/orders/SellingOrder";
import BuyingOrder from "./components/orders/BuyingOrder";
import RegisterCompany from "./components/company/RegisterCompany";
import IpoOrder from "./components/orders/IpoOrder";
import AllOrders from "./components/orders/AllOrders";
import MyOrders from "./components/orders/MyOrders";
import CompanyOrders from "./components/orders/CompanyOrders";
import Accept from "./components/orders/Accept";
import AllOrdersReport from "./components/report/AllOrdersReport";
// deposit
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    data.dispatch(loadInvester());
    async function getStripApiKey() {
      const ben = await axios.get("/api/money/stripeapi");
      console.log(ben);
      setStripeApiKey(ben.data.stripeApiKey);
    }

    getStripApiKey();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <ProtectedRoute
          path="/company/admin/register"
          component={RegisterCompany}
          exact
        />
        <Route path="/" component={Home} exact />
        <Route path="/orders" component={AllOrders} exact />
        <Route path="/search/:keyword" component={Home} exact />
        <ProtectedRoute path="/report" component={AllOrdersReport} exact />
        <ProtectedRoute
          path="/report/:keyword"
          component={AllOrdersReport}
          exact
        />
        <Route path="/company/:id" component={CompanyDetails} exact />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/deposit" component={Deposit} />
          </Elements>
        )}
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/password/forgot" component={ForgotPassword} exact />
        <Route path="/password/reset/:token" component={NewPassword} exact />
        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute path="/me/assets" component={Assets} exact />
        <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
        <ProtectedRoute path="/selling" component={SellingOrder} exact />
        <ProtectedRoute path="/buying" component={BuyingOrder} exact />
        <ProtectedRoute path="/iporder" component={IpoOrder} exact />
        <ProtectedRoute path="/me/orders" component={MyOrders} exact />
        <ProtectedRoute
          path="/outstanding/:companyid"
          component={CompanyOrders}
          exact
        />
        <ProtectedRoute path="/accept/:orderid" component={Accept} exact />

        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute path="/me/topup" component={TopUp} exact />
        </Elements>
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute path="/me/withdraw" component={Withdraw} exact />
        </Elements>
        <ProtectedRoute
          path="/password/update"
          component={UpdatePassword}
          exact
        />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
