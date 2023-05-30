import { anime } from "../entity/anime.dto"
import { UsuarioEntity } from "../entity/usuario.entity"

export interface UsuarioService {
    crearCuenta(Usuario: UsuarioEntity):Promise<string>
    eliminarCuenta(Usuario: UsuarioEntity):Promise<string>
    agregarAnimeVisto(Usuario: UsuarioEntity):Promise<string>
    editarAnimeVisto(Usuario: UsuarioEntity):Promise<string>
    eliminarAnimeVisto(Usuario: UsuarioEntity):Promise<string>
    verListaDeAnimes(Usuario: UsuarioEntity):Promise<anime[]>   
}