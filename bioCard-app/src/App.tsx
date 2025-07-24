import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouteProvider from "./AppRouterProvider";
import AuthProvider from "./components/AuthProvider";
// import { CookiesProvider } from "react-cookie";

// Create a new router instance
const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      {/* <CookiesProvider> */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouteProvider />
        </AuthProvider>
      </QueryClientProvider>
      {/* </CookiesProvider> */}
    </>
  );
}
