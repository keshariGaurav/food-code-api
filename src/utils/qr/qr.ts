import QRCode from 'qrcode';

const generateQR = async (text: string) => {
    try {
        const qrCodeUrl = await QRCode.toDataURL(text);
        return qrCodeUrl;
    } catch (err) {
        console.error('Failed to generate QR Code', err);
        throw err;
    }
};

export { generateQR};