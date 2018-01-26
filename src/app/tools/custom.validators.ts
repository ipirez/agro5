import {FormArray, FormControl, FormGroup, ValidationErrors} from '@angular/forms';

export class CustomValidators {
    /*static image(c): Promise<ValidationErrors> {
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
    }*/

    static imageWeight(c: FormControl): Promise<ValidationErrors> {
        var isValid = false;
        const maxWeightKB = 200;
        const maxWidthPX = 200;
        const maxHeightPX = 200;

        var dataurl = c.value;
        
        if (dataurl!=null && dataurl.length>0) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], 'file.jpg', { type: mime });
            var _URL = window.URL;
            var img = new Image();
            let rightSize = false;
            let rightWeight = false;
            img.onload =function(){
               rightSize = img.width<=maxWidthPX && img.height<=maxHeightPX;
               rightWeight = file.size / 1024 <= maxWeightKB;
               isValid = rightWeight && rightSize;
            }
            img.src = window.URL.createObjectURL(file);
            
            let reader = new FileReader();
            reader.readAsDataURL(file);  
            
        }
        const message = {
            'weight': {
                'message': 'La imagen no debe ser mayor a ' + maxWeightKB
            }
        };
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(isValid ? null : message);
            }, 1000);
        });
    }
    
    static imageSize(c: FormControl): Promise<ValidationErrors> {
        var isValid = false;
        const maxWidthPX = 200;
        const maxHeightPX = 200;
        var dataurl = c.value;
        if (dataurl!=null && dataurl.length>0) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var _URL = window.URL;
            const file = new File([u8arr], 'file.jpg', { type: mime });
            var img = new Image();
            img.src = _URL.createObjectURL(file);
            isValid = img.width<=maxWidthPX && img.height<=maxHeightPX;
        }
        const message = {
            'weight': {
                'message': 'La imagen debe medir ' + maxWidthPX + " x " + maxHeightPX + " como máximo"
            }
        };
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(isValid ? null : message);
            }, 1);
        });
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
