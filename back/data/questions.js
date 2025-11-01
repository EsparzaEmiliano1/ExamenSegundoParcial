
// Banco de 16 preguntas para la certificación de JavaScript
const questions = [
  
  {
    id: 1,
    pregunta: "¿Cuál es la forma correcta de declarar una variable que no puede ser reasignada?",
    opciones: [
      "let",          // Puede ser reasignada
      "var",          // Puede ser reasignada, ámbito de función
      "const",        // ✅ CORRECTO: No puede ser reasignada
      "static"        // No existe en JavaScript para variables
    ],
    indiceCorrecto: 2 // const
  },
  {
    id: 2,
    pregunta: "¿Qué operador se utiliza para comparar tanto el valor como el tipo?",
    opciones: [
      "==",           // Compara solo valor (hace coerción de tipo)
      "=",            // Operador de asignación
      "===",          // ✅ CORRECTO: Compara valor Y tipo
      "!="            // Compara solo valor (desigualdad)
    ],
    indiceCorrecto: 2 // ===
  },
  {
    id: 3,
    pregunta: "El método `JSON.parse()` se utiliza para:",
    opciones: [
      "Convertir un objeto JS a una cadena JSON",  // Eso hace JSON.stringify()
      "Convertir una cadena JSON a un objeto JS",  // ✅ CORRECTO
      "Crear un nuevo objeto JSON",               // No existe esta funcionalidad
      "Formatear un archivo JSON"                 // No es para formatear
    ],
    indiceCorrecto: 1 // Convertir cadena JSON a objeto JS
  },
  {
    id: 4,
    pregunta: "¿Cuál de los siguientes es un método de arreglo que NO muta (cambia) el arreglo original?",
    opciones: [
      ".push()",      // ✅ MUTA: Agrega elementos al final
      ".pop()",       // ✅ MUTA: Elimina el último elemento
      ".splice()",    // ✅ MUTA: Agrega/elimina elementos
      ".map()"        // ✅ CORRECTO: NO muta, crea nuevo arreglo
    ],
    indiceCorrecto: 3 // .map()
  },
  // Nivel Intermedio
  {
    id: 5,
    pregunta: "¿Qué es el 'Hoisting' en JavaScript?",
    opciones: [
      "Un error que ocurre al declarar variables fuera de una función.",
      "El comportamiento de mover las declaraciones (variables y funciones) al inicio de su ámbito.", // ✅ CORRECTO
      "Una técnica para optimizar el rendimiento de los bucles.",
      "El proceso de 'elevar' un componente en la jerarquía del DOM."
    ],
    indiceCorrecto: 1 // Comportamiento de mover declaraciones al inicio
  },
  {
    id: 6,
    pregunta: "¿Qué retorna una 'Promise' en estado 'pending'?",
    opciones: [
      "Un valor resuelto",                          // Eso sería estado "fulfilled"
      "Un error (reason)",                          // Eso sería estado "rejected"
      "undefined",                                  // No retorna undefined
      "Un objeto que representa la eventual finalización (o falla) de la operación." // ✅ CORRECTO
    ],
    indiceCorrecto: 3 // Objeto que representa la operación pendiente
  },
  {
    id: 7,
    pregunta: "¿Cuál es el propósito de la palabra clave `async` antes de una función?",
    opciones: [
      "Hace que la función se ejecute en un hilo separado.", // JavaScript es single-threaded
      "Indica que la función siempre devolverá una 'Promise'.", // ✅ CORRECTO
      "Detiene la ejecución de todo el script hasta que la función termine.", // No, eso haría await
      "Permite usar 'await' en funciones regulares." // Es al revés: async permite usar await
    ],
    indiceCorrecto: 1 // Siempre devuelve una Promise
  },
  {
    id: 8,
    pregunta: "La desestructuración de arreglos (`[a, b] = [10, 20]`) permite:",
    opciones: [
      "Comparar dos arreglos.",                    // No es para comparar
      "Extraer valores de arreglos o propiedades de objetos en variables distintas.", // ✅ CORRECTO
      "Unir dos arreglos en uno solo.",            // Eso hace .concat()
      "Crear una copia superficial de un arreglo." // Eso hace [...arr]
    ],
    indiceCorrecto: 1 // Extraer valores en variables distintas
  },
  // Nivel Node.js
  {
    id: 9,
    pregunta: "¿Qué es 'npm'?",
    opciones: [
      "Node Package Manager: el gestor de paquetes por defecto de Node.js.", // ✅ CORRECTO
      "Node Process Manager: una herramienta para gestionar procesos de Node.", // Eso sería PM2
      "Network Project Module: un módulo para manejar peticiones de red.",   // No existe
      "New Project Maker: una plantilla para crear proyectos."               // No es su propósito
    ],
    indiceCorrecto: 0 // Node Package Manager
  },
  {
    id: 10,
    pregunta: "En Node.js, ¿qué hace el módulo `fs` (File System)?",
    opciones: [
      "Formatear strings y números.",              // No es para formatear
      "Interactuar con el sistema de archivos (leer, escribir archivos).", // ✅ CORRECTO
      "Crear servidores web.",                     // Eso hace el módulo http
      "Manejar peticiones 'fetch'."                // Fetch es del navegador
    ],
    indiceCorrecto: 1 // Interactuar con sistema de archivos
  },
  {
    id: 11,
    pregunta: "¿Qué objeto de Node.js se utiliza para exponer módulos y hacerlos disponibles para otros archivos?",
    opciones: [
      "require",          // Para importar módulos
      "module.exports",   // ✅ CORRECTO: Para exportar módulos
      "process",          // Para información del proceso
      "global"            // Objeto global de Node.js
    ],
    indiceCorrecto: 1 // module.exports
  },
  {
    id: 12,
    pregunta: "¿Qué es un 'middleware' en el contexto de Express.js?",
    opciones: [
      "Un software que se ejecuta en el cliente.", // Middleware es del lado del servidor
      "Una función que tiene acceso a los objetos 'request' (req) y 'response' (res), y la función 'next'.", // ✅ CORRECTO
      "La base de datos utilizada por Express.",   // No es una base de datos
      "Un motor de plantillas para renderizar HTML." // No necesariamente
    ],
    indiceCorrecto: 1 // Función con acceso a req, res y next
  },
  // Nivel Avanzado
  {
    id: 13,
    pregunta: "¿Cuál es la diferencia principal entre `localStorage` y `sessionStorage`?",
    opciones: [
      "localStorage es más rápido que sessionStorage.", // La velocidad es similar
      "localStorage persiste después de cerrar el navegador, sessionStorage se borra al cerrar la pestaña.", // ✅ CORRECTO
      "localStorage solo guarda strings, sessionStorage guarda objetos.", // Ambos guardan solo strings
      "No hay diferencia, son alias."                 // Hay diferencias importantes
    ],
    indiceCorrecto: 1 // localStorage persiste, sessionStorage no
  },
  {
    id: 14,
    pregunta: "¿Qué hace el método `Array.prototype.reduce()`?",
    opciones: [
      "Reduce el tamaño del arreglo eliminando elementos duplicados.", // Eso hace Set o filter
      "Aplica una función a un acumulador y a cada valor del arreglo (de izquierda a derecha) para reducirlo a un solo valor.", // ✅ CORRECTO
      "Filtra el arreglo basado en una condición.", // Eso hace filter
      "Revierte el orden de los elementos en un arreglo." // Eso hace reverse
    ],
    indiceCorrecto: 1 // Aplica función a acumulador y valores
  },
  {
    id: 15,
    pregunta: "Un 'Closure' (clausura) en JavaScript es:",
    opciones: [
      "El evento que se dispara al cerrar una ventana del navegador.", // Eso es el evento onunload
      "Una función que se auto-ejecuta inmediatamente después de ser definida.", // Eso es IIFE
      "Una función que tiene acceso a su propio ámbito, al ámbito de la función externa y al ámbito global.", // ✅ CORRECTO
      "Un error que 'cierra' la aplicación."       // No es un error
    ],
    indiceCorrecto: 2 // Función con acceso a múltiples ámbitos
  },
  {
    id: 16,
    pregunta: "¿Para qué se utiliza `try...catch` en JavaScript?",
    opciones: [
      "Para manejar errores de sintaxis durante la compilación.", // Los errores de sintaxis no se pueden capturar con try-catch
      "Para intentar ejecutar código y capturar errores de tiempo de ejecución sin detener el programa.", // ✅ CORRECTO
      "Para crear bucles condicionales.",          // Eso hacen for, while
      "Para validar formularios en el lado del cliente." // Se puede usar, pero no es su único propósito
    ],
    indiceCorrecto: 1 // Manejar errores en tiempo de ejecución
  }
];

module.exports = questions;