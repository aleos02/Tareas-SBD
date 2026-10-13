### 1. Escenario elegido
El escenario elegido para la siguiente práctica es la gestión de una plataforma multimedia en el que se gestionaran películas, series, episodios, géneros, usuarios y valoraciones, permitiendo a los usuarios consumir contenido, dejar calificaciones/reseñas y recibir sugerencias personalizadas.

Los tipos de usuarios son:
1. Usuario final: Busca contenido mediante filtros, consulta fichas de series y películas, valora títulos y recibe recomendaciones en su página de inicio.
2. Administrador: Administra la plataforma, gestiona usuarios, gestiona contenido, gestiona reseñas y calificaciones.
3. Motor: Procesa valoraciones e historiales para calcular medias y alimentar los algoritmos de recomendación.

### 2. Preguntas de negocio
La base de datos debe responder a las siguientes preguntas:

1. Realizar una consulta para obtener la información de todos los géneros que el usuario ve frecuentemente.
2. Realizar una consulta para obtener la valoración de las series y películas que el usuario ha visto.
3. Realizar una consulta sobre las valoraciones de las peliculas de un determinado género.
4. Realizar una consulta sobre el año de salida de una serie o película.
5. Realizar una consulta sobre las películas y series que han sido vistas por un usuario.
6. Realizar una consulta sobre las películas que duran más de 2 horas.


### 3. Datos de mayor frecuencia

Los datos de mayor frecuencia de lectura son:
1. Metadatos de catálogo (título, sinopsis, géneros, duración, póster y nota media calculada).
2. Fichas de series con sus temporadas y lista de episodios.
3. Carruseles principales de películas y series.

Los datos de mayor frecuencia de escritura son:
1. Inserción y actualización de valoraciones.
2. Actualización en tiempo real del progreso de visualización.
3. Incremento de la calificación de un título.

### 4. Tabla de relaciones

| Pregunta | Colecciones | Filtros | Ordenación | Paginación |
|----------|------------------------|--------------|--------------|------------|
| 1 | Usuarios y media | Géneros y no visto | Valoraciones | Límite fijo |
| 2 | Historial y valoraciones | Id usuario | Fecha | Scroll infinito |
| 3 | Media | Tipo y género | Valoraciones | Páginas de 20 |
| 4 | Media | Año lanzamiento | Títulos | Páginas de 20 |
| 5 | Historial | ID usuario | Fecha visualización | Scroll infinito |
| 6 | Media | Tipo y duración | Duración | Páginas de 20 |


### 5. Requisitos de seguridad, privacidad, disponibilidad y crecimiento.

1. Autenticación robusta: Los usuarios deben poder registrarse y iniciar sesión en la plataforma.
2. Pseudiminización de identificadores de usuarios: Los usuarios deben poder crear un identificador de usuario único y pseudonimo.
3. Cumplimiento de la RGPD: Los usuarios deben poder darse de baja y darse de alta de la información que proporcionan.