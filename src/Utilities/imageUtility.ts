import sharp from 'sharp';

export default async function resizeImage(
    inputPath: string,
    outputPath: string,
    width: number,
    height: number
): Promise<object> {
    return await sharp(inputPath).resize(width, height).toFile(outputPath);
}
