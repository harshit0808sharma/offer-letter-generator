import { ToastContainer } from "react-toastify";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import { Montserrat } from 'next/font/google';

export const metadata = {
  title: "Lokaci Offer Letter",
  description: "offer letter generator application",
};


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AppProvider>
          {children}
          <ToastContainer position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}
