import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "src/domain/entity/usuario.entity";
import { UsuarioRepository } from "src/domain/repository/usuario.repository";
import { MongoRepository } from "typeorm";

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository{
    
    constructor(
        @InjectRepository(UsuarioEntity)
        public readonly typeOrmUsuarioRepository : MongoRepository<UsuarioEntity>
    ){}

    crearCuenta(Usuario: UsuarioEntity): Promise<void> {
        return new Promise(async (resolve, reject)=>{    
            let newUsuario = await this.typeOrmUsuarioRepository.save(Usuario)
            this.typeOrmUsuarioRepository.create(newUsuario)
            resolve()
        })
    }
    eliminarCuenta(Usuario: UsuarioEntity): Promise<void> {
        return new Promise((resolve, reject) => {
            this.typeOrmUsuarioRepository.delete(Usuario)
            resolve()
        });
    }
    agregarAnimeVisto(Usuario: UsuarioEntity): Promise<string> {
        return new Promise((resolve, reject) => {
            this.typeOrmUsuarioRepository.save(Usuario)
            resolve('lista guardada')
        });
    }
    
    editarAnimeVisto(Usuario: UsuarioEntity): Promise<void> {
        return new Promise((resolve, reject)=>{
            this.typeOrmUsuarioRepository.save(Usuario)
            resolve()
        })
    }
    eliminarAnimeVisto(Usuario: UsuarioEntity): Promise<void> {
        return new Promise((resolve, reject)=>{
            this.typeOrmUsuarioRepository.save(Usuario)
            resolve()
        })
    }

    BuscarUsuario(id:string):Promise<UsuarioEntity>{  
        return new Promise(async (resolve,reject)=>
        {
         let usuarios : UsuarioEntity
         usuarios = await this.typeOrmUsuarioRepository.findOneBy({
             where: {
                 Usuario:id
             }
         })
         resolve(usuarios)
        })
    }
    BuscarCorreo(id:string):Promise<UsuarioEntity>{
        return new Promise(async (resolve,reject)=>
        {
         let usuarios : UsuarioEntity
         usuarios = await this.typeOrmUsuarioRepository.findOneBy({
             where: {
                 correo:id
             }
         })
         resolve(usuarios)
        })
    }
}