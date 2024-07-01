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
import PersonUpdate from "./features/person/edit/PersonUpdate.tsx";
import ProtectedRoute from "./features/layout/ProtectedRoute.tsx";
import PersonCreate from "./features/person/edit/PersonCreate.tsx";

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
    element: <ProtectedRoute><AdminLayout/></ProtectedRoute>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "persons",
        element: <PersonTable/>
      },
      {
        path: "persons/create",
        element: <PersonCreate/>
      },
      {
        path: "persons/edit/:id",
        element: <PersonUpdate/>
      },
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
