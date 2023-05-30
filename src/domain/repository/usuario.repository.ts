import { anime } from "../entity/anime.dto"
import { UsuarioEntity } from "../entity/usuario.entity"

export interface UsuarioRepository {
    crearCuenta(Usuario: UsuarioEntity):Promise<void>
    eliminarCuenta(Usuario: UsuarioEntity):Promise<void>
    agregarAnimeVisto(Usuario: UsuarioEntity):Promise<string>
    editarAnimeVisto(Usuario: UsuarioEntity):Promise<void>
    eliminarAnimeVisto(Usuario: UsuarioEntity):Promise<void>
    BuscarUsuario(id:string):Promise<UsuarioEntity>
    BuscarCorreo(id:string):Promise<UsuarioEntity>
}