
// para guardar las preguntas que recibimos
var currentExamQuestions = [];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar el examen en cuanto la página esté lista
  loadExam();

  // 2. Configurar el listener para el formulario
  const examForm = document.getElementById('examForm');
  examForm.addEventListener('submit', handleExamSubmit);
});

/**
 * Función para CARGAR las preguntas del examen
 */
async function loadExam() {
  const token = localStorage.getItem('token');          // aqui se recupera el token tmb
  const userJson = localStorage.getItem('user');
  
  // --- Validaciones iniciales ---
  if (!token || !userJson) {
    Swal.fire('Error', 'No has iniciado sesión.', 'error')
      .then(() => window.location.href = 'login.html');
    return;
  }
  
  try {
    
    
    const user = JSON.parse(userJson);
    if (!user.haPagado) {
      Swal.fire('Error', 'No has pagado el examen.', 'error')
        .then(() => window.location.href = 'certificaciones.html');
      return;
    }
    debugger;
    // Rellenar info del header del examen 
    document.getElementById('exam-user').textContent = `Usuario: ${user.nombreCompleto}`;
    document.getElementById('exam-date').textContent = `Fecha: ${new Date().toLocaleDateString()}`;

  } catch (e) {
    debugger;
    Swal.fire('Error', 'Sesión inválida. Inicia sesión de nuevo.', 'error')
      .then(() => window.location.href = 'login.html');
    return;
  }

  // --- Petición al Backend para iniciar el examen ---
  try {
    debugger;
    const response = await fetch('http://localhost:3000/api/exams/start', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    debugger;
    if (!response.ok) {
      // Error (ej. ya hizo el exameno no pago )
      Swal.fire({
        title: 'Error al Cargar',
        text: data.message,
        icon: 'error'
      }).then(() => {
        // Lo mandamos de vuelta a las certificaciones
        window.location.href = 'certificaciones.html';
      });
      return;
    }
    debugger
    // ¡Éxito! Recibimos las 8 preguntas
    currentExamQuestions = data; // Guardamos las preguntas globalmente
    renderQuestions(data); // Llamamos a la función que las dibuja

  } catch (error) {
    debugger;
    console.error('Error de red al cargar examen:', error);
    Swal.fire('Error de Red', 'No se pudo conectar con el servidor.', 'error');
  }
}

/**
 * Función para "dibujar" las preguntas en el HTML
 */
function renderQuestions(questions) {
  const container = document.getElementById('questions-container');
  container.innerHTML = ''; // Limpiar el "Cargando..."

  questions.forEach((question, index) => {
    
    // Contenedor para las opciones de esta pregunta
    let optionsHtml = '';
    question.opciones.forEach(opcion => {
      optionsHtml += `
        <label class="option-label">
          <input type="radio" name="question-${question.id}" value="${opcion}">
          ${opcion}
        </label>
      `;
    });

    // Crear el bloque completo de la pregunta
    const questionBlock = document.createElement('article');
    questionBlock.className = 'question-block';
    // Esta es la línea que probablemente tenía el error
    questionBlock.innerHTML = `
      <h3>${index + 1}. ${question.pregunta}</h3>
      <div class="options-container" role="radiogroup">
        ${optionsHtml}
      </div>
    `;
    
    container.appendChild(questionBlock);
  });
}

/**
 * Función para MANEJAR EL ENVÍO del examen
 */
async function handleExamSubmit(event) {
  event.preventDefault(); // Evitar que el formulario se envíe solo

  // Confirmar envío
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "Una vez enviado, no podrás cambiar tus respuestas.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, ¡enviar!',
    cancelButtonText: 'Cancelar'
  });

  if (!result.isConfirmed) {
    return; // El usuario canceló
  }

  // --- Recolectar respuestas ---
  const answers = [];
  let allAnswered = true;

  for (const question of currentExamQuestions) {
    const selector = `input[name="question-${question.id}"]:checked`;
    const selectedOption = document.querySelector(selector);

    if (selectedOption) {
      answers.push({
        preguntaId: question.id,
        respuestaTexto: selectedOption.value
      });
    } else {
      allAnswered = false; // Marcamos si faltó una
    }
  }

  if (!allAnswered) {
    Swal.fire('Respuestas Faltantes', 'Debes contestar todas las preguntas.', 'error');
    return;
  }
  
  // --- Enviar respuestas al Backend ---
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:3000/api/exams/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ answers: answers })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message);
    }

    // --- Mostrar Resultado Final ---
    showFinalResult(data);

  } catch (error) {
    console.error('Error al enviar examen:', error);
    Swal.fire('Error', `No se pudo enviar el examen: ${error.message}`, 'error');
  }
}

/**
 * Función para mostrar el resultado (Aprobado/Reprobado)
 */
function showFinalResult(result) {
  // Ocultar el formulario del examen
  document.getElementById('examForm').classList.add('hidden');
  
  const resultContainer = document.getElementById('result-container');
  resultContainer.classList.remove('hidden');

  let pdfButtonHtml = '';

  if (result.aprobo) {
    debugger
    resultContainer.classList.add('success');
    resultContainer.innerHTML = `
      <h2>¡Felicidades, has APROBADO!</h2>
      <p>Tu calificación final es: <strong>${result.calificacion}%</strong></p>
      <p>(${(result.respuestasCorrectas)} de 8 respuestas correctas)</p>
      <button id="downloadPdfButton">Descargar Certificado PDF</button> `;
    
    // Añadir el listener para el botón de descarga
    document.getElementById('downloadPdfButton').addEventListener('click', downloadCertificate);
    
  } else {
    debugger
    resultContainer.classList.add('fail');
    resultContainer.innerHTML = `
      <h2>Lo sentimos, NO has aprobado.</h2>
      <p>Tu calificación final es: <strong>${result.calificacion}%</strong></p>
      <p>(${(result.respuestasCorrectas)} de 8 respuestas correctas)</p>
      <p>Se requería 75% para aprobar.</p>
    `;
  }
}

/**
 * Función para descargar el PDF (requiere token)
 */
async function downloadCertificate() {
  const token = localStorage.getItem('token');
  
  Swal.fire({
    title: 'Generando PDF...',
    text: 'Por favor espera.',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await fetch('http://localhost:3000/api/certs/download', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error del servidor');
    }

    // Convertir la respuesta en un "blob" (un archivo binario)
    const blob = await response.blob();
    
    // Crear una URL temporal en el navegador para ese archivo
    const url = window.URL.createObjectURL(blob);
    
    // Crear un enlace <a> fantasma para iniciar la descarga
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'Certificado-WebDeveloper.pdf'; // Nombre del archivo
    document.body.appendChild(a);
    
    a.click(); // Simular clic
    
    // Limpiar
    window.URL.revokeObjectURL(url);
    a.remove();
    
    Swal.close(); // Cerrar el "Cargando..."

  } catch (error) {
    console.error('Error al descargar PDF:', error);
    Swal.fire('Error', `No se pudo descargar el PDF: ${error.message}`, 'error');
  }
}