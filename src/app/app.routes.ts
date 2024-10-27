import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./Views/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./Views/sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'log-in',
    loadComponent: () => import('./Views/log-in/log-in.page').then( m => m.LogInPage)
  },
  {
    path: 'compra',
    loadComponent: () => import('./Views/compra/compra.page').then( m => m.CompraPage)
  },
  {
    path: 'renta',
    loadComponent: () => import('./Views/renta/renta.page').then( m => m.RentaPage)
  },
  {
    path: 'videos',
    loadComponent: () => import('./Views/videos/videos.page').then( m => m.VideosPage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./Views/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./Views/perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'cursos',
    loadComponent: () => import('./Views/cursos/cursos.page').then( m => m.CursosPage)
  },
  {
    path: 'lista-carrito',
    loadComponent: () => import('./Views/lista-carrito/lista-carrito.page').then( m => m.ListaCarritoPage)
  },
  {
    path: 'compra/:id',
    loadComponent: () => import('./Views/detalle-compra/detalle-compra.page').then( m => m.DetalleCompraPage)
  },
  {
    path: 'renta/:id',
    loadComponent: () => import('./Views/detalle-renta/detalle-renta.page').then( m => m.DetalleRentaPage)
  },
  {
    path: 'curso/:id',
    loadComponent: () => import('./Views/detalle-curso/detalle-curso.page').then( m => m.DetalleCursoPage)
  }






];
