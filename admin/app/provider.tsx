"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import './globals.css';

export const queryClient = new QueryClient()
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
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
    </QueryClientProvider>
  )
}

export default Provider