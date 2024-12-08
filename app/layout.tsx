import React from 'react';
import './globals.css';
import Navigation from './dashboard/Navigation';

export const metadata = {
  title: 'GMTU Site',
  description: 'Сайт студенческого совета ГМТУ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head />
      <body>
        <Navigation />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
