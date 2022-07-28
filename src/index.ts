import express from 'express';
import path from 'path';
import resizeImageMiddleware from './middlewares/imageMiddleware';
const app = express();
const port = 3000;

//API for resizing an image
app.get(
    '/api/images',
    resizeImageMiddleware,
    (req: express.Request, res: express.Response): void => {
        try {
            //get filename, width and height
            const filename: string = req.query.filename as string;
            const width: number = parseInt(req.query.width as string);
            const height: number = parseInt(req.query.height as string);

            //respond with the resized image
            res.sendFile(
                path.resolve(`assets/thumb/${width}x${height}${filename}.jpg`)
            );
        } catch (error) {
            res.status(400).json({ status: 0, message: error });
        }
    }
);

app.listen(port, (): void => {
    console.log(`app is running on localhost ${port}`);
});

export default app;
