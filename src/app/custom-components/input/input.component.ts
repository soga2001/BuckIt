import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputMask } from 'primeng/inputmask';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-input-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputMask,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() helpText: string = '';
  @Input() classes: string = '';

  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() hidden: boolean = false;
  @Input() autofocus: boolean = false
  @Input() toggleMask: boolean = true;


  @Input() minLength: number = 0;
  @Input() maxLength: number = 0;
  @Input() pattern: string = '';
  @Input() mask: string = '';

  @Input() feedback: boolean = false;
  @Input() feedbackStyle: string = '';
  @Input() feedbackIcon: string = '';
  @Input() feedbackIconClass: string = '';

  
  /* Icon properties
    pi is mandatory for icon if using primeng icons
      eg: pi pi-search, pi pi-calendar, pi pi-user
    material icons can be used without prefix
      eg: home, calendar_month, user
  */
  @Input() icon: string = ''; 
  @Input() iconPos: string = 'prepend'; // prepend | append
  @Input() iconLibrary: string = 'material'; // primeng | material
  @Input() iconStyle: string = ''; // Sharp | Outlined | Round | ''

  @Input() value: any;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  onValueChange(newValue: any) {
    this.valueChange.emit(newValue);
  }
}
