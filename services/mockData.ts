import { Game } from '../types';

export const mockData: { games: Game[] } = {
    "games": [
    {
        "game_id": 1,
        "title": "Grand Theft Auto V",
        "description": { 
            "fr": "Grand Theft Auto V est un vaste jeu en monde ouvert qui se déroule à Los Santos...",
            "en": "Grand Theft Auto V is a vast open world game set in Los Santos..."
        },
        "platforms": ["PC", "PlayStation 3", "Xbox 360", "PlayStation 4", "Xbox One"],
        "genres": { 
            "fr": ["Tir", "Course", "Aventure"],
            "en": ["Shooter", "Racing", "Adventure"]
        },
        "cover": {
            "thumb": "//images.igdb.com/igdb/image/upload/t_thumb/co2lbd.jpg",
            "original": "//images.igdb.com/igdb/image/upload/t_original/co2lbd.jpg"
        },
        "developers": ["Rockstar North"],
        "publishers": ["Rockstar Games", "Take-Two Interactive"],
        "artworks": [
            { "thumb": "//images.igdb.com/igdb/image/upload/t_thumb/gtng284ejjted82pncis.jpg", "original": "//images.igdb.com/igdb/image/upload/t_original/gtng284ejjted82pncis.jpg" }
        ],
        "themes": { "fr": ["Action", "Monde ouvert"], "en": ["Action", "Open World"] },
        "videos": ["https://www.youtube.com/watch?v=QkkoHAzjnUs"],
        "release_date": "2013-09-17",
        "added": 500
    },
    {
        "game_id": 3,
        "title": "Portal 2",
        "description": {
            "fr": "Suite du jeu acclamé Portal (2007), Portal 2 met en scène la protagoniste du jeu original...",
            "en": "Sequel to the acclaimed Portal (2007)..."
        },
        "platforms": ["PC", "Xbox 360", "PlayStation 3"],
        "genres": {
            "fr": ["Plateforme", "Puzzle", "Aventure"],
            "en": ["Platform", "Puzzle", "Adventure"]
        },
        "cover": { "thumb": "//images.igdb.com/igdb/image/upload/t_thumb/co1rs4.jpg", "original": "//images.igdb.com/igdb/image/upload/t_original/co1rs4.jpg" },
        "developers": ["Valve"],
        "publishers": ["Valve"],
        "artworks": [{ "thumb": "//images.igdb.com/igdb/image/upload/t_thumb/arsj0.jpg", "original": "//images.igdb.com/igdb/image/upload/t_original/arsj0.jpg" }],
        "themes": { "fr": ["Science-fiction"], "en": ["Sci-Fi"] },
        "videos": ["https://www.youtube.com/watch?v=mC_u9ZwlIUc"],
        "release_date": "2011-04-18",
        "added": 450
    },
    {
        "game_id": 10,
        "title": "Assassin's Creed II",
        "description": {
            "fr": "Découvrez une histoire fascinante et épique de pouvoir, de vengeance et de conspiration...",
            "en": "Discover an intriguing and epic story of power..."
        },
        "platforms": ["PC", "PlayStation 3", "Xbox 360"],
        "genres": {
            "fr": ["Aventure", "Action"],
            "en": ["Adventure", "Action"]
        },
        "cover": { "thumb": "//images.igdb.com/igdb/image/upload/t_thumb/co1rcf.jpg", "original": "//images.igdb.com/igdb/image/upload/t_original/co1rcf.jpg" },
        "developers": ["Ubisoft Montreal"],
        "publishers": ["Ubisoft"],
        "themes": { "fr": ["Historique", "Infiltration"], "en": ["Historical", "Stealth"] },
        "videos": ["https://www.youtube.com/watch?v=mVWhWsgHzKM"],
        "release_date": "2009-11-17",
        "added": 400
    },
    {
        "game_id": 44,
        "title": "Hollow Knight",
        "description": {
            "fr": "Forge ton propre chemin dans Hollow Knight ! Une aventure épique à travers un vaste royaume...",
            "en": "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom..."
        },
        "platforms": ["PC", "Switch", "PS4", "Xbox One"],
        "genres": {
            "fr": ["Plateforme", "Indépendant", "Aventure"],
            "en": ["Platform", "Indie", "Adventure"]
        },
        "cover": { "thumb": "//images.igdb.com/igdb/image/upload/t_thumb/co93cr.jpg", "original": "//images.igdb.com/igdb/image/upload/t_original/co93cr.jpg" },
        "developers": ["Team Cherry"],
        "publishers": ["Team Cherry"],
        "themes": { "fr": ["Fantaisie"], "en": ["Fantasy"] },
        "videos": ["https://www.youtube.com/watch?v=UAO2urG23S4"],
        "release_date": "2017-02-24",
        "added": 350
    },
    {
        "game_id": 55,
        "title": "Inside",
        "description": {
            "fr": "Traqué et seul, un garçon se retrouve entraîné au centre d'un projet sombre...",
            "en": "Hunted and alone, a boy finds himself drawn into the center of a dark project."
        },
        "platforms": ["PC", "Switch", "PS4", "Xbox One"],
        "genres": {
            "fr": ["Plateforme", "Indépendant", "Puzzle"],
            "en": ["Platform", "Indie", "Puzzle"]
        },
        "cover": { "thumb": "//images.igdb.com/igdb/image/upload/t_thumb/co2fca.jpg", "original": "//images.igdb.com/igdb/image/upload/t_original/co2fca.jpg" },
        "developers": ["Playdead"],
        "publishers": ["Playdead"],
        "themes": { "fr": ["Horreur"], "en": ["Horror"] },
        "videos": ["https://www.youtube.com/watch?v=yTmldJxQMtE"],
        "release_date": "2016-06-29",
        "added": 300
    },
    {
        "game_id": 49,
        "title": "Super Mario Odyssey",
        "description": {
            "fr": "Explorez des lieux incroyables loin du Royaume Champignon...",
            "en": "Explore incredible places far from the Mushroom Kingdom..."
        },
        "platforms": ["Switch"],
        "genres": {
            "fr": ["Plateforme", "Aventure"],
            "en": ["Platform", "Adventure"]
        },
        "cover": { "thumb": "//images.igdb.com/igdb/image/upload/t_thumb/co1mxf.jpg", "original": "//images.igdb.com/igdb/image/upload/t_original/co1mxf.jpg" },
        "developers": ["Nintendo"],
        "publishers": ["Nintendo"],
        "themes": { "fr": ["Fantaisie"], "en": ["Fantasy"] },
        "videos": ["https://www.youtube.com/watch?v=5kcdRBHM7kM"],
        "release_date": "2017-10-27",
        "added": 480
    },
    {
        "game_id": 100,
        "title": "Hades",
        "description": {
            "fr": "Défiez le dieu des morts en vous frayant un chemin hors des Enfers...",
            "en": "Defy the god of the dead as you hack and slash out of the Underworld..."
        },
        "platforms": ["PC", "Switch"],
        "genres": {
            "fr": ["Indépendant", "Action", "RPG"],
            "en": ["Indie", "Action", "RPG"]
        },
        "cover": { "thumb": "https://images.igdb.com/igdb/image/upload/t_thumb/co2mz1.jpg", "original": "https://images.igdb.com/igdb/image/upload/t_original/co2mz1.jpg" },
        "developers": ["Supergiant Games"],
        "publishers": ["Supergiant Games"],
        "themes": { "fr": ["Mythologie"], "en": ["Mythology"] },
        "videos": [],
        "release_date": "2020-09-17",
        "added": 420
    }
    ]
};
