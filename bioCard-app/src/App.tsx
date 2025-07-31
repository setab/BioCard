import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouteProvider from "./AppRouterProvider";
import AuthProvider from "./components/AuthProvider";
// import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Create a new router instance
const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      {/* <CookiesProvider> */}
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider
          clientId={
            "340627181675-utt1t04jrkrkcjqbctopaqkc8eteuttv.apps.googleusercontent.com"
          }
        >
          <AuthProvider>
            <AppRouteProvider />
          </AuthProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
      {/* </CookiesProvider> */}
    </>
  );
}
