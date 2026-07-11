import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import type { InsertTrack } from "@shared/schema";
import * as https from "https";
import * as http from "http";

// Corrected, deduplicated seed tracks — most recent post per thread
const SEED_TRACKS: InsertTrack[] = [
  {
    songTitle: "The Wagtunes Corner",
    artistName: "wagtunes",
    forumMember: "wagtunes",
    mediaUrl: "https://soundcloud.com/steven-wagenheim/through-the-galaxy-reprise",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/66861/the-wagtunes-corner",
    embedCode: "https://w.soundcloud.com/player/?url=https://soundcloud.com/steven-wagenheim/through-the-galaxy-reprise&color=ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false",
    fetchedAt: "2026-07-10T22:13:28+00:00",
  },
  {
    songTitle: "Two notes genome 2.0 demo with backing track",
    artistName: "flo",
    forumMember: "flo",
    mediaUrl: "https://www.youtube.com/watch?v=9-dMvfYPszM",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68997/two-notes-genome-2-0-demo-with-backing-track",
    embedCode: "https://www.youtube.com/embed/9-dMvfYPszM",
    fetchedAt: "2026-07-10T16:14:53+00:00",
  },
  {
    songTitle: "JWM - Electrolytes (Electro House track in Auxy Studio)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://on.soundcloud.com/NEMwNd330xihnXUQWg",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68991/jwm-electrolytes-electro-house-track-in-auxy-studio",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjwmmakerofmusic%2Fjwm-electrolytes%3Fsi%3Ded1de8828bee4a6e9cc8dfb511c55a96%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-07-09T16:22:24+00:00",
  },
  {
    songTitle: "Orphan Nebula",
    artistName: "Dominion_Harmonics",
    forumMember: "Dominion_Harmonics",
    mediaUrl: "https://soundcloud.com/dominion-harmonics/orphan-nebula?si=84afd539bb744b6ea4427fb9532b5784",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68984/orphan-nebula",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dominion-harmonics/orphan-nebula?si=84afd539bb744b6ea4427fb9532b5784&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-07-09T03:51:57+00:00",
  },
  {
    songTitle: "We're not Gentlemen - Sonic Vignette 114",
    artistName: "zvon",
    forumMember: "zvon",
    mediaUrl: "https://www.youtube.com/watch?v=iwNL8tbMLow",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68982/were-not-gentlemen-sonic-vignette-114",
    embedCode: "https://www.youtube.com/embed/iwNL8tbMLow",
    fetchedAt: "2026-07-08T23:52:25+00:00",
  },
  {
    songTitle: "The rumour of sadness and change",
    artistName: "GeoTony",
    forumMember: "GeoTony",
    mediaUrl: "https://soundcloud.com/geotony/372-the-rumour-of-sadness?si=376994bc5a394be387ac65f0640a7f44",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68980/the-rumour-of-sadness-and-change",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/geotony/372-the-rumour-of-sadness?si=376994bc5a394be387ac65f0640a7f44&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-07-08T19:40:04+00:00",
  },
  {
    songTitle: "Strawberry Fields Forever - Nembrini Quinta Pitch Machine",
    artistName: "pbelgium",
    forumMember: "pbelgium",
    mediaUrl: "https://soundcloud.com/pbelgium8/strawberry-fields-forever?si=16239e6cfc274371982baea884345ac0",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68975/strawberry-fields-forever-nembrini-quinta-pitch-machine",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/pbelgium8/strawberry-fields-forever?si=16239e6cfc274371982baea884345ac0&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-07-08T15:01:34+00:00",
  },
  {
    songTitle: "Folk horror with sevenape",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=L3KCaIelWS0",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68973/folk-horror-with-sevenape",
    embedCode: "https://www.youtube.com/embed/L3KCaIelWS0",
    fetchedAt: "2026-07-08T13:19:01+00:00",
  },
  {
    songTitle: "NO SIGNS OF SOREN - New Lady App Trak",
    artistName: "Lady_App_titude",
    forumMember: "Lady_App_titude",
    mediaUrl: "https://www.youtube.com/watch?v=41b5lhitZ74",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68965/no-signs-of-soren-new-lady-app-trak",
    embedCode: "https://www.youtube.com/embed/41b5lhitZ74",
    fetchedAt: "2026-07-07T19:21:31+00:00",
  },
  {
    songTitle: "Finally here, the new collab EP between pBelgium and frenq, Midnight Blues!",
    artistName: "Frenq",
    forumMember: "Frenq",
    mediaUrl: "https://hearthis.at/frenq/midnight-blues-ep",
    mediaType: "hearthis",
    threadUrl: "https://forum.loopypro.com/discussion/68958/finally-here-the-new-collab-ep-between-pbelgium-and-frenq-midnight-blues",
    embedCode: "https://app.hearthis.at/embed/14561941/transparent_black/?",
    fetchedAt: "2026-07-06T15:02:53+00:00",
  },
  {
    songTitle: "Collaboration with sevenape",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=ySCaQYMmTBg",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68957/collaboration-with-sevenape",
    embedCode: "https://www.youtube.com/embed/ySCaQYMmTBg",
    fetchedAt: "2026-07-06T13:30:39+00:00",
  },
  {
    songTitle: "A Rainy Day \u2014 26 y/o pastoral prog, not iOS, eMagic Logic! 400mhz G3 iMac! Take or leave!",
    artistName: "JustinOllman",
    forumMember: "JustinOllman",
    mediaUrl: "https://www.youtube.com/watch?v=zPoNEUsgH9Q",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68953/a-rainy-day-26-y-o-pastoral-prog-not-ios-emagic-logic-400mhz-g3-imac-take-or-leave",
    embedCode: "https://www.youtube.com/embed/zPoNEUsgH9Q",
    fetchedAt: "2026-07-06T02:28:59+00:00",
  },
  {
    songTitle: "Personal Single Hardware Synth Challenge:  First Entry - Roland Aira S-1",
    artistName: "peanut_gallery",
    forumMember: "peanut_gallery",
    mediaUrl: "https://soundcloud.com/peanut_gallery-1/its-summer?si=1a64f2c6f16e4b81894590390dee4de7",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68941/personal-single-hardware-synth-challenge-first-entry-roland-aira-s-1",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/peanut_gallery-1/its-summer?si=1a64f2c6f16e4b81894590390dee4de7&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-07-04T16:45:52+00:00",
  },
  {
    songTitle: "Minimal means",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=olZdbUS3cm4",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68938/minimal-means",
    embedCode: "https://www.youtube.com/embed/olZdbUS3cm4",
    fetchedAt: "2026-07-04T15:36:59+00:00",
  },
  {
    songTitle: "So, a Time Machine then? The Kozyrev Mirrors",
    artistName: "Svetlovska",
    forumMember: "Svetlovska",
    mediaUrl: "https://www.youtube.com/watch?v=HH8rvZhnxRA",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68935/so-a-time-machine-then-the-kozyrev-mirrors",
    embedCode: "https://www.youtube.com/embed/HH8rvZhnxRA",
    fetchedAt: "2026-07-04T11:15:22+00:00",
  },
  {
    songTitle: "Exosphere & B00ga Glitchbient",
    artistName: "id_23",
    forumMember: "id_23",
    mediaUrl: "https://www.youtube.com/watch?v=IsunXtbCGz4",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68934/exosphere-b00ga-glitchbient",
    embedCode: "https://www.youtube.com/embed/IsunXtbCGz4",
    fetchedAt: "2026-07-04T09:53:34+00:00",
  },
  {
    songTitle: "Birth of a Star (Solo, Intimate Cello, Noire, Continua)",
    artistName: "DavidEnglish",
    forumMember: "DavidEnglish",
    mediaUrl: "https://www.youtube.com/watch?v=bu1t0FmhbTY",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68924/birth-of-a-star-solo-intimate-cello-noire-continua",
    embedCode: "https://www.youtube.com/embed/bu1t0FmhbTY",
    fetchedAt: "2026-07-03T17:08:44+00:00",
  },
  {
    songTitle: "Blackbird - Tascam DR-07XP / Does This Guitar Sound Good?",
    artistName: "pbelgium",
    forumMember: "pbelgium",
    mediaUrl: "https://www.youtube.com/watch?v=K28foqwh82g",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68922/blackbird-tascam-dr-07xp-does-this-guitar-sound-good",
    embedCode: "https://www.youtube.com/embed/K28foqwh82g",
    fetchedAt: "2026-07-03T15:07:08+00:00",
  },
  {
    songTitle: "\"Cracked Beat\" (Mr Oizo-inspired House in Auxy Studio)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://on.soundcloud.com/VzbQzv0FZB6V8ArLSi",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68906/cracked-beat-mr-oizo-inspired-house-in-auxy-studio",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjwmmakerofmusic%2Fjwm-cracked-beat%3Fref%3Dclipboard%26p%3Di%26c%3D1%26si%3D14AC6929E5CF440D8D3D7D3773A78968%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-07-02T04:12:49+00:00",
  },
  {
    songTitle: "JWM \"The Neon Gas Cloud in Space\" (EP done in Auxy)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://on.soundcloud.com/thFhCMG1i8KrwiTYXW",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68900/jwm-the-neon-gas-cloud-in-space-ep-done-in-auxy",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjwmmakerofmusic%2Fjwm-the-neon-gas-cloud-in%3Fsi%3D7ccc5fb368204b68891f2738a172b73c%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-07-01T15:08:10+00:00",
  },
  {
    songTitle: "New EP called Weather",
    artistName: "Frenq",
    forumMember: "Frenq",
    mediaUrl: "https://hearthis.at/frenq/weather",
    mediaType: "hearthis",
    threadUrl: "https://forum.loopypro.com/discussion/68896/new-ep-called-weather",
    embedCode: "https://app.hearthis.at/embed/14552298/transparent_black/?",
    fetchedAt: "2026-06-30T21:23:29+00:00",
  },
  {
    songTitle: "JWM's Music Journal June 2026",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://on.soundcloud.com/NeAB5lQlrXfmmJhV3p",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68718/jwms-music-journal-june-2026",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjwmmakerofmusic%2Fjwm-rocket-fuel%3Fsi%3D16daa2bdf139468abd465046bff9a984%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-06-29T17:38:37+00:00",
  },
  {
    songTitle: "My My Hey Hey - Acoustic Cover",
    artistName: "richardyot",
    forumMember: "richardyot",
    mediaUrl: "https://www.youtube.com/watch?v=imOMau-Py-E",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68880/my-my-hey-hey-acoustic-cover",
    embedCode: "https://www.youtube.com/embed/imOMau-Py-E",
    fetchedAt: "2026-06-29T09:20:10+00:00",
  },
  {
    songTitle: "Aix and Pains - Theme for a Not-so-imaginary Adventure Game Show",
    artistName: "AndyHoneybone",
    forumMember: "AndyHoneybone",
    mediaUrl: "https://on.soundcloud.com/X4bEMJvdYAm4dyI212",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68878/aix-and-pains-theme-for-a-not-so-imaginary-adventure-game-show",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fandyhoneybone%2Faix-and-pains-theme-for-a-not%3Fsi%3D47bfba4482694007a7774404209cdd10%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-06-28T19:28:02+00:00",
  },
  {
    songTitle: "New music - Cognizance by CapgrasSick",
    artistName: "CapgrasSick",
    forumMember: "CapgrasSick",
    mediaUrl: "https://www.youtube.com/watch?v=FOTAE6nA8Eo",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68876/new-music-cognizance-by-capgrassick",
    embedCode: "https://www.youtube.com/embed/FOTAE6nA8Eo",
    fetchedAt: "2026-06-28T12:28:20+00:00",
  },
  {
    songTitle: "\"Welcome to the Second Half\" (3-track EP in Auxy Studio)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://on.soundcloud.com/ox5Q4HpMKe8BqkoWR7",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68870/welcome-to-the-second-half-3-track-ep-in-auxy-studio",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjwmmakerofmusic%2Fjwm-welcome-to-the-second-half%3Fsi%3Df1a5c80890b346e9a0f362e444a71c20%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-06-27T17:59:44+00:00",
  },
  {
    songTitle: "\"20 Years Ago\" EP (EP done in Auxy on iPhone)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://on.soundcloud.com/1UktF6KXKdGucIUJYs",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68857/20-years-ago-ep-ep-done-in-auxy-on-iphone",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjwmmakerofmusic%2Fjwm-20-years-ago-ep%3Fsi%3D036fc988878b4679b49e74876eff1c02%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-06-25T10:42:01+00:00",
  },
  {
    songTitle: "New HOT single recording Hei\u00dfes Wetter",
    artistName: "Frenq",
    forumMember: "Frenq",
    mediaUrl: "https://hearthis.at/frenq/heisses-wetter",
    mediaType: "hearthis",
    threadUrl: "https://forum.loopypro.com/discussion/68852/new-hot-single-recording-heisses-wetter",
    embedCode: "https://app.hearthis.at/embed/14524610/transparent_black/?",
    fetchedAt: "2026-06-24T16:18:57+00:00",
  },
  {
    songTitle: "BLACK PULSE a new single recording",
    artistName: "Frenq",
    forumMember: "Frenq",
    mediaUrl: "https://hearthis.at/frenq/black-pulse",
    mediaType: "hearthis",
    threadUrl: "https://forum.loopypro.com/discussion/68835/black-pulse-a-new-single-recording",
    embedCode: "https://app.hearthis.at/embed/14512728/transparent_black/?",
    fetchedAt: "2026-06-23T03:24:39+00:00",
  },
  {
    songTitle: "Fantasy for Cello",
    artistName: "GeoTony",
    forumMember: "GeoTony",
    mediaUrl: "https://soundcloud.com/geotony/370-fantasy-for-cello?si=b52c7eed57df4ac1b52ac1bb2875ed67",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68834/fantasy-for-cello",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/geotony/370-fantasy-for-cello?si=b52c7eed57df4ac1b52ac1bb2875ed67&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-06-22T18:25:34+00:00",
  },
  {
    songTitle: "Sound of Silence - acoustic cover",
    artistName: "richardyot",
    forumMember: "richardyot",
    mediaUrl: "https://www.youtube.com/watch?v=nZivseZxMEM",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68830/sound-of-silence-acoustic-cover",
    embedCode: "https://www.youtube.com/embed/nZivseZxMEM",
    fetchedAt: "2026-06-22T10:40:20+00:00",
  },
  {
    songTitle: "Using Chromosonic as a sequencer",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=uqfjkEQMoeQ",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68828/using-chromosonic-as-a-sequencer",
    embedCode: "https://www.youtube.com/embed/uqfjkEQMoeQ",
    fetchedAt: "2026-06-21T21:10:12+00:00",
  },
  {
    songTitle: "Red Toy Keyboard Springs sample set",
    artistName: "zvon",
    forumMember: "zvon",
    mediaUrl: "https://www.youtube.com/watch?v=Xr2pulioMks",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68827/red-toy-keyboard-springs-sample-set",
    embedCode: "https://www.youtube.com/embed/Xr2pulioMks",
    fetchedAt: "2026-06-21T19:14:31+00:00",
  },
  {
    songTitle: "Luc.A - That beat (Tech house in Korg Gadget 3)",
    artistName: "Luc_A",
    forumMember: "Luc_A",
    mediaUrl: "https://soundcloud.com/luca_production/that-beat?si=01ca63d2fbe4410eaa8cf0a77ca465e5",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68825/luc-a-that-beat-tech-house-in-korg-gadget-3",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/luca_production/that-beat?si=01ca63d2fbe4410eaa8cf0a77ca465e5&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-06-21T16:48:19+00:00",
  },
  {
    songTitle: "A New You! Koala ambient thing",
    artistName: "sevenape",
    forumMember: "sevenape",
    mediaUrl: "https://www.youtube.com/watch?v=z7ZDrvIAgr4",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68821/a-new-you-koala-ambient-thing",
    embedCode: "https://www.youtube.com/embed/z7ZDrvIAgr4",
    fetchedAt: "2026-06-21T12:35:10+00:00",
  },
  {
    songTitle: "undergrowth",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=ub7Q0DRTJn0",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68806/undergrowth",
    embedCode: "https://www.youtube.com/embed/ub7Q0DRTJn0",
    fetchedAt: "2026-06-19T21:41:28+00:00",
  },
  {
    songTitle: "Between (Vital Series: Mallets, Solo, Noire, Omnisphere, Continua)",
    artistName: "DavidEnglish",
    forumMember: "DavidEnglish",
    mediaUrl: "https://www.youtube.com/watch?v=gQmrxuw93Ks",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68803/between-vital-series-mallets-solo-noire-omnisphere-continua",
    embedCode: "https://www.youtube.com/embed/gQmrxuw93Ks",
    fetchedAt: "2026-06-19T17:15:38+00:00",
  },
  {
    songTitle: "Live Band Trio In a Boiler Room (House music)... Part 2",
    artistName: "Etienne",
    forumMember: "Etienne",
    mediaUrl: "https://www.youtube.com/watch?v=sDeOdcPxH8U",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68801/live-band-trio-in-a-boiler-room-house-music-part-2",
    embedCode: "https://www.youtube.com/embed/sDeOdcPxH8U",
    fetchedAt: "2026-06-19T16:12:17+00:00",
  },
  {
    songTitle: "The road to Wigtwizzle",
    artistName: "GeoTony",
    forumMember: "GeoTony",
    mediaUrl: "https://soundcloud.com/geotony/369-the-road-to-wigtwizzle?si=a396ead3f278481da71259bffc92023d",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68799/the-road-to-wigtwizzle",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/geotony/369-the-road-to-wigtwizzle?si=a396ead3f278481da71259bffc92023d&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-06-19T14:53:38+00:00",
  },
  {
    songTitle: "JWM - \"The Geometry of Summer\" (BoC-inspired EP)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://on.soundcloud.com/pWYi26DeluodXShIv4",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68796/jwm-the-geometry-of-summer-boc-inspired-ep",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjwmmakerofmusic%2Fjwm-the-geometry-of-summer-ep%3Fsi%3De013f1de1970486281393aae245ed9f3%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-06-19T01:29:19+00:00",
  },
  {
    songTitle: "\"Electronic Horizons EP\" (Various Electronic Genres)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://on.soundcloud.com/AO4V8V5ISGJNxE4gZK",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68785/electronic-horizons-ep-various-electronic-genres",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjwmmakerofmusic%2Fjwm-electronic-horizons-ep%3Fsi%3D3b24db913bfa4f25a71f7725bcf69867%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-06-18T03:00:05+00:00",
  },
  {
    songTitle: "Ambiotica Sound Demo | No Talking just playing",
    artistName: "TheAudioDabbler",
    forumMember: "TheAudioDabbler",
    mediaUrl: "https://www.youtube.com/watch?v=pv4M0suVB3o",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68781/ambiotica-sound-demo-no-talking-just-playing",
    embedCode: "https://www.youtube.com/embed/pv4M0suVB3o",
    fetchedAt: "2026-06-17T15:23:49+00:00",
  },
  {
    songTitle: "Finally done my new EP 'Nightbound Frequencies'",
    artistName: "Frenq",
    forumMember: "Frenq",
    mediaUrl: "https://hearthis.at/frenq",
    mediaType: "hearthis",
    threadUrl: "https://forum.loopypro.com/discussion/68779/finally-done-my-new-ep-nightbound-frequencies",
    embedCode: null,
    fetchedAt: "2026-06-17T12:03:10+00:00",
  },
  {
    songTitle: "Amalgam [iPad only album]",
    artistName: "unlink",
    forumMember: "unlink",
    mediaUrl: "https://www.youtube.com/watch?v=Ufrck-GY3rQ",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68760/amalgam-ipad-only-album",
    embedCode: "https://www.youtube.com/embed/Ufrck-GY3rQ",
    fetchedAt: "2026-06-15T16:14:08+00:00",
  },
  {
    songTitle: "Vocals only",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=15GPMs6pxlw",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68759/vocals-only",
    embedCode: "https://www.youtube.com/embed/15GPMs6pxlw",
    fetchedAt: "2026-06-15T15:27:13+00:00",
  },
  {
    songTitle: "Water",
    artistName: "GeoTony",
    forumMember: "GeoTony",
    mediaUrl: "https://www.youtube.com/watch?v=oYp6C2_SJus",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68754/water",
    embedCode: "https://www.youtube.com/embed/oYp6C2_SJus",
    fetchedAt: "2026-06-14T20:39:09+00:00",
  },
  {
    songTitle: "Two Chords No Waiting",
    artistName: "Paulieworld",
    forumMember: "Paulieworld",
    mediaUrl: "https://soundcloud.com/paulieworld/two-chords-no-waiting",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68752/two-chords-no-waiting",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/paulieworld/two-chords-no-waiting&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-06-14T15:07:11+00:00",
  },
  {
    songTitle: "Summer time new pickups new jams",
    artistName: "Jmd8928",
    forumMember: "Jmd8928",
    mediaUrl: "https://on.soundcloud.com/XWA5v9zvANRF2812it",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68738/summer-time-new-pickups-new-jams",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjimmyjam8928%2Fsurmmer-days-wav%3Fref%3Dclipboard%26p%3Di%26c%3D1%26si%3D2AE77BF48DF34864873F89321C393700%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-06-13T00:39:34+00:00",
  },
  {
    songTitle: "The new Drone Meditations app",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=mMh83ybQSzQ",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68734/the-new-drone-meditations-app",
    embedCode: "https://www.youtube.com/embed/mMh83ybQSzQ",
    fetchedAt: "2026-06-12T17:39:31+00:00",
  },
  {
    songTitle: "You're Just Not Like That Babe - a collab with Unlink and Jankun",
    artistName: "richardyot",
    forumMember: "richardyot",
    mediaUrl: "https://soundcloud.com/richardyot/youre-just-not-like-that-babe",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68731/youre-just-not-like-that-babe-a-collab-with-unlink-and-jankun",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/richardyot/youre-just-not-like-that-babe&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-06-12T09:20:35+00:00",
  },
  {
    songTitle: "New underground-rock single recording ''Slipped Away\"",
    artistName: "Frenq",
    forumMember: "Frenq",
    mediaUrl: "https://hearthis.at/frenq/slippedaway",
    mediaType: "hearthis",
    threadUrl: "https://forum.loopypro.com/discussion/68708/new-underground-rock-single-recording-slipped-away",
    embedCode: "https://app.hearthis.at/embed/14466504/transparent_black/?",
    fetchedAt: "2026-06-09T13:34:55+00:00",
  },
  {
    songTitle: "5 8 7 9 8 1 2  (Pbelgium and Paulieworld)",
    artistName: "Paulieworld",
    forumMember: "Paulieworld",
    mediaUrl: "https://soundcloud.com/paulieworld/5-8-7-9-8-1-2",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68691/5-8-7-9-8-1-2-pbelgium-and-paulieworld",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/paulieworld/5-8-7-9-8-1-2&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-06-06T17:10:05+00:00",
  },
  {
    songTitle: "Autumn Afternoon (Intimate Violin, Solo, Noire, Velvet Guitar, Continua)",
    artistName: "DavidEnglish",
    forumMember: "DavidEnglish",
    mediaUrl: "https://www.youtube.com/watch?v=T-kMtn37guA",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68687/autumn-afternoon-intimate-violin-solo-noire-velvet-guitar-continua",
    embedCode: "https://www.youtube.com/embed/T-kMtn37guA",
    fetchedAt: "2026-06-05T17:40:25+00:00",
  },
  {
    songTitle: "Dogmerica: chapter 1, Humanity Vanishes",
    artistName: "LinearLineman",
    forumMember: "LinearLineman",
    mediaUrl: "https://www.youtube.com/watch?v=BzPC_b-1eis",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68681/dogmerica-chapter-1-humanity-vanishes",
    embedCode: "https://www.youtube.com/embed/BzPC_b-1eis",
    fetchedAt: "2026-06-04T13:35:11+00:00",
  },
  {
    songTitle: "Dark Psychedelic Ambient Beats with Exosphere & Battalion etc.",
    artistName: "id_23",
    forumMember: "id_23",
    mediaUrl: "https://soundcloud.com/id_23/ghost-atoll-88-swamptingmix",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68672/dark-psychedelic-ambient-beats-with-exosphere-battalion-etc",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/id_23/ghost-atoll-88-swamptingmix&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-06-04T08:44:52+00:00",
  },
  {
    songTitle: "A lot of drones around here lately",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=h2ZVh6mKyC0",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68642/a-lot-of-drones-around-here-lately",
    embedCode: "https://www.youtube.com/embed/h2ZVh6mKyC0",
    fetchedAt: "2026-05-31T18:34:24+00:00",
  },
  {
    songTitle: "Album Release: \"Kiku Dreams: Flukutronic 3\"",
    artistName: "jimhanks",
    forumMember: "jimhanks",
    mediaUrl: "https://www.youtube.com/watch?v=_GtvbEFH5SU",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68635/album-release-kiku-dreams-flukutronic-3",
    embedCode: "https://www.youtube.com/embed/_GtvbEFH5SU",
    fetchedAt: "2026-05-30T15:56:39+00:00",
  },
  {
    songTitle: "Hammering Past The Stop - Omnivocal, SWAM, StaffPad, Cubasis, Cubase",
    artistName: "AndyHoneybone",
    forumMember: "AndyHoneybone",
    mediaUrl: "https://on.soundcloud.com/Pvb3Drb54iwowFjA1P",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68633/hammering-past-the-stop-omnivocal-swam-staffpad-cubasis-cubase",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fandyhoneybone%2Fhammering-past-the-stop-1%3Futm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing%26si%3Dd06b11032da14157818656ef7694f4da&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-05-30T14:27:21+00:00",
  },
  {
    songTitle: "Ambient improvisation.",
    artistName: "flo",
    forumMember: "flo",
    mediaUrl: "https://www.youtube.com/watch?v=R8ZhnncM1B0",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68629/ambient-improvisation",
    embedCode: "https://www.youtube.com/embed/R8ZhnncM1B0",
    fetchedAt: "2026-05-30T10:47:08+00:00",
  },
  {
    songTitle: "Using the new \u201crecord in\u201d feature in Outgrowth",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=YwxASXdhoJQ",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68624/using-the-new-record-in-feature-in-outgrowth",
    embedCode: "https://www.youtube.com/embed/YwxASXdhoJQ",
    fetchedAt: "2026-05-29T15:06:07+00:00",
  },
  {
    songTitle: "Essentia",
    artistName: "pbelgium",
    forumMember: "pbelgium",
    mediaUrl: "https://soundcloud.com/pbelgium8/essentia?si=f9c74a35fed34752be7bcc45e9391bb1",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/68555/essentia",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/pbelgium8/essentia?si=f9c74a35fed34752be7bcc45e9391bb1&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-05-23T14:43:01+00:00",
  },
  {
    songTitle: "\"1 week - 1 minute\" challenge",
    artistName: "vlaoladis",
    forumMember: "vlaoladis",
    mediaUrl: "https://www.youtube.com/watch?v=QQTjTgEMIGg",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68500/1-week-1-minute-challenge",
    embedCode: "https://www.youtube.com/embed/QQTjTgEMIGg",
    fetchedAt: "2026-05-17T21:35:08+00:00",
  },
  {
    songTitle: "June update: lukesleepwalker\u2019s 2026 resolution: a track a month",
    artistName: "lukesleepwalker",
    forumMember: "lukesleepwalker",
    mediaUrl: "https://soundcloud.com/lukesleepwalker-1/march-wav",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/67430/june-update-lukesleepwalker-s-2026-resolution-a-track-a-month",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/lukesleepwalker-1/march-wav&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-01-28T15:18:52+00:00",
  },
  {
    songTitle: "The Offices of Dr. Rabbitfoot",
    artistName: "Drrabbitfoot",
    forumMember: "Drrabbitfoot",
    mediaUrl: "https://www.youtube.com/watch?v=36XeHxY8mEc",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/67232/the-offices-of-dr-rabbitfoot",
    embedCode: "https://www.youtube.com/embed/36XeHxY8mEc",
    fetchedAt: "2026-01-08T13:57:28+00:00",
  },
  {
    songTitle: "Staffpad Sketches",
    artistName: "McD",
    forumMember: "McD",
    mediaUrl: "https://soundcloud.com/user-403688328/arabesque-4-wav?si=1306f0cf483443b4ab37c626a5096a50",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/47651/staffpad-sketches",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-403688328/arabesque-4-wav?si=1306f0cf483443b4ab37c626a5096a50&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2021-11-01T03:13:43+00:00",
  }
];

function seedIfEmpty() {
  const existing = storage.getAllTracks();
  if (existing.length === 0) {
    storage.replaceAllTracks(SEED_TRACKS);
    console.log("[radio] Seeded", SEED_TRACKS.length, "tracks.");
  }
}

function fetchHtml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; LoopyProRadio/1.0)" } }, (res) => {
      // Follow redirects
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchHtml(res.headers.location).then(resolve).catch(reject);
      }
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    });
    req.on("error", reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error("timeout")); });
  });
}

async function refreshFromForum(): Promise<InsertTrack[]> {
  console.log("[radio] Refreshing from forum...");
  const html = await fetchHtml("https://forum.loopypro.com/categories/creations");

  const linkRegex = /href="(\/discussion\/\d+\/[^"?#]+)"/g;
  const seen = new Set<string>();
  const links: string[] = [];
  let m;
  while ((m = linkRegex.exec(html)) !== null) {
    const path = m[1];
    if (!seen.has(path)) { seen.add(path); links.push("https://forum.loopypro.com" + path); }
  }

  const now = "2026-04-08T00:00:00.000Z";
  const results: InsertTrack[] = [];

  for (const link of links.slice(0, 35)) {
    try {
      const tHtml = await fetchHtml(link);
      const ogTitle = tHtml.match(/<meta property="og:title" content="([^"]+)"/)?.[1] ?? "";
      const songTitle = ogTitle.replace(/\s*[—–-]\s*Loopy Pro Forum\s*$/, "").trim() || "Untitled";
      const authorMatch = tHtml.match(/<meta name="author" content="([^"]+)"/);
      const forumMember = authorMatch?.[1] ?? "Unknown";

      // Find all SC player URLs in the page (last one = most recent)
      const scPlayers = [...tHtml.matchAll(/https?:\/\/w\.soundcloud\.com\/player\/\?[^\s"'<>]+/g)];
      // Find all YT embeds (last one = most recent)
      const ytEmbeds = [...tHtml.matchAll(/https?:\/\/(?:www\.)?youtube\.com\/embed\/([A-Za-z0-9_-]{11})/g)];
      const ytWatchUrls = [...tHtml.matchAll(/https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/g)];
      const hearthisUrls = [...tHtml.matchAll(/https?:\/\/(?:hearthis\.at|app\.hearthis\.at)\/[^\s"'<>)]+/g)];
      const scDirectUrls = [...tHtml.matchAll(/https?:\/\/(?:on\.)?soundcloud\.com\/[^\s"'<>)&]+/g)];

      let mediaUrl = "";
      let mediaType = "";
      let embedCode: string | null = null;

      if (scPlayers.length > 0) {
        // Use the last SC player widget (most recent post)
        const raw = scPlayers[scPlayers.length - 1][0].replace(/&amp;/g, "&");
        embedCode = raw;
        mediaType = "soundcloud";
        // Extract track URL from embed
        const urlParam = raw.match(/url=([^&]+)/)?.[1];
        mediaUrl = urlParam ? decodeURIComponent(urlParam) : (scDirectUrls[scDirectUrls.length - 1]?.[0] ?? raw);
      } else if (ytEmbeds.length > 0) {
        const vid = ytEmbeds[ytEmbeds.length - 1][1];
        mediaUrl = `https://www.youtube.com/watch?v=${vid}`;
        embedCode = `https://www.youtube.com/embed/${vid}`;
        mediaType = "youtube";
      } else if (ytWatchUrls.length > 0) {
        const vid = ytWatchUrls[ytWatchUrls.length - 1][1];
        mediaUrl = `https://www.youtube.com/watch?v=${vid}`;
        embedCode = `https://www.youtube.com/embed/${vid}`;
        mediaType = "youtube";
      } else if (hearthisUrls.length > 0) {
        mediaUrl = hearthisUrls[hearthisUrls.length - 1][0];
        mediaType = "hearthis";
      } else if (scDirectUrls.length > 0) {
        mediaUrl = scDirectUrls[scDirectUrls.length - 1][0];
        mediaType = "soundcloud";
      } else {
        continue; // No audio found
      }

      results.push({ songTitle, artistName: forumMember, forumMember, mediaUrl, mediaType, threadUrl: link, embedCode, fetchedAt: now });
    } catch (e) {
      console.warn("[radio] Failed:", link, (e as Error).message);
    }
  }
  return results;
}

export async function registerRoutes(httpServer: Server, app: Express) {
  seedIfEmpty();

  app.get("/api/tracks", (_req, res) => {
    res.json(storage.getAllTracks());
  });

  app.get("/api/tracks/status", (_req, res) => {
    res.json({ fetchedAt: storage.getLastFetchedAt(), count: storage.getAllTracks().length });
  });

  app.post("/api/tracks/refresh", async (_req, res) => {
    try {
      const fresh = await refreshFromForum();
      if (fresh.length >= 5) {
        storage.replaceAllTracks(fresh);
        res.json({ success: true, count: fresh.length, fetchedAt: "2026-04-08T00:00:00.000Z" });
      } else {
        res.json({ success: false, message: `Only ${fresh.length} tracks found, keeping existing data.` });
      }
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });
}
