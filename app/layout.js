import { ToastContainer } from "react-toastify";
import "./globals.css";
import { AppProvider } from "./context/AppContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <AppProvider>
          {children}
          <ToastContainer position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}
