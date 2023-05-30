"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioServiceImpl = void 0;
const common_1 = require("@nestjs/common");
const anime_dto_1 = require("../entity/anime.dto");
let UsuarioServiceImpl = class UsuarioServiceImpl {
    constructor(UsuarioRepository) {
        this.UsuarioRepository = UsuarioRepository;
    }
    async crearCuenta(Usuario) {
        let comprobarU = await this.UsuarioRepository.BuscarUsuario(Usuario.Usuario);
        let comprobarC = await this.UsuarioRepository.BuscarCorreo(Usuario.correo);
        if (!comprobarU && !comprobarC) {
            await this.UsuarioRepository.crearCuenta(Usuario);
            return 'Se creo el Usuario con exito';
        }
        return 'el usuario o el correo ya existe';
    }
    async eliminarCuenta(Usuario) {
        await this.UsuarioRepository.eliminarCuenta(Usuario);
        return 'la cuenta fue eliminada con exito';
    }
    async agregarAnimeVisto(Usuario) {
        let usuarioExistente = await this.UsuarioRepository.BuscarUsuario(Usuario.Usuario);
        if (!usuarioExistente) {
            return `El usuario con el id ${Usuario.Usuario} no existe`;
        }
        if (!Array.isArray(usuarioExistente.animes)) {
            usuarioExistente.animes = [];
        }
        const nuevosAnimes = Usuario.animes;
        for (const animeNuevo of nuevosAnimes) {
            const animeNuevoStr = JSON.stringify(animeNuevo);
            if (usuarioExistente.animes.map(a => JSON.stringify(a)).includes(animeNuevoStr)) {
                return `El anime '${animeNuevo.NombreAnime}' ya está en la lista de animes del usuario`;
            }
            else {
                usuarioExistente.animes.push(animeNuevo);
                await this.UsuarioRepository.agregarAnimeVisto(usuarioExistente);
                return 'se agrego el anime con exito';
            }
        }
    }
    async editarAnimeVisto(Usuario) {
        let ExiteU = await this.UsuarioRepository.BuscarUsuario(Usuario.Usuario);
        if (!ExiteU) {
            return 'no exite el Usuario';
        }
        let animes = ExiteU.animes.find(anime => anime.NombreAnime === Usuario.animes[0].NombreAnime);
        if (!animes) {
            return 'no existe el anime';
        }
        animes.Capitulo = Usuario.animes[0].Capitulo;
        animes.Temporada = Usuario.animes[0].Temporada;
        animes.Opinion = Usuario.animes[0].Opinion;
        this.UsuarioRepository.editarAnimeVisto(ExiteU);
        return 'anime editado con exito';
    }
    async eliminarAnimeVisto(Usuario) {
        let existeU = await this.UsuarioRepository.BuscarUsuario(Usuario.Usuario);
        if (!existeU) {
            return 'no existe el Usuario';
        }
        let EncontrarA = existeU.animes.findIndex((anime) => anime.NombreAnime === Usuario.animes[0].NombreAnime);
        if (EncontrarA === -1) {
            return (`El anime "${Usuario.animes[0].NombreAnime}" no existe en la lista de animes del usuario`);
        }
        existeU.animes.splice(EncontrarA, 1);
        this.UsuarioRepository.eliminarAnimeVisto(existeU);
        return 'anime eliminado con exito';
    }
    async verListaDeAnimes(Usuario) {
        let Animes = await this.UsuarioRepository.BuscarUsuario(Usuario.Usuario);
        if (!Animes) {
            let anim = new anime_dto_1.anime;
            anim.NombreAnime = 'usuario no existe';
            return [anim];
        }
        else if (Animes.animes === undefined || Animes.animes.length === 0) {
            let anim = new anime_dto_1.anime;
            anim.NombreAnime = 'no tiene animes agregados';
            return [anim];
        }
        else {
            return (Animes.animes);
        }
    }
};
UsuarioServiceImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UsuarioRepository')),
    __metadata("design:paramtypes", [Object])
], UsuarioServiceImpl);
exports.UsuarioServiceImpl = UsuarioServiceImpl;
//# sourceMappingURL=usuario.serviceimpl.js.map