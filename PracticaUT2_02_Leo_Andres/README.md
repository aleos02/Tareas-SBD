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

Nodos:
1. Usuarios.
2. Artistas.
3. Canciones
4. Géneros
5. Listas de reproducción
6. Álbumes

Relaciones:
1. Usuarios -> Sigue -> Artistas. (Fecha de seguimiento)
2. Usuarios -> Escucha -> Canciones (Número de veces escuchadas)
3. Canciones -> Creada por -> Artistas (Fecha de creación)
4. Canciones -> Pertenece a -> Géneros
5. Listas de reproducción -> Creada por -> Usuarios
6. Listas de reproducción -> Contiene -> Canciones
7. Artistas -> Tiene -> Álbumes
8. Usuarios -> Sigue a -> Usuarios (Fecha de seguimiento)

![Grafo](./Diagrama_nodos.png)


### 1. Etiquetas de nodos.

Usuarios{
    id_usuario,
    nombre,
    email,
}
Canciones{
    id_cancion,
    titulo,
    artista,
    duracion,
    genero,
    album,
    fecha_creacion
}
Artistas{
    id_artista,
    nombre,
    canciones,
    álbumes
}
Géneros{
    id_genero,
    nombre
}
Listas de reproducción{
    id_lista,
    usuario,
    canciones
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

### 3. Justificación frente a SQL.
Cada elemento en el grafo se modela como un nodo ya que facilita la velocidad de las consultas en referencia a modelos de bases de datos relacionales, que son más lentas que las de grafos.

Por ejemplo, una consulta de las recomendaciones de un usuario con respecto a las listas de reproducción de sus amigos tienes que hacer una consulta a la base de datos en SQL con un JOIN a diferentes tablas, sin embargo en un grafo de nodos y relaciones, la consulta es más directa.

### 4. Estrategia de identificadores únicos.



### 5. Límites y riesgos del modelo.


