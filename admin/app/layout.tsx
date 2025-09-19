import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '../context/SidebarContext';
import { ThemeProvider } from '../context/ThemeContext';
import Provider from './provider';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast'

const outfit = Outfit({
  subsets: ["latin"],
});
export const metadata: Metadata = {
   title:
    "Spice Junction | Deliciousness Delivered To Your Door",
  description: "Spice Junction Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Provider>
          <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#000000',
            color: '#fff',
          },
        }}
        containerStyle={{
          zIndex: 99999,
        }}
        />
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
