const { Boom } = require('@hapi/boom');
const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState } = require('@whiskeysockets/baileys');
const express = require('express');
const { body, validationResult } = require('express-validator');
const qrcode = require('qrcode');
const axios = require('axios');
const pino = require('pino');
const moment = require('moment');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());

let sock;
let qrCodeData;

const startWhatsApp = async () => {
    const { state, saveCreds } = await useMultiFileAuthState('auth');
    sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'silent' })
    });
    
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            qrCodeData = qr;
            io.emit('qr', qr);
        }
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== 401;
            if (shouldReconnect) startWhatsApp();
        }
    });
    
    sock.ev.on('creds.update', saveCreds);
};

app.get('/qr', async (req, res) => {
    if (qrCodeData) {
        const qrImage = await qrcode.toDataURL(qrCodeData);
        res.send(`<img src="${qrImage}" />`);
    } else {
        res.send('QR tidak tersedia');
    }
});

app.post('/send-message', [
    body('number').isMobilePhone(),
    body('message').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { number, message } = req.body;
    try {
        await sock.sendMessage(number + '@s.whatsapp.net', { text: message });
        res.json({ success: true, message: 'Pesan terkirim' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Gagal mengirim pesan' });
    }
});

server.listen(3000, () => {
    console.log('Server berjalan di port 3000');
    startWhatsApp();
});
