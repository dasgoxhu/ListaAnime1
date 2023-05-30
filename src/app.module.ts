import { Module } from '@nestjs/common';
import { CommandsModule } from './domain/commands/commands.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './domain/entity/usuario.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mongodb",
    host: "127.0.0.1",
    port: 27017,
    database: "AnimeLista",
    entities: [UsuarioEntity],
    synchronize: true
  }),CommandsModule]
})
export class AppModule {}
