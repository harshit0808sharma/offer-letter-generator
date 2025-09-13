'use client';
// import { usePathname, useRouter } from 'next/navigation'; // App Router
import { createContext } from "react";
// import Cookies from "js-cookie";

export const AuthContext = createContext();

// const STORAGE_KEYS = {
//   COOKIE_EXISTS: "cookieExists"
// };

export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [cookieExists, setCookieExists] = useState("notExists");
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   // Only get router inside functions/effects
//   const validateAuthState = useCallback(() => {
//     const stored = localStorage.getItem(STORAGE_KEYS.COOKIE_EXISTS);
//     if (stored) {
//       try {
//         const { value, expiresAt } = JSON.parse(stored);
//         if (Date.now() < expiresAt) {
//           setCookieExists(value);
//           if (value === "exists") {
//             setIsAuthenticated(true);
//             Cookies.set("authToken", "true", { expires: 1 });
//           }
//           return true;
//         }
//       } catch {
//         localStorage.removeItem(STORAGE_KEYS.COOKIE_EXISTS);
//         setCookieExists("notExists");
//         setIsAuthenticated(false);
//         Cookies.remove("authToken");
//       }
//     }
//     return false;
//   }, []);

//   const handleLogout = useCallback(() => {
//     setIsLoggingOut(true);
//     Cookies.remove("authToken");
//     localStorage.removeItem(STORAGE_KEYS.COOKIE_EXISTS);
//     setIsAuthenticated(false);
//     setCookieExists("notExists");

//     if (typeof window !== "undefined") {
//       const router = require("next/navigation").useRouter(); // lazy import inside client
//       router.push("/login");
//     }

//     setTimeout(() => setIsLoggingOut(false), 100);
//   }, []);

//   useEffect(() => {
//     validateAuthState();
//   }, [validateAuthState]);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};
