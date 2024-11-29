import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
    email: string = '';
    password: string = '';
    title = 'buckits';
}
