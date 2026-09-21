# The Darkling Room

**An autonomous AI music generation and personal web radio system.**

The Darkling Room is a two-part music ecosystem designed to turn local AI music generation into a continuous, private listening experience.

The system combines a **local AI Music Generator** with a **mobile-first WebRadio powered by Google Drive**. New songs can be generated automatically on a PC, uploaded to a private Drive folder, discovered by the web player, and added to the listening rotation without manually rebuilding a playlist.

> **Generate locally. Sync automatically. Listen anywhere.**

## System Overview

```text
Local AI Music Generator
        ↓
Generated audio files
        ↓
Automatic Google Drive upload
        ↓
Private Drive music library
        ↓
The Darkling Room WebRadio
        ↓
Live Library + Smart Shuffle
        ↓
Phone / Tablet / Desktop Browser
```

The goal is simple: create a self-feeding personal radio station where the music library can keep growing while the listener is already enjoying it.

---

## 1. AI Music Generator

The desktop side of The Darkling Room is a local AI music production environment built around a **YuE2-based generation workflow**.

It is designed for long-form autonomous operation rather than one-off generation. The system can continuously create new songs in the background, save the finished audio to the local library, and synchronize completed tracks to Google Drive.

### Core capabilities

- Local AI music generation
- YuE2-based song synthesis workflow
- Automatic / continuous song generation mode
- Lyrics and style-driven generation
- Local song library management
- Integrated desktop playback
- Automatic export of completed tracks
- Google Drive synchronization
- Background operation for unattended generation
- Designed for GPU-accelerated local inference

The generator acts as the **production engine** of the project. Once configured, it can keep creating music while the web player independently consumes the growing cloud library.

For a more detailed description, see **[MUSIC_GENERATOR.md](./MUSIC_GENERATOR.md)**.

---

## 2. The Darkling Room WebRadio

The WebRadio is the listening side of the system.

It is a lightweight, mobile-first web application hosted on **GitHub Pages**. Instead of making the music files public, the player authenticates with Google and reads the configured private Google Drive folder through the Google Drive API.

### Live version

**https://turiddus.github.io/the-infinite-room-radio/**

### Current version

**Mobile AI Radio v3.2 — 24/7 OAuth Auto-Renew**

### Main features

- Google OAuth authentication
- Private Google Drive music library
- Google Drive API streaming/download access
- WaveSurfer.js waveform visualization
- Play / pause / previous / next controls
- Smart Shuffle with reduced repetition
- Dynamic **Up Next** queue
- Android Media Session integration
- PWA-ready mobile interface
- Local volume persistence
- Audio prefetching
- Small in-memory audio cache
- Optional matching cover artwork from Drive
- Live track counter
- Automatic library synchronization

### Live Library

The **Live Library** is one of the key features of v3.1.

When a song finishes, the player performs a lightweight check of the configured Drive folder. If the desktop generator has uploaded new music, those tracks are added to the running catalog without interrupting playback.

New songs are placed near the front of the rotation so newly generated material can be heard quickly.

When playback is paused, an additional low-frequency fallback check can refresh the library every five minutes.

There is **no aggressive 60-second polling loop**.

For technical details, see **[WEB_PLAYER.md](./WEB_PLAYER.md)**.

---


## TikTok / Live Overlay bridge

The WebRadio can publish the currently playing track to the local **Darkling LIVE visualizer**.

When the visualizer is exposed through a Cloudflare Quick Tunnel, open the radio with the tunnel URL in the `bridge` query parameter:

```text
https://turiddus.github.io/the-infinite-room-radio/?bridge=https%3A%2F%2Fexample.trycloudflare.com
```

For the Hi-Fi player:

```text
https://turiddus.github.io/the-infinite-room-radio/hifi.html?bridge=https%3A%2F%2Fexample.trycloudflare.com
```

The player remembers the latest valid bridge URL in browser local storage and sends track changes to:

```text
POST <bridge>/now-playing
```

Payloads include the current title, playback state, track index, catalog size, duration and station metadata. Bridge failures are silent and never interrupt playback.

To forget a saved bridge:

```text
?bridge=clear
```

This integration is designed for the **The Darkling Room 24/7 Goth Radio** live workflow and keeps the private Google Drive audio path unchanged.

---

## Why this project is different

The Darkling Room is not only a music generator and not only a browser player.

It is a complete automated loop:

**AI generation → local library → cloud synchronization → private web radio → continuous listening**

The generator and player remain independent. The PC can continue producing songs while the listener is away from home, and the web player can keep discovering new tracks as they arrive in Drive.

This makes the project closer to a **personal autonomous radio station** than a traditional music-generation interface.

---

## Privacy and security

The WebRadio is intentionally designed so that the **music files can remain private in Google Drive**.

- The GitHub Pages website is public.
- The music library does not need to be public.
- Audio access requires a valid Google OAuth access token.
- OAuth access tokens are kept in the browser session.
- Google passwords are never handled by the application.
- No Google Client Secret is required or stored in the public web app.
- The OAuth Client ID is public by design.
- The service worker does not cache Google Drive audio or OAuth tokens.

The player requests the Google Drive read-only scope and then limits its own catalog query to the configured Drive folder.

---

## Google Drive folder

The current player is configured for a specific private Drive folder.

The folder ID can be changed from the settings panel in the web application.

---

## Google OAuth setup

To deploy your own instance:

1. Enable the **Google Drive API** in Google Cloud.
2. Configure **Google Auth Platform**.
3. Create an OAuth 2.0 Client ID of type **Web application**.
4. Add your GitHub Pages origin under **Authorized JavaScript origins**.
5. Open the WebRadio settings and enter the OAuth Client ID.
6. Configure the Google Drive folder ID that contains the music library.

For this deployment, the authorized origin is:

```text
https://turiddus.github.io
```

> Never place a Google OAuth Client Secret, refresh token, password, or private credential in this repository.

---

## Technology

### Desktop generation side

- Python
- YuE2-based music generation
- Local GPU inference
- audio.cpp-compatible workflow
- Google Drive synchronization
- Local media/library management

### Web player side

- HTML / CSS / JavaScript
- Google Identity Services
- Google Drive API
- WaveSurfer.js
- Media Session API
- Service Worker / PWA
- GitHub Pages

---

## Project philosophy

The Darkling Room was built around three principles:

**Automation** — generation, synchronization, discovery, and playback should require as little manual intervention as possible.

**Ownership** — music generation can happen locally and the user's library can remain under the user's own storage account.

**Continuity** — the system should behave like an always-growing radio station rather than a collection of disconnected AI generations.

---

## Credits

The music-generation side of this project uses technology based on the **YuE / YuE2** ecosystem developed by the Multimodal Art Projection (M-A-P) community and collaborators.

The web player uses **WaveSurfer.js** for interactive waveform rendering and browser audio control.

The Darkling Room is an independent personal project and is not affiliated with Google, GitHub, Suno, or the YuE/YuE2 research teams.

---

## Status

**Active personal project**

Current WebRadio release: **v3.2 24/7 OAuth Auto-Renew**

The system is currently designed primarily for private/personal use.


## PRO 3.0 architecture

The Darkling Room now uses an ordered NOW PLAYING bridge with per-player session IDs and monotonic sequence numbers, persistent Smart Shuffle rotation in the browser, and a metadata-only Drive Library Monitor. The production-side generator uses persistent SQLite creative memory, resumable generation jobs, a Drive upload outbox, canonical metadata manifests, and quality-gated publication.

For 24/7 broadcast, the recommended topology is: **Shadow Studio → local archive/SQLite → Google Drive → broadcast laptop cache/player → local visualizer → OBS/YouTube**. Cloudflare Quick Tunnel is retained only where an HTTPS metadata bridge or TikTok Link source is required; OBS should use the local visualizer URL when possible.


## 24/7 OAuth reliability

WebRadio v3.2 renews Google Drive OAuth access tokens automatically before expiry using the lifetime returned by Google. If a Drive request receives HTTP 401, the standard player, Hi-Fi player, and library monitor perform one silent token renewal and retry the request. Manual sign-in remains the fallback only when Google itself requires renewed user interaction or consent. No Client Secret or paid backend is introduced.
