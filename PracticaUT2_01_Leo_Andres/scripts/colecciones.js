db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "nombre", "email", "usuario", "contraseña", "lista_series", "lista_peliculas"],
      properties: {
        id: { bsonType: "string" },
        nombre: { bsonType: "string" },
        email: { 
          bsonType: "string", 
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" 
        },
        usuario: { bsonType: "string" },
        contraseña: { bsonType: "string" },
        lista_series: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        lista_peliculas: {
          bsonType: "array",
          items: { bsonType: "string" }
        }
      }
    }
  }
});

db.createCollection("media", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["año", "duracion", "nota_media", "sinopsis", "generos"],
      properties: {
        id_serie: { bsonType: ["string", "null"] },
        id_pelicula: { bsonType: ["string", "null"] },
        año: { bsonType: "int", minimum: 1888 },
        duracion: { bsonType: "int", minimum: 0 },
        nota_media: { bsonType: ["double", "decimal"], minimum: 0, maximum: 10 },
        sinopsis: { bsonType: "string" },
        generos: {
          bsonType: "array",
          minItems: 1,
          items: { bsonType: "string" }
        }
      }
    }
  }
});

db.createCollection("historial", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "usuario_id", "media_id", "tipo", "temporada", "episodio", "segundos_vistos", "completado", "fecha_visualizacion"],
      properties: {
        id: { bsonType: "string" },
        usuario_id: { bsonType: "string" },
        media_id: { bsonType: "string" },
        tipo: { bsonType: "string" },
        temporada: { bsonType: "number" },
        episodio: { bsonType: "number" },
        segundos_vistos: { bsonType: "number" },
        completado: { bsonType: "bool" },
        fecha_visualizacion: { bsonType: "date" }
      }
    }
  }
});

db.createCollection("valoraciones", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "media_id", "usuario_id", "nota", "estado", "fecha_creacion"],
      properties: {
        id: { bsonType: "string" },
        media_id: { bsonType: "string" },
        usuario_id: { bsonType: "string" },
        nota: { bsonType: "number" },
        estado: { bsonType: "string" },
        fecha_creacion: { bsonType: "date" }
      }
    }
  }
});