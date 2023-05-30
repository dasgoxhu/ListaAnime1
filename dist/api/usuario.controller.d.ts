import { UsuarioEntity } from "src/domain/entity/usuario.entity";
import { UsuarioService } from "src/domain/service/usuario.service";
import { Response } from "express";
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    crearcuenta(newcuenta: UsuarioEntity, res: Response): Promise<void>;
    eliminarCuenta(Usuario: UsuarioEntity, res: Response): Promise<void>;
    crearanime(Usuario: UsuarioEntity, res: Response): Promise<void>;
    editarAnime(animeEditado: UsuarioEntity, res: Response): Promise<void>;
    eliminarAnime(animeAEliminar: UsuarioEntity, res: Response): Promise<void>;
    verListaDeAnimes(Usuario: UsuarioEntity, res: Response): Promise<void>;
}
