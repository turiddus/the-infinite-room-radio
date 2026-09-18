# The Infinite Room — AI Music Generator

## Overview

The Infinite Room AI Music Generator is the production engine behind the project.

It is a local desktop workflow designed to generate complete songs with AI and operate for extended periods with minimal manual intervention. Rather than treating each generation as an isolated task, the generator is part of a larger automated music pipeline.

Its output feeds directly into the cloud library used by The Infinite Room WebRadio.

## Purpose

The generator was designed around a simple idea:

> A computer should be able to keep creating new music in the background while the listener experiences the results as an evolving personal radio station.

This separates **music production** from **music consumption**.

The desktop PC handles the computationally expensive generation process, while lightweight devices such as phones and tablets only need the web player.

## Generation workflow

A typical cycle is:

```text
Song concept / style / lyrics
        ↓
AI music generation
        ↓
Complete audio track
        ↓
Local library
        ↓
Automatic Google Drive upload
        ↓
Available to The Infinite Room WebRadio
```

## Main capabilities

### Local AI generation

The system is built around a YuE2-based music-generation workflow and is intended for local GPU inference.

This keeps the core generation process under the user's control and avoids making the web player responsible for heavy AI computation.

### Continuous generation

The generator can operate in an automatic background mode, allowing new songs to be produced sequentially without the user manually starting every generation.

This makes it suitable for building a continuously expanding personal catalog.

### Lyrics and style control

Generation can be guided by textual musical direction, lyrics, genre, atmosphere, vocal character, instrumentation, and production style.

The exact quality and structure of a result depend on the underlying model, inference configuration, prompt design, and sampling parameters.

### Local library

Finished songs are saved locally so the desktop application can function as a production archive as well as a generator.

### Automatic cloud synchronization

Completed tracks can be uploaded automatically to a configured Google Drive music folder.

This is the bridge between the local AI workstation and the mobile WebRadio.

The upload process is independent from playback: the generator can continue producing music even while the user is listening from another device.

## Relationship with the WebRadio

The generator does not directly stream audio to the phone.

Instead, Google Drive is used as a private synchronization layer:

```text
Generator PC → Google Drive → WebRadio
```

This architecture has several practical advantages:

- The PC does not need to expose a public HTTP server.
- The listener does not need to be on the same local network.
- The WebRadio can be hosted as a static GitHub Pages site.
- The music files can remain private.
- Newly generated songs can appear in the player automatically.

## Autonomous use

The most important characteristic of the generator is not a single model feature but the automation surrounding it.

The full system can be left running as a production loop:

1. Generate a song.
2. Save the finished track.
3. Upload it to Drive.
4. Start the next generation.
5. Let the WebRadio discover the new song.

This turns local generative AI into a continuously evolving music source.

## Hardware

The generator is intended for a Windows workstation with a CUDA-capable NVIDIA GPU.

Generation speed, available model configurations, maximum duration, and memory usage depend on the installed GPU, VRAM, model precision, and inference backend.

## Model

The current generation workflow is based on the **YuE / YuE2 music-generation ecosystem**.

YuE2 is an open music-generation research project associated with Multimodal Art Projection (M-A-P) and collaborators.

The Infinite Room is an independent integration and automation project. It does not claim authorship of the underlying YuE/YuE2 model.

## Design goal

The project is intentionally optimized for a different workflow from commercial music-generation websites.

Instead of:

```text
Generate → Download → Manually organize → Manually play
```

The Infinite Room aims for:

```text
Generate → Save → Sync → Discover → Play → Repeat automatically
```

That automation layer is the central idea behind the desktop generator.
