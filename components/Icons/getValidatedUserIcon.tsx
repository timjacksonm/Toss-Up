import { IFormikHelperProps } from 'lib/types/IFormikHelperProps';
import { Icons } from './icons';

/**
 * Returns an icon to represent the validation status of a user form field.
 *
 * @param {object} props - An object containing the `formik` object and the `name` of the user form field.
 * @param {object} props.formik - A Formik object containing the form state and helpers.
 * @param {string} props.name - A string representing the name of the user form field.
 * @returns {JSX.Element} An icon element indicating the validation status of the user form field.
 * - Returns a green checkmark icon if the user form field is valid and has been touched by the user.
 * - Returns a red X icon if the user form field is invalid and has been touched by the user.
 * - Returns a default user icon if the user form field has not been touched by the user.
 */
export function getValidatedUserIcon(props: IFormikHelperProps) {
  const { formik, name } = props;
  if (!formik.errors[`${name}`] && formik.touched[`${name}`]) {
    return <Icons.userCheck className='h-6 w-6 stroke-green-400' />;
  }

  if (formik.errors[`${name}`] && formik.touched[`${name}`]) {
    return <Icons.userX className='h-6 w-6 stroke-red-600' />;
  }

  return <Icons.user className='h-6 w-6' />;
}
