import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../entity/usuario.entity';
import { UsuarioRepositoryImpl } from 'src/infrastructure/usuario.repositoryimpl';
import { UsuarioServiceImpl } from '../service/usuario.serviceimpl';
import { UsuarioController } from 'src/api/usuario.controller';

@Module({imports: [
    TypeOrmModule.forFeature([UsuarioEntity])
],
providers: [
    {
        provide: 'UsuarioRepository',
        useClass: UsuarioRepositoryImpl
    },
    {
        provide: 'UsuarioService',
        useClass: UsuarioServiceImpl
    }
],
controllers: [
    UsuarioController
]})
export class CommandsModule {}
