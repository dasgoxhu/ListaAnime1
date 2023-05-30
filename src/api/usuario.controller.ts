import { Body, Controller, Delete, Get, Inject, Post, Put, Res } from "@nestjs/common";
import { UsuarioEntity } from "src/domain/entity/usuario.entity";
import { UsuarioService } from "src/domain/service/usuario.service";
import { Response } from "express"

@Controller("UsuarioController")
export class UsuarioController{

    constructor(
        @Inject('UsuarioService')
        private readonly usuarioService: UsuarioService
    ){}

    @Post('/crearCuenta')
    public async crearcuenta(@Body() newcuenta: UsuarioEntity, @Res() res: Response) {
        res.status(201).send(await this.usuarioService.crearCuenta(newcuenta))
    }
    /** 
    {
    "Usuario": "johndoe",
    "correo": "johndoe@exampl.com",
    "contrasena": "password123"
    }
    */
    @Delete('/eliminarCuenta')
    public async eliminarCuenta(@Body() Usuario: UsuarioEntity, @Res() res: Response) {
        res.status(201).send(await this.usuarioService.eliminarCuenta(Usuario))
    }
    /** {"Usuario":"johndoe3"} */
    @Post('/crearAnime')
    public async crearanime(@Body() Usuario: UsuarioEntity, @Res() res: Response) {
        res.status(201).send(await this.usuarioService.agregarAnimeVisto(Usuario))
    }
    /** 
    {
    "Usuario": "Dasgoxhu","animes": [
        {
            "NombreAnime": "attack on titan",
            "Capitulo": 3,
            "Temporada": 4,
            "Opinion": "jaja un titan"
        }]
    }
    */
    @Put('/editarAnime')
    public async editarAnime(@Body() animeEditado: UsuarioEntity, @Res() res: Response) {
        res.status(200).send(await this.usuarioService.editarAnimeVisto(animeEditado));
    }
    /**
    {
    "Usuario": "johndoe","animes": [
        {
            "NombreAnime": "Naruto",
            "Capitulo": 2,
            "Temporada": 8,
            "Opinion": "interesante"
        }]
    }
    */
    @Delete('/eliminarAnime')
    public async eliminarAnime(@Body() animeAEliminar: UsuarioEntity, @Res() res: Response) {
        res.status(200).send(await this.usuarioService.eliminarAnimeVisto(animeAEliminar));
    }
    /**{"Usuario": "nombre_de_usuario","animes": [{"NombreAnime": "nombre_del_anime"}]}   */

    @Get('/verListaAnimes')
    public async verListaDeAnimes(@Body() Usuario: UsuarioEntity, @Res() res: Response) {
        res.status(201).send(await this.usuarioService.verListaDeAnimes(Usuario))
    } 
    /**{"Usuario":"johndoe3"} */
}
/**localhost:3000/UsuarioController/ */