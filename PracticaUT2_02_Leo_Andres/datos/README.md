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