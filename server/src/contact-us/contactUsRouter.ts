import bodyParser from 'body-parser';
import { Router } from 'express';
import { matrix } from '../helpers';

export const contactUsRouter = Router();

const html = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="refresh" content="5; URL=https://webhooklogs.com" />
    </head>
    <body>
        <p>Thank you for contacting us. We'll get back to you soon. In the meantime, you can find us on <a href="https://twitter.com/SpecianUk">Twitter</a>.</p>
    </body>
</html>
`;

contactUsRouter.post(
    '/contact-us',
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    async (request, response) => {
        console.log(request.body);
        const { email, message } = request.body;
        if (!email || !message) {
            return response.status(400).json({
                error: 'invalid form input',
                ...request.body,
            });
        }
        matrix.sendMessage(`New message from ${email}:\n${message}`);
        return response.send(html);
    },
);
