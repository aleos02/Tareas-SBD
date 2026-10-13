//Consulta que devuelve la información de las peliculas de un género concreto, con una nota media entre 8 y 10 y que hayan sido estrenadas a partir del año 2010. La información se ordena por nota media de forma descendente y por id de forma ascendente. Se muestran los primeros 2 resultados.
db.media.find(
  {
    generos: "Ciencia Ficción",
    nota_media: { $gte: 8.0, $lte: 10.0 },
    año: { $gte: 2010 }
  },
  {
    _id: 1,
    id_pelicula: 1,
    id_serie: 1,
    año: 1,
    nota_media: 1,
    generos: 1
  }
)
.sort({ nota_media: -1, _id: 1 })
.skip(0)
.limit(2);

//Consulta que devuelve 
db.media.aggregate([
  { $match: { id_pelicula: "pel_001" } },
  {
    $lookup: {
      from:"valoraciones",
      localField: "id_pelicula",
      foreignField: "media_id",
      as: "valoraciones"
    }
  },
  {
    $project: {
      _id: 1,
      id_pelicula: 1,
      año: 1,
      nota_media: 1,
      generos: 1,
      total_valoraciones: { $size: "$valoraciones" },
      opiniones_usuarios: {
        usuario_id: 1,
        nota: 1,
        fecha_creacion: 1
      }
    }
  }
]);

//Consulta que 
db.media.aggregate([
  {
    $match: {
      año: { $gte: 2000 },
      duracion: { $gt: 0 }
    }
  },

  {
    $unwind: "$generos"
  },

  {
    $group: {
      _id: "$generos",
      total_titulos: { $sum: 1 },
      nota_promedio: { $avg: "$nota_media" },
      duracion_acumulada_minutos: { $sum: "$duracion" }
    }
  },

  {
    $project: {
      _id: 0,
      genero: "$_id",
      total_titulos: 1,
      nota_promedio: { $round: ["$nota_promedio", 2] },
      duracion_acumulada_minutos: 1
    }
  }
]);