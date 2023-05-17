import { remoteCacheGcs } from './remote-cache-gcs';

describe('remoteCacheGcs', () => {
  it('should work', () => {
    expect(remoteCacheGcs()).toEqual('remote-cache-gcs');
  });
});
