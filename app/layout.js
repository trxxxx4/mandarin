'use client'
import "./globals.css";
import { InterfaceProvider } from "./context/interfaceContext";
import { GlobalProvider } from "./context/context";
import Header from "./components/header/Header";
import Notification from "./components/notification/Notification";
import MainWrapper from "./components/main/mainWrapper.js";


export default function RootLayout({ children }) {
  
  

  return (
  <html>
    <InterfaceProvider>
      <body>
        <GlobalProvider>
            <Header></Header>
            <MainWrapper >
              {children}
              
            </MainWrapper>
            <Notification></Notification>
          </GlobalProvider>
        </body>
    </InterfaceProvider>
  </html>
  );
}
