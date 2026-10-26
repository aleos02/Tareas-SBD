# Practica UT2-02

## 1. Definir el problemas y los actores.

### 1. Escenario elegido

El escenario elegido para la siguiente práctica es la gestión de una plataforma musical (Spotify) en la que se gestionarán los oyentes, las canciones, los artistas, las colaboraciones, los géneros y las listas de reproducción.
Además, se resolverán las recomendaciones de artistas o canciones que escuchen mis amigos, y gestionará caminos de conexión entre los artistas.

### 2. Preguntas de negocio.

La base de datos debe responder a las siguientes preguntas:

1. ¿Cuáles son las 5 canciones más escuchadas por los amigos de un usuario, las cuales no han escuchado antes?
2. ¿Qué artistas pertenecientes a los géneros favoritos de un oyente son escuchados frecuentemente por sus amigos, pero son desconocidos para él? 
3. ¿Cuál es la cadena de colaboraciones más corta que conecta al "Artista A" con el "Artista B" a través de canciones en común?
4. ¿Cuáles son los géneros musicales que tienden a mezclarse con mayor frecuencia dentro de una misma lista de reproducción creada por los usuarios?
5. ¿Cuáles son las canciones más escuchadas por los oyentes en esta última semana?
6. ¿Cuál es el artista más escuchado por los oyentes en esta última semana?

### 3. Datos de mayor frecuencia.

Los datos con mayor frecuencia de lectura son:

1. Metadatos de la canción (título, artista, duración, género, etc.).
2. Datos de los artistas (nombre, canciones, álbumes, etc).
3. Datos de los oyentes (nombre, listas de reproducción, amigos, etc).

Los datos de mayor frecuencia de escritura son:

1. Insertar y actualizar datos de las canciones.
2. Insertar y actualizar datos de los artistas.
3. Insertar y actualizar datos de los oyentes.

### 4. Requisitos de seguridad, disponibilidad, privacidad y crecimiento.

Autenticación robusta: Los usuarios deben poder registrarse y iniciar sesión en la plataforma.
Privacidad: Los usuarios deben poder configurar su perfil como privado y ocultar sus listas de reproducción. Además, los oyentes podrán borrar su perfil, eliminando sus datos personales de la plataforma pero manteniendo los metadatos de las canciones o artistas.
Disponibilidad: El clúster de Neo4j garantiza que el streaming no sufra interrupciones.


## 2. Diseñar el grafo de nodos y relaciones.

![Grafo](./Diagrama_nodos.png)


### 1. Etiquetas de nodos.

Usuario{
    id_usuario,
    nombre,
    email,
}
Cancion{
    id_cancion,
    titulo,
    duracion,
    fecha_creacion,
    reproducciones_totales
}
Artista{
    id_artista,
    nombre,
    oyentes_mensuales,
    pais_origen
}
Género{
    id_genero,
    nombre
}
Lista de reproducción{
    id_lista,
    nombre,
}
Album{
    id_album,
    titulo,
    lanzamiento
}

### 2. Relaciones de nodos

1. Usuarios -> Sigue -> Artistas. (Fecha de seguimiento)
2. Usuarios -> Escucha -> Canciones (Número de veces escuchadas)
3. Canciones -> Creada por -> Artistas (Fecha de creación)
4. Canciones -> Pertenece a -> Géneros
5. Listas de reproducción -> Creada por -> Usuarios
6. Listas de reproducción -> Contiene -> Canciones
7. Artistas -> Tiene -> Álbumes
8. Usuarios -> Sigue a -> Usuarios (Fecha de seguimiento)
9. Cancion -> Parte de -> Album

### 3. Justificación frente a SQL.
Cada elemento en el grafo se modela como un nodo ya que facilita la velocidad de las consultas en referencia a modelos de bases de datos relacionales, que son más lentas que las de grafos.

Por ejemplo, una consulta de las recomendaciones de un usuario con respecto a las listas de reproducción de sus amigos tienes que hacer una consulta a la base de datos en SQL con un JOIN a diferentes tablas, sin embargo en un grafo de nodos y relaciones, la consulta es más directa.

### 4. Estrategia de identificadores únicos.

Identificadores unívocos: Los identificadores de los nodos son únicos y legibles.

Propiedades en las relaciones: Algunas relaciones tienen propiedades que evitan crear tablas y colecciones intermedias.


### 5. Límites y riesgos del modelo.

Profundidad de saltos ilimitada: Ejecutar exploraciones abiertas sin especificar un límite de niveles.

Búsquedas globales: Buscar patrones abstractos en el grafo sin un punto de partida concreto.

## 3. Implementar restricciones, índices y carga de datos.

### 1. Restricciones

```json
CREATE CONSTRAINT c_id_cancion IF NOT EXISTS
FOR (c:Cancion) REQUIRE c.id_cancion IS UNIQUE;

CREATE CONSTRAINT c_id_artista IF NOT EXISTS
FOR (a:Artista) REQUIRE a.id_artista IS UNIQUE;

CREATE CONSTRAINT c_id_genero IF NOT EXISTS
FOR (g:Genero) REQUIRE g.id_genero IS UNIQUE;

CREATE CONSTRAINT c_id_lista IF NOT EXISTS
FOR (l:Lista) REQUIRE l.id_lista IS UNIQUE;

CREATE CONSTRAINT c_id_album IF NOT EXISTS
FOR (a:Album) REQUIRE a.id_album IS UNIQUE;
```

### 2. Índices secundarios

```json
CREATE INDEX idx_cancion IF NOT EXISTS
FOR (c:Cancion) ON (c.titulo)

CREATE INDEX idx_artista IF NOT EXISTS
FOR (a:Artista) ON (a.nombre)

CREATE INDEX idx_lista IF NOT EXISTS
FOR (l:Lista de reproduccion) ON (l.nombre)
```

### 3. Carga de datos.

```json
// 1. Géneros Musicales
MERGE (g1:Genero {id: "GEN-01"}) SET g1.nombre = "Indie Rock"
MERGE (g2:Genero {id: "GEN-02"}) SET g2.nombre = "Dance Pop"
MERGE (g3:Genero {id: "GEN-03"}) SET g3.nombre = "Synthwave"
MERGE (g4:Genero {id: "GEN-04"}) SET g4.nombre = "Pop Rock";

// 2. Artistas
MERGE (a1:Artista {id: "ART-01"}) SET a1.nombre = "Coldplay", a1.oyentes_mensuales = 75000000, a1.pais_origen = "GB"
MERGE (a2:Artista {id: "ART-02"}) SET a2.nombre = "Dua Lipa", a2.oyentes_mensuales = 78000000, a2.pais_origen = "GB"
MERGE (a3:Artista {id: "ART-03"}) SET a3.nombre = "Elton John", a3.oyentes_mensuales = 52000000, a3.pais_origen = "GB"
MERGE (a4:Artista {id: "ART-04"}) SET a4.nombre = "Calvin Harris", a4.oyentes_mensuales = 64000000, a4.pais_origen = "GB"
MERGE (a5:Artista {id: "ART-05"}) SET a5.nombre = "Gorillaz", a5.oyentes_mensuales = 26000000, a5.pais_origen = "GB"
MERGE (a6:Artista {id: "ART-06"}) SET a6.nombre = "Tame Impala", a6.oyentes_mensuales = 31000000, a6.pais_origen = "AU";

// 3. Canciones
MERGE (c1:Cancion {id: "CAN-01"}) SET c1.titulo = "Yellow", c1.duracion_seg = 269, c1.lanzamiento = 2000
MERGE (c2:Cancion {id: "CAN-02"}) SET c2.titulo = "Cold Heart", c2.duracion_seg = 202, c2.lanzamiento = 2021
MERGE (c3:Cancion {id: "CAN-03"}) SET c3.titulo = "Levitating", c3.duracion_seg = 203, c3.lanzamiento = 2020
MERGE (c4:Cancion {id: "CAN-04"}) SET c4.titulo = "One Kiss", c4.duracion_seg = 214, c4.lanzamiento = 2018
MERGE (c5:Cancion {id: "CAN-05"}) SET c5.titulo = "New Gold", c5.duracion_seg = 215, c5.lanzamiento = 2022
MERGE (c6:Cancion {id: "CAN-06"}) SET c6.titulo = "The Less I Know The Better", c6.duracion_seg = 216, c6.lanzamiento = 2015
MERGE (c7:Cancion {id: "CAN-07"}) SET c7.titulo = "Feel Good Inc", c7.duracion_seg = 221, c7.lanzamiento = 2005
MERGE (c8:Cancion {id: "CAN-08"}) SET c8.titulo = "Miracle", c8.duracion_seg = 186, c8.lanzamiento = 2023;

// 4. Asignar Canciones a Géneros
MERGE (c1)-[:PERTENECE_A]->(g4)
MERGE (c2)-[:PERTENECE_A]->(g2)
MERGE (c3)-[:PERTENECE_A]->(g2)
MERGE (c4)-[:PERTENECE_A]->(g2)
MERGE (c5)-[:PERTENECE_A]->(g3)
MERGE (c6)-[:PERTENECE_A]->(g1)
MERGE (c7)-[:PERTENECE_A]->(g1)
MERGE (c8)-[:PERTENECE_A]->(g3);

// 5. Interpretaciones y Colaboraciones Musicales
// Tema en solitario Coldplay
MERGE (a1)-[:INTERPRETA {rol: "principal"}]->(c1)

// Colaboración: Elton John y Dua Lipa
MERGE (a3)-[:INTERPRETA {rol: "principal"}]->(c2)
MERGE (a2)-[:INTERPRETA {rol: "colaborador"}]->(c2)

// Tema en solitario Dua Lipa
MERGE (a2)-[:INTERPRETA {rol: "principal"}]->(c3)

// Colaboración: Calvin Harris y Dua Lipa
MERGE (a4)-[:INTERPRETA {rol: "productor"}]->(c4)
MERGE (a2)-[:INTERPRETA {rol: "principal"}]->(c4)

// Colaboración: Gorillaz y Tame Impala
MERGE (a5)-[:INTERPRETA {rol: "principal"}]->(c5)
MERGE (a6)-[:INTERPRETA {rol: "colaborador"}]->(c5)

// Tema en solitario Tame Impala
MERGE (a6)-[:INTERPRETA {rol: "principal"}]->(c6)

// Tema en solitario Gorillaz
MERGE (a5)-[:INTERPRETA {rol: "principal"}]->(c7)

// Tema en solitario Calvin Harris
MERGE (a4)-[:INTERPRETA {rol: "productor"}]->(c8);

// 6. Usuarios
MERGE (u1:Usuario {id: "USR-01"}) SET u1.nombre = "Sara", u1.pais = "ES", u1.cuenta_premium = true
MERGE (u2:Usuario {id: "USR-02"}) SET u2.nombre = "Mateo", u2.pais = "AR", u2.cuenta_premium = true
MERGE (u3:Usuario {id: "USR-03"}) SET u3.nombre = "Valeria", u3.pais = "CO", u3.cuenta_premium = false
MERGE (u4:Usuario {id: "USR-04"}) SET u4.nombre = "Javier", u4.pais = "ES", u4.cuenta_premium = false;

// 7. Red Social de Seguimiento entre Usuarios
MERGE (u1)-[:SIGUE_A {desde: "2024-01-12"}]->(u2)
MERGE (u1)-[:SIGUE_A {desde: "2024-02-18"}]->(u3)
MERGE (u2)-[:SIGUE_A {desde: "2024-03-05"}]->(u4)
MERGE (u3)-[:SIGUE_A {desde: "2024-03-22"}]->(u1);

// 8. Hábitos de Escucha y Favoritos
MERGE (u1)-[:ESCUCHA {reproducciones: 48, favorito: true}]->(c3)
MERGE (u1)-[:ESCUCHA {reproducciones: 35, favorito: false}]->(c4)
MERGE (u2)-[:ESCUCHA {reproducciones: 76, favorito: true}]->(c2)
MERGE (u2)-[:ESCUCHA {reproducciones: 58, favorito: true}]->(c4)
MERGE (u2)-[:ESCUCHA {reproducciones: 40, favorito: false}]->(c8)
MERGE (u3)-[:ESCUCHA {reproducciones: 88, favorito: true}]->(c5)
MERGE (u3)-[:ESCUCHA {reproducciones: 94, favorito: true}]->(c6)
MERGE (u4)-[:ESCUCHA {reproducciones: 62, favorito: true}]->(c7);

// 9. Playlists
MERGE (p1:Playlist {id: "PLY-01"}) SET p1.nombre = "Indie & Dance Anthems", p1.es_publica = true
MERGE (p1)-[:CONTIENE_PISTA {orden: 1}]->(c2)
MERGE (p1)-[:CONTIENE_PISTA {orden: 2}]->(c3)
MERGE (p1)-[:CONTIENE_PISTA {orden: 3}]->(c4)
MERGE (p1)-[:CONTIENE_PISTA {orden: 4}]->(c5);
```

### 4. Evidencia con PROFILE
```json
PROFILE
MATCH (a:Artista {nombre: "Coldplay"})
RETURN a.oyentes_mensuales, a.pais_origen;
```

## 4. Resolver consultas Cypher.

### 1. Operación básica.
```json
MERGE (a:Artista {id:"ART-01"}) SET a.oyentes_mensuales = 85000000;
```

### 2. Consulta de 1 salto.
```json
MATCH (c:Cancion {nombre: "Levitating"})-[r:CREADA_POR]->(a.Artista)
OPTIONAL MATCH (a)-[:TIENE]->(al:Album)
RETURN a.nombre AS artista,
al.titulo AS album,
al.lanzamiento AS lanzamiento,
c.titulo AS cancion,