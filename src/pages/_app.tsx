import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { api } from "~/utils/api";
import HeaderComponent from "../components/navbar/index";
import MainContent  from '../components/maincontent/index'

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
       <HeaderComponent />
        {/* <MainContent/> */}
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
