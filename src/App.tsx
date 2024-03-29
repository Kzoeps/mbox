import React, { ReactNode, useEffect } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation";
import "./firebase.config";
import RecordAddition from "./pages/RecordAddition";
import UserContextProvider from "./components/user-context";
import UnauthenticatedRoutes from "./components/unauthenticated-routes";
import BottomNav from "./components/bottom-nav";
import PaymentBanner from "./components/payment-banner";
import theme from "./constants/theme";
import { withSuspense } from "./components/suspense-wrapper";
import Playground from "./pages/Playground";

const Analytics = withSuspense(React.lazy(() => import("./pages/Analytics")));
const RecordListing = withSuspense(
  React.lazy(() => import("./pages/RecordListing"))
);
const Payment = withSuspense(React.lazy(() => import("./pages/Payment")));
const Success = withSuspense(React.lazy(() => import("./pages/Success")));
const Pricing = withSuspense(React.lazy(() => import("./pages/Pricing")));
const Demo = withSuspense(React.lazy(() => import("./pages/Demo")));
const PhoneSignUp = withSuspense(React.lazy(() => import("./pages/Phone-Sign-Up")));
const PhoneLogin = withSuspense(React.lazy(() => import("./pages/Phone-Login")));
const CaptureImage = withSuspense(React.lazy(() => import("./pages/capture-image/CaptureImage")));
const HomePage = withSuspense(React.lazy(() => import("./pages/Home")));
const Dashboard = withSuspense(React.lazy(() => import("./pages/Dashboard")));

function ChakraProvided(props: { children: ReactNode }) {
  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>;
}

function App() {
  useEffect(() => {
    document.getElementById("app-loader")?.remove();
  },[])

  return (
    <UserContextProvider>
      <BrowserRouter>
        <ChakraProvided>
          <Navigation />
          <PaymentBanner />
          <Routes>
            <Route
              element={<UnauthenticatedRoutes redirectPath={`/dashboard`} />}
            >
              <Route path={"/"} element={<HomePage />} />
              <Route path={"/sign-in"} element={<PhoneLogin />} />
              <Route path={"/sign-up"} element={<PhoneSignUp />} />
            </Route>
            <Route path={"/demo"} element={<Demo />} />
            <Route path={"/capture"} element={<CaptureImage/>} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/add-record"} element={<RecordAddition />} />
            <Route path={"/analytics"} element={<Analytics />} />
            <Route path={"/success"} element={<Success />} />
            <Route path={"/records"} element={<RecordListing />} />
            <Route path={"/playground"} element={<Playground/>} />
          </Routes>
          <BottomNav />
        </ChakraProvided>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
