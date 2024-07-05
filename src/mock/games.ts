import { HttpResponse, http } from 'msw';

const data = [
  {
    appid: 289070,
    name: 'Total War: ROME II - Emperor Edition',
  },
  {
    appid: 440,
    name: "Assassin's Creed IV Black Flag",
  },
  {
    appid: 570,
    name: 'Cities: Skylines',
  },
  {
    appid: 262060,
    name: 'Darkest Dungeon®',
  },
  {
    appid: 275850,
    name: "No Man's Sky",
  },
  {
    appid: 282070,
    name: 'This War of Mine',
  },
  {
    appid: 285330,
    name: 'RollerCoaster Tycoon 2: Triple Thrill Pack',
  },
  {
    appid: 289070,
    name: "Sid Meier's Civilization VI",
  },
  {
    appid: 289650,
    name: "Assassin's Creed Unity",
  },
  {
    appid: 292030,
    name: 'The Witcher 3: Wild Hunt',
  },
  {
    appid: 294100,
    name: 'RimWorld',
  },
  {
    appid: 323190,
    name: 'Frostpunk',
  },
  {
    appid: 325610,
    name: 'Total War: ATTILA',
  },
  {
    appid: 364360,
    name: 'Total War: WARHAMMER',
  },
  {
    appid: 368500,
    name: "Assassin's Creed Syndicate",
  },
  {
    appid: 379430,
    name: 'Kingdom Come: Deliverance',
  },
  {
    appid: 431960,
    name: 'Wallpaper Engine',
  },
  {
    appid: 435150,
    name: 'Divinity: Original Sin 2',
  },
  {
    appid: 435400,
    name: 'Hidden Folks',
  },
  {
    appid: 492720,
    name: 'Tropico 6',
  },
  {
    appid: 493340,
    name: 'Planet Coaster',
  },
  {
    appid: 518790,
    name: 'theHunter: Call of the Wild™',
  },
  {
    appid: 578080,
    name: 'PUBG: BATTLEGROUNDS',
  },
  {
    appid: 582160,
    name: "Assassin's Creed Origins",
  },
  {
    appid: 594570,
    name: 'Total War: WARHAMMER II',
  },
  {
    appid: 604540,
    name: 'Empire of Sin',
  },
  {
    appid: 610370,
    name: 'Desperados III',
  },
  {
    appid: 632470,
    name: 'Disco Elysium',
  },
  {
    appid: 712100,
    name: 'A Total War Saga: Thrones of Britannia',
  },
  {
    appid: 728880,
    name: 'Overcooked! 2',
  },
  {
    appid: 779340,
    name: 'Total War: THREE KINGDOMS',
  },
  {
    appid: 812140,
    name: "Assassin's Creed Odyssey",
  },
  {
    appid: 814380,
    name: 'Sekiro™: Shadows Die Twice',
  },
  {
    appid: 892970,
    name: 'Valheim',
  },
  {
    appid: 911400,
    name: "Assassin's Creed III Remastered",
  },
  {
    appid: 990080,
    name: 'Hogwarts Legacy',
  },
  {
    appid: 1086940,
    name: "Baldur's Gate 3",
  },
  {
    appid: 1091500,
    name: 'Cyberpunk 2077',
  },
  {
    appid: 1097150,
    name: 'Fall Guys',
  },
  {
    appid: 1129580,
    name: 'Medieval Dynasty',
  },
  {
    appid: 1151640,
    name: 'Horizon Zero Dawn™ Complete Edition',
  },
  {
    appid: 1158310,
    name: 'Crusader Kings III',
  },
  {
    appid: 1203620,
    name: 'Enshrouded',
  },
  {
    appid: 1235140,
    name: 'Yakuza: Like a Dragon',
  },
  {
    appid: 1238810,
    name: 'Battlefield™ V',
  },
  {
    appid: 1238840,
    name: 'Battlefield 1 ™',
  },
  {
    appid: 1238860,
    name: 'Battlefield 4™ ',
  },
  {
    appid: 1331550,
    name: 'Big Ambitions',
  },
  {
    appid: 1363080,
    name: 'Manor Lords',
  },
  {
    appid: 1404210,
    name: 'Red Dead Online',
  },
  {
    appid: 1426210,
    name: 'It Takes Two',
  },
  {
    appid: 1509510,
    name: 'Settlement Survival',
  },
  {
    appid: 1517290,
    name: 'Battlefield™ 2042',
  },
  {
    appid: 1527950,
    name: 'Wartales',
  },
  {
    appid: 1593500,
    name: 'God of War',
  },
  {
    appid: 1623730,
    name: 'Palworld',
  },
  {
    appid: 1868140,
    name: 'DAVE THE DIVER',
  },
  {
    appid: 1904540,
    name: 'Football Manager 2023',
  },
  {
    appid: 2215430,
    name: "Ghost of Tsushima DIRECTOR'S CUT",
  },
  {
    appid: 2252570,
    name: 'Football Manager 2024',
  },
];

export const games = http.get('http://localhost:9999/game', () => {
  return HttpResponse.json(
    { data },
    {
      status: 200,
    },
  );
});
