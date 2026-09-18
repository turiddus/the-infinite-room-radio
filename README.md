# THE INFINITE ROOM — Mobile AI Radio v3

Web radio mobile per Android/Chrome con Google Drive privato, OAuth 2.0 e WaveSurfer.js.

## GitHub Pages
Repository: `turiddus/the-infinite-room-radio`

Abilita Pages da:
**Settings → Pages → Build and deployment → Deploy from a branch → main / root**

URL previsto:
https://turiddus.github.io/the-infinite-room-radio/

## Google OAuth
In Google Cloud:
1. Abilita Google Drive API.
2. Configura Google Auth Platform.
3. Crea un OAuth Client ID di tipo **Web application**.
4. Authorized JavaScript origin:
   `https://turiddus.github.io`
5. Apri la radio, premi ⚙, incolla il Client ID e salva.

Folder Drive preconfigurato:
`1AKSAV7x48gOS9lhCwzSsQDVUXsvmax7c`

Non inserire mai un Client Secret nel sito.


## v3.1 — Live Library

- Controllo Google Drive automaticamente alla fine di ogni traccia.
- Le nuove canzoni vengono aggiunte alla rotazione senza fermare il brano corrente.
- I nuovi brani hanno priorità nella coda Up Next.
- Fallback ogni 5 minuti soltanto quando la radio è in pausa.
- Nessun polling ogni 60 secondi.
- Gli errori di sincronizzazione live non interrompono la riproduzione.
