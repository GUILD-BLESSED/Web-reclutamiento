const formulario = document.getElementById('formularioGuild');
const statusMsg = document.getElementById('statusMessage');

function mostrarMensaje(texto, tipo) {
    statusMsg.textContent = texto;
    statusMsg.className = tipo;
    statusMsg.classList.remove('hidden');
}

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // PEGA TU WEBHOOK DE DISCORD AQUÍ ABAJO
    const webhookUrl = 'https://discord.com/api/webhooks/1545114077154770944/IPz0DjUvvLCTQLpGJN_7BWXAlfIa1BA1rn0AsMUok6Aihp4RL0JLrcMDcYT1lzfKMSNb'; 

    // Captura de datos del formulario incluyendo el país
    const personaje = document.getElementById('personaje').value.trim();
    const email = document.getElementById('email').value.trim();
    const pais = document.getElementById('pais').value; // <--- CAPTURA PAÍS
    const clase = document.getElementById('clase').value;
    const resets = document.getElementById('resets').value;
    const masterLvl = document.getElementById('masterLvl').value;
    const equipamiento = document.getElementById('equipamiento').value;
    const huntLvl = document.getElementById('huntLvl').value;
    const telefono = document.getElementById('telefono').value.trim();
    const guildAnterior = document.getElementById('guildAnterior').value.trim() || 'Ninguna / No especifica';
    const pjBattle = document.getElementById('pjBattle').value.trim() || 'No';

    // Validaciones
    if (!clase || !equipamiento || !pais) {
        mostrarMensaje('Por favor, completa todos los campos obligatorios.', 'error');
        return;
    }

    if (personaje.length < 3) {
        mostrarMensaje('El nombre del personaje debe tener al menos 3 caracteres.', 'error');
        return;
    }

    // Validación básica de formato de correo
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        mostrarMensaje('Por favor, ingresa un correo electrónico válido.', 'error');
        return;
    }

    // Armamos la tarjeta (Embed) estructurada para Discord con el campo País
    const payload = {
        embeds: [{
            title: "⚔️ Nueva Postulación: Guild BLESSED",
            color: 0x00d4ff,
            fields: [
                { name: "👤 Personaje", value: personaje, inline: true },
                { name: "📧 Correo", value: email, inline: true },
                { name: "🌍 País", value: pais, inline: true },
                { name: "📱 WhatsApp", value: telefono, inline: true },
                { name: "🛡️ Clase", value: clase, inline: true },
                { name: "🔄 Resets", value: resets.toString(), inline: true },
                { name: "🔮 Nivel Master", value: masterLvl.toString(), inline: true },
                { name: "🗡️ Set", value: equipamiento, inline: true },
                { name: "🏹 Nivel Hunt", value: huntLvl.toString(), inline: true },
                { name: "🚩 Última Guild", value: guildAnterior, inline: false },
                { name: "⚔️ PJ Battle", value: pjBattle, inline: false }
            ],
            footer: { 
                text: "Bricourt Networks | Sistema de Registro MEGAMU" 
            },
            timestamp: new Date().toISOString()
        }]
    };

    mostrarMensaje('Enviando registro...', 'success');

    try {
        const res = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            mostrarMensaje('¡Postulación enviada con éxito! Un administrador te contactará.', 'success');
            formulario.reset();
        } else {
            throw new Error('Respuesta fallida del servidor');
        }
    } catch (err) {
        console.error('Error al enviar:', err);
        mostrarMensaje('Error al enviar la aplicación. Verifica la conexión o el Webhook.', 'error');
    }
});
