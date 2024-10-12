import S3 from "aws-sdk/clients/s3.js";
import { v4 as uuidv4 } from "uuid";
import https from "https";

const downloadImageFromUrl = (imageUrl) => {
  return new Promise((resolve, reject) => {
    https.get(imageUrl, (response) => {
      const chunks = [];
      response.on("data", (chunk) => {
        chunks.push(chunk);
      });

      response.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve({ buffer, contentType: response.headers["content-type"] });
      });

      response.on("error", (error) => {
        reject(new Error(`Failed to download image: ${error.message}`));
      });
    });
  });
};

export const s3UploadFromUrl = async (imageUrl) => {
  try {
    const { buffer, contentType } = await downloadImageFromUrl(imageUrl);

    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuidv4()}-google-profile-image.jpg`,
      Body: buffer,
      ContentType: contentType,
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
  } catch (error) {
    throw new Error(`Failed to upload image to S3: ${error.message}`);
  }
};

export const s3Upload = async (file) => {
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
  };

  return await s3.upload(param).promise();
};
