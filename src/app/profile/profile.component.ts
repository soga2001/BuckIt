import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    TabsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    DividerModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  username: string = '';
  value: number = 0;
  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
  }
}
