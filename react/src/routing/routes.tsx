import {createBrowserRouter} from 'react-router-dom';
import LoginPage from "../features/auth/login/LoginPage.tsx";
import RegisterPage from "../features/auth/registration/RegisterPage.tsx";
import HomePage from "../pages/HomePage.tsx";
import PersonCrud from "../features/person/PersonCrud.tsx";

const router = createBrowserRouter([
  {
    path: "/",
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
  {
    path: "/person-table",
    element: <PersonCrud/>
  }
]);

export default router;