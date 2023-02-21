import { FormikTouched } from 'formik';
import { IFormikErrors } from 'lib/types/IFormikErrors';
import { Icons } from './icons';

export interface IProps {
  formik: {
    errors: Partial<IFormikErrors>;
    touched: FormikTouched<IFormikErrors>;
  };
  name: keyof IFormikErrors;
}

export function getValidatedUserIcon(props: IProps) {
  const { formik, name } = props;
  if (!formik.errors[`${name}`] && formik.touched[`${name}`]) {
    return <Icons.userCheck className="h-6 w-6 stroke-green-400" />;
  }

  if (formik.errors[`${name}`] && formik.touched[`${name}`]) {
    return <Icons.userX className="h-6 w-6 stroke-red-600" />;
  }

  return <Icons.user className="h-6 w-6" />;
}
