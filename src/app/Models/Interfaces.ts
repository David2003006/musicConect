export interface MetodoPago {

    MetodoPagoID: string,
    Nombre: string

}

export interface Categoria {

    CategoriaID: string,
    Nombre: string

}

export interface Rol {

    RolID: string,
    Nombre: string

}

export interface Usuario {

    UsuarioID: string,
    Nombre: string,
    Correo: string,
    Contrasena: string,
    Rol: string

}

export interface Curso {

    CursoID: string,
    Nombre: string,
    Precio: number,
    UsuarioID: string

}

export interface Video {

    VideoID: string,
    Nombre: string,
    URL: string

}

export interface CursoVideo {

    VideoID: string,
    CursoID: string

}

export interface Producto {

    ProductoID: string,
    Nombre: string,
    Precio: number,
    CategoriaID: string

}

export interface CarritoCompra {

    CarritoID: string,
    UsuarioID: string,
    ProductoID: string,
    CursoID: string,
    MetodoPagoID: string

}