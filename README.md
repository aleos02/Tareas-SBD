# Tareas-SBD
Tareas de Sistemas de Big Data

#### Andres Leo Santiago

## Práctica 1 UT1
### 1.Comprender el problema

**1.¿Quién utilizará estos datos?**

Los datos los utilizará el ayuntamiento

**2.¿Qué decisiones se pueden tomar con ellos?**

Se pueden tomar cualquier medida restrictiva, como por ejemplo, con el sensor de temperatura, si hace mucha calor, realizar una recomendación en el bando para que las personas se protejan del calor. Otro ejemplo sería, si el sensor de contaminación registra un nivel demasiado alto, se podría poner esa zona en cuarentena o cerrada para los habitantes, aparte de recomendar usar mascarilla o alejarse de la zona.

**3.¿Qué diferencia hay entre una alerta inmediata y un informe histórico?**

Una alerta inmediata viene dada por un registro en el momento, es decir, u sensor recoge un dato que puede ser preocupante y se realiza una alerta en ese preciso momento. Un informe histórico es la recaudación de datos desde que empezó a funcionar el sensor.

### 2. Analizar cobertura y calidad

**1.Identifica dos problemas de calidad y explica sus consecuencias.**

Unidades incorrectas, si los grados medidos no están en la unidad adecuada puede llevar a un problema, por ejemplo, si la temperatura es 30ºC pero el sensor lo marca en Farenheit, aparecería 86, lo cual sería demasiada temperatura si fuese en grados Celsius.

Lecturas incorrectas, si tenemos un sensor que muestra la misma hora y la misma temperatura durante dos horas, el trabajo de ese sensor no está sirviendo para nada.

**2.Indica qué distrito necesita mayor atención y justifica tu respuesta.**

El distrito 04 Sur Industrial necesita mayor atención porque es donde más número de habitantes tenemos y donde el número de sensores por habitante es menor, entonces deberiamos de tener cuidado con el funcionamiento de los sensores.

**3.Elige una anomalía y explica si lo corregirías,la marcaría como dudosa o la excluirías.**

Tenemos valores extremos, los cuales se salen de su rango físico como es PM10 negativo. Habría que corregirlo porque estos datos no sirven para nada.

### 3. Comparar arquitecturas

| Criterio | Batch |Streaming
| --- | --- | --- |
| Rapidez para generar alertas | Minutos u horas | Procesa eventos al llegar
| Coste y complejidad | Menores | Mayores 
| Informes históricos | Muy adecuado | Adecuado, con más complejidad
| Picos de datos | Procesa datos por lotes | Procesa eventos al llegar


### 4. Elaborar una recomendación

Analizando los datos recogidos en el dossier de datos de los sensores, el riesgo mas urgente está ubicado en la zona 04 Sur Industrial, donde no hay muchos sensores y la cantidad de personas que viven en ese distrito es muy alta, es decir, esto puede conllevar a un aumento de contaminación en ese distrito.

Se recomienda realizar un informe histórico de los datos de los sensores, para poder identificar los datos que pueden ser problemáticos, y luego tomar medidas para prevenir que estos datos se vuelvan a generar. Si los datos son problemáticos, se pueden realizar un prohibición de vehículos que expulsen una cantidad alta de PM10 en ese distrito. Además de concienciar a las personas que viven allí para que usen el transporte público en lugar de coches.

Las razones principales para la prohibición de vehículos son: 
1. La cantidad de PM10 en ese distrito que es alta.
2. El número de personas que residen allí.

Uno de los problemas que seguiría pendiente a solucionar es la cantidad de datos que recogen los sensores de manera correcta, ya que hay sensores que han registrado datos incorrectos, como por ejemplo, el sensor de temperatura al usar unidades diferentes, o los sensores que no han transmitido datos durante 30 minutos.

Para proteger la privacidad de los datos de los sensores y su ubicación, en los informes históricos que se realicen, se recomienda que no se incluya las coordenadas precisas de cada sensor, sino que se incluya el área al que pertenece y esté identificado con un código de distrito y un código de sensor. Aunque si que se recomienda añadir los datos de hora y fecha para que el informe sea lo más detallado y preciso posible, y ayude a adoptar las medidas necesarias para prevenir que los datos se vuelvan a generar.