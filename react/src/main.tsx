import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ChakraProvider} from '@chakra-ui/react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import routes from "./routing/routes.tsx";
import BaseLayout from "./layouts/BaseLayout.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BaseLayout>
          <RouterProvider router={routes}/>
        </BaseLayout>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
