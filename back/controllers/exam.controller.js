
const users = require('../data/users.js');
const questions = require('../data/questions.js');

// ---  Aleatorizar un Arreglo  ---
// La usaremos para aleatorizar tanto las preguntas como las opciones
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// --- Controlador para INICIAR el examen ---
const startExam = (req, res) => {
  // 1. Identificar al usuario
  // Gracias al middleware 'authRequired', ya tenemos 'req.userId'
  const userAccount = req.userId;
  const user = users.find(u => u.cuenta === userAccount);

    // ----------Atencion aqui ----------------- 
  // 2. Validar condiciones para iniciar el examen
  if (!user.haPagado) {
    return res.status(403).json({ message: "Acceso denegado. Debes pagar el examen primero." }); 
  }
  if (user.intentoRealizado) {
    return res.status(403).json({ message: "El examen solo se puede aplicar una vez." }); 
  }

  // 3. Preparar el examen
  // a. Clonamos el banco de preguntas para no modificar el original
  let examQuestions = [...questions];

  // b. Aleatorizamos el banco de preguntas
  examQuestions = shuffleArray(examQuestions);                                            // Aqui esta

  // c. Tomamos las primeras 8 preguntas
  examQuestions = examQuestions.slice(0, 8); 

    // d. Preparamos las preguntas para el front:

    let preparedQuestions = [];

    for(let i=0; i<examQuestions.length; i++){
    let q = examQuestions[i];               // Pregunta actual

    // Crear copia de las opciones
    let options = [];
    for(let j=0; j<q.opciones.length; j++){
        options.push(q.opciones[j]);
    }

    // Mezclar las opciones
    options = shuffleArray(options);

    // Agregar la pregunta al nuevo arreglo
    preparedQuestions.push({
        id: q.id,
        pregunta: q.pregunta,
        opciones: options
    });
    }

  // 4. Respondemos al frontend con las 8 preguntas listas
  res.status(200).json(preparedQuestions);                            // Aqui se envian las preguntas al front
};


// --- Controlador para CALIFICAR el examen ---
const submitExam = (req, res) => {
  // 1. Identificar al usuario
  const userAccount = req.userId;
  const user = users.find(u => u.cuenta === userAccount);

  // 2. Obtener las respuestas del usuario desde el body
  // Esperamos un formato: [ { preguntaId: 1, respuestaTexto: "const" }, ... ]
  const userAnswers = req.body.answers;

  if (!userAnswers || userAnswers.length !== 8) { // verifica la llegada correcta de las 8 respuestas
    return res.status(400).json({ message: "Se deben enviar 8 respuestas." });
  }

  // 3. Calificar las respuestas
  let correctAnswers = 0;
  
  userAnswers.forEach(answer => {

    // a. Encontrar la pregunta original en nuestro banco de datos
    let originalQuestion = null;
    for(let i=0; i<questions.length; i++){
    if(questions[i].id === answer.preguntaId){
        originalQuestion = questions[i];
        break;
    }
    }

    if (originalQuestion) {
      // b. Obtener el texto de la respuesta correcta
      const correctAnswerText = originalQuestion.opciones[originalQuestion.indiceCorrecto];
      
      // c. Comparar
      if (answer.respuestaTexto === correctAnswerText) {
        correctAnswers++;
      }
    }
  });

  // 4. Calcular resultado
  const score = (correctAnswers / 8) * 100;
  
  // Asumimos que se necesita un 75 para aprobar 
  const minScore = 75; 
  const passed = score >= minScore;

  // 5. Actualizar al usuario en memoria
  user.intentoRealizado = true;
  user.calificacion = score; // Guardamos su calificación
  user.aprobo = passed; // Guardamos si aprobó

  console.log(`Resultado del examen para ${user.cuenta}: ${score}%, Aprobó: ${passed}`);

  // 6. Responder al frontend con el resultado
  res.status(200).json({
    message: "Examen calificado.",
    calificacion: score,
    aprobo: passed,
    respuestasCorrectas: correctAnswers
  });
};


module.exports = {
  startExam,
  submitExam
};