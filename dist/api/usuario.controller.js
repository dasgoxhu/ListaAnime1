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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_entity_1 = require("../domain/entity/usuario.entity");
let UsuarioController = class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    async crearcuenta(newcuenta, res) {
        res.status(201).send(await this.usuarioService.crearCuenta(newcuenta));
    }
    async eliminarCuenta(Usuario, res) {
        res.status(201).send(await this.usuarioService.eliminarCuenta(Usuario));
    }
    async crearanime(Usuario, res) {
        res.status(201).send(await this.usuarioService.agregarAnimeVisto(Usuario));
    }
    async editarAnime(animeEditado, res) {
        res.status(200).send(await this.usuarioService.editarAnimeVisto(animeEditado));
    }
    async eliminarAnime(animeAEliminar, res) {
        res.status(200).send(await this.usuarioService.eliminarAnimeVisto(animeAEliminar));
    }
    async verListaDeAnimes(Usuario, res) {
        res.status(201).send(await this.usuarioService.verListaDeAnimes(Usuario));
    }
};
__decorate([
    (0, common_1.Post)('/crearCuenta'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_entity_1.UsuarioEntity, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "crearcuenta", null);
__decorate([
    (0, common_1.Delete)('/eliminarCuenta'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_entity_1.UsuarioEntity, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "eliminarCuenta", null);
__decorate([
    (0, common_1.Post)('/crearAnime'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_entity_1.UsuarioEntity, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "crearanime", null);
__decorate([
    (0, common_1.Put)('/editarAnime'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_entity_1.UsuarioEntity, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "editarAnime", null);
__decorate([
    (0, common_1.Delete)('/eliminarAnime'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_entity_1.UsuarioEntity, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "eliminarAnime", null);
__decorate([
    (0, common_1.Get)('/verListaAnimes'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_entity_1.UsuarioEntity, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "verListaDeAnimes", null);
UsuarioController = __decorate([
    (0, common_1.Controller)("UsuarioController"),
    __param(0, (0, common_1.Inject)('UsuarioService')),
    __metadata("design:paramtypes", [Object])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map