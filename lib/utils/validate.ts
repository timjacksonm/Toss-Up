import { ILoginValues } from 'lib/types/ILoginValues';
import { IFormValues } from 'lib/types/IFormValues';
import { IFormikErrors } from 'lib/types/IFormikErrors';

export function validateForm(values: IFormValues) {
  const errors = <IFormikErrors>{};

  if (!values.username) {
    errors.username = 'Required';
  } else if (!/^[a-zA-Z0-9]{5,16}$/i.test(values.username)) {
    errors.username = 'Invalid username';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be greater then 8 characters';
  } else if (values.password.includes(' ')) {
    errors.password = 'Invalid password';
  }

  if (!values.cpassword) {
    errors.cpassword = 'Required';
  } else if (values.password !== values.cpassword) {
    errors.cpassword = 'Confirmed password does not match';
  } else if (values.password.includes(' ')) {
    errors.cpassword = 'Invalid confirm password';
  }

  return errors;
}

export function validateLogin(values: ILoginValues) {
  const errors = <IFormikErrors>{};

  if (!values.username) {
    errors.username = 'Required';
  } else if (!/^[a-zA-Z0-9]{5,16}$/i.test(values.username)) {
    errors.username = 'Invalid username';
  }

  return errors;
}
