# The Infinite Room — WebRadio

## Overview

The Infinite Room WebRadio is a private, mobile-first browser player for an AI-generated music library stored in Google Drive.

It is designed to be the lightweight listening endpoint of the larger Infinite Room ecosystem.

The player is hosted on GitHub Pages and performs no server-side audio processing. Authentication and Drive access happen directly in the user's browser.

## Live application

https://turiddus.github.io/the-infinite-room-radio/

## Architecture

```text
GitHub Pages
     ↓
Static Web Application
     ↓
Google OAuth
     ↓
Google Drive API
     ↓
Private music folder
     ↓
Browser audio player
```

The public website contains the player code, but the actual songs can remain private in Google Drive.

## Authentication

The application uses Google Identity Services to request an OAuth access token.

The token is kept in the browser session and is used to authorize Drive API requests.

The web app does not need a Google Client Secret.

## Drive catalog

After authentication, the player queries the configured Google Drive folder and builds a catalog from supported audio files.

Supported filename/audio detection currently includes common formats such as:

- MP3
- WAV
- M4A
- FLAC
- OGG

The player can also inspect image files in the same folder and attempt to associate matching artwork with a track.

## Playback

Audio is requested from Google Drive through the Drive API and loaded into the browser.

The player uses **WaveSurfer.js** to provide:

- Waveform visualization
- Seeking
- Current-time display
- Duration display
- Play / pause
- Track navigation

## Smart Shuffle

The player maintains a randomized playback bag instead of selecting a completely independent random track after every song.

This reduces immediate repetition and creates a more natural radio-like rotation.

## Up Next

The interface exposes the next portion of the randomized queue.

A listener can also manually select an upcoming track.

## Live Library — v3.1

Live Library connects the WebRadio to the autonomous desktop generator.

At the end of each song, the player performs one lightweight Drive catalog check.

If new tracks have been uploaded since the previous scan:

1. They are detected by Drive file ID.
2. They are appended to the in-memory catalog.
3. The displayed track count is updated.
4. They are inserted near the front of the playback rotation.
5. Playback continues normally.

The currently playing track is not interrupted.

### Paused fallback

When playback is paused, the player can perform a low-frequency fallback check approximately every five minutes.

This keeps the catalog reasonably fresh without continuously polling the Drive API.

## Prefetching

The player can fetch the next expected track in advance.

A small in-memory cache reduces unnecessary re-downloads during the current browser session.

The cache is intentionally limited so the application does not accumulate a large amount of audio data in memory.

## Android integration

When supported by the browser, the application uses the Media Session API.

This allows track metadata and playback controls to integrate with Android's system media interface.

## Progressive Web App

The project includes:

- Web App Manifest
- Application icon
- Service Worker
- Standalone display support

The service worker is deliberately conservative.

Google Drive audio requests and OAuth credentials are not stored in the application cache.

## Security model

The website itself is public because it is hosted on GitHub Pages.

The audio library does not have to be public.

Access to private Drive files depends on:

- the Google account used for authentication,
- the OAuth consent configuration,
- and the permissions of the Drive folder/files.

The repository must never contain:

- Client Secrets
- OAuth access tokens
- Refresh tokens
- Google account passwords
- Private service-account credentials

An OAuth **Client ID** is not a secret and is expected to be visible in browser-based applications.

## Current synchronization strategy

The player intentionally avoids aggressive polling.

During continuous playback:

```text
Track finishes
      ↓
One Drive library check
      ↓
Add newly discovered tracks
      ↓
Start next track
```

When paused, the fallback interval provides occasional synchronization.

This design keeps API usage low while still making newly generated music appear naturally during a listening session.

## Current release

**The Infinite Room — Mobile AI Radio v3.1 / Live Library**
