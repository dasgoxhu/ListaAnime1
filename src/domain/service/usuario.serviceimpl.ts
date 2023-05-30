import { Inject, Injectable } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { anime } from "../entity/anime.dto";
import { UsuarioEntity } from "../entity/usuario.entity";
import { UsuarioRepository } from "../repository/usuario.repository";

@Injectable()
export class UsuarioServiceImpl implements UsuarioService{
    constructor(
        @Inject('UsuarioRepository')
        private readonly  UsuarioRepository : UsuarioRepository
    ){}
    async crearCuenta(Usuario: UsuarioEntity): Promise<string> {
        let comprobarU = await this.UsuarioRepository.BuscarUsuario(Usuario.Usuario)
        let comprobarC = await this.UsuarioRepository.BuscarCorreo(Usuario.correo)
        if(!comprobarU && !comprobarC){
            await this.UsuarioRepository.crearCuenta(Usuario)
            return 'Se creo el Usuario con exito'
        }
        return 'el usuario o el correo ya existe'
    }
    async eliminarCuenta(Usuario: UsuarioEntity): Promise<string> {
        await this.UsuarioRepository.eliminarCuenta(Usuario)
        return 'la cuenta fue eliminada con exito'
    }
    async agregarAnimeVisto(Usuario: UsuarioEntity): Promise<string> {
        let usuarioExistente = await this.UsuarioRepository.BuscarUsuario(Usuario.Usuario)
        if (!usuarioExistente) {
            return `El usuario con el id ${Usuario.Usuario} no existe`
          }
    
          if (!Array.isArray(usuarioExistente.animes)) {
            usuarioExistente.animes = [];
          }
          const nuevosAnimes = Usuario.animes;
    
          for (const animeNuevo of nuevosAnimes) {
            const animeNuevoStr = JSON.stringify(animeNuevo);
            if (usuarioExistente.animes.map(a => JSON.stringify(a)).includes(animeNuevoStr)) {
              return `El anime '${animeNuevo.NombreAnime}' ya está en la lista de animes del usuario`
            } else {
              usuarioExistente.animes.push(animeNuevo);
              await this.UsuarioRepository.agregarAnimeVisto(usuarioExistente)
              return 'se agrego el anime con exito'
            }
          }
    }
    async editarAnimeVisto(Usuario: UsuarioEntity): Promise<string> {
        let ExiteU = await this.UsuarioRepository.BuscarUsuario(Usuario.Usuario)
        if(!ExiteU){
            return 'no exite el Usuario'
        }
        let animes = ExiteU.animes.find(anime => anime.NombreAnime === Usuario.animes[0].NombreAnime);
        if(!animes){
            return 'no existe el anime'
        }
        animes.Capitulo = Usuario.animes[0].Capitulo;
        animes.Temporada = Usuario.animes[0].Temporada;
        animes.Opinion = Usuario.animes[0].Opinion;

        this.UsuarioRepository.editarAnimeVisto(ExiteU)
        return 'anime editado con exito'
    }
    async eliminarAnimeVisto(Usuario: UsuarioEntity): Promise<string> {
        let existeU = await this.UsuarioRepository.BuscarUsuario(Usuario.Usuario)
        if(!existeU){
            return 'no existe el Usuario'
        }
        let EncontrarA = existeU.animes.findIndex((anime) => anime.NombreAnime === Usuario.animes[0].NombreAnime);

        if (EncontrarA === -1) {
            return (`El anime "${Usuario.animes[0].NombreAnime}" no existe en la lista de animes del usuario`);
        }
        existeU.animes.splice(EncontrarA,1);
        this.UsuarioRepository.eliminarAnimeVisto(existeU)
        return 'anime eliminado con exito'
    }
    async verListaDeAnimes(Usuario: UsuarioEntity): Promise<anime[]> {
        let Animes = await this.UsuarioRepository.BuscarUsuario(Usuario.Usuario)
        if(!Animes){
            let anim: anime = new anime
            anim.NombreAnime = 'usuario no existe'
            return [anim]
        }else
        if (Animes.animes === undefined || Animes.animes.length === 0) {
            let anim: anime = new anime
            anim.NombreAnime = 'no tiene animes agregados'
            return [anim]
        } else {
            return(Animes.animes);
        }
    }
}