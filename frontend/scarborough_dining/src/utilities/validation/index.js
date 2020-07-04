export const isImageFile = file => {
    return file && file.type.split('/')[0] === 'image';
}