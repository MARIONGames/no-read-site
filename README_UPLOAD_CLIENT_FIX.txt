No Read upload client fix

This package was generated against the uploaded server(2).zip.

Server upload endpoint:
  POST https://api.rubby-studios.com/music/upload

Server-supported multipart file field names:
  audio  -> required unless audioUrl is provided
  cover  -> optional cover image

The server DOES NOT accept these file fields in the current upload middleware:
  audioFile
  coverFile
  bannerFile
  banner

Updated files:
  upload.html
  auth-client.browser.js

What changed:
  - upload.html now sends audio as field name "audio" only.
  - upload.html now sends cover as field name "cover" only.
  - banner file upload was replaced with bannerImageUrl, because the server service accepts bannerImageUrl but middleware does not accept banner files.
  - auth-client.browser.js now uses XMLHttpRequest for FormData uploads, with credentials, Bearer token fallback, timeout, and progress callback.
  - script cache version bumped to 20260525-3.

Upload test:
  1. Login with artist/staff/moderator/admin/owner.
  2. Open upload.html.
  3. Upload a small MP3 first, under 10 MB.
  4. If that works, try larger MP3s under 50 MB.
