### 2. Copias de seguridad.
```js
// Realizar una copia física completa
neo4j-admin database dump neo4j --to-path=/backups/spotify/

// Restaurar la base de datos a partir del archivo dump
neo4j-admin database load neo4j --from-path=/backups/spotify/ --overwrite-destination=true
```