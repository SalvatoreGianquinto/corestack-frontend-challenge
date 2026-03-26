L'architettura separa il fetch dei dati (Server Component con Axios) dalla logica interattiva (Client Component PostList). 
Lo stato è gestito tramite useState per i post e la ricerca, ottimizzando le performance con useMemo per derivare la lista filtrata e i post visibili (8 per volta), 
evitando ricalcoli costosi del DOM durante la digitazione.

Scelte e Compromessi

Layout & Paginazione: Ho scelto una griglia a 2 colonne con caricamento progressivo (8 post) per bilanciare pulizia visiva e performance.

ID Numerici Univoci: Ho implementato un sistema incrementale numerico locale per risolvere i conflitti degli ID statici dell'API (101), garantendo key univoche.

Resilienza: Ho inserito un file error.js per gestire eventuali timeout dell'API, privilegiando la stabilità dello stato locale rispetto alla persistenza (LocalStorage) 
per mantenere il codice snello.


Stack Tecnologico

Framework: Next.js 15 (App Router)
Styling: Tailwind CSS
Chiamate API: Axios
Stato: React Hooks (useState, useMemo)
