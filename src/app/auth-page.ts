import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService, authErrorMessage } from './core/services/auth.service';
import { SelfRegistrationRole } from './core/models/auth.models';

const PLAN_NAMES: Record<string, string> = {
  basica: 'Básica',
  pro: 'Pro',
  empresarial: 'Empresarial',
};

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <main class="auth-page">
      <a class="auth-brand" routerLink="/home" aria-label="WayraPass, volver al inicio">
        <span class="brand-mark" aria-hidden="true">W</span>
        <span class="brand-word">WAYRA<span>PASS</span></span>
      </a>

      <section class="auth-card" aria-labelledby="auth-title">
        <a class="back-link" routerLink="/home">← Volver al inicio</a>

        @if (isRegister) {
          <p class="eyebrow">ÚNETE A WAYRAPASS</p>
          <h1 id="auth-title">Crea tu cuenta</h1>
          <p class="auth-description">Regístrate para consultar y coordinar la información de tus viajes.</p>

          @if (selectedPlan) {
            <div class="plan-notice">
              <strong>Plan elegido: {{ selectedPlan }}</strong>
              <span>El registro crea tu cuenta; la activación del plan se coordina por separado.</span>
            </div>
          }

          <form [formGroup]="registerForm" (ngSubmit)="submitRegistration()" novalidate>
            <label for="fullName">Nombre completo</label>
            <input id="fullName" type="text" formControlName="fullName" autocomplete="name" required />
            @if (registerForm.controls.fullName.touched && registerForm.controls.fullName.invalid) {
              <small class="field-error">Ingresa tu nombre completo.</small>
            }

            <label for="registerEmail">Correo electrónico</label>
            <input id="registerEmail" type="email" formControlName="email" autocomplete="email" required />
            @if (registerForm.controls.email.touched && registerForm.controls.email.invalid) {
              <small class="field-error">Ingresa un correo electrónico válido.</small>
            }

            <label for="role">Tu perfil</label>
            <select id="role" formControlName="role">
              <option value="STUDENT">Estudiante</option>
              <option value="FAMILY">Padre, apoderado o familiar</option>
            </select>

            <label for="registerPassword">Contraseña</label>
            <input
              id="registerPassword"
              type="password"
              formControlName="password"
              autocomplete="new-password"
              minlength="8"
              required
            />
            @if (registerForm.controls.password.touched && registerForm.controls.password.invalid) {
              <small class="field-error">Usa una contraseña de al menos 8 caracteres.</small>
            }

            @if (errorMessage) {
              <p class="form-error" role="alert">{{ errorMessage }}</p>
            }
            <button class="submit-button" type="submit" [disabled]="isSubmitting">
              {{ isSubmitting ? 'Creando cuenta…' : 'Crear cuenta' }}
            </button>
          </form>

          <p class="auth-switch">¿Ya tienes una cuenta? <a routerLink="/login">Inicia sesión</a></p>
        } @else {
          <p class="eyebrow">QUÉ BUENO TENERTE DE VUELTA</p>
          <h1 id="auth-title">Inicia sesión</h1>
          <p class="auth-description">Ingresa a tu cuenta para continuar con WayraPass.</p>

          @if (registrationComplete) {
            <p class="success-message" role="status">Tu cuenta fue creada. Ya puedes iniciar sesión.</p>
          }

          <form [formGroup]="loginForm" (ngSubmit)="submitLogin()" novalidate>
            <label for="loginEmail">Correo electrónico</label>
            <input id="loginEmail" type="email" formControlName="email" autocomplete="email" required />
            @if (loginForm.controls.email.touched && loginForm.controls.email.invalid) {
              <small class="field-error">Ingresa un correo electrónico válido.</small>
            }

            <label for="loginPassword">Contraseña</label>
            <input
              id="loginPassword"
              type="password"
              formControlName="password"
              autocomplete="current-password"
              required
            />
            @if (loginForm.controls.password.touched && loginForm.controls.password.invalid) {
              <small class="field-error">Ingresa tu contraseña.</small>
            }

            @if (errorMessage) {
              <p class="form-error" role="alert">{{ errorMessage }}</p>
            }
            <button class="submit-button" type="submit" [disabled]="isSubmitting">
              {{ isSubmitting ? 'Ingresando…' : 'Ingresar' }}
            </button>
          </form>

          <p class="auth-switch">¿Aún no tienes cuenta? <a routerLink="/register">Crear cuenta</a></p>
        }
      </section>
    </main>
  `,
  styleUrl: './auth-page.css',
})
export class AuthPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  readonly isRegister = this.route.snapshot.data['mode'] === 'register';
  readonly selectedPlan = PLAN_NAMES[this.route.snapshot.queryParamMap.get('plan') ?? ''];
  readonly registrationComplete = this.route.snapshot.queryParamMap.get('registered') === '1';

  readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  readonly registerForm = this.formBuilder.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['STUDENT' as SelfRegistrationRole, Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  isSubmitting = false;
  errorMessage = '';

  submitLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.auth.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.isSubmitting = false;
        void this.router.navigate(['/home']);
      },
      error: (error: unknown) => {
        this.isSubmitting = false;
        this.errorMessage = authErrorMessage(error, 'login');
      },
    });
  }

  submitRegistration(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.auth.register(this.registerForm.getRawValue()).subscribe({
      next: () => {
        void this.router.navigate(['/login'], { queryParams: { registered: '1' } });
      },
      error: (error: unknown) => {
        this.isSubmitting = false;
        this.errorMessage = authErrorMessage(error, 'register');
      },
    });
  }
}
