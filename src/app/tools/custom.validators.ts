import {FormArray, FormControl, FormGroup, ValidationErrors} from '@angular/forms';

export class CustomValidators {
  static image(c): Promise<ValidationErrors> {
    var message = null;

    if (c.value === "") {
      //console.log('valor invalido')
      message = {
        'years': {
          'message': 'el campo es obligatoria'
        }
      }
    }
    else {
      if ((encodeURI(c.value).split(/%..|./).length - 1) > 97540) {
        message = {
          'years': {
            'message': 'la imagen es demasiado grande, se recomienda 200 x 200'
          }
        }
      }
      else {
        message = null
      }
    }
    return message
  }

  static birthYear(c: FormControl): ValidationErrors {
    /*  const currentYear = new Date().getFullYear();
      const minYear = currentYear - 85;
      const maxYear = currentYear - 18;
      const isValid = !isNaN(numValue) && numValue >= minYear && numValue <= maxYear;
      const message = {
        'years': {
          'message': 'The year must be a valid number between ' + minYear + ' and ' + maxYear
        }
      };
      return isValid ? null : message;*/
    return null
  }

  static countryCity(form: FormGroup): ValidationErrors {
    const countryControl = form.get('location.country');
    const cityControl = form.get('location.city');

    if (countryControl != null && cityControl != null) {
      const country = countryControl.value;
      const city = cityControl.value;
      let error = null;

      if (country === 'France' && city !== 'Paris') {
        error = 'If the country is France, the city must be Paris';
      }

      const message = {
        'countryCity': {
          'message': error
        }
      };

      return error ? message : null;
    }
  }

  static uniqueName(c: FormControl): Promise<ValidationErrors> {
    const message = {
      'uniqueName': {
        'message': 'The name is not unique'
      }
    };

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(c.value === 'Existing' ? message : null);
      }, 1000);
    });
  }

  static telephoneNumber(c: FormControl): ValidationErrors {
    const isValidPhoneNumber = /^\d{3,3}-\d{3,3}-\d{3,3}$/.test(c.value);
    const message = {
      'telephoneNumber': {
        'message': 'The phone number must be valid (XXX-XXX-XXX, where X is a digit)'
      }
    };
    return isValidPhoneNumber ? null : message;
  }

  static telephoneNumbers(form: FormGroup): ValidationErrors {

    const message = {
      'telephoneNumbers': {
        'message': 'At least one telephone number must be entered'
      }
    };

    const phoneNumbers = <FormArray>form.get('phoneNumbers');
    const hasPhoneNumbers = phoneNumbers && Object.keys(phoneNumbers.controls).length > 0;

    return hasPhoneNumbers ? null : message;
  }
}
