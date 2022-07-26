import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import { createLogger, transports, format } from 'winston';
const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
});

//Middleware for resizing an image
async function resizeImageMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        //get filename, width and height
        const filename: string = req.query.filename as string;
        const width: number = parseInt(req.query.width as string);
        const height: number = parseInt(req.query.height as string);

        const inputPath = `./assets/full/${filename}.jpg`;
        const outputPath = `./assets/thumb/${width}x${height}${filename}.jpg`;

        //send the resized image if its already exists
        if (!fs.existsSync(outputPath)) {
            //resize the image and save it to thumb folder
            logger.info(
                `sending the new created version of ${width}x${height}${filename}`
            );
            await sharp(inputPath).resize(width, height).toFile(outputPath);
        } else {
            logger.info(
                `sending the old existing version of ${width}x${height}${filename}`
            );
        }

        next();
    } catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error) message = error.message;
        res.status(400).json({ status: 0, message });
    }
}

export default resizeImageMiddleware;
