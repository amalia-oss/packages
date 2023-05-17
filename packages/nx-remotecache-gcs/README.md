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

This task runner relies upon [`@google-cloud/storage`](https://www.npmjs.com/package/@google-cloud/storage).

This package considers that you've already configured your Google Cloud CLI, especially the application default credentials if you work locally.

```shell
gcloud auth application-default login
```

The procedure for an automated environment such as a CI/CD can differ.

## Configuration

| Parameter   | Description                                           | Environment Variable     | `nx.json`    |
| ----------- | ----------------------------------------------------- | ------------------------ | ------------ |
| Bucket Name | The name of your GCS bucket to use as cache container | `NX_REMOTE_CACHE_BUCKET` | `bucketName` |

By default, environment variables will be loaded from the `.env` file at the root of your workspace.
See [#Advanced Configuration](#advanced-configuration) for more information.


**NB:** The environment variable will always take precedence over the `nx.json` configuration.

In your `nx.json` file:

```json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "@amalia-oss/nx-remotecache-gcs",
      "options": {
        "bucketName": "my-bucket-name",
        "cacheableOperations": ["build", "test", "lint", "e2e"]
      }
    }
  }
}
```

## Advanced Configuration

See [nx-remotecache-custom](https://github.com/NiklasPor/nx-remotecache-custom#advanced-configuration).

```json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "@amalia-oss/nx-remotecache-gcs",
      "options": {
        "bucketName": "my-bucket-name",
        "cacheableOperations": ["build", "test", "lint", "e2e"],
        "silent": false,
        "verbose": false,
        "dotenv": true,
        "dotenvPath": ".env"
      }
    }
  }
}
```

## Inspirations

- [nx-remotecache-azure](https://github.com/NiklasPor/nx-remotecache-azure/)
- [@mansagroup/nx-gcs-remote-cache](https://github.com/MansaGroup/nx-gcs-remote-cache)
