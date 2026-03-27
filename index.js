import http from 'http';
import net from 'net';
import url from 'url';

const VPS_HOST = '34.174.119.160'; // IP del VPS
const VPS_PORT = 22;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Proxy Cloud Run Ready\n');
});

// Manejo de solicitudes tipo CONNECT (túnel TCP)
server.on('connect', (req, clientSocket, head) => {
  const { port, hostname } = url.parse(`//${req.url}`, false, true);
  const targetPort = port || VPS_PORT;
  const targetHost = hostname || VPS_HOST;

  const serverSocket = net.connect(targetPort, targetHost, () => {
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });

  serverSocket.on('error', (err) => {
    console.error('Server socket error:', err);
    clientSocket.end('HTTP/1.1 502 Bad Gateway\r\n\r\n');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log('Servidor proxy en Cloud Run escuchando en puerto', PORT);
});
