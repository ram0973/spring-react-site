import {router} from "./router.tsx"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {AuthProvider} from "./auth/context/AuthProvider.tsx";
import {RouterProvider} from "react-router-dom";
import React from "react";
import ReactDOM from 'react-dom/client'

const queryClient = new QueryClient();

// const colors = {
//   brand: {
//     900: "#1a365d",
//     800: "#153e75",
//     700: "#2a69ac",
//   },
// };
// const theme = extendTheme({ colors });

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
