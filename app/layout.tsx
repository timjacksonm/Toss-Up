import SessionWrapper from 'components/SessionWrapper';
import 'styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body className='bg-slate-600 px-40 py-3'>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
