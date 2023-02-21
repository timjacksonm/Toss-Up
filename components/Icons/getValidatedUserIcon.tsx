import { Icons } from './icons';

export function getValidatedUserIcon(formik, name) {
  if (!formik.errors[`${name}`] && formik.touched[`${name}`]) {
    return <Icons.userCheck className="h-6 w-6 stroke-green-400" />;
  }

  if (formik.errors[`${name}`] && formik.touched[`${name}`]) {
    return <Icons.userX className="h-6 w-6 stroke-red-600" />;
  }

  return <Icons.user className="h-6 w-6" />;
}
