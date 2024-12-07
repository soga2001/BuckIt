import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router, RouterLinkActive } from '@angular/router';
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
      label: "Login Information",
      routerLink: "",
      routerLinkActiveOptions: { exact: true },
      iconClass: "pi pi-user",
    },
    {
      label: "Personal Information",
      routerLink: "personal-information",
      iconClass: "pi pi-user",
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: "Verify Account",
      routerLink: "verify-account",
      iconClass: "pi pi-user",
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: "Upload Avatar",
      routerLink: "upload-avatar",
      iconClass: "pi pi-user",
      routerLinkActiveOptions: { exact: true },
    },
  ]

  steps = [
    "/register",
    "/register/personal-information",
    "/register/verify-account",
    "/register/upload-avatar",
  ]

  routerLinkActiveOptions = { 
    exact: true,
    routerlinkActiveClass: 'active'
  };

  ngOnInit() {
    this.activeStep = this.steps.indexOf(this.router.url);
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
