import 'styles/globals.css';
import ProvidersWrapper from 'components/ProvidersWrappers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-gray-900">
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
