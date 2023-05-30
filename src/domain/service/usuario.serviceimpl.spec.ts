import { UsuarioServiceImpl } from './usuario.serviceimpl';
import { UsuarioRepository } from '../repository/usuario.repository';
import { UsuarioEntity } from '../entity/usuario.entity';
import { anime } from '../entity/anime.dto';

describe('UsuarioServiceImpl', () => {
  let usuarioService: UsuarioServiceImpl;
  let usuarioRepository: UsuarioRepository;

  beforeEach(() => {
    usuarioRepository = {
      crearCuenta:jest.fn(),
      eliminarCuenta:jest.fn(),
      agregarAnimeVisto:jest.fn(),
      editarAnimeVisto:jest.fn(),
      eliminarAnimeVisto:jest.fn(),
      BuscarUsuario:jest.fn(),
      BuscarCorreo:jest.fn()
    }
    usuarioService = new UsuarioServiceImpl(usuarioRepository);
  });

  describe('crearCuenta', () => {
    it('debería crear una cuenta de usuario con éxito', async () => {
      const usuario: UsuarioEntity = {
        _id: '123',
        Usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: 'password',
        animes: []
      };

      jest.spyOn(usuarioRepository, 'BuscarUsuario').mockImplementation(null);
      jest.spyOn(usuarioRepository, 'BuscarCorreo').mockResolvedValue(null);
      jest.spyOn(usuarioRepository, 'crearCuenta').mockResolvedValue(null);

      const result = await usuarioService.crearCuenta(usuario);

      expect(result).toBe('Se creo el Usuario con exito');
      expect(usuarioRepository.BuscarUsuario).toHaveBeenCalledWith(usuario.Usuario);
      expect(usuarioRepository.BuscarCorreo).toHaveBeenCalledWith(usuario.correo);
      expect(usuarioRepository.crearCuenta).toHaveBeenCalledWith(usuario);
    });

    it('debe devolver un mensaje de error si el nombre de usuario o la dirección de correo electrónico ya existen', async () => {
      const usuario: UsuarioEntity = {
        _id: '123',
        Usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: 'password',
        animes: []
      };

      jest.spyOn(usuarioRepository, 'BuscarUsuario').mockResolvedValue(usuario);
      jest.spyOn(usuarioRepository, 'BuscarCorreo').mockResolvedValue(null);

      const result = await usuarioService.crearCuenta(usuario);

      expect(result).toBe('el usuario o el correo ya existe');
      expect(usuarioRepository.BuscarUsuario).toHaveBeenCalledWith(usuario.Usuario);
      expect(usuarioRepository.BuscarCorreo).toHaveBeenCalledWith(usuario.correo);
      expect(usuarioRepository.crearCuenta).not.toHaveBeenCalled();
    });
  });

  describe('eliminarCuenta', () => {
    it('debería eliminar una cuenta de usuario correctamente', async () => {
      const usuario: UsuarioEntity = {
        _id: '123',
        Usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: 'password',
        animes: []
      };

      jest.spyOn(usuarioRepository, 'eliminarCuenta').mockResolvedValue();

      const result = await usuarioService.eliminarCuenta(usuario);

      expect(result).toBe('la cuenta fue eliminada con exito');
      expect(usuarioRepository.eliminarCuenta).toHaveBeenCalledWith(usuario);
    });
  });

  describe('agregarAnimeVisto', () => {
    it('debería añadir un anime visto al perfil del usuario con éxito', async () => {
      const usuario: UsuarioEntity = {
        _id: '123',
        Usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: 'password',
        animes: []
      };

      const animeNuevo: anime = {
        NombreAnime: 'Anime 1',
        Capitulo: 1,
        Temporada: 1,
        Opinion: 'Bueno'
      };

      usuario.animes = [animeNuevo];

      jest.spyOn(usuarioRepository, 'BuscarUsuario').mockResolvedValue(usuario);
      jest.spyOn(usuarioRepository, 'agregarAnimeVisto').mockResolvedValue("Lista Guardada");

      const result = await usuarioService.agregarAnimeVisto(usuario);

      expect(result).toBe("El anime " + "'" + animeNuevo.NombreAnime +  "'" + " ya está en la lista de animes del usuario");
      expect(usuarioRepository.BuscarUsuario).toHaveBeenCalledWith(usuario.Usuario);
      expect(usuarioRepository.agregarAnimeVisto).not.toHaveBeenCalledWith();
    });

    it('debe devolver un mensaje de error si el anime ya está en el perfil del usuario', async () => {
      const usuario: UsuarioEntity = {
        _id: '123',
        Usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: 'password',
        animes: []
      };

      const animeExistente: anime = {
        NombreAnime: 'Anime 1',
        Capitulo: 1,
        Temporada: 1,
        Opinion: 'Bueno'
      };

      usuario.animes = [animeExistente];

      jest.spyOn(usuarioRepository, 'BuscarUsuario').mockResolvedValue(usuario);

      const result = await usuarioService.agregarAnimeVisto(usuario);

      expect(result).toBe('El anime \'Anime 1\' ya está en la lista de animes del usuario');
      expect(usuarioRepository.BuscarUsuario).toHaveBeenCalledWith(usuario.Usuario);
      expect(usuarioRepository.agregarAnimeVisto).not.toHaveBeenCalled();
    });

    it('debe devolver un mensaje de error si el usuario no existe', async () => {
      const usuario: UsuarioEntity = {
        _id: '123',
        Usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: 'password',
        animes: []
      };

      jest.spyOn(usuarioRepository, 'BuscarUsuario').mockResolvedValue(null);

      const result = await usuarioService.agregarAnimeVisto(usuario);

      expect(result).toBe('El usuario con el id testuser no existe');
      expect(usuarioRepository.BuscarUsuario).toHaveBeenCalledWith(usuario.Usuario);
      expect(usuarioRepository.agregarAnimeVisto).not.toHaveBeenCalled();
    });
  });

  describe('editarAnimeVisto', () => {
    it('debe editar con éxito un anime visto en el perfil del usuario', async () => {
      const usuario: UsuarioEntity = {
        _id: '123',
        Usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: 'password',
        animes: [
          {
            NombreAnime: 'Anime 1',
            Capitulo: 1,
            Temporada: 1,
            Opinion: 'Bueno'
          }
        ]
      };

      const animeEditado: anime = {
        NombreAnime: 'Anime 1',
        Capitulo: 2,
        Temporada: 1,
        Opinion: 'Muy bueno'
      };

      usuario.animes[0] = animeEditado;

      jest.spyOn(usuarioRepository, 'BuscarUsuario').mockResolvedValue(usuario);
      jest.spyOn(usuarioRepository, 'editarAnimeVisto').mockResolvedValue();

      const result = await usuarioService.editarAnimeVisto(usuario);

      expect(result).toBe('anime editado con exito');
      expect(usuarioRepository.BuscarUsuario).toHaveBeenCalledWith(usuario.Usuario);
      expect(usuarioRepository.editarAnimeVisto).toHaveBeenCalledWith(usuario);
    });

    it('debe devolver un mensaje de error si el usuario no existe', async () => {
      const usuario: UsuarioEntity = {
        _id: '123',
        Usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: 'password',
        animes: []
      };

      jest.spyOn(usuarioRepository, 'BuscarUsuario').mockResolvedValue(null);

      const result = await usuarioService.editarAnimeVisto(usuario);

      expect(result).toBe('no exite el Usuario');
      expect(usuarioRepository.BuscarUsuario).toHaveBeenCalledWith(usuario.Usuario);
      expect(usuarioRepository.editarAnimeVisto).not.toHaveBeenCalled();
    });

    it('debe devolver un mensaje de error si el anime no existe en el perfil del usuario', async () => {
      const usuario: UsuarioEntity = {
        _id: '123',
        Usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: 'password',
        animes: [
          {
            NombreAnime: 'Anime 1',
            Capitulo: 1,
            Temporada: 1,
            Opinion: 'Bueno'
          }
        ]
      };

      const animeEditado: anime = {
        NombreAnime: 'Anime 2',
        Capitulo: 2,
        Temporada: 1,
        Opinion: 'Muy bueno'
      };

      usuario.animes[0] = animeEditado;

      jest.spyOn(usuarioRepository, 'BuscarUsuario').mockResolvedValue(usuario);

      const result = await usuarioService.editarAnimeVisto(usuario);

      expect(result).toBe('anime editado con exito');
      expect(usuarioRepository.BuscarUsuario).toHaveBeenCalledWith(usuario.Usuario);
      expect(usuarioRepository.editarAnimeVisto).toHaveBeenCalled();
    });
  });

  describe('eliminarAnimeVisto', () => {
    it('debe eliminar con éxito un anime visto del perfil del usuario', async () => {
      const usuario: UsuarioEntity = {
        _id: '123',
        Usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: 'password',
        animes: [
          {
            NombreAnime: 'Anime 1',
            Capitulo: 1,
            Temporada: 1,
            Opinion: 'Bueno'
          }
        ]
      };

      jest.spyOn(usuarioRepository, 'BuscarUsuario').mockResolvedValue(usuario);
      jest.spyOn(usuarioRepository, 'eliminarAnimeVisto').mockResolvedValue();

      const result = await usuarioService.eliminarAnimeVisto(usuario);

      expect(result).toBe('anime eliminado con exito');
      expect(usuarioRepository.BuscarUsuario).toHaveBeenCalledWith(usuario.Usuario);
      expect(usuarioRepository.eliminarAnimeVisto).toHaveBeenCalledWith(usuario);
    });

    it('debe devolver un mensaje de error si el usuario no existe', async () => {
      const usuario: UsuarioEntity = {
        _id: '123',
        Usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: 'password',
        animes: []
      };

      jest.spyOn(usuarioRepository, 'BuscarUsuario').mockResolvedValue(null);

      const result = await usuarioService.eliminarAnimeVisto(usuario);

      expect(result).toBe('no existe el Usuario');
      expect(usuarioRepository.BuscarUsuario).toHaveBeenCalledWith(usuario.Usuario);
      expect(usuarioRepository.eliminarAnimeVisto).not.toHaveBeenCalled();
    });

    it('debe devolver un mensaje de error si el anime no existe en el perfil del usuario', async () => {
      const usuario: UsuarioEntity = {
        _id: '123',
        Usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: 'password',
        animes: [
          {
            NombreAnime: 'Anime 1',
            Capitulo: 1,
            Temporada: 1,
            Opinion: 'Bueno'
          }
        ]
      };

      const animeAEliminar: anime = {
        NombreAnime: 'Anime 2',
        Capitulo: 2,
        Temporada: 1,
        Opinion: 'Muy bueno'
      };

      usuario.animes[0] = animeAEliminar;

      jest.spyOn(usuarioRepository, 'BuscarUsuario').mockResolvedValue(usuario);

      const result = await usuarioService.eliminarAnimeVisto(usuario);

      expect(result).toBe('anime eliminado con exito');
      expect(usuarioRepository.BuscarUsuario).toHaveBeenCalledWith(usuario.Usuario);
      expect(usuarioRepository.eliminarAnimeVisto).toHaveBeenCalled();
    });
  });
});
