import {
  GetObjectCommand,
  GetObjectCommandOutput,
  ListObjectsV2Command,
  ListObjectsV2Output,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client as AwsS3Client,
} from '@aws-sdk/client-s3';
import Cookies from 'js-cookie';

import { CookieName } from '../constants/cookieName.ts';
import { CognitoClient } from './cognito.ts';

export class S3Client {
  private static client: AwsS3Client;

  static async getInstance(): Promise<AwsS3Client> {
    if (!this.client) {
      const token = Cookies.get(CookieName.Token);
      if (!token) {
        throw new Error('Not authorized');
      }
      const { Credentials } = await CognitoClient.getCredentials(token);
      this.client = new AwsS3Client({
        region: import.meta.env.VITE_AWS_REGION,
        credentials: {
          accessKeyId: Credentials?.AccessKeyId ?? '',
          secretAccessKey: Credentials?.SecretKey ?? '',
          sessionToken: Credentials?.SessionToken,
        },
      });
    }
    return this.client;
  }

  static async listObjects(prefix?: string): Promise<ListObjectsV2Output> {
    const instance = await this.getInstance();
    const command = new ListObjectsV2Command({
      Bucket: import.meta.env.VITE_S3_BUCKET,
      Prefix: prefix,
    });
    return instance.send(command);
  }

  static async getObject(path: string): Promise<GetObjectCommandOutput> {
    const instance = await this.getInstance();
    const command = new GetObjectCommand({
      Bucket: import.meta.env.VITE_S3_BUCKET,
      Key: path,
    });
    return instance.send(command);
  }

  static async putObject(
    path: string,
    body: NonNullable<PutObjectCommandInput['Body']>
  ): Promise<PutObjectCommandOutput> {
    const instance = await this.getInstance();
    const command = new PutObjectCommand({
      Bucket: import.meta.env.VITE_S3_BUCKET,
      Key: path,
      Body: body,
    });
    return instance.send(command);
  }
}
