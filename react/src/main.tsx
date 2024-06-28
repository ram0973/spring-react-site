import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ChakraProvider} from '@chakra-ui/react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import FrontLayout from "./features/layout/FrontLayout.tsx";
import ErrorPage from "./features/error/ErrorPage.tsx";
import LoginPage from "./features/auth/login/LoginPage.tsx";
import SignupPage from "./features/auth/signup/SignupPage.tsx";
import AdminLayout from "./features/layout/AdminLayout.tsx";
import PersonTable from "./features/person/table/PersonTable.tsx";

import AuthProvider from "./features/context/auth/AuthProvider.tsx";
import PersonCreateOrEditPage from "./features/person/edit/PersonCreateOrEditPage.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
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
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      // {
      //   path: "persons/:personId/edit",
      //   element: <PersonEditPage/>,
      // },
      {
        path: "person-table",
        element: <PersonTable/>
      },
      {
        path: "person/:id",
        element: <PersonCreateOrEditPage/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <RouterProvider router={router}/>
        </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
