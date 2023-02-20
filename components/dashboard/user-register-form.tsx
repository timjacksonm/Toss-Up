'use client';
import { Icons } from 'components/Icons/icons';
import Link from 'next/link';
import { useState } from 'react';

export default function UserRegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>();

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
            <input
              id="username"
              className="my-0 mb-2 block h-9 w-full rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              name="username"
              disabled={isLoading}
              required
            />
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              placeholder="name@example.com"
              className="my-0 mb-2 block h-9 w-full rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              name="email"
              disabled={isLoading}
              required
            />
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              className="my-0 mb-2 block h-9 w-full rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
              type="password"
              name="password"
              disabled={isLoading}
              required
            />
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="passwordconfirmation"
            >
              Password confirmation
            </label>
            <input
              id="passwordconfirmation"
              className="my-0 mb-2 block h-9 w-full rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
              type="password"
              name="passwordconfirmation"
              disabled={isLoading}
              required
            />
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
