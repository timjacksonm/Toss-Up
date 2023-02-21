import { IFormikHelperProps } from 'lib/types/IFormikHelperProps';

/**
 * Returns a Tailwind CSS class for displaying a red border on a form field when it has an error.
 *
 * @param {object} props - An object containing the `formik` object and the `name` of the form field.
 * @param {object} props.formik - A Formik object containing the form state and helpers.
 * @param {string} props.name - A string representing the name of the form field.
 * @returns {string} The CSS class 'border-rose-500' if the specified form field has an error and has been touched by the user, or an empty string otherwise.
 */
export const redBorderOnError = (props: IFormikHelperProps) => {
  const { formik, name } = props;
  return (
    formik.errors[`${name}`] && formik.touched[`${name}`] && 'border-rose-500'
  );
};
