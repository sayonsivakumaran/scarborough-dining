/**
 * Determines if the inputted file is an image file.
 * @param file The file that will be checked
 */
export const isImageFile = file => {
    return file && file.type.split('/')[0] === 'image';
}

export const isVideoFile = file => {
    return file && file.type.split('/')[0] === 'video';
}