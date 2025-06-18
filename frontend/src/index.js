import Protected from "./components/AuthProtecter.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Button from "./components/Button.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ContactPage from "./pages/Contact.jsx";
import Input from "./components/Input.jsx";
import Pfp from "./components/Pfp.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ProfilePage from "./pages/Profile.jsx";
import ControlPage from "./pages/ControlPage.jsx";
import authservice from "./services/auth.service.js";
import partsService from "./services/parts.service.js";
import shelvesService from "./services/shelves.service.js";
import Shelvebox from "./components/Shelvebox.jsx";
import SessionPage from "./pages/SessionPage.jsx";
import Sidebar from "./components/Sidebar.jsx";
import AsideButton from "./components/AsideButton.jsx";
import StockPage from "./components/Stock.jsx";
import Dashboard from "./components/Dashboard.jsx";

export {
  Dashboard,
  AsideButton,
  Header,
  Footer,
  Button,
  AuthPage,
  ContactPage,
  Input,
  Pfp,
  LandingPage,
  ProfilePage,
  ControlPage,
  Protected,
  authservice,
  partsService,
  shelvesService,
  Shelvebox,
  SessionPage,
  Sidebar,
  StockPage,
};
