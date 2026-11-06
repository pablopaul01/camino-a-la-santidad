# Caminos de santidad — Plan del juego

Fecha de actualización: 6 de noviembre de 2026.
Documento de referencia para orientar el desarrollo gradual.
Estado: prototipo técnico y primera escena de apertura; no hay una campaña completa implementada.

## 1. Visión

Crear una aventura narrativa en la que el jugador viva, en primera persona, los episodios decisivos de la vida de santos de la Iglesia católica y aprenda a través de lo que hace, observa y escucha.

Cada campaña seguirá un recorrido vital, no una colección de minijuegos desconectados. La campaña inicial será la de san Pablo: comenzará con Saulo antes de su conversión y llegará a su último testimonio en Roma.

La aspiración es producir código, gráficos, animaciones, sonidos, música y voces con asistencia de IA. Esto no sustituye la dirección creativa, la investigación, la revisión histórica y católica ni las pruebas con jugadores.

El nombre del juego sigue siendo provisional.

## 2. Experiencia acordada

- Aventura 3D en primera persona: el jugador mira desde los ojos del protagonista.
- Prioridad en movimiento, exploración, encuentros y puesta en escena cinematográfica.
- Sin combate como mecánica central.
- Estética sobria e inmersiva, no infantil.
- Escenarios pequeños y recorribles antes que un mundo abierto de gran escala.
- Interacciones vinculadas a la historia: escuchar, observar, conversar, viajar, colaborar y afrontar situaciones.
- Los hechos históricos centrales no cambian por una elección del jugador.
- Las decisiones pueden modificar la aproximación a una situación, el orden de exploración y la información descubierta.
- Desarrollo paso a paso: terminar y probar una escena antes de ampliar la campaña.

God of War 3 fue una referencia de movimiento, exploración y dirección cinematográfica, no de combate ni de presupuesto AAA.
Halloween.dev aportó una referencia técnica de exploración 3D web, interacciones y transiciones de cámara; no vamos a copiar sus recursos.

## 3. Tecnología y estructura

| Área | Decisión actual |
| --- | --- |
| Aplicación y páginas | Astro |
| Escenario 3D | Three.js |
| Lógica del juego | TypeScript |
| Gestor de paquetes | pnpm |
| Distribución inicial | Navegador web |
| Interfaz | Componentes Astro y estilos CSS |
| Verificación | Pruebas automatizadas, chequeo de tipos, build y pruebas manuales |

Usar Astro no elimina HTML y CSS: organiza los componentes y compila la aplicación. Three.js sigue siendo responsable del mundo 3D.

Versiones actuales: Astro 5.18.2, Three.js 0.170.0 y TypeScript 5.8.3. Astro 5 se eligió por compatibilidad con el Node instalado durante la migración, no como una elección definitiva para toda la vida del proyecto.

Comandos desde la raíz:

~~~sh
pnpm install
pnpm dev
pnpm test
pnpm check
pnpm build
pnpm preview
~~~

La dirección habitual de desarrollo es http://localhost:4321.

## 4. Controles y comportamiento básico

### Escritorio

- WASD o flechas: desplazamiento.
- Mouse: orientación de cámara.
- Un clic en Entrar o Continuar solicita la captura del mouse.
- Con captura activa, el cursor se oculta y se puede girar sin límite horizontal.
- E: interacción con el objeto o personaje señalado.
- Esc: pausa, libera el mouse y recupera el cursor.

Si el navegador integrado rechaza la captura, se informa al jugador. No se presenta un cursor limitado por los bordes como si fuera el control definitivo. La captura real todavía debe validarse en los navegadores y equipos objetivo.

### Pantalla táctil

- Botones de dirección para caminar.
- Arrastre para mirar.
- Botón visible para interactuar.

La equivalencia entre teclado y táctil forma parte de la aceptación. Las pruebas en un celular físico siguen pendientes.

### Colisiones

Las paredes y los objetos sólidos deben bloquear al jugador: mesas, cajas, puertas cerradas y personajes. Los límites físicos deben corresponder a la geometría visible, dejando espacio para aproximarse e interactuar. Los objetos decorativos elevados no deben bloquear el suelo.

## 5. Campaña inicial: la vida de Pablo

Se representarán episodios decisivos unidos por transiciones claras; no cada año ni cada ciudad de su vida.

### Acto I — Saulo antes del encuentro

**Propósito:** conocer sus convicciones, su participación en la persecución y sus consecuencias.

Recorrido previsto:
1. Explorar un patio de Jerusalén.
2. Escuchar un encuentro que muestre cómo la persecución afecta a las personas.
3. Introducir el contexto de Esteban con una puesta en escena sobria.
4. Comprender la autorización y el propósito del viaje a Damasco.
5. Salir hacia el camino.

Acciones: caminar, observar, escuchar, conversar e inspeccionar el contexto del viaje.

No se darán puntos por perseguir, arrestar o dañar cristianos. Tampoco se convertirá la muerte de Esteban en una ejecución controlada por el jugador.

Anclajes de investigación: Hechos 7,58–8,3; 9,1–2; Gálatas 1,13–14.

### Acto II — El camino a Damasco

**Propósito:** vivir el encuentro con Cristo y la necesidad de aceptar ayuda.

Recorrido previsto:
1. Caminar hacia Damasco.
2. Experimentar el encuentro mediante una secuencia dirigida.
3. Afrontar la ceguera y entrar en la ciudad con ayuda.
4. Conocer a Ananías.
5. Presentar la recuperación de la vista y el bautismo según las fuentes.

La secuencia no será una prueba para «ganar» la conversión ni un poder activado por el jugador. Debe seguir siendo comprensible sin sonido y evitar destellos intensos innecesarios. El tratamiento concreto de la ceguera requiere diseño y pruebas de accesibilidad.

Anclajes: Hechos 9,3–19; comparación pendiente con Hechos 22,6–16 y 26,12–18.

### Acto III — Una vida que cambia

**Propósito:** mostrar que la transformación de Saulo no elimina de inmediato el peligro ni la desconfianza.

Recorrido previsto:
1. Convivir con los discípulos y presentar sus primeros pasos como cristiano.
2. Mostrar las reacciones a su predicación en Damasco.
3. Preparar y realizar la huida nocturna en una canasta.
4. Llegar a Jerusalén.
5. Encontrar la desconfianza de los discípulos y la ayuda de Bernabé.

El patio y el callejón de Damasco existentes son una prueba técnica de parte de este acto. El descenso en canasta todavía no está integrado en el juego 3D.

Anclajes: Hechos 9,19–30; comparación pendiente con Gálatas 1,15–24 y 2 Corintios 11,32–33. No inventar una cronología exacta para resolver las diferencias entre fuentes.

### Acto IV — La misión

**Propósito:** aprender cómo Pablo anuncia su fe, forma comunidades y atraviesa conflictos y dificultades acompañado por otros.

Episodios candidatos:
- Antioquía y el envío.
- Filipos: encuentros, comunidad y prisión.
- Atenas: escuchar el contexto y dirigirse a una audiencia.
- Trabajo y vida comunitaria en Corinto.
- Una despedida que permita mostrar los vínculos construidos.

Son candidatos, no una selección definitiva. Se investigarán antes de convertirlos en capítulos.

Acciones posibles: preparar un viaje, explorar una casa o ciudad, escuchar, colaborar y afrontar una situación de encierro. No repetir la búsqueda de una carta o una puerta en todas las misiones.

Anclajes para investigar: Hechos 13; 15; 16; 17,16–34; 18,1–4; 20 y pasajes pertinentes de las cartas.

### Acto V — Prisión y desenlace

**Propósito:** llegar a Roma y acompañar el final de su testimonio, distinguiendo fuentes y tradición.

Recorrido previsto:
1. Arresto, defensa y apelación.
2. Viaje por mar y llegada a Roma.
3. Vida como prisionero que recibe visitantes y anuncia su fe.
4. Epílogo identificado explícitamente como tradición cristiana sobre su martirio.
5. Cierre que permita recordar el recorrido y consultar las fuentes.

Hechos no relata la muerte de Pablo. No se presentará su martirio como una escena narrada por ese libro ni se darán por seguros una fecha, unos diálogos o unos detalles no establecidos.

Anclajes para investigar: Hechos 21–28 y testimonios de la tradición sobre el martirio.

## 6. Reglas históricas, narrativas y pastorales

Cada episodio tendrá una ficha con:
- Fuente y pasaje.
- Hechos conservados.
- Recreaciones necesarias para jugar.
- Dudas o diferencias de cronología.
- Estado de revisión histórica y católica.

Distinguir siempre:
1. Lo narrado en las fuentes bíblicas.
2. Lo transmitido por la tradición cristiana.
3. Lo recreado: diálogos, vecinos, arquitectura, recorridos y detalles ambientales.

No presentar frases inventadas como citas ni atribuir al santo pensamientos interiores documentados sin evidencia. No convertir milagros en habilidades del jugador. No identificar a un pueblo o a la identidad judía en conjunto como antagonista.

No afirmar que Saulo cambia su nombre a Pablo en el momento de la conversión. No añadir un caballo como hecho del relato sin respaldo. Verificar los derechos antes de reproducir una traducción bíblica moderna.

La fidelidad narrativa no se valida únicamente con pruebas de código: requiere revisión humana.

## 7. Producción audiovisual con IA

### Dirección artística

1. Aprobar una referencia visual para la época, los escenarios y la paleta.
2. Definir hojas de referencia para los personajes recurrentes.
3. Generar variaciones y animaciones coherentes con esas referencias.
4. Integrar y evaluar los recursos en el escenario real, no solo como imágenes aisladas.

En primera persona no se necesita el cuerpo visible de Pablo para desplazarse. Manos, reflejos o planos externos serían trabajo adicional, no parte del alcance inicial.

Las figuras geométricas actuales son un bloque de prueba, no la estética final.

### Optimización

- Dedicar detalle a las superficies que el jugador puede ver.
- Omitir caras ocultas solamente si el recorrido y los límites impiden descubrirlas.
- Mantener modelos, texturas, iluminación y audio dentro de presupuestos medidos.
- Revisar colisiones junto con cada recurso nuevo.
- Ajustar calidad para los dispositivos objetivo después de medir.
- No afirmar que algo está optimizado solo por tener pocos polígonos.

Actualmente se limita la densidad de píxeles del renderizado y no se usan mapas de sombras ni posprocesado costoso. No hay mediciones de rendimiento suficientes ni una eliminación sistemática de caras ocultas.

### Sonido, música y voces

Generar e integrar por separado ambiente, pasos, señales, voces y música. Mantener señales visuales equivalentes, controles de volumen y comprensión con el teléfono silenciado.

Registrar herramienta, procedencia y condiciones de uso por recurso. No se ha elegido todavía un proveedor definitivo para imágenes, música o voces.

## 8. Estado real del proyecto

### Implementado como prototipo

- Aplicación Astro con pnpm y Three.js.
- Vista en primera persona sin cuerpo visible del protagonista.
- Movimiento por teclado y controles táctiles.
- Captura de mouse solicitada antes de iniciar en escritorio.
- Pausa y reinicio.
- Colisiones de paredes y objetos sólidos.
- Interacciones por mirada y distancia.
- Apertura de Jerusalén en la ruta principal.
- Vecino provisional y encuentro con diálogo identificado como recreación.
- Prueba técnica de Damasco en /damasco.
- Secuencia de cámara y cierre del prototipo de Damasco.
- Pruebas de movimiento, colisiones, selección de objetos y ciclo de pausa/cinemática.

### Pendiente

- Completar la preparación del viaje del acto I.
- Implementar el camino y la conversión del acto II.
- Conectar capítulos y transiciones.
- Integrar el descenso 3D y completar el acto III.
- Investigar y construir los actos IV y V.
- Sustituir figuras provisionales por arte aprobado.
- Añadir animaciones, sonido, música y voces.
- Implementar guardado local por capítulos y comprobar recuperación y reinicio.
- Revisión histórica, pastoral y de derechos de los recursos.
- Pruebas con jugadores y dispositivos físicos.
- Medición de rendimiento y ajustes de accesibilidad.
- Preparar y autorizar la publicación.

No hay campaña completa, sistema de cuentas, servidor de partidas, audio final ni guardado persistente implementados.

## 9. Orden de trabajo: avanzar despacio

| Paso | Entrega pequeña | Cómo decidimos que está lista |
| --- | --- | --- |
| 1 | Patio y encuentro inicial de Jerusalén | El jugador se mueve, no atraviesa objetos y encuentra al vecino. |
| 2 | Ajustes de controles, interacción y lectura | No hay bloqueos y se entiende quién es Saulo en este momento. |
| 3 | Contexto y preparación del viaje | Se comprende por qué va a Damasco sin premiar la persecución. |
| 4 | Salida del capítulo y transición | El recorrido tiene un cierre claro y se puede reiniciar. |
| 5 | Camino a Damasco | Se valida un primer tramo antes de construir la conversión. |
| 6 | Encuentro, ceguera y Ananías | Fuente, puesta en escena y accesibilidad revisadas. |
| 7 | Integración de la vida nueva y la huida | Se conecta con lo anterior; la canasta deja de ser un minijuego aislado. |
| 8 | Episodios de misión | Se construye y prueba un episodio por vez. |
| 9 | Roma y epílogo | Se distingue con claridad el relato de Hechos de la tradición. |
| 10 | Pase de campaña completa | Continuidad, aprendizaje, controles, rendimiento y derechos revisados. |

El paso 1 existe como prototipo y sigue en ajustes; no se considera finalizado por tener código.
No avanzar automáticamente al paso siguiente si el usuario está probando o corrigiendo el actual.

## 10. Criterios de aceptación

Por escena:
- Objetivo entendible sin explicación de un desarrollador.
- Controles consistentes y colisiones coherentes.
- Interacciones alcanzables y sin bloqueos por el orden de exploración.
- Pausa, pérdida de foco, diálogos y reinicio recuperan el estado correcto.
- Fuentes y recreaciones distinguibles.
- Revisión de teclado, mouse y táctil.
- Pruebas automatizadas pertinentes, chequeo de tipos y build.
- Prueba manual del recorrido; no sustituirla por una prueba de lógica.

Para aprendizaje:
- El jugador puede explicar qué pasó y qué cambió en la vida del santo.
- Puede reconocer qué elementos fueron recreados.
- Quiere continuar por interés en la experiencia, no solo por leer una ficha.

La propuesta inicial consideraba adolescentes de 12 a 16 años y pruebas en un contexto parroquial. Se mantiene como público de referencia provisional; falta validarlo. Una prueba exploratoria con cinco jóvenes puede detectar problemas, no demostrar demanda comercial.

## 11. Futuras campañas

Después de validar la campaña y las herramientas con Pablo:
- San Agustín: su búsqueda y conversión, con las Confesiones como fuente central.
- Santo Tomás de Aquino: estudio, escucha y comprensión de argumentos.
- Padre Pío: episodios documentados de su vida y servicio.

Cada campaña requiere investigación propia y mecánicas adecuadas a esa vida. No se empezarán en paralelo ahora ni se fijó su orden definitivo.

## 12. Límites y decisiones abiertas

- No se compromete una fecha ni un presupuesto para la campaña completa.
- La estimación anterior de 60–80 horas correspondía al piloto 2D descartado como dirección principal; no sirve como presupuesto de esta aventura 3D.
- No está cerrado el número de capítulos ni su duración.
- La primera persona, Astro, Three.js y pnpm sí están acordados.
- El despliegue público, la monetización y el soporte nativo no están decididos.
- No se necesita añadir un backend para escribir o probar esta campaña.
- La carpeta legacy conserva prototipos y no forma parte del build. Su retirada queda pendiente de acordar una conservación adecuada en Git; este documento no autoriza borrarla.

## 13. Documentación y fuentes

Este archivo concentra el plan general y el estado del proyecto. El diseño anterior en ../docs/campaign-paul.md se conserva como antecedente y no refleja todos los avances posteriores.

Referencias de la primera revisión:
- [Hechos 7, USCCB](https://bible.usccb.org/bible/acts/7).
- [Hechos 9, USCCB](https://bible.usccb.org/bible/acts/9).
- [Benedicto XVI, 4 de febrero de 2009: martirio de san Pablo](https://www.vatican.va/content/benedict-xvi/es/audiences/2009/documents/hf_ben-xvi_aud_20090204.html).

Los restantes pasajes listados son anclajes para investigar capítulo por capítulo; no equivalen a una revisión completa ya realizada.

## Ajuste de diálogos e interfaz — 6 de noviembre de 2026

Los encuentros se presentan mediante globos tipo historieta, con intervenciones breves y avance con E o botón táctil. No reemplazar la conversación por una pantalla que exponga todo el contenido. Pausar conserva el punto de lectura. Las fuentes, el reinicio y los enlaces de navegación se consultan desde pausa/Esc, con cursor disponible. La barra de desarrollo de Astro no forma parte de la interfaz del jugador y queda desactivada.


## Avance de preparación del viaje — 6 de noviembre de 2026

El prototipo de Jerusalén permite escuchar al vecino y después examinar la autorización de viaje sobre la mesa. Ambos encuentros se presentan en intervenciones breves; el documento se identifica como reconstrucción y paráfrasis de Hechos 9,1–2, no como carta conservada. El recorrido se detiene después de comprender el propósito del viaje. La salida del patio y el camino a Damasco siguen pendientes.


## Partida de Jerusalén — 6 de noviembre de 2026

Después del vecino y la autorización, la puerta permite iniciar una transición dirigida de salida del capítulo. La transición se puede pausar y reiniciar desde Esc. El cierre indica expresamente que el camino y la conversión todavía no están implementados. No se presenta este corte como un nuevo nivel jugable.

## Primer tramo del camino jugable — 6 de noviembre de 2026

La partida de Jerusalén ahora carga /camino automáticamente. Esa ruta contiene un escenario exterior provisional con senda, formaciones de terreno, obstáculos sólidos y un refugio reconstruido. El jugador puede caminar y mirar libremente; llegar al refugio completa este tramo sin representar todavía la conversión. El recorrido reutiliza los controles existentes, permite pausa y reinicio, y conserva las opciones con cursor dentro del menú.

Verificación de esta entrega: 17 pruebas aprobadas, tipos sin errores y build de tres rutas. Recorrido hasta el refugio comprobado en navegador con entrada táctil emulada; eso no reemplaza la prueba en un celular físico ni la validación del mouse capturado en un navegador externo. Paisaje, arte, sonido y acompañantes siguen pendientes de producción final.

## Encuentro en el camino — 6 de noviembre de 2026

El final del tramo exterior ahora inicia automáticamente una secuencia dirigida: luz gradual sin destellos repetidos, descenso de cámara que representa la caída, tres intervenciones de la voz en globos y pérdida de la vista. E o el botón táctil avanzan las intervenciones; no activan el milagro ni permiten elegir otro desenlace.

Los textos se identifican como adaptación de Hechos 9,4–6, no como reproducción literal de una traducción. El entorno y el refugio siguen siendo recreaciones. No hay figura visible de Cristo, voz grabada ni acompañantes animados. La escena termina con un aviso claro de que Saulo no puede ver y necesita ayuda; Ananías y la entrada guiada en la ciudad siguen pendientes.

Fuente consultada: https://www.vatican.va/content/bibbia/es/nuovo-testamento/atti-degli-apostoli/atti-degli-apostoli/capitolo-9.index.html

Verificación: 19 pruebas, tipos y build aprobados. En navegador se completó el recorrido con entrada táctil emulada, se avanzaron los globos, se pausó y reanudó la segunda intervención y se observó el cierre. Emulación restaurada después de la prueba. No equivale a una prueba en un teléfono físico.


## Intervenciones del protagonista — 6 de noviembre de 2026

Las conversaciones alternan el interlocutor y Saulo: cada globo identifica al hablante. Las intervenciones del protagonista se presentan en una posición inferior y con color diferenciado, sin dibujar su cuerpo. El encuentro del camino incluye su pregunta «¿Quién eres, Señor?» entre la pregunta de la voz y su identificación, según Hechos 9,5. Las respuestas de Saulo al vecino de Jerusalén son recreaciones explícitas, no citas ni evidencia de sus pensamientos reales. El documento de autorización continúa identificado como documento y no como una persona hablando.
