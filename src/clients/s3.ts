import {
  GetObjectCommand,
  GetObjectCommandOutput,
  ListObjectsV2Command,
  ListObjectsV2Output,
  S3Client,
} from '@aws-sdk/client-s3';

const client = new S3Client({
  region: import.meta.env.VITE_S3_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
  },
});

export const listObjects = async (
  prefix?: string
): Promise<ListObjectsV2Output> => {
  const command = new ListObjectsV2Command({
    Bucket: import.meta.env.VITE_S3_BUCKET,
    Prefix: prefix,
  });
  return client.send(command);
};

export const getObject = async (
  path: string
): Promise<GetObjectCommandOutput> => {
  const command = new GetObjectCommand({
    Bucket: import.meta.env.VITE_S3_BUCKET,
    Key: path,
  });
  return client.send(command);
};
