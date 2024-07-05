import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ChakraProvider} from '@chakra-ui/react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./layout/ErrorPage.tsx";
import ProtectedRoute from "./layout/ProtectedRoute.tsx";
import AdminLayout from "./layout/AdminLayout.tsx";
import {FrontLayout} from "./layout/FrontLayout.tsx";
import {LoginPage} from "./auth/login/LoginPage.tsx";
import {AuthProvider} from "./auth/context/AuthProvider.tsx";
import {SignupPage} from "./auth/signup/SignupPage.tsx";
import {PersonTablePage} from "./entities/person/crud/table/PersonTablePage.tsx";
import {PersonCreatePage} from "./entities/person/crud/create/PersonCreatePage.tsx";
import {PersonUpdatePage} from "./entities/person/crud/update/PersonUpdatePage.tsx";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider>
          <RouterProvider router={router}/>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
