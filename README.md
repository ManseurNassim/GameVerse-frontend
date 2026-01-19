# GameVerse Frontend

Interface React (Vite + TypeScript) pour GameVerse.

## Structure
```
frontend/
├── assets/            # images et ressources statiques
├── components/        # pages + composants réutilisables
├── context/           # AuthContext
├── services/          # api.ts, mockData.ts
├── utils/             # constants, hooks, helpers
├── App.tsx            # racine
└── index.tsx          # entrée React
```

## Architecture et fonctionnement
- Entrée Vite/React : `index.tsx` monte `App.tsx` qui gère le routing et l'AuthContext.
- Auth : `context/AuthContext.tsx` stocke l'utilisateur, les tokens et expose `toggleGameInLibrary`.
- API : `services/api.ts` centralise les appels ; bascule mock/réel via `USE_REAL_API` et `API_BASE_URL` (ou `VITE_API_BASE_URL`).
- Pages principales : Home (carrousels), Search (filtres + autocomplétion), Ranking (classements), GameDetails (fiche jeu), AccountInfo (bibliothèque), Login/Register/VerifyEmail.
- Composants réutilisables : `GameCard` (affichage jeu), `SkeletonCard` (chargement), `UIComponents` (Card, Button, InputField), `FavoriteButton`.
- Flux : UI → API (`api.ts`) → Backend Express → MongoDB → réponse affichée ; en mode mock, les données viennent de `mockData.ts`.

## Démarrage local
```bash
cd frontend
npm install
npm run dev    # http://localhost:3000
npm run build  # production
npm run preview
```

## Configuration API
- Fichier : `services/api.ts`
- Mode mock : `USE_REAL_API = false`
- Mode réel : `USE_REAL_API = true` et `API_BASE_URL = 'https://gameverse-backend-g48l.onrender.com'`

Option env (si utilisé) : `VITE_API_BASE_URL` à injecter et lue dans `api.ts`.

Domaine de production : `https://gameverse.nassimmanseur.fr`

## Variables d'environnement
- `.env.local` (non versionné) pour les valeurs spécifiques front si besoin.

## Déploiement (Vercel)
- Root du projet : `frontend/`
- Build command : `npm run build`
- Output : `dist`
- Domaine custom : `gameverse.nassimmanseur.fr` (CNAME vers Vercel)
- Ajouter `VITE_API_BASE_URL` ou configurer `API_BASE_URL` en dur avant build.
- S'assurer que le domaine est autorisé dans la liste CORS du backend.

## Dépendances principales
- React 19, TypeScript, Vite, Tailwind, React Router, Axios, JWT Decode

## Notes
- Les images doivent être placées dans `assets/images/`.
- CORS backend : autoriser le domaine Vercel du front.

## Améliorations récentes (Jan 2026)
- **RankingPage optimisée** : Chargement rapide des filtres, jeux à la demande avec spinner feedback
- **FavoriteButton unifié** : Composant réutilisable dans SearchPage, AccountInfo, CategoryColumn, GameDetails
- **Suppression du texte descriptif** : Dans le display UI (garde le complet pour l'API)
- **Scroll immédiat** : Feedback UX lors du clic sur un filtre
