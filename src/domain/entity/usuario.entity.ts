import { Column, Entity, ObjectIdColumn } from "typeorm"
import { anime } from "./anime.dto"

@Entity('UsuarioEntity')
export class UsuarioEntity {
    @ObjectIdColumn()
    _id: string 

    @Column()
    Usuario: string

    @Column()
    correo: string

    @Column()
    contrasena: string

    @Column()
    animes: anime[]
}
