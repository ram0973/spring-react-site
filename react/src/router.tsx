import './index.css'
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "./layout/ErrorPage.tsx";
import ProtectedRoute from "./layout/ProtectedRoute.tsx";
import AdminLayout from "./layout/AdminLayout.tsx";
import {FrontLayout} from "./layout/FrontLayout.tsx";
import {LoginPage} from "./auth/login/LoginPage.tsx";
import {SignupPage} from "./auth/signup/SignupPage.tsx";
import {PersonTablePage} from "./entities/person/crud/table/PersonTablePage.tsx";
import {PersonCreatePage} from "./entities/person/crud/create/PersonCreatePage.tsx";
import {PersonUpdatePage} from "./entities/person/crud/update/PersonUpdatePage.tsx";
import {PersonViewPage} from "./entities/person/crud/view/PersonViewPage.tsx";
import {ArticleTablePage} from "./entities/article/crud/table/ArticleTablePage.tsx";
import {ArticleCreatePage} from "./entities/article/crud/create/ArticleCreatePage.tsx";
import {ArticleViewPage} from "./entities/article/crud/view/ArticleViewPage.tsx";
import {ArticleUpdatePage} from "./entities/article/crud/update/ArticleUpdatePage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "signup",
        element: <SignupPage/>
      },
      {
        path: "articles/view/:id",
        element: <ArticleViewPage/>
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute><AdminLayout/></ProtectedRoute>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "persons",
        element: <PersonTablePage/>
      },
      {
        path: "persons/create",
        element: <PersonCreatePage/>
      },
      {
        path: "persons/update/:id",
        element: <PersonUpdatePage/>
      },
      {
        path: "persons/view/:id",
        element: <PersonViewPage/>
      },

      {
        path: "articles",
        element: <ArticleTablePage/>
      },
      {
        path: "articles/create",
        element: <ArticleCreatePage/>
      },
      {
        path: "articles/view/:id",
        element: <ArticleViewPage/>
      },
      {
        path: "articles/update/:id",
        element: <ArticleUpdatePage/>
      },
    ],
  },
]);
