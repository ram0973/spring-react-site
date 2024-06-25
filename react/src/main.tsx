import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ChakraProvider} from '@chakra-ui/react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
//import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { RouterProvider, createRouter } from '@tanstack/react-router'


const queryClient = new QueryClient();
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <FrontLayout/>,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/persons/:personId",
//         element: <PersonEditPage />,
//       },
//       {
//         path: "login",
//         element: <LoginPage/>
//       },
//       {
//         path: "register",
//         element: <RegisterPage/>
//       },
//     ],
//   },
//   {
//     path: "/admin",
//     element: <AdminLayout/>,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "persons/:personId",
//         element: <PersonEditPage />,
//       },
//       {
//         path: "person-table",
//         element: <PersonCrud/>
//       }
//     ],
//   },
// ]);

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/*<BrowserRouter >*/}
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router}/>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)