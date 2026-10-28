import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
  imports: [CommonModule],
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
          <a href="#perfiles">Perfiles</a>
        </nav>

        <div class="header-actions">
          <span class="login-link">Iniciar sesión</span>
          <span class="button button-primary button-small">Crear cuenta <span aria-hidden="true">↗</span></span>
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
              <span class="button button-primary">Ingresar a WayraPass <span aria-hidden="true">→</span></span>
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

              <button class="membership-button" type="button">{{ plan.cta }}</button>
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
              <span>Entrar a la plataforma <span aria-hidden="true">→</span></span>
            </article>
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
          <span>Iniciar sesión</span>
        </nav>

        <small>WayraPass · Lima Metropolitana · Plataforma tecnológica de gestión de transporte estudiantil</small>
        <p class="footer-disclaimer">WayraPass centraliza y comunica la información del servicio; no opera ni posee directamente los buses.</p>
      </footer>
    </div>
  `,
  styleUrl: './app.css',
})
export class LandingPage {
  readonly hostUrl = 'http://localhost:4200/';

  readonly memberships = [
    {
      name: 'Básica',
      price: 39,
      description: 'Ideal para estudiantes que necesitan consultar rutas y horarios de forma ágil.',
      badge: 'Popular',
      featured: false,
      cta: 'Elegir Básica',
      features: ['Consulta de rutas', 'Horarios disponibles', 'Paraderos y viajes', 'Notificaciones básicas'],
    },
    {
      name: 'Pro',
      price: 79,
      description: 'Pensada para familias y usuarios con mayor seguimiento de viajes y incidencias.',
      badge: 'Más usada',
      featured: true,
      cta: 'Elegir Pro',
      features: ['Todo de Básica', 'Seguimiento de viajes', 'Visibilidad de incidencias', 'Confirmación de abordaje'],
    },
    {
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
}
