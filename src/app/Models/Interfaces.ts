export interface Menu {

    id: number;
    titulo: string;

}

export interface Producto{
    TipoRenta: string;
    CategoriaID: string,
    Nombre : string,
    Precio: number,
    ProductoID: string,
    descripcion: string,
    Compra: boolean,
    cantidad: number,
    RentaID: string,
    imagen: string
}

export interface Renta{

    Nombre: string,
    RentaID: string
}

export interface Carrito{
    idProducto : string,
    Nombre : string,
    Precio : number,
    Tipo : string ,
    Total: number,
    imagen: string,
    Plazo: string
}

export interface Curso{
    CursoID: string,
    Nombre: string,
    Precio: string,
    UsuarioID: string,
    Requisitos: string,
    Descripcion: string,
    Contenido: string,
    imagen: string
}

export interface Video{
    VideoID: string,
    Nombre: string,
    URL: string
}