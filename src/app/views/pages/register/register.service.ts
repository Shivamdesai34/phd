import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 5,
    passwordMin: 6,
    passwordMax: 10,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}'
  };

  formErrors = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    accept: false
  };

  //login error messages
  constructor() {
    this.errorMessages = {
      firstName: {
        required: 'First name is required'
      },
      lastName: {
        required: 'Last name is required'
      },
      username: {
        required: 'Username is required',
        minLength: `Username must be ${this.formRules.usernameMin} characters or more`,
        pattern: 'Must contain letters and/or numbers, no trailing spaces'
      },
      email: {
        required: 'required',
        email: 'Invalid email address'
      },
      password: {
        required: 'Password is required',
        pattern: 'Password must contain: numbers, uppercase and lowercase letters',
        minLength: `Password must contain between ${this.formRules.passwordMin} - ${this.formRules.passwordMax} characters`,
      },
      confirmPassword: {
        required: 'Password confirmation is required',
        passwordMismatch: 'Passwords must match'
      },
      birthday: {
        required: 'Birthday date required'
      },
      accept: {
        requiredTrue: 'You have to accept our Terms and Conditions'
      }
    };

  }

}
