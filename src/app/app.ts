import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App {}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-shell">
      <header class="site-header">
        <a class="brand" href="#inicio" aria-label="WayraPass">
          <span class="brand-mark" aria-hidden="true">W</span>
          <span class="brand-word">WAYRA<span>PASS</span></span>
        </a>

        <nav class="desktop-nav" aria-label="Navegación principal">
          <a href="#solucion">La solución</a>
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#perfiles">Perfiles</a>
        </nav>

        <div class="header-actions">
          <ng-container *ngIf="auth.user(); else guestActions">
            <span class="login-link">Hola, {{ auth.user()?.fullName }}</span>
            <button class="login-link logout-button" type="button" (click)="logout()">Cerrar sesión</button>
          </ng-container>
          <ng-template #guestActions>
            <a class="login-link" routerLink="/login">Iniciar sesión</a>
            <a class="button button-primary button-small" routerLink="/register">
              Crear cuenta <span aria-hidden="true">↗</span>
            </a>
          </ng-template>
        </div>
      </header>

      <main>
        <section class="hero" id="inicio">
          <div class="hero-copy">
            <p class="eyebrow"><span class="eyebrow-dot"></span> TRANSPORTE ESTUDIANTIL EN LIMA METROPOLITANA</p>
            <h1>Tu camino a clases,<br />más <span>organizado.</span></h1>
            <p class="hero-description">
              WayraPass centraliza la información del transporte estudiantil para que estudiantes,
              familiares y equipos de operación puedan consultar rutas, paraderos, viajes y avisos
              desde una misma plataforma.
            </p>
            <div class="hero-actions">
              <a class="button button-primary" routerLink="/login">Ingresar a WayraPass <span aria-hidden="true">→</span></a>
              <a class="button button-outline" href="#solucion">Conocer la plataforma</a>
            </div>
          </div>

          <div class="hero-visual" aria-label="Resumen del servicio de transporte estudiantil">
            <div class="visual-topline">
              <span class="live-indicator"></span>
              <span>ESTADO DEL SERVICIO</span>
              <span class="visual-menu" aria-hidden="true">•••</span>
            </div>

            <div class="simple-panel">
              <div class="simple-stat">
                <div>
                  <strong>Paraderos activos</strong>
                  <span>Rutas principales y coordinadas</span>
                </div>
                <span class="simple-badge">18</span>
              </div>

              <div class="simple-stat">
                <div>
                  <strong>Viajes registrados</strong>
                  <span>Abordajes y llegadas visibles</span>
                </div>
                <span class="simple-badge">92%</span>
              </div>

              <div class="simple-stat">
                <div>
                  <strong>Incidencias gestionadas</strong>
                  <span>Desvíos, retrasos y reasignaciones</span>
                </div>
                <span class="simple-badge">Hoy</span>
              </div>
            </div>

            <p class="visual-disclaimer">Plataforma pensada para ordenar rutas, paraderos y comunicaciones del servicio.</p>
          </div>
        </section>

        <section class="memberships-section" id="solucion">
          <div class="membership-intro">
            <p class="eyebrow">MEMBRESÍAS</p>
            <h2>Elige la membresía que encaja con tu comunidad.</h2>
            <p>Accede a la experiencia WayraPass con planes diseñados para estudiantes, familias y equipos de operación.</p>
            <p class="membership-disclaimer">
              Los precios publicados deben confirmarse con tu institución. Elegir un plan no genera un pago ni activa el servicio.
            </p>
          </div>

          <div class="membership-grid">
            <article class="membership-card" *ngFor="let plan of memberships; let i = index" [class.featured]="plan.featured">
              <div class="membership-badge" *ngIf="plan.badge">{{ plan.badge }}</div>
              <h3>{{ plan.name }}</h3>
              <div class="membership-price">
                <span class="currency">S/</span>
                <span class="amount">{{ plan.price }}</span>
                <span class="period">/mes</span>
              </div>
              <p class="membership-description">{{ plan.description }}</p>

              <ul class="membership-list">
                <li *ngFor="let item of plan.features">{{ item }}</li>
              </ul>

              <a
                class="membership-button"
                [routerLink]="['/register']"
                [queryParams]="{ plan: plan.id }"
              >
                {{ plan.cta }}
              </a>
            </article>
          </div>
        </section>

        <section class="section features-section" id="funcionalidades">
          <div class="section-heading">
            <p class="eyebrow">UNA PLATAFORMA PARA EL TRANSPORTE ESTUDIANTIL</p>
            <h2>La información del servicio,<br /><span>en un solo lugar.</span></h2>
            <p>WayraPass ayuda a organizar y consultar la información clave de los recorridos para facilitar la planificación y la coordinación del transporte de estudiantes de educación superior.</p>
          </div>

          <div class="feature-grid">
            <article class="feature-card" *ngFor="let feature of features">
              <div class="feature-icon {{ feature.icon }}" aria-hidden="true">✦</div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.text }}</p>
              <a class="feature-action" routerLink="/login">Entrar a la plataforma <span aria-hidden="true">→</span></a>
            </article>
          </div>
        </section>

        <section class="how-section" id="como-funciona">
          <div class="how-content">
            <p class="eyebrow eyebrow-light">ASÍ SE ORGANIZA EL SERVICIO</p>
            <h2>De la ruta a los avisos del viaje.</h2>
            <p class="how-intro">
              WayraPass reúne la información que comparte el equipo de transporte de tu institución.
              La disponibilidad de rutas y funciones depende de cada comunidad.
            </p>
            <div class="steps-grid">
              <article class="step">
                <span>01</span>
                <div>
                  <h3>La institución organiza</h3>
                  <p>El equipo de transporte configura rutas, paraderos, unidades y horarios disponibles.</p>
                </div>
              </article>
              <article class="step">
                <span>02</span>
                <div>
                  <h3>El estudiante consulta</h3>
                  <p>Revisa la información de su recorrido y registra el abordaje cuando esa función está habilitada.</p>
                </div>
              </article>
              <article class="step">
                <span>03</span>
                <div>
                  <h3>La comunidad recibe avisos</h3>
                  <p>Los familiares vinculados pueden consultar avisos de viaje e incidencias según los permisos asignados.</p>
                </div>
              </article>
            </div>
            <div class="how-actions">
              <a class="button button-amber" routerLink="/register">Crear cuenta</a>
              <a class="how-login" href="#preguntas">Resolver mis dudas <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section class="roles-section" id="perfiles">
          <div class="roles-intro">
            <p class="eyebrow">UNA EXPERIENCIA PARA CADA PERSONA</p>
            <h2>Todos coordinados en el mismo viaje.</h2>
            <p>WayraPass reúne a quienes usan y coordinan el transporte estudiantil, con información adecuada para cada perfil.</p>
            <div class="roles-note">
              <span aria-hidden="true">i</span>
              <p>Los perfiles de chofer y coordinación son habilitados por el equipo de transporte.</p>
            </div>
          </div>
          <div class="roles-list">
            <article class="role-item" *ngFor="let role of roles; let i = index">
              <span class="role-number">0{{ i + 1 }}</span>
              <span class="role-icon" [ngClass]="roleClassNames[i]" aria-hidden="true">{{ roleIcons[i] }}</span>
              <div>
                <h3>{{ role.name }}</h3>
                <p>{{ role.text }}</p>
              </div>
            </article>
          </div>
        </section>

        <section class="faq-section" id="preguntas">
          <div class="section-heading">
            <p class="eyebrow">PREGUNTAS FRECUENTES</p>
            <h2>Información clara antes de empezar.</h2>
            <p>Conoce qué ofrece la plataforma y qué debes confirmar con el equipo de transporte de tu institución.</p>
          </div>
          <div class="faq-list">
            <details class="faq-item">
              <summary>¿WayraPass opera los buses?</summary>
              <p>No. WayraPass centraliza información y comunicaciones; la operación del transporte corresponde a cada institución o proveedor.</p>
            </details>
            <details class="faq-item">
              <summary>¿Puedo registrarme como chofer o coordinador?</summary>
              <p>Esos perfiles son habilitados por el equipo de transporte. El registro público está disponible para estudiantes y familiares.</p>
            </details>
            <details class="faq-item">
              <summary>¿Cómo vinculo a un familiar?</summary>
              <p>Cuando la función está habilitada, el estudiante comparte un código temporal para autorizar el seguimiento. No compartas ese código con personas no autorizadas.</p>
            </details>
            <details class="faq-item">
              <summary>¿Crear una cuenta activa una ruta o contrata un plan?</summary>
              <p>No. La cuenta permite acceder a la plataforma; confirma con tu institución la disponibilidad de rutas, los precios y las condiciones del servicio.</p>
            </details>
            <details class="faq-item">
              <summary>¿Quién puede responder sobre rutas y horarios?</summary>
              <p>El equipo de transporte de tu institución administra esa información. Consulta con su coordinación para confirmar recorridos y disponibilidad.</p>
            </details>
          </div>
        </section>

        <section class="contact-section" id="contacto">
          <div>
            <p class="eyebrow">¿NECESITAS MÁS INFORMACIÓN?</p>
            <h2>Conversemos desde tu comunidad.</h2>
            <p>
              Para conocer disponibilidad, precios o implementación, consulta con la coordinación de transporte
              de tu institución. Ellos podrán orientarte sobre el servicio que ofrecen.
            </p>
          </div>
          <a class="button button-primary" href="#preguntas">Ver preguntas frecuentes <span aria-hidden="true">→</span></a>
        </section>

        <section class="privacy-section" id="privacidad">
          <div>
            <p class="eyebrow">PRIVACIDAD Y ACCESO</p>
            <h2>Tu información, según tu perfil.</h2>
            <p>
              Los datos visibles en WayraPass pueden incluir información de rutas y viajes. El acceso a avisos familiares
              requiere una vinculación autorizada; protege tus credenciales y códigos temporales.
            </p>
            <p>
              Antes de registrarte, solicita a tu institución información sobre el responsable del tratamiento,
              los datos utilizados y sus canales de atención. Esta landing no reemplaza el aviso de privacidad de tu institución.
            </p>
          </div>
        </section>
      </main>

      <footer class="site-footer">
        <a class="brand" href="#inicio" aria-label="WayraPass, volver al inicio">
          <span class="brand-mark" aria-hidden="true">W</span>
          <span class="brand-word">WAYRA<span>PASS</span></span>
        </a>

        <p>Gestión y coordinación del transporte de estudiantes de educación superior.</p>

        <nav class="footer-links" aria-label="Enlaces del pie de página">
          <a href="#solucion">La solución</a>
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#preguntas">Preguntas frecuentes</a>
          <a href="#contacto">Contacto</a>
          <a href="#privacidad">Privacidad</a>
          <a routerLink="/login">Iniciar sesión</a>
        </nav>

        <small>WayraPass · Lima Metropolitana · Plataforma tecnológica de gestión de transporte estudiantil</small>
        <p class="footer-disclaimer">WayraPass centraliza y comunica la información del servicio; no opera ni posee directamente los buses.</p>
      </footer>
    </div>
  `,
  styleUrl: './app.css',
})
export class LandingPage {
  readonly auth = inject(AuthService);

  readonly memberships = [
    {
      id: 'basica',
      name: 'Básica',
      price: 39,
      description: 'Ideal para estudiantes que necesitan consultar rutas y horarios de forma ágil.',
      badge: 'Popular',
      featured: false,
      cta: 'Elegir Básica',
      features: ['Consulta de rutas', 'Horarios disponibles', 'Paraderos y viajes', 'Notificaciones básicas'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 79,
      description: 'Pensada para familias y usuarios con mayor seguimiento de viajes y incidencias.',
      badge: 'Más usada',
      featured: true,
      cta: 'Elegir Pro',
      features: ['Todo de Básica', 'Seguimiento de viajes', 'Visibilidad de incidencias', 'Confirmación de abordaje'],
    },
    {
      id: 'empresarial',
      name: 'Empresarial',
      price: 149,
      description: 'Para equipos de operación y coordinación que gestionan varias rutas o grupos.',
      badge: 'Equipo',
      featured: false,
      cta: 'Elegir Empresarial',
      features: ['Todo de Pro', 'Gestión de rutas y flotillas', 'Reportes avanzados', 'Soporte prioritario'],
    },
  ];

  readonly features = [
    { title: 'Rutas, horarios y paraderos', text: 'Consulta las rutas disponibles, elige tu paradero e inscríbete o cambia de ruta.', icon: 'icon-route' },
    { title: 'Abordaje con QR', text: 'Registra tu abordaje al subir y deja constancia de cada viaje.', icon: 'icon-travel' },
    { title: 'Seguimiento familiar', text: 'Vincula a un familiar con un código temporal para que reciba avisos de abordaje, llegada e incidencias.', icon: 'icon-alert' },
    { title: 'Chofer y unidad conocidos', text: 'Mira quién conduce y en qué unidad viajas, con su autorización registrada.', icon: 'icon-people' },
    { title: 'Incidencias y reasignaciones', text: 'Los choferes reportan retrasos o desvíos y los coordinadores reasignan unidades. Todos los afectados reciben aviso.', icon: 'icon-driver' },
    { title: 'WayrIA, tu asistente', text: 'Pregunta en lenguaje natural por rutas, horarios, paraderos y el estado del servicio.', icon: 'icon-manage' },
  ];

  readonly roles = [
    { name: 'Estudiante', text: 'Consulta rutas y horarios, elige tu paradero, registra tu abordaje y sigue el estado de tus viajes.' },
    { name: 'Padre, apoderado o familiar autorizado', text: 'Sigue los viajes del estudiante vinculado y recibe avisos de abordaje, llegada, cambios de unidad e incidencias.' },
    { name: 'Chofer', text: 'Consulta tus rutas y unidades asignadas y reporta retrasos, desvíos o problemas con la unidad.' },
    { name: 'Coordinador de transporte', text: 'Administra rutas, paraderos, choferes y unidades, reasigna ante imprevistos y revisa reportes de puntualidad, ocupación e incidencias.' },
  ];

  readonly roleClassNames = ['role-icon-blue', 'role-icon-teal', 'role-icon-amber', 'role-icon-blue'];
  readonly roleIcons = ['⌂', '◎', '▰', '▦'];

  logout(): void {
    this.auth.logout();
  }
}
