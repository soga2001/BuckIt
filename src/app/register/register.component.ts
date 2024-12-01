import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    StepsModule,
    ButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) {} // Inject the Router service

  activeStep: number = 0;
  items: MenuItem[] = [
    {
      label: "Login",
      routerLink: ""
    },
    {
      label: "Personal Information",
      routerLink: "personal-information"
    },
    {
      label: "Verify Account",
      routerLink: "verify-account"
    },
    {
      label: "Upload Avatar",
      routerLink: "upload-avatar"
    },
  ]

  steps = [
    "/register",
    "/register/personal-information",
    "/register/verify-account",
    "/register/upload-avatar",
  ]

  ngOnInit() {
    this.activeStep = this.steps.indexOf(this.router.url);
    console.log(this.activeStep);
  }

  prevStep() {
    if (this.activeStep > 0) {
      this.activeStep--;
      if (this.activeStep === 0) {
        this.router.navigate(['/register']);
      }
      else {
        this.router.navigate(['register',this.items[this.activeStep].routerLink]);
      }
    }
  }

  nextStep() {
    if (this.activeStep < this.items.length - 1) {
      this.activeStep++;
      this.router.navigate(['register',this.items[this.activeStep].routerLink]);
    }
  }
}
