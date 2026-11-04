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
    expect(compiled.querySelector('#como-funciona')).toBeTruthy();
    expect(compiled.querySelectorAll('#preguntas .faq-item')).toHaveLength(5);
    expect(compiled.querySelector('#contacto')).toBeTruthy();
    expect(compiled.querySelector('#privacidad')).toBeTruthy();
    expect(compiled.querySelector('.membership-disclaimer')).toBeNull();
  });

  it('should send every login action to the real WebApp login', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const loginActions = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('a'))
      .filter((link) => ['Acceder', 'Ingresar a WayraPass', 'Entrar a la plataforma', 'Iniciar sesión']
        .some((label) => link.textContent?.trim().startsWith(label)));

    expect(loginActions).toHaveLength(9);
    expect(loginActions.every((link) => link.href === 'http://localhost:4200/login')).toBe(true);
  });

  it('should send every registration action to the real WebApp registration', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const registrationActions = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('a'))
      .filter((link) => link.textContent?.trim().startsWith('Crear cuenta') || link.classList.contains('membership-button'));

    expect(registrationActions).toHaveLength(4);
    expect(registrationActions.every((link) => link.href === 'http://localhost:4200/register')).toBe(true);
  });

  it('should show only the Pro and Familiar memberships', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = Array.from(compiled.querySelectorAll<HTMLElement>('.membership-card'));
    const names = cards.map((card) => card.querySelector('h3')?.textContent?.trim());

    expect(cards).toHaveLength(2);
    expect(names).toEqual(['Pro', 'Familiar']);
    expect(cards[0].querySelector('.amount')?.textContent?.trim()).toBe('18');
    expect(cards[0].textContent).toContain('conforme sean habilitadas');
    expect(cards[1].querySelector('.amount')?.textContent?.trim()).toBe('50');
    expect(cards[1].textContent).toContain('Hasta 4 estudiantes');
    expect(compiled.textContent).not.toContain('Empresarial');
    expect(compiled.textContent).not.toContain('Básica');
  });

  it('should present static service characteristics without fictitious metrics', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const servicePanel = compiled.querySelector('.hero-visual');

    expect(servicePanel?.textContent).toContain('CARACTERÍSTICAS DEL SERVICIO');
    expect(servicePanel?.querySelector('.simple-badge')).toBeNull();
    expect(servicePanel?.textContent).not.toContain('18');
    expect(servicePanel?.textContent).not.toContain('92%');
    expect(servicePanel?.textContent).not.toContain('Hoy');
  });

  it('should omit the removed membership and privacy notices', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).not.toContain('Los precios publicados deben confirmarse');
    expect(compiled.textContent).not.toContain('Esta landing no reemplaza el aviso de privacidad');
    expect(compiled.querySelectorAll('#privacidad p:not(.eyebrow)')).toHaveLength(1);
    expect(compiled.querySelectorAll('a[href="/login"], a[href="/register"]')).toHaveLength(0);
  });
});
