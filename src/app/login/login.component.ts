import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../custom-components/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet, 
    FormsModule, 
    InputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
    email: string = '';
    password: string = '';
    title = 'buckits';

    login() {
      console.log('login');
    }
}
