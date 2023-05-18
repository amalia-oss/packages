import { GCSRemoteCache } from './GCSRemoteCache';
import { Bucket, File } from '@google-cloud/storage';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Readable } from 'node:stream';
import { faker } from '@faker-js/faker';

describe('GCSRemoteCache', () => {
  let cache: GCSRemoteCache;
  let bucket: DeepMocked<Bucket>;
  let file: DeepMocked<File>;
  let fileName: string;

  beforeEach(() => {
    bucket = createMock<Bucket>();
    file = createMock<File>();
    bucket.file.mockReturnValue(file);

    cache = new GCSRemoteCache(bucket);

    fileName = faker.system.fileName();
  });

  describe('exists', () => {
    it.each`
      expected
      ${true}
      ${false}
    `(
      'should return $expected',
      async ({ expected }: { expected: boolean }) => {
        // mockResolvedValue expected never? Probably some types weren't overlapping.
        file.exists.mockImplementation(async () => [expected]);

        const result = await cache.exists(fileName);

        expect(result).toBe(expected);
      }
    );
  });

  describe('download', () => {
    it('should return a readable stream', async () => {
      const stream = new Readable();
      file.createReadStream.mockReturnValue(stream);

      const result = await cache.download(fileName);

      expect(result).toBeInstanceOf(Readable);
    });
  });
});
