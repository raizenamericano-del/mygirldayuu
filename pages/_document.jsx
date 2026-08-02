import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id" className="scroll-smooth">
      <Head />
      <body className="min-h-screen relative font-sans selection:bg-rose-500 selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
