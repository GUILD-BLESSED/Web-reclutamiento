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
    const webhookUrl = 'https://discord.com/api/webhooks/1536988431509495921/ZSq7hSUTawa3z_-yujh61wGmjNO1kpoO7UgE3rCMWBRfcSB7Zy44RGyusR-Ry_R44yHA'; 

    // Captura de datos del formulario
    const personaje = document.getElementById('personaje').value.trim();
    const clase = document.getElementById('clase').value;
    const resets = document.getElementById('resets').value;
    const masterLvl = document.getElementById('masterLvl').value;
    const equipamiento = document.getElementById('equipamiento').value;
    const huntLvl = document.getElementById('huntLvl').value;
    const guildAnterior = document.getElementById('guildAnterior').value.trim() || 'Ninguna / No especifica';
    const pjBattle = document.getElementById('pjBattle').value.trim() || 'No';
    const telefono = document.getElementById('telefono').value.trim();

    // Validaciones básicas
    if (!clase || !equipamiento) {
        mostrarMensaje('Por favor, selecciona tu clase y equipamiento.', 'error');
        return;
    }

    if (personaje.length < 3) {
        mostrarMensaje('El nombre del personaje debe tener al menos 3 caracteres.', 'error');
        return;
    }

    // Armamos la tarjeta (Embed) estructurada para Discord
    const payload = {
        embeds: [{
            title: "⚔️ Nueva Postulación: Guild BLESSED",
            color: 0x00d4ff, // Azul neón estilo MegaMu
            fields: [
                { name: "👤 Personaje", value: personaje, inline: true },
                { name: "🛡️ Raza / Clase", value: clase, inline: true },
                { name: "🔄 Resets", value: resets.toString(), inline: true },
                { name: "🔮 Nivel Master", value: masterLvl.toString(), inline: true },
                { name: "🗡️ Set / Equipamiento", value: equipamiento, inline: true },
                { name: "🏹 Nivel Hunt", value: huntLvl.toString(), inline: true },
                { name: "🚩 Última Guild", value: guildAnterior, inline: false },
                { name: "⚔️ PJ Battle", value: pjBattle, inline: false },
                { name: "📱 Teléfono / WhatsApp", value: telefono, inline: false }
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
