import http, { Server } from 'http';
import app from './restful';
import { PORT } from './config';

const server: Server = http.createServer(app);

server.listen(PORT, (): void => {
	console.log(`Server is running at http://localhost:${PORT}`);
});

export default server;
