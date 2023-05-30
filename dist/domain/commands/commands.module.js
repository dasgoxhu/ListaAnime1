"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../entity/usuario.entity");
const usuario_repositoryimpl_1 = require("../../infrastructure/usuario.repositoryimpl");
const usuario_serviceimpl_1 = require("../service/usuario.serviceimpl");
const usuario_controller_1 = require("../../api/usuario.controller");
let CommandsModule = class CommandsModule {
};
CommandsModule = __decorate([
    (0, common_1.Module)({ imports: [
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.UsuarioEntity])
        ],
        providers: [
            {
                provide: 'UsuarioRepository',
                useClass: usuario_repositoryimpl_1.UsuarioRepositoryImpl
            },
            {
                provide: 'UsuarioService',
                useClass: usuario_serviceimpl_1.UsuarioServiceImpl
            }
        ],
        controllers: [
            usuario_controller_1.UsuarioController
        ] })
], CommandsModule);
exports.CommandsModule = CommandsModule;
//# sourceMappingURL=commands.module.js.map