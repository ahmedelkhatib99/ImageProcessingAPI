import express from 'express';
import resizeImageMiddleware from './middlewares/imageMiddleware';
const app = express();
const port = 3000;

//API for resizing an image
app.get(
    '/api/images',
    resizeImageMiddleware,
    (req: express.Request, res: express.Response) => {
        try {
            //get filename, width and height
            const filename: string = req.query.filename as string;
            const width: number = parseInt(req.query.width as string);
            const height: number = parseInt(req.query.height as string);

            //respond with the resized image
            res.sendFile(
                `D:/Courses/Nodejs Udacity/2-Backend Development with Node.js/Project/assets/thumb/${width}x${height}${filename}.jpg`
            );
        } catch (error) {
            res.status(400).json({ status: 0, message: error });
        }
    }
);

app.listen(port, () => {
    console.log(`app is running on localhost ${port}`);
});

export default app;
