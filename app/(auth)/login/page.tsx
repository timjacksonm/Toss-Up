import UserAuthForm from 'components/dashboard/user-auth-form';
import { Icons } from 'components/Icons/icons';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { pages } from 'utils/pages';
import { getCurrentUser } from 'utils/session';

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(pages.dashboard);
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute top-4 left-4 inline-flex items-center justify-center rounded-lg border border-transparent bg-white py-2 px-3 text-center text-sm  font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:top-8 md:left-8"
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 rounded-md border bg-white p-8 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-slate-600">
            Enter your email to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-slate-600">
          <Link href="/register" className="hover:text-brand underline">
            {"Don't have an account? Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
}
