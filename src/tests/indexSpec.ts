import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test resize image endpoint response', () => {
    it('should respond with status 200', async () => {
        const response = await request.get(
            '/api/images?filename=fjord&width=200&height=200'
        );
        expect(response.status).toBe(200);
    });

    it('should respond with status 200 for different image', async () => {
        const response = await request.get(
            '/api/images?filename=icelandwaterfall&width=200&height=200'
        );
        expect(response.status).toBe(200);
    });

    it('should respond with status 200 for different width and height', async () => {
        const response = await request.get(
            '/api/images?filename=fjord&width=400&height=500'
        );
        expect(response.status).toBe(200);
    });

    it('should respond with status 400 for missing width and height', async () => {
        const response = await request.get('/api/images?filename=fjord');
        expect(response.status).toBe(400);
    });

    it('should respond with status 400 for image does not exist', async () => {
        const response = await request.get(
            '/api/images?filename=anyimage&width=900&height=1200'
        );
        expect(response.status).toBe(400);
    });
});
