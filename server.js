const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de seguridad y middlewares
app.use(express.json());
app.use(cors()); // Permite que tu página web se comunique con este servidor

// PEGA TU WEBHOOK REAL DE DISCORD AQUÍ (Se mantiene oculto del navegador)
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1536988431509495921/ZSq7hSUTawa3z_-yujh61wGmjNO1kpoO7UgE3rCMWBRfcSB7Zy44RGyusR-Ry_R44yHA';

app.post('/api/enviar-postulacion', async (req, res) => {
    try {
        const datosFormulario = req.body;

        // Armamos la tarjeta (Embed) estructurada para Discord desde el servidor
        const payload = {
            embeds: [{
                title: "⚔️ Nueva Postulación: Guild BLESSED",
                color: 0x00d4ff,
                fields: [
                    { name: "👤 Personaje", value: datosFormulario.personaje, inline: true },
                    { name: "📧 Correo Electrónico", value: datosFormulario.email, inline: true },
                    { name: "🛡️ Raza / Clase", value: datosFormulario.clase, inline: true },
                    { name: "🔄 Resets", value: String(datosFormulario.resets), inline: true },
                    { name: "🔮 Nivel Master", value: String(datosFormulario.masterLvl), inline: true },
                    { name: "🗡️ Set / Equipamiento", value: datosFormulario.equipamiento, inline: true },
                    { name: "🏹 Nivel Hunt", value: String(datosFormulario.huntLvl), inline: true },
                    { name: "📱 Teléfono / WhatsApp", value: datosFormulario.telefono, inline: true },
                    { name: "🚩 Última Guild", value: datosFormulario.guildAnterior || 'Ninguna', inline: false },
                    { name: "⚔️ PJ Battle", value: datosFormulario.pjBattle || 'No', inline: false }
                ],
                footer: { 
                    text: "Bricourt Networks | Sistema de Registro MEGAMU" 
                },
                timestamp: new Date().toISOString()
            }]
        };

        // Reenvía la solicitud hacia Discord de servidor a servidor (evita CORS)
        const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (discordResponse.ok) {
            return res.status(200).json({ success: true, message: 'Enviado correctamente a Discord' });
        } else {
            const errorText = await discordResponse.text();
            console.error('Error de Discord:', errorText);
            return res.status(500).json({ success: false, message: 'Discord rechazó los datos.' });
        }

    } catch (error) {
        console.error('Error en el servidor proxy:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor proxy corriendo en el puerto ${PORT}`);
});
