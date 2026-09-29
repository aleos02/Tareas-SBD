# Practica UT2 01

## 1. Definir el problema y los accesos.

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


## 2. Diseñar las colecciones.

Imagen del diagrama:

![Diagrama de colecciones](./Diagrama.png)

### 1. Colecciones de datos y sus propósitos.
Usuarios: Almacena el perfil del usuario, credenciales seguras, datos anonimizados para cumplir con RGPD, sus listas directas de marcadores (favoritos/"Mi Lista") y preferencias estáticas.

Media: Catálogo único polimórfico de títulos (películas y series). Contiene la metadata descriptiva (géneros, sinopsis, duración/temporadas) y agregaciones precalculadas (nota_media, total_votos) optimizadas para lecturas de alta concurrencia.

Historial: Almacena el log de eventos de consumo cronológico por usuario (reproducciones completas o parciales), desacoplado del documento del usuario para permitir un crecimiento ilimitado en series temporales.

Valoraciones: Registro transaccional de calificaciones numéricas y reseñas individuales asociadas a un par (usuario, media). Permite lecturas filtradas por título o autor sin penalizar el tamaño del catálogo.
### 2. Documentos JSON de las colecciones.

JSON de usuarios:
```json
{
  "_id": {"$oid": "651a1b2c3d4e5f6a7b8c9d01"},
  "pseudonimo_id": "usr_94f8a12e",
  "nombre": "Elena García",
  "usuario": "elena_cine",
  "email": "elena.garcia@example.com",
  "password_hash": "$2b$12$e8Y0N...hashedpassword",
  "estado": "ACTIVO",
  "mi_lista": [
    {"media_id": {"$oid": "651a1b2c3d4e5f6a7b8c9d10"}, "tipo": "PELICULA", "añadido_en": {"$date": "2026-02-14T20:00:00Z"}},
    {"media_id": {"$oid": "651a1b2c3d4e5f6a7b8c9d20"}, "tipo": "SERIE", "añadido_en": {"$date": "2026-03-01T10:15:00Z"}}
  ],
  "preferencias_generos": ["Ciencia Ficción", "Drama"],
  "fecha_registro": {"$date": "2026-01-10T08:30:00Z"},
  "fecha_baja": null
}
```

JSON de media:
```json
{
  "_id": {"$oid": "651a1b2c3d4e5f6a7b8c9d20"},
  "tipo": "SERIE",
  "titulo": "Horizonte Cuántico",
  "sinopsis": "Un grupo de científicos descubre una anomalía gravitatoria.",
  "anio_lanzamiento": 2025,
  "generos": ["Ciencia Ficción", "Suspense"],
  "estado": "PUBLICADO",
  "nota_media": 8.7,
  "total_votos": 1420,
  "temporadas": [
    {
      "numero": 1,
      "episodios": [
        {"numero": 1, "titulo": "Punto de Inflexión", "duracion_min": 52},
        {"numero": 2, "titulo": "Entropía", "duracion_min": 48}
      ]
    }
  ],
  "duracion_min": null,
  "creado_en": {"$date": "2025-11-20T12:00:00Z"}
}
```

JSON de historial:
```json
{
  "_id": {"$oid": "651a1b2c3d4e5f6a7b8c9d30"},
  "usuario_id": {"$oid": "651a1b2c3d4e5f6a7b8c9d01"},
  "media_id": {"$oid": "651a1b2c3d4e5f6a7b8c9d20"},
  "tipo": "SERIE",
  "temporada": 1,
  "episodio": 2,
  "segundos_vistos": 2880,
  "completado": true,
  "fecha_visualizacion": {"$date": "2026-09-28T22:15:30Z"}
}
```

JSON de valoraciones:
```json
{
  "_id": {"$oid": "651a1b2c3d4e5f6a7b8c9d40"},
  "media_id": {"$oid": "651a1b2c3d4e5f6a7b8c9d10"},
  "usuario_id": {"$oid": "651a1b2c3d4e5f6a7b8c9d01"},
  "nota": 9.0,
  "comentario": "Excelente ritmo y banda sonora imponente.",
  "estado": "VISIBLE", 
  "fecha_creacion": {"$date": "2026-09-29T14:20:00Z"}
}
```
### 3. Modelo de incrustación y de referencia.



### 4. Estrategia para identificadores, fechas, estados y campos opcionales.

### 5. Límites del modelo.