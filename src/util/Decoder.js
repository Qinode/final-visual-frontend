function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len + 1);
    for (let i = 0; i < len; i += 1) {
        bytes[i + 1] = binaryString.charCodeAt(i);
    }
    return bytes;
}

const fieldOffset = {
    humidity: 0,
    temperature: 2
};

function base64ToReadable(base64, field) {
    if (field in fieldOffset) {
        const start = fieldOffset[field];
        const byteArray = base64ToArrayBuffer(base64);
        const rawReading = (byteArray[start] * 256) + byteArray[start + 1];
        return ((rawReading / 16382) * 165) - 40;
    } else {
        throw Error(`${field} is not encoded in the payload`);
    }
}

export default base64ToReadable;
