# Practica UT2 01

### 1. Escenario elegido
El escenario elegido para la siguiente práctica es la gestión de una plataforma multimedia en el que se gestionaran películas, series, episodios, géneros, usuarios y valoraciones.

Los usuarios son

### 2. Preguntas de negocio
La base de datos debe responder a las siguientes preguntas:

1. Realizar una consulta para obtener la información de todos los géneros que el usuario ve frecuentemente.
2. Realizar una consulta para obtener la valoración de las series y películas que el usuario ha visto.
3. Realizar una consulta sobre las valoraciones de las peliculas de un determinado género.
4. Realizar una consulta sobre el año de salida de una serie o película.
5. Realizar una consulta sobre las películas y series que han sido vistas por un usuario.
6. Realizar una consulta sobre las películas que duran más de 2 horas.


### 3. Datos de mayor frecuencia

Los datos de mayor frecuencia son:
1. Películas y series
2. Géneros
3. Títulos
4. Valoraciones
5. Usuarios

### 4. Tabla de relaciones

| Pregunta | Colecciones            | Filtros      | Ordenación   | Paginación |
|----------|------------------------|--------------|--------------|------------|
| 1        | Películas y series     | Géneros      | Valoraciones | Títulos    |
| 2        | Películas y series     | Valoraciones | Valoraciones | Títulos    |
| 3        | Valoraciones y géneros | Géneros      | Valoraciones | Títulos    |
| 4        | Películas y series     | Géneros      | Títulos      | Títulos    |
| 5        | Películas y series     | Usuarios     | Títulos      | Géneros    |
| 6        | Películas              | Duración     | Títulos      | Géneros    |




