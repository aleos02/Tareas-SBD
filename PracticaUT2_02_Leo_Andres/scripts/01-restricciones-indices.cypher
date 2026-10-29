// 1. Restricciones
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

// 2. Índices secundarios
CREATE INDEX idx_cancion IF NOT EXISTS
FOR (c:Cancion) ON (c.titulo);

CREATE INDEX idx_artista IF NOT EXISTS
FOR (a:Artista) ON (a.nombre);

CREATE INDEX idx_playlist IF NOT EXISTS
FOR (p:Playlist) ON (p.nombre);