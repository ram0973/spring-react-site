import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ChakraProvider, createStandaloneToast} from '@chakra-ui/react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, RouterProvider} from "react-router-dom";
import routes from "./routing/routes.tsx";
import BaseLayout from "./layouts/BaseLayout.tsx";

const queryClient = new QueryClient();
const {ToastContainer, toast} = createStandaloneToast()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/*<BrowserRouter >*/}
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <BaseLayout>
            <ToastContainer/>
            <RouterProvider router={routes}/>
          </BaseLayout>
        </ChakraProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)

toast({
  title: 'An error occurred.',
  description: 'Unable to create user account.',
  status: 'error',
  duration: 9000,
  isClosable: true,
})