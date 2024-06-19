import {createBrowserRouter} from 'react-router-dom';
import App from "../App.tsx";
import LoginPage from "../features/auth/login/LoginPage.tsx";
import RegisterPage from "../features/auth/registration/RegisterPage.tsx";
import HomePage from "../pages/HomePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/home",
    element: <HomePage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
]);

export default router;