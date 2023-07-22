import {
  CognitoIdentityClient,
  GetCredentialsForIdentityCommand,
  GetIdCommand,
} from '@aws-sdk/client-cognito-identity';

import { OAuthProvider } from '../constants/OAuthProvider.ts';

export class CognitoClient {
  private static client?: CognitoIdentityClient;

  static getInstance(): CognitoIdentityClient {
    if (!this.client) {
      this.client = new CognitoIdentityClient({
        region: import.meta.env.VITE_AWS_REGION,
      });
    }
    return this.client;
  }

  static async getId(token: string) {
    const command = new GetIdCommand({
      IdentityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
      Logins: { [OAuthProvider.Google]: token },
    });
    return this.getInstance().send(command);
  }

  static async getCredentials(token: string) {
    const getIdCommandOutput = await this.getId(token);
    const command = new GetCredentialsForIdentityCommand({
      IdentityId: getIdCommandOutput.IdentityId,
      Logins: { [OAuthProvider.Google]: token },
    });
    return this.getInstance().send(command);
  }
}
