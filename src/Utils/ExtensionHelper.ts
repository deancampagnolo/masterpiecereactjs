export const getExt = (mimeType: string): string => {
    // FIXME THIS SHOULD BE VERY EXHAUSTIVE LIST OR I SHOULD USE EXTERNAL LIBRARY
    if (mimeType.includes('audio/mpeg') || mimeType.includes('audio/mp3')) {
        return '.mp3'
    } else if (mimeType.includes('audio/ogg')) {
        return '.ogg'
    } else {
        throw new Error('Not recognized mimeType')
    }
}
