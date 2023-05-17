import type { Bucket } from '@google-cloud/storage';
import type { Readable } from 'stream';

export class GCSRemoteCache {
  constructor(private readonly bucket: Bucket) {}

  async exists(fileName: string): Promise<boolean> {
    const [exists] = await this.bucket.file(fileName).exists();
    return exists;
  }

  async download(fileName: string): Promise<Readable> {
    return this.bucket.file(fileName).createReadStream();
  }

  async upload(fileName: string, data: Readable): Promise<unknown> {
    return new Promise((resolve, reject) =>
      data
        .pipe(this.bucket.file(fileName).createWriteStream())
        .on('finish', resolve)
        .on('error', reject)
    );
  }
}
