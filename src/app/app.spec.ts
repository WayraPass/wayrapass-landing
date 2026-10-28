import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  let router: Router;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideRouter(routes)],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(App);
    await router.navigateByUrl('/home');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the landing page and its profiles section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tu camino a clases');
    expect(compiled.querySelector('#perfiles')).toBeTruthy();
  });

  it('should navigate to login and registration pages', async () => {
    await router.navigateByUrl('/login');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain('Inicia sesión');

    await router.navigateByUrl('/register?plan=pro');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Crea tu cuenta');
    expect(compiled.textContent).toContain('Plan elegido: Pro');
  });
});
