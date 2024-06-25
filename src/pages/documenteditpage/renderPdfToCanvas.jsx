import { PDFDocument } from 'pdf-lib';

async function renderPdfToCanvas(file, canvasRef) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  // Convert PDF page to an image
  const image = new Image();
  image.src = await firstPage.saveAsBase64({ dataUri: true });

  image.onload = () => {
    context.drawImage(image, 0, 0, width, height);
  };
}

export default renderPdfToCanvas;
