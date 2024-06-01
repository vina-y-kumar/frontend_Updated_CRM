import { BlobServiceClient } from '@azure/storage-blob';

const account = process.env.REACT_APP_AZURE_ACCOUNT_NAME;
const sas = process.env.REACT_APP_SAS_TOKEN;

const containerName = 'usercontainer';
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net/?${sas}`,
);

export const uploadToBlob = async (file) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobName = file.src + new Date().getTime();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadBlobResponse = await blockBlobClient.uploadFile(file.src);
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId,
  );
  
};