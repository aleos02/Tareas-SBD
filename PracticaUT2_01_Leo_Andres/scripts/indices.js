db.media.createIndex(
  { generos: 1, nota_media: -1, año: -1 },
  { name: "idx_media_genero_nota_año" }
);

db.media.createIndex(
  { sinopsis: "text" },
  { name: "idx_media_texto_sinopsis", default_language: "spanish" }
);

db.valoraciones.createIndex(
  { media_id: 1,fecha_creacion: -1},
  { name: "idx_valoraciones_media_fecha" }
);