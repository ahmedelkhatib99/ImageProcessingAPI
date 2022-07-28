import express from 'express';
import fs from 'fs';
import resizeImage from '../Utilities/imageUtility';
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
): Promise<void> {
    try {
        //get filename, width and height
        const filename: string = req.query.filename as string;
        const width: number = parseInt(req.query.width as string);
        const height: number = parseInt(req.query.height as string);

        //check for filename, width and height before resizing the image
        if (!filename || !width || !height) {
            throw new Error('filename, width and height must be provided');
        }

        //get input and output images paths
        const inputPath = `./assets/full/${filename}.jpg`;
        const outputPath = `./assets/thumb/${width}x${height}${filename}.jpg`;

        //check if the resized image already exists
        if (!fs.existsSync(outputPath)) {
            //resize the image and save it to thumb folder if does not exist
            logger.info(
                `sending the new created version of ${width}x${height}${filename}`
            );
            await resizeImage(inputPath, outputPath, width, height);
        } else {
            //send the resized version if it exists
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
