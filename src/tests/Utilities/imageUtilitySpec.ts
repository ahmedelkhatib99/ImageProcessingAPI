import resizeImage from './../../Utilities/imageUtility';

describe('Test resize image function', () => {
    it('New image should be resized', async () => {
        const width = 100;
        const height = 100;
        const inputPath = `./assets/full/fjord.jpg`;
        const outputPath = `./assets/thumb/${width}x${height}fjord.jpg`;
        const result: any = await resizeImage(
            inputPath,
            outputPath,
            width,
            height
        );
        expect(result.width).toBe(width);
        expect(result.height).toBe(height);
    });

    it('New image should be resized for different path, width and height', async () => {
        const width = 300;
        const height = 300;
        const inputPath = `./assets/full/santamonica.jpg`;
        const outputPath = `./assets/thumb/${width}x${height}fjord.jpg`;
        const result: any = await resizeImage(
            inputPath,
            outputPath,
            width,
            height
        );
        expect(result.width).toBe(width);
        expect(result.height).toBe(height);
    });
});
