import https from 'https';
import { config } from '../config';

const sendMessage = (message: string) => {
    const searchParams = new URLSearchParams();
    searchParams.append('access_token', config.matrix.token);
    const path = `/_matrix/client/r0/rooms/${escape(
        config.matrix.roomId,
    )}/send/m.room.message?${searchParams.toString()}`;
    const req = https.request({
        method: 'POST',
        host: config.matrix.domain,
        port: 8448,
        path,
    });
    req.write(JSON.stringify({ msgtype: 'm.text', body: message }));
    req.end();
};

export const matrix = { sendMessage };
