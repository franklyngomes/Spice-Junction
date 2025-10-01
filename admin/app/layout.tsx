import { Outfit } from 'next/font/google';

import { SidebarProvider } from '../context/SidebarContext';
import { ThemeProvider } from '../context/ThemeContext';
import Provider from './(admin)/provider';
import { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

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
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#000000',
                color: '#fff',
              },
            }}
            containerStyle={{
              zIndex: 99999,
            }}
          />
        </Provider>
      </body>
    </html>
  );
}
