import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-bank-detail',
  templateUrl: './add-bank-detail.component.html',
  styleUrls: ['./add-bank-detail.component.scss'],
})
export class AddBankDetailComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { }

  get country() {
    return this.bankDetailForm.get('country');
  }
  get accountType() {
    return this.bankDetailForm.get('accountType');
  }
  get BankName() {
    return this.bankDetailForm.get('BankName');
  }
  get AccountHolderName() {
    return this.bankDetailForm.get('AccountHolderName');
  }

  get accountNumber() {
    return this.bankDetailForm.get('accountNumber');
  }

  get routingNumber() {
    return this.bankDetailForm.get('routingNumber');
  }

  get confitmRoutingNumber() {
    return this.bankDetailForm.get('confitmRoutingNumber');
  }

  bankDetailForm = this.formBuilder.group({
    country: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    accountType: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    BankName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z][a-zA-Z_ ]+[a-zA-Z _]$')]],
    AccountHolderName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z][a-zA-Z_ ]+[a-zA-Z _]$')]],
    accountNumber: ['', [Validators.required, Validators.minLength(19), Validators.pattern(/^[1-9][-]{0}[0-9]+/)]], // /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
    routingNumber: ['', [Validators.required, Validators.minLength(20), Validators.pattern(/^[1-9]{0}[0-9]+/)]], // /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
    confitmRoutingNumber: ['', [Validators.required, Validators.minLength(20), Validators.pattern(/^[1-9]{0}[0-9]+/)]], // /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/
  }, {
    validator: this.ValidateRoutingNo('routingNumber', 'confitmRoutingNumber')
  });

  ValidateRoutingNo(routingNumber, confitmRoutingNumber) {
    return (form: FormGroup): { [key: string]: any } => {

      return form.controls[routingNumber].value == form.controls[confitmRoutingNumber].value ? null : { mismatch: true };
    }
  }

  public errorMessages = {
    country: [
      { type: 'required', message: 'Country is required' },
    ],
    accountType: [
      { type: 'required', message: 'Account type is required' },
    ],
    BankName: [
      { type: 'required', message: 'Bank Name is required' },
      { type: 'pattern', message: 'Enter a valid Bank Name ' }
    ],
    AccountHolderName: [
      { type: 'required', message: 'Account Holder Name is required' },
      { type: 'pattern', message: 'Enter a valid Account Holder Name' }
    ],
    accountNumber: [
      { type: 'required', message: 'Account Number is required' },
      { type: 'pattern', message: 'Enter a valid Account Number' }
    ],
    routingNumber: [
      { type: 'required', message: 'Routing Number is required' },
      { type: 'pattern', message: 'Enter a valid Routing Number' }
    ],
    confitmRoutingNumber: [
      { type: 'required', message: 'Routing Number is required' },
      { type: 'pattern', message: 'Enter a valid Routing Number' }
    ],
    mismatch: 'Routing Number does not match'
  };

}
