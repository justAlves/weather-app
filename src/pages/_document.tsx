import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weather - by Alves',
  description: ''
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-zinc-950'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
