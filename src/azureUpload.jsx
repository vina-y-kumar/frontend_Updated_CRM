import { BlobServiceClient } from '@azure/storage-blob';

const account = "pdffornurenai";
const sas = "sv=2022-11-02&ss=bfqt&srt=co&sp=rwdlacupiytfx&se=2025-06-01T16:13:31Z&st=2024-06-01T08:13:31Z&spr=https&sig=8s7IAdQ3%2B7zneCVJcKw8o98wjXa12VnKNdylgv02Udk%3D";

const containerName = 'pdf';
const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sas}`);

const uploadToBlob = async (file) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobName = file.name + '-' + Date.now(); // Appending timestamp to the file name for uniqueness
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const uploadBlobResponse = await blockBlobClient.uploadData(file, {
      blobHTTPHeaders: {
        blobContentType: file.type
      }
    });

    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

    return blockBlobClient.url; // Return the URL of the uploaded file
  } catch (error) {
    console.error('Error uploading file to Azure:', error);
    throw error;
  }

  
};

export default uploadToBlob;
