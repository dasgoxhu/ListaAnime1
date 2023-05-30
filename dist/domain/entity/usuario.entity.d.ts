import { anime } from "./anime.dto";
export declare class UsuarioEntity {
    _id: string;
    Usuario: string;
    correo: string;
    contrasena: string;
    animes: anime[];
}
