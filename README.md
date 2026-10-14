# Arcadia — site du groupe (Next.js + Remotion)

Site vitrine du groupe Arcadia : ligne d'horizon de Casablanca animée (Remotion), résidences qui se
dessinent au scroll, méthode, demande de visite privée. Trilingue FR / AR / EN avec mise en page RTL.
La charte complète (stratégie, couleurs, typo, ton, direction photo) est dans `design.md`.

## Lancer en local
    npm install
    npm run dev        # http://localhost:3000

## À compléter
| Quoi | Où |
|---|---|
| Téléphone, adresse, e-mail, WhatsApp, année, architecte | `lib/data.ts` → `SITE` |
| Nombre d'appartements, livraison, avancement par résidence | `lib/data.ts` → `PROJECTS` |
| Textes FR / AR / EN | `lib/i18n.ts` (faire relire l'arabe) |
| Destination des demandes (aujourd'hui rien n'est stocké) | `app/api/contact/route.ts` |

## Films
`components/film/` contient les compositions Remotion jouées dans la page. Le dossier `arcadia-film`
permet de les ouvrir dans Remotion Studio (`npm run dev`) et d'exporter des MP4 (Reels, pubs).
Licence Remotion : gratuite jusqu'à 3 personnes dans l'entreprise.
