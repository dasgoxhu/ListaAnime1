import { UsuarioService } from "./usuario.service";
import { anime } from "../entity/anime.dto";
import { UsuarioEntity } from "../entity/usuario.entity";
import { UsuarioRepository } from "../repository/usuario.repository";
export declare class UsuarioServiceImpl implements UsuarioService {
    private readonly UsuarioRepository;
    constructor(UsuarioRepository: UsuarioRepository);
    crearCuenta(Usuario: UsuarioEntity): Promise<string>;
    eliminarCuenta(Usuario: UsuarioEntity): Promise<string>;
    agregarAnimeVisto(Usuario: UsuarioEntity): Promise<string>;
    editarAnimeVisto(Usuario: UsuarioEntity): Promise<string>;
    eliminarAnimeVisto(Usuario: UsuarioEntity): Promise<string>;
    verListaDeAnimes(Usuario: UsuarioEntity): Promise<anime[]>;
}
