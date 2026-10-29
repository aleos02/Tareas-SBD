// 1. Operación básica.
MERGE (a:Artista {id:"ART-01"}) SET a.oyentes_mensuales = 85000000;

// 2. Consulta de 1 salto.
MATCH (a:Artista)-[r:INTERPRETA]->(c:Cancion {titulo: "Levitating"})
OPTIONAL MATCH (c)-[:PERTENECE_A]->(g:Genero)
RETURN c.titulo AS cancion,
       a.nombre AS artista,
       r.rol AS rol_artista,
       c.duracion_seg AS duracion_segundos,
       c.lanzamiento AS anio_lanzamiento,
       collect(DISTINCT g.nombre) AS generos;

// 3. Consulta de 2 saltos o más.
MATCH (yo:Usuario {nombre: "Sara"})-[:SIGUE_A]->(amigo:Usuario)-[e:ESCUCHA]->(c:Cancion)
WHERE NOT (yo)-[:ESCUCHA]->(c)
RETURN c.titulo AS cancion_recomendada,
       collect(DISTINCT amigo.nombre) AS amigos_que_la_escuchan,
       count(DISTINCT amigo) AS total_amigos,
       sum(e.reproducciones) AS total_escuchas_circulo
ORDER BY total_amigos DESC, total_escuchas_circulo DESC;

// 4. Recomendación por afinidad.
MATCH (inicio:Artista {nombre: "Dua Lipa"})-[:INTERPRETA]->(c:Cancion)<-[:INTERPRETA]-(colaborador:Artista)
WHERE inicio <> colaborador
RETURN colaborador.nombre AS artista_colaborador,
       collect(c.titulo) AS canciones_en_comun,
       count(c) AS total_colaboraciones
ORDER BY total_colaboraciones DESC;

// 5. Camino más corto.
MATCH (origen:Artista {nombre: "Elton John"})
MATCH (destino:Artista {nombre: "Calvin Harris"})
MATCH camino = shortestPath((origen)-[:INTERPRETA*..10]-(destino))
RETURN camino,
       length(camino) AS saltos_totales,
       [n IN nodes(camino) | coalesce(n.nombre, n.titulo)] AS cadena_conexion;