import { ISigninValues } from 'lib/types/ISigninValues';
import { IFormValues } from 'lib/types/IFormValues';
import { IFormikErrors } from 'lib/types/IFormikErrors';

// This regex will match passwords that:

// Are at least 8 characters long
// Contain at least one lowercase letter
// Contain at least one uppercase letter
// Contain at least one digit
// Contain at least one special character from the set @$!%*?&
export const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
  } else if (!strongPasswordRegex.test(values.password)) {
    if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/\d/.test(values.password)) {
      errors.password = 'Password must contain at least one digit';
    } else if (!/[@$!%*?&]/.test(values.password)) {
      errors.password = 'Password must contain at least one special character from the set @$!%*?&';
    }
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

export function validateSignin(values: ISigninValues) {
  const errors = <IFormikErrors>{};

  if (!values.username) {
    errors.username = 'Required';
  } else if (!/^[a-zA-Z0-9]{5,16}$/i.test(values.username)) {
    errors.username = 'Invalid username';
  }

  return errors;
}
