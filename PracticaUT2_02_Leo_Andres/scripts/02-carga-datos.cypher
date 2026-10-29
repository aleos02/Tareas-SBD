// 1. Géneros Musicales
MERGE (g1:Genero {id: "GEN-01"}) SET g1.nombre = "Indie Rock"
MERGE (g2:Genero {id: "GEN-02"}) SET g2.nombre = "Dance Pop"
MERGE (g3:Genero {id: "GEN-03"}) SET g3.nombre = "Synthwave"
MERGE (g4:Genero {id: "GEN-04"}) SET g4.nombre = "Pop Rock"

// 2. Artistas
MERGE (a1:Artista {id: "ART-01"}) SET a1.nombre = "Coldplay", a1.oyentes_mensuales = 75000000, a1.pais_origen = "GB"
MERGE (a2:Artista {id: "ART-02"}) SET a2.nombre = "Dua Lipa", a2.oyentes_mensuales = 78000000, a2.pais_origen = "GB"
MERGE (a3:Artista {id: "ART-03"}) SET a3.nombre = "Elton John", a3.oyentes_mensuales = 52000000, a3.pais_origen = "GB"
MERGE (a4:Artista {id: "ART-04"}) SET a4.nombre = "Calvin Harris", a4.oyentes_mensuales = 64000000, a4.pais_origen = "GB"
MERGE (a5:Artista {id: "ART-05"}) SET a5.nombre = "Gorillaz", a5.oyentes_mensuales = 26000000, a5.pais_origen = "GB"
MERGE (a6:Artista {id: "ART-06"}) SET a6.nombre = "Tame Impala", a6.oyentes_mensuales = 31000000, a6.pais_origen = "AU"

// 3. Canciones
MERGE (c1:Cancion {id: "CAN-01"}) SET c1.titulo = "Yellow", c1.duracion_seg = 269, c1.lanzamiento = 2000
MERGE (c2:Cancion {id: "CAN-02"}) SET c2.titulo = "Cold Heart", c2.duracion_seg = 202, c2.lanzamiento = 2021
MERGE (c3:Cancion {id: "CAN-03"}) SET c3.titulo = "Levitating", c3.duracion_seg = 203, c3.lanzamiento = 2020
MERGE (c4:Cancion {id: "CAN-04"}) SET c4.titulo = "One Kiss", c4.duracion_seg = 214, c4.lanzamiento = 2018
MERGE (c5:Cancion {id: "CAN-05"}) SET c5.titulo = "New Gold", c5.duracion_seg = 215, c5.lanzamiento = 2022
MERGE (c6:Cancion {id: "CAN-06"}) SET c6.titulo = "The Less I Know The Better", c6.duracion_seg = 216, c6.lanzamiento = 2015
MERGE (c7:Cancion {id: "CAN-07"}) SET c7.titulo = "Feel Good Inc", c7.duracion_seg = 221, c7.lanzamiento = 2005
MERGE (c8:Cancion {id: "CAN-08"}) SET c8.titulo = "Miracle", c8.duracion_seg = 186, c8.lanzamiento = 2023

// 4. Asignar Canciones a Géneros
MERGE (c1)-[:PERTENECE_A]->(g4)
MERGE (c2)-[:PERTENECE_A]->(g2)
MERGE (c3)-[:PERTENECE_A]->(g2)
MERGE (c4)-[:PERTENECE_A]->(g2)
MERGE (c5)-[:PERTENECE_A]->(g3)
MERGE (c6)-[:PERTENECE_A]->(g1)
MERGE (c7)-[:PERTENECE_A]->(g1)
MERGE (c8)-[:PERTENECE_A]->(g3)

// 5. Interpretaciones y Colaboraciones Musicales
MERGE (a1)-[:INTERPRETA {rol: "principal"}]->(c1)
MERGE (a3)-[:INTERPRETA {rol: "principal"}]->(c2)
MERGE (a2)-[:INTERPRETA {rol: "colaborador"}]->(c2)
MERGE (a2)-[:INTERPRETA {rol: "principal"}]->(c3)
MERGE (a4)-[:INTERPRETA {rol: "productor"}]->(c4)
MERGE (a2)-[:INTERPRETA {rol: "principal"}]->(c4)
MERGE (a5)-[:INTERPRETA {rol: "principal"}]->(c5)
MERGE (a6)-[:INTERPRETA {rol: "colaborador"}]->(c5)
MERGE (a6)-[:INTERPRETA {rol: "principal"}]->(c6)
MERGE (a5)-[:INTERPRETA {rol: "principal"}]->(c7)
MERGE (a4)-[:INTERPRETA {rol: "productor"}]->(c8)

// 6. Usuarios
MERGE (u1:Usuario {id: "USR-01"}) SET u1.nombre = "Sara", u1.pais = "ES", u1.cuenta_premium = true
MERGE (u2:Usuario {id: "USR-02"}) SET u2.nombre = "Mateo", u2.pais = "AR", u2.cuenta_premium = true
MERGE (u3:Usuario {id: "USR-03"}) SET u3.nombre = "Valeria", u3.pais = "CO", u3.cuenta_premium = false
MERGE (u4:Usuario {id: "USR-04"}) SET u4.nombre = "Javier", u4.pais = "ES", u4.cuenta_premium = false

// 7. Red Social de Seguimiento entre Usuarios
MERGE (u1)-[:SIGUE_A {desde: "2024-01-12"}]->(u2)
MERGE (u1)-[:SIGUE_A {desde: "2024-02-18"}]->(u3)
MERGE (u2)-[:SIGUE_A {desde: "2024-03-05"}]->(u4)
MERGE (u3)-[:SIGUE_A {desde: "2024-03-22"}]->(u1)

// 8. Hábitos de Escucha y Favoritos
MERGE (u1)-[:ESCUCHA {reproducciones: 48, favorito: true}]->(c3)
MERGE (u1)-[:ESCUCHA {reproducciones: 35, favorito: false}]->(c4)
MERGE (u2)-[:ESCUCHA {reproducciones: 76, favorito: true}]->(c2)
MERGE (u2)-[:ESCUCHA {reproducciones: 58, favorito: true}]->(c4)
MERGE (u2)-[:ESCUCHA {reproducciones: 40, favorito: false}]->(c8)
MERGE (u3)-[:ESCUCHA {reproducciones: 88, favorito: true}]->(c5)
MERGE (u3)-[:ESCUCHA {reproducciones: 94, favorito: true}]->(c6)
MERGE (u4)-[:ESCUCHA {reproducciones: 62, favorito: true}]->(c7)

// 9. Playlists
MERGE (p1:Playlist {id: "PLY-01"}) SET p1.nombre = "Indie & Dance Anthems", p1.es_publica = true
MERGE (p1)-[:CONTIENE_PISTA {orden: 1}]->(c2)
MERGE (p1)-[:CONTIENE_PISTA {orden: 2}]->(c3)
MERGE (p1)-[:CONTIENE_PISTA {orden: 3}]->(c4)
MERGE (p1)-[:CONTIENE_PISTA {orden: 4}]->(c5);