import SessionWrapper from 'components/SessionWrapper';
import 'styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body className='flex justify-center bg-slate-600'>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
