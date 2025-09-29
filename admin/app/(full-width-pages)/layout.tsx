import { Toaster } from "react-hot-toast";

export default function FullWidthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
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
      {children}
    </div>
  )
}
