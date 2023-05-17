# nx-remotecache-gcs

[![version](https://img.shields.io/npm/v/@amalia-oss/nx-remotecache-gcs?style=for-the-badge&logo=npm&label=)](https://www.npmjs.com/package/@amalia-oss/nx-remotecache-gcs)

A task runner for [nx](https://nx.dev) that uses Google Cloud Storage as our
remote cache bucket.

Using a remote cache enables all team members and CI
servers to share a single cache.

The concept and benefits of [computation caching](https://nx.dev/angular/guides/computation-caching) are
explained in the NX documentation.

This package was built with [nx-remotecache-custom](https://www.npmjs.com/package/nx-remotecache-custom).

## Install

```
npm install --save-dev @amalia/nx-remotecache-gcs
```

## Setup

This task runner considers that you've already configured your Google Cloud CLI,
especially the application default credentials using `gcloud auth application-default login` if you work locally.

The procedure for an automated environment such as a CI/CD can differ.

## Configuration

| Parameter   | Description                                           | Environment Variable / .env | `nx.json`   |
| ----------- | ----------------------------------------------------- | --------------------------- | ----------- |
| Bucket Name | The name of your GCS bucket to use as cache container | `NX_REMOTE_CACHE_BUCKET`    | `bucketUrl` |

```json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "@amalia/nx-remotecache-gcs",
      "options": {
        "bucketUrl": "my-bucket-name",
        "cacheableOperations": ["build", "test", "lint", "e2e"]
      }
    }
  }
}
```

## Inspirations

- [nx-remotecache-azure](https://github.com/NiklasPor/nx-remotecache-azure/)
- [@mansagroup/nx-gcs-remote-cache](https://github.com/MansaGroup/nx-gcs-remote-cache)
