import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';

// Optional: customize allowed origins for production and local dev
const allowedOrigins = [
    'https://leaderboard-dff2d.web.app',
    'http://localhost:4200',
];

const server = express();

export const createNestServer = async (expressInstance: express.Express) => {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));

    // Enable CORS
    app.enableCors({
        origin: (origin: any, callback: any) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    });

    await app.init();
    return app;
};

createNestServer(server)
    .then(() => {
        console.log('✅ NestJS app initialized');
    })
    .catch(err => {
        console.error('NestJS app init error:', err);
    });

export const api = functions.https.onRequest(server);
