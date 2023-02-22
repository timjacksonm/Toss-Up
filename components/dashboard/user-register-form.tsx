'use client';
import { Icons } from 'components/Icons/icons';
import Link from 'next/link';
import { useState } from 'react';
import { useFormik } from 'formik';
import { validateForm } from 'lib/utils/validate';
import { getValidatedUserIcon } from 'components/Icons/getValidatedUserIcon';
import { IFormValues } from 'lib/types/IFormValues';
import { redBorderOnError } from 'utils/redBorderOnError';

export default function UserRegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState({ password: false, cpassword: false });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: validateForm,
    onSubmit,
  });

  async function onSubmit(values: IFormValues) {
    console.log(values);
    setIsLoading(true);
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
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
                className={` my-0 mb-2 block h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1`}
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                {...formik.getFieldProps('username')}
              />
              <span className="absolute top-0 right-2 pt-2 pr-2">
                {getValidatedUserIcon({ formik, name: 'username' })}
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
                disabled={isLoading}
                {...formik.getFieldProps('email')}
              />
              <span className="absolute top-0 right-2 pt-2 pr-2">
                {getValidatedUserIcon({ formik, name: 'email' })}
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
                className={
                  redBorderOnError({ formik, name: 'password' }) +
                  ' ' +
                  'my-0 block h-10 w-full rounded-md border border-slate-300 py-2 pl-3 pr-11 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1'
                }
                type={show.password ? 'text' : 'password'}
                disabled={isLoading}
                {...formik.getFieldProps('password')}
              />
              <span
                className="absolute top-0 right-2 cursor-pointer pt-2 pr-2"
                onClick={() => setShow({ ...show, password: !show.password })}
              >
                {show.password ? (
                  <Icons.eyeOpen className="h-6 w-6 bg-white" />
                ) : (
                  <Icons.eyeClosed className="h-6 w-6 bg-white" />
                )}
              </span>
            </div>
            {formik.touched.password && (
              <p className="px-1 text-xs text-red-600">
                {formik.errors.password}
              </p>
            )}

            <label
              className="mt-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="cpassword"
            >
              Password confirmation
            </label>
            <div className="relative">
              <input
                id="cpassword"
                className={
                  redBorderOnError({ formik, name: 'cpassword' }) +
                  ' ' +
                  'my-0 block h-10 w-full rounded-md border border-slate-300 py-2 pl-3  pr-11 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1'
                }
                type={show.cpassword ? 'text' : 'password'}
                disabled={isLoading}
                {...formik.getFieldProps('cpassword')}
              />
              <span
                className="absolute top-0 right-2 cursor-pointer pt-2 pr-2"
                onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
              >
                {show.cpassword ? (
                  <Icons.eyeOpen className="h-6 w-6 bg-white" />
                ) : (
                  <Icons.eyeClosed className="h-6 w-6 bg-white" />
                )}
              </span>
            </div>
            {formik.touched.cpassword && (
              <p className="px-1 text-xs text-red-600">
                {formik.errors.cpassword}
              </p>
            )}
          </div>

          <p className="mt-2 flex flex-col px-6 text-center text-sm text-slate-600 hover:text-black">
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
