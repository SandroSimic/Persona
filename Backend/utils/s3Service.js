import S3 from "aws-sdk/clients/s3.js";
import { v4 as uuid } from "uuid";

export const s3Upload = async (file) => {
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${uuid()}-${file.originalname}`,
    Body: file.buffer,
  };
  return await s3.upload(param).promise();
};
