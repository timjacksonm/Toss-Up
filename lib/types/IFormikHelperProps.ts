import { FormikTouched } from 'formik';
import { IFormikErrors } from './IFormikErrors';

export interface IFormikHelperProps {
  formik: {
    errors: Partial<IFormikErrors>;
    touched: FormikTouched<IFormikErrors>;
  };
  name: keyof IFormikErrors;
}
