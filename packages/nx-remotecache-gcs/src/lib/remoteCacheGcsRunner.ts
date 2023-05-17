import * as assert from 'node:assert';
import { Storage } from '@google-cloud/storage';
import { createCustomRunner, initEnv } from 'nx-remotecache-custom';
import type { RemoteCacheImplementation } from 'nx-remotecache-custom';

import { GCSRemoteCache } from './GCSRemoteCache';

export type RemoteCacheGcsOptions = {
  bucketName: string;
};

export const remoteCacheGcsRunner = createCustomRunner<RemoteCacheGcsOptions>(
  async (options): Promise<RemoteCacheImplementation> => {
    initEnv(options);

    const bucketName = process.env.NX_REMOTE_CACHE_BUCKET ?? options.bucketName;

    assert(
      bucketName,
      'Missing NX_REMOTE_CACHE_BUCKET environment variable or bucketName option.'
    );

    const gcsRemoteCache = new GCSRemoteCache(new Storage().bucket(bucketName));

    return {
      name: '@amalia-oss/nx-remotecache-gcs',

      // fileExists checks whether a file exists on your remote storage
      fileExists: (fileName) => gcsRemoteCache.exists(fileName),

      // retrieveFile downloads a file from your remote storage
      retrieveFile: (fileName) => gcsRemoteCache.download(fileName),

      // storeFile uploads a file from a buffer to your remote storage
      storeFile: (fileName, stream) => gcsRemoteCache.upload(fileName, stream),
    };
  }
);
