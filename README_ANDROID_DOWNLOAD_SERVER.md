# No Read Android download page server update

This version makes `download.html` use the live No Read API server:

- `GET https://api.rubby-studios.com/app/version` checks if the APK exists.
- `GET https://api.rubby-studios.com/app/noread.apk` downloads the APK.

The download button only enables on Android when the server says `apkAvailable: true`.

Server must return JSON from `/app/version`, for example:

```json
{
  "success": true,
  "app": "No Read Android",
  "platform": "android",
  "apkAvailable": true,
  "downloadUrl": "/app/noread.apk",
  "updatedAt": "2026-05-31T12:00:00.000Z"
}
```
