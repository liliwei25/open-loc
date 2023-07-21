import { _Object } from '@aws-sdk/client-s3';

import { isNotNil } from '../typeGuards/isNotNil.ts';

export const getPathsFromS3Objects = (objects: _Object[] = []): string[] =>
  objects.map(({ Key }) => Key).filter(isNotNil);
