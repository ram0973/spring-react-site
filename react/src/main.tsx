import {router} from "./router.tsx"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ChakraProvider} from "@chakra-ui/react";
import {AuthProvider} from "./auth/context/AuthProvider.tsx";
import {RouterProvider} from "react-router-dom";
import React from "react";
import ReactDOM from 'react-dom/client'

const queryClient = new QueryClient();

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
