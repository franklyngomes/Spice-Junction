import { ThemeProvider } from "../../../context/ThemeContext";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative items-center justify-center h-full flex z-1">
                <Image
                  src={"/images/spicejnctnbg.png"}
                  alt="Background"
                  fill
                  sizes="100vw"
                  className="object-cover object-left -z-1 w-full h-auto"
                />
              <div className="flex flex-col items-center max-w-xs">
                <Image
                  width={350}
                  height={90}
                  src="/images/icons/lightlogo.svg"
                  alt="Logo"
                />
                <p className="text-center text-gray-200">
                  Deliciousness Delivered To Your Door
                </p>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
