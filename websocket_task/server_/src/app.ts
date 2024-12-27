import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

const server = http.createServer();
const wss = new WebSocketServer({ server });

const PORT = 3000;

const clients: Set<WebSocket> = new Set();

wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');
    clients.add(ws);

    ws.on('message', (message: string) => {
        console.log('Received:', message);
        const textMessage = message.toString();
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(textMessage);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });
});

server.listen(PORT, () => {
    console.log(`✅ WebSocket server is running on ws://localhost:${PORT}`);
});
