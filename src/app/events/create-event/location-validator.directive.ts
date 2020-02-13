import { Directive } from '@angular/core';
import { Validator, FormGroup, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true }],
})
export class LocationValidator implements Validator {
  validate(formGroup: FormGroup): ValidationErrors {
    const address = formGroup.controls.address;
    const city = formGroup.controls.city;
    const country = formGroup.controls.country;
    const onlineUrl = (formGroup.root as FormGroup).controls.onlineUrl;

    if (
      (address && address.value && city && city.value && country && country.value) ||
      (onlineUrl && onlineUrl.value)
    ) {
      return null;
    }

    return { validateLocation: false };
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
