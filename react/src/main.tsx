import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ChakraProvider, extendTheme, withDefaultColorScheme} from '@chakra-ui/react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./layout/ErrorPage.tsx";
import SignupPage from "./auth/signup/SignupPage.tsx";
import ProtectedRoute from "./layout/ProtectedRoute.tsx";
import AdminLayout from "./layout/AdminLayout.tsx";
import Persons from "./entities/person/Persons.tsx";
import PersonCreate from "./entities/person/PersonCreate.tsx";
import PersonUpdate from "./entities/person/PersonUpdate.tsx";
import {FrontLayout} from "./layout/FrontLayout.tsx";
import {LoginPage} from "./auth/login/LoginPage.tsx";
import {AuthProvider} from "./auth/context/AuthProvider.tsx";

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
        element: <Persons/>
      },
      {
        path: "persons/create",
        element: <PersonCreate/>
      },
      {
        path: "persons/update/:id",
        element: <PersonUpdate/>
      },
    ],
  },
]);

const customTheme = extendTheme(withDefaultColorScheme({ colorScheme: 'blue' }))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <AuthProvider>
          <RouterProvider router={router}/>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
