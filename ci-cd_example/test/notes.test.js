import request from 'supertest';
import mongoose from 'mongoose';
import {
    describe,
    test,
    expect,
    beforeAll,
    beforeEach,
    afterAll
} from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from '../app/app.js';
import Note from '../app/models/note.model.js';

/**
 * Notes API integration tests running against an in-memory MongoDB instance.
 */
describe('Notes API', () => {
    /** @type {MongoMemoryServer | undefined} */
    let mongoServer;
    /** @type {import('express').Express} */
    let app;

    /**
     * Start in-memory MongoDB and initialize the app once per suite.
     */
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create({
            instance: { port: 0 }
        });
        await mongoose.connect(mongoServer.getUri());
        app = createApp();
    });

    /**
     * Keep tests isolated by clearing persisted notes before each test.
     */
    beforeEach(async () => {
        await Note.deleteMany({});
    });

    /**
     * Close all DB resources after the suite completes.
     */
    afterAll(async () => {
        await mongoose.disconnect();
        if (mongoServer) {
            await mongoServer.stop();
        }
    });

    test('GET /health returns healthy status', async () => {
        const response = await request(app).get('/health');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'ok' });
    });

    test('POST /api/notes creates note', async () => {
        const response = await request(app)
            .post('/api/notes')
            .send({ title: 'note title', content: 'note content' });

        expect(response.status).toBe(201);
        expect(response.body.title).toBe('note title');
    });

    test('GET /api/notes returns note list', async () => {
        await Note.create({ title: 'first', content: 'note content' });

        const response = await request(app).get('/api/notes');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(1);
    });

    test('GET /api/notes/:id returns 404 for missing note', async () => {
        const missingId = new mongoose.Types.ObjectId().toString();
        const response = await request(app).get(`/api/notes/${missingId}`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('note not found');
    });

    test('PUT /api/notes/:id updates note', async () => {
        const note = await Note.create({ title: 'first', content: 'note content' });

        const response = await request(app)
            .put(`/api/notes/${note._id}`)
            .send({ title: 'updated title' });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('updated title');
    });

    test('DELETE /api/notes/:id deletes note', async () => {
        const note = await Note.create({ title: 'first', content: 'note content' });
        const response = await request(app).delete(`/api/notes/${note._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'note deleted successfully' });
    });
});