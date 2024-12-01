import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';


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
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() helpText: string = '';

  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() hidden: boolean = false;
  @Input() autofocus: boolean = false
  @Input() toggleMask: boolean = true;


  @Input() minLength: number = 0;
  @Input() maxLength: number = 0;
  @Input() pattern: string = '';

  @Input() feedback: boolean = false;
  @Input() feedbackStyle: string = '';
  @Input() feedbackIcon: string = '';
  @Input() feedbackIconClass: string = '';

  // pi is mandatory for icon
  @Input() icon: string = ''; // eg: pi pi-search, pi pi-calendar, pi pi-user
  @Input() iconPos: string = 'prepend'; // prepend | append

  @Output() valueChange: string = '';


  text1: string | undefined;

    text2: string | undefined;

    number: string | undefined;

    selectedCity: City | undefined;

    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
    ];
  
}
