'use client';
import { Icons } from 'components/Icons/icons';
import Link from 'next/link';
import { useState } from 'react';

export default function UserRegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string>();
  const [show, setShow] = useState({ password: false, cpassword: false });
  const [valid, setValid] = useState({ username: false, email: false });

  async function onSubmit() {
    setIsLoading(true);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                id="username"
                className="my-0 mb-2 block h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
                type="text"
                name="username"
                autoCapitalize="none"
                autoCorrect="off"
                required
                disabled={isLoading}
              />
              <span className="absolute top-0 right-2 pt-2 pr-2">
                {!valid.username ? (
                  <Icons.user className="h-6 w-6" />
                ) : (
                  <Icons.userCheck className="h-6 w-6" />
                )}
              </span>
            </div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="email"
            >
              Email
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
                {!valid.username ? (
                  <Icons.user className="h-6 w-6" />
                ) : (
                  <Icons.userCheck className="h-6 w-6" />
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
                type={show.password ? 'text' : 'password'}
                name="password"
                required
                disabled={isLoading}
              />
              <span
                className="absolute top-0 right-2 cursor-pointer pt-2 pr-2"
                onClick={() => setShow({ ...show, password: !show.password })}
              >
                {show.password ? (
                  <Icons.eyeOpen className="h-6 w-6" />
                ) : (
                  <Icons.eyeClosed className="h-6 w-6" />
                )}
              </span>
            </div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="passwordconfirmation"
            >
              Password confirmation
            </label>
            <div className="relative">
              <input
                id="cpassword"
                className="my-0 mb-2 block h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
                type={show.cpassword ? 'text' : 'password'}
                name="cpassword"
                required
                disabled={isLoading}
              />
              <span
                className="absolute top-0 right-2 cursor-pointer pt-2 pr-2"
                onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
              >
                {show.cpassword ? (
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
          <p className="flex flex-col px-6 text-center text-sm text-slate-600 hover:text-black">
            <Link href="/" className="underline">
              By signing up, you agree to our terms of use.
            </Link>
          </p>
          <button
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 dark:hover:bg-[#050708]/30 dark:focus:ring-slate-500"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin fill-white" />
            )}
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
