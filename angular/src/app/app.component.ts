import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; 
import { Auth, signOut, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, 
  imports: [FormsModule, CommonModule, RouterModule],
})

export class AppComponent implements OnInit {
  isLoggedIn: boolean = false; 
  title: any;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Failed to log out:', error);
      });
  }
}