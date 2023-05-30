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
exports.UsuarioRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../domain/entity/usuario.entity");
const typeorm_2 = require("typeorm");
let UsuarioRepositoryImpl = class UsuarioRepositoryImpl {
    constructor(typeOrmUsuarioRepository) {
        this.typeOrmUsuarioRepository = typeOrmUsuarioRepository;
    }
    crearCuenta(Usuario) {
        return new Promise(async (resolve, reject) => {
            let newUsuario = await this.typeOrmUsuarioRepository.save(Usuario);
            this.typeOrmUsuarioRepository.create(newUsuario);
            resolve();
        });
    }
    eliminarCuenta(Usuario) {
        return new Promise((resolve, reject) => {
            this.typeOrmUsuarioRepository.delete(Usuario);
            resolve();
        });
    }
    agregarAnimeVisto(Usuario) {
        return new Promise((resolve, reject) => {
            this.typeOrmUsuarioRepository.save(Usuario);
            resolve('lista guardada');
        });
    }
    editarAnimeVisto(Usuario) {
        return new Promise((resolve, reject) => {
            this.typeOrmUsuarioRepository.save(Usuario);
            resolve();
        });
    }
    eliminarAnimeVisto(Usuario) {
        return new Promise((resolve, reject) => {
            this.typeOrmUsuarioRepository.save(Usuario);
            resolve();
        });
    }
    BuscarUsuario(id) {
        return new Promise(async (resolve, reject) => {
            let usuarios;
            usuarios = await this.typeOrmUsuarioRepository.findOneBy({
                where: {
                    Usuario: id
                }
            });
            resolve(usuarios);
        });
    }
    BuscarCorreo(id) {
        return new Promise(async (resolve, reject) => {
            let usuarios;
            usuarios = await this.typeOrmUsuarioRepository.findOneBy({
                where: {
                    correo: id
                }
            });
            resolve(usuarios);
        });
    }
};
UsuarioRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.UsuarioEntity)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], UsuarioRepositoryImpl);
exports.UsuarioRepositoryImpl = UsuarioRepositoryImpl;
//# sourceMappingURL=usuario.repositoryimpl.js.map