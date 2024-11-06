export interface Menu {

    id: number;
    titulo: string;

}

export interface Producto{
    CategoriaID: string,
    Nombre : string,
    Precio: number,
    ProductoID: string,
    descripcion: string,
    RentaID: string,
    imagen: string
}

export interface Renta{

    Nombre: string,
    RentaID: string
}