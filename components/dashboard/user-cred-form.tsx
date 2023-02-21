'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import GoogleLogo from '../Icons/google';
import { Icons } from '../Icons/icons';

export default function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [validUsername, setValidUsername] = useState(false);

  async function onSubmit() {
    setIsLoading(true);
    // To be added
  }

  return (
    <div className={'grid gap-6'}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="email"
            >
              Username
            </label>
            <div className="relative">
              <input
                id="email"
                className="my-0 mb-2 block h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                name="email"
                required
                disabled={isLoading}
              />
              <span className="absolute top-0 right-2 pt-2 pr-2">
                {!validUsername ? (
                  <Icons.user className="h-6 w-6" />
                ) : (
                  <Icons.userCheck className="h-6 w-6 stroke-green-400" />
                )}
              </span>
            </div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                className="my-0 mb-2 block h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
                type={show ? 'text' : 'password'}
                name="password"
                required
                disabled={isLoading}
              />
              <span
                className="absolute top-0 right-2 cursor-pointer pt-2 pr-2"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <Icons.eyeOpen className="h-6 w-6" />
                ) : (
                  <Icons.eyeClosed className="h-6 w-6" />
                )}
              </span>
            </div>

            {/* {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )} */}
          </div>
          <button
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 dark:hover:bg-[#050708]/30 dark:focus:ring-slate-500"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin fill-white" />
            )}
            Sign In
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-600">Or continue with</span>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex w-full items-center justify-center rounded-lg border bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 dark:hover:bg-[#050708]/30 dark:focus:ring-slate-500"
        onClick={() =>
          signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' })
        }
        disabled={isLoading}
      >
        <GoogleLogo className="mr-2 h-4 w-4" />
        Continue with Google
      </button>
    </div>
  );
}
