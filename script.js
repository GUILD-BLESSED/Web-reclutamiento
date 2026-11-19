const formulario = document.getElementById('formularioGuild');
const statusMsg = document.getElementById('statusMessage');

function mostrarMensaje(texto, tipo) {
    statusMsg.textContent = texto;
    statusMsg.className = tipo;
    statusMsg.classList.remove('hidden');
}

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // URL de tu servidor backend / proxy (ej: http://localhost:3000/api/enviar-postulacion)
    const backendUrl = 'http://localhost:3000/api/enviar-postulacion'; 

    // Captura de datos del formulario[span_1](start_span)[span_1](end_span)
    const personaje = document.getElementById('personaje').value.trim();
    const email = document.getElementById('email').value.trim();
    const clase = document.getElementById('clase').value;
    const resets = document.getElementById('resets').value;
    const masterLvl = document.getElementById('masterLvl').value;
    const equipamiento = document.getElementById('equipamiento').value;
    const huntLvl = document.getElementById('huntLvl').value;
    const telefono = document.getElementById('telefono').value.trim();
    const guildAnterior = document.getElementById('guildAnterior').value.trim() || 'Ninguna / No especifica';
    const pjBattle = document.getElementById('pjBattle').value.trim() || 'No';

    // Validaciones[span_2](start_span)[span_2](end_span)
    if (!clase || !equipamiento) {
        mostrarMensaje('Por favor, selecciona tu clase y equipamiento.', 'error');
        return;
    }

    if (personaje.length < 3) {
        mostrarMensaje('El nombre del personaje debe tener al menos 3 caracteres.', 'error');
        return;
    }

    // Validación básica de formato de correo[span_3](start_span)[span_3](end_span)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        mostrarMensaje('Por favor, ingresa un correo electrónico válido.', 'error');
        return;
    }

    // Objeto con los datos que se enviarán al servidor backend[span_4](start_span)[span_4](end_span)
    const payload = {
        personaje,
        email,
        clase,
        resets,
        masterLvl,
        equipamiento,
        huntLvl,
        telefono,
        guildAnterior,
        pjBattle
    };

    mostrarMensaje('Enviando registro...', 'success');

    try {
        const res = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const resultado = await res.json();

        if (res.ok && resultado.success) {
            mostrarMensaje('¡Postulación enviada con éxito! Un administrador te contactará.', 'success');
            formulario.reset();
        } else {
            throw new Error(resultado.message || 'Respuesta fallida del servidor');
        }
    } catch (err) {
        console.error('Error al enviar:', err);
        mostrarMensaje('Error al conectar con el servidor de envío. Asegúrate de que el backend esté activo.', 'error');
    }
});
