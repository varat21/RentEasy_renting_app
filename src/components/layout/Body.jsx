import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "../common/Header/Header";
import Footer from "../common/Footer/Footer";
import WhatsApps from "../Pages/whatApps";
import ProtectedRoute from "./ProtectedRoute";
import { NotFoundImage } from "../NotFoundImage";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentInformation from "../Admin/PaymentInformation";
import BookingInformation from "../Admin/bookingInformation";
import BookingHistory from "../Pages/BookingHistory";
import TermsAndConditions from "../properties/TermsAndConditions";
import KhaltiPaymentSuccess from "../Pages/khaltiPaymentSuccess";
import ChatBot from "../Pages/ChatBot";

// Lazy load components
const Login = lazy(() => import("../Pages/Login"));
const Logout = lazy(() => import("../Pages/Logout"));
const Register = lazy(() => import("../Pages/Register"));
const Home = lazy(() => import("../Pages/Home"));
const About = lazy(() => import("../Pages/About"));
const FAQ = lazy(() => import("../Pages/FAQ"));

const Contact = lazy(() => import("../Pages/Contact"));
const AddProperties = lazy(() => import("../properties/AddProperties"));
const EmailVerification = lazy(() => import("../Pages/VerifyEmail"));

const ForgetPasswordModal = lazy(() =>
  import("../Pages/ForgetPassword/ForgetPasswordModal")
);
const UpdatePassword = lazy(() =>
import("../Pages/ForgetPassword/UpdatePassword ")
);

const GetProfileData = lazy(() => import("../Pages/Profile"));
const GetPropertiesDetails = lazy(() =>
  import("../properties/GetPropertiesDetails")
);

// Admin Components
const Navbar = lazy(() => import("../Admin/navbar/Navbar"));
const Dashboard = lazy(() => import("../Admin/Dashboard"));
const Users = lazy(() => import("../Admin/Users"));
const AddedProperties = lazy(() => import("../Admin/AddedProperties"));
const UserProfileDetails = lazy(()=>import("../Admin/UserProfileDetails"));
const PropertiesDetails = lazy(() => import("../Admin/PropertiesDetails"));
const Message =lazy(()=>import("../Admin/message"));
const PropertyDocument = lazy(() => import("../Admin/PropertyDocument"));

// Layout component
const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
      </Suspense>
      <ChatBot/>
      <WhatsApps />
      <Footer />
    </>
  );
};

// Define router configuration
const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/forgetPasswordModal",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ForgetPasswordModal />
      </Suspense>
    ),
  },
  {
    path: "/updatePassword",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UpdatePassword />
      </Suspense>
    ),
  },
  {
    path: "/navbar",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: "addedProperties",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddedProperties />
          </Suspense>
        ),
      },
      {
        path: "bookingInformation",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BookingInformation/>
          </Suspense>
        ),
      },


      {
        path: "paymentInformation",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PaymentInformation />
          </Suspense>
        ),
      },
      {
        path: "userProfileDetails/:id", // Dynamic id parameter
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserProfileDetails />
          </Suspense>
        ),
      },
      {
        path: "propertiesDetails/:id", // Dynamic id parameter
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PropertiesDetails />
          </Suspense>
        ),
      },
      {
        path: "message", 
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Message />
          </Suspense>
        ),
      },
      {
        path:"propertyDocument",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PropertyDocument />
          </Suspense>
        )
      }

    ],
  },
  {
    element: <Layout />, // Layout with Header & Footer
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
    
      {
        path: "/contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/faq",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FAQ />
          </Suspense>
        ),
      },
     
      {
        path: "/profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GetProfileData />
          </Suspense>
        ),
      },
      
      {
        path: "/logout",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Logout />
          </Suspense>
        ),
      },
      {
        path: "/addProperties",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <AddProperties />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/emailVerification",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EmailVerification />
          </Suspense>
        ),
      },
    
      {
        path: "/property/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GetPropertiesDetails />
          </Suspense>
        ),
      },
      {
        path: "/paymentSuccess",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PaymentSuccess />
          </Suspense>
        ),
      },
      {
      
      path: "/bookingHistory",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <BookingHistory/>
        </Suspense>
      ),
    },
      {
        path: "/khalti-PaymentSuccess",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <KhaltiPaymentSuccess />
          </Suspense>
        ),
      },
      {
        path: "/terms",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TermsAndConditions />
          </Suspense>
        ),
      },
     
      {
        path: "*",
        element: <NotFoundImage />,
      },
    ],
  },
]);

// Body component
const Body = () => {
  return <RouterProvider router={router} />;
};

export default Body;


