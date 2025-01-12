import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, CommonModule],
})

export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    if (this.email && this.password) {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then(() => {
          this.successMessage = 'Inicio de sesión exitoso';
          this.errorMessage = '';
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.errorMessage = 'Error al iniciar sesión: ' + error.message;
          this.successMessage = '';
        });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
      this.successMessage = '';
    }
  }
}
