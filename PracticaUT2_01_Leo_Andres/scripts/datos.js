//Usuarios

db.usuarios.insertMany([
  {
    id: "usr_001",
    nombre: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    usuario: "carlosm",
    contraseña: "$2b$12$e8YkZJb1Rj9qJ8qN2y0b1uT9Z5W8G1e9m7X5V3Q1Y2Z4A6B8C0D2",
    lista_series: ["ser_001"],
    lista_peliculas: ["pel_001", "pel_002"]
  },
  {
    id: "usr_002",
    nombre: "Lucía Fernández",
    email: "lucia.fdez@email.com",
    usuario: "lucia_cine",
    contraseña: "$2b$12$K9L0M1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E9F0G1H2I3J4",
    lista_series: ["ser_001", "ser_002"],
    lista_peliculas: ["pel_003"]
  },
  {
    id: "usr_003",
    nombre: "Marcos Varela",
    email: "m.varela@email.com",
    usuario: "mvarela99",
    contraseña: "$2b$12$A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6",
    lista_series: ["ser_002"],
    lista_peliculas: ["pel_001"]
  }
]);

//Media
db.media.insertMany([
  {
    id_serie: null,
    id_pelicula: "pel_001",
    año: NumberInt(2014),
    duracion: NumberInt(169),
    nota_media: 8.7,
    sinopsis: "Un equipo de exploradores viaja a través de un agujero de gusano en el espacio para asegurar el futuro de la humanidad.",
    generos: ["Ciencia Ficción", "Drama", "Aventura"]
  },
  {
    id_serie: null,
    id_pelicula: "pel_002",
    año: NumberInt(2010),
    duracion: NumberInt(148),
    nota_media: 8.8,
    sinopsis: "Un ladrón con la habilidad de infiltrarse en los sueños ajenos recibe la misión inversa de implantar una idea.",
    generos: ["Ciencia Ficción", "Acción", "Suspense"]
  },
  {
    id_serie: null,
    id_pelicula: "pel_003",
    año: NumberInt(2019),
    duracion: NumberInt(132),
    nota_media: 8.5,
    sinopsis: "Una familia de escasos recursos se infiltra astutamente en la vida de una adinerada con consecuencias impredecibles.",
    generos: ["Drama", "Comedia Negra", "Suspense"]
  },
  {
    id_serie: "ser_001",
    id_pelicula: null,
    año: NumberInt(2008),
    duracion: NumberInt(47),
    nota_media: 9.5,
    sinopsis: "Un profesor de química diagnosticado de cáncer terminal recurre a la fabricación de metanfetamina para sostener a su familia.",
    generos: ["Crimen", "Drama", "Suspense"]
  },
  {
    id_serie: "ser_002",
    id_pelicula: null,
    año: NumberInt(2016),
    duracion: NumberInt(51),
    nota_media: 8.7,
    sinopsis: "La desaparición de un niño en un pueblo destapa un misterio con experimentos secretos y fuerzas sobrenaturales.",
    generos: ["Ciencia Ficción", "Fantasía", "Terror"]
  }
]);

//Historial
db.historial.insertMany([
  {
    id: "his_001",
    usuario_id: "usr_001",
    media_id: "pel_001",
    tipo: "pelicula",
    temporada: 0,
    episodio: 0,
    segundos_vistos: 10140,
    completado: true,
    fecha_visualizacion: new Date("2026-09-15T21:30:00Z")
  },
  {
    id: "his_002",
    usuario_id: "usr_001",
    media_id: "ser_001",
    tipo: "serie",
    temporada: 1,
    episodio: 1,
    segundos_vistos: 1540,
    completado: false,
    fecha_visualizacion: new Date("2026-09-20T22:15:00Z")
  },
  {
    id: "his_003",
    usuario_id: "usr_002",
    media_id: "ser_002",
    tipo: "serie",
    temporada: 1,
    episodio: 1,
    segundos_vistos: 3060,
    completado: true,
    fecha_visualizacion: new Date("2026-10-01T19:00:00Z")
  },
  {
    id: "his_004",
    usuario_id: "usr_002",
    media_id: "pel_003",
    tipo: "pelicula",
    temporada: 0,
    episodio: 0,
    segundos_vistos: 7920,
    completado: true,
    fecha_visualizacion: new Date("2026-10-03T16:45:00Z")
  },
  {
    id: "his_005",
    usuario_id: "usr_003",
    media_id: "pel_001",
    tipo: "pelicula",
    temporada: 0,
    episodio: 0,
    segundos_vistos: 3600,
    completado: false,
    fecha_visualizacion: new Date("2026-10-04T18:10:00Z")
  }
]);

//Valoraciones
db.valoraciones.insertMany([
  {
    id: "val_001",
    media_id: "pel_001",
    usuario_id: "usr_001",
    nota: 9.0,
    estado: "publicado",
    fecha_creacion: new Date("2026-09-16T10:00:00Z")
  },
  {
    id: "val_002",
    media_id: "ser_001",
    usuario_id: "usr_001",
    nota: 9.5,
    estado: "publicado",
    fecha_creacion: new Date("2026-09-21T08:30:00Z")
  },
  {
    id: "val_003",
    media_id: "pel_003",
    usuario_id: "usr_002",
    nota: 8.5,
    estado: "publicado",
    fecha_creacion: new Date("2026-10-03T19:00:00Z")
  },
  {
    id: "val_004",
    media_id: "ser_002",
    usuario_id: "usr_002",
    nota: 8.0,
    estado: "publicado",
    fecha_creacion: new Date("2026-10-02T11:15:00Z")
  },
  {
    id: "val_005",
    media_id: "pel_001",
    usuario_id: "usr_003",
    nota: 8.5,
    estado: "publicado",
    fecha_creacion: new Date("2026-10-04T20:00:00Z")
  }
]);