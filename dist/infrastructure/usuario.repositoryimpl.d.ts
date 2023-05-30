import { UsuarioEntity } from "src/domain/entity/usuario.entity";
import { UsuarioRepository } from "src/domain/repository/usuario.repository";
import { MongoRepository } from "typeorm";
export declare class UsuarioRepositoryImpl implements UsuarioRepository {
    readonly typeOrmUsuarioRepository: MongoRepository<UsuarioEntity>;
    constructor(typeOrmUsuarioRepository: MongoRepository<UsuarioEntity>);
    crearCuenta(Usuario: UsuarioEntity): Promise<void>;
    eliminarCuenta(Usuario: UsuarioEntity): Promise<void>;
    agregarAnimeVisto(Usuario: UsuarioEntity): Promise<string>;
    editarAnimeVisto(Usuario: UsuarioEntity): Promise<void>;
    eliminarAnimeVisto(Usuario: UsuarioEntity): Promise<void>;
    BuscarUsuario(id: string): Promise<UsuarioEntity>;
    BuscarCorreo(id: string): Promise<UsuarioEntity>;
}
