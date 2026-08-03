import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import type { InsertTrack } from "@shared/schema";
import * as https from "https";
import * as http from "http";

// Corrected, deduplicated seed tracks — most recent post per thread
const SEED_TRACKS: InsertTrack[] = [
  {
    songTitle: "A Particle Chimes workout",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=y5ObHO3Z7zM",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69179/a-particle-chimes-workout",
    embedCode: "https://www.youtube.com/embed/y5ObHO3Z7zM",
    fetchedAt: "2026-08-03T18:40:27+00:00",
  },
  {
    songTitle: "Pilgrim Circuit",
    artistName: "Dominion_Harmonics",
    forumMember: "Dominion_Harmonics",
    mediaUrl: "https://soundcloud.com/dominion-harmonics/pilgrim-circuit?si=38c79fd24d87471fbbbffae6f5762bf3",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69171/pilgrim-circuit",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dominion-harmonics/pilgrim-circuit?si=38c79fd24d87471fbbbffae6f5762bf3&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-08-03T03:10:34+00:00",
  },
  {
    songTitle: "New track from the upcoming Rivers2 EP: De Iesselt",
    artistName: "Frenq",
    forumMember: "Frenq",
    mediaUrl: "https://hearthis.at/frenq/de-iesselt",
    mediaType: "hearthis",
    threadUrl: "https://forum.loopypro.com/discussion/69168/new-track-from-the-upcoming-rivers2-ep-de-iesselt",
    embedCode: "https://app.hearthis.at/embed/14609564/transparent_black/?",
    fetchedAt: "2026-08-02T18:52:31+00:00",
  },
  {
    songTitle: "The Ninth Hour",
    artistName: "Paulieworld",
    forumMember: "Paulieworld",
    mediaUrl: "https://soundcloud.com/paulieworld/the-ninth-hour",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69166/the-ninth-hour",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/paulieworld/the-ninth-hour&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-08-02T15:55:44+00:00",
  },
  {
    songTitle: "A Wail of a time",
    artistName: "GeoTony",
    forumMember: "GeoTony",
    mediaUrl: "https://soundcloud.com/geotony/375-a-wail-of-a-time?si=4805c3ab134943268f91be0ddd6a4327",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69165/a-wail-of-a-time",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/geotony/375-a-wail-of-a-time?si=4805c3ab134943268f91be0ddd6a4327&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-08-02T15:54:58+00:00",
  },
  {
    songTitle: "Slowly I Turned",
    artistName: "Paulieworld",
    forumMember: "Paulieworld",
    mediaUrl: "https://soundcloud.com/paulieworld/slowly-i-turned",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69163/slowly-i-turned",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/paulieworld/slowly-i-turned&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-08-02T15:15:02+00:00",
  },
  {
    songTitle: "Song for Flute and Piano (Swam Variflute, Pure Piano)",
    artistName: "belldu",
    forumMember: "belldu",
    mediaUrl: "https://soundcloud.com/user-154254/song-for-flute-and-piano?si=0079a9ae8cec4bde86f0058d7c78c07b&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69155/song-for-flute-and-piano-swam-variflute-pure-piano",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fuser-154254%2Fsong-for-flute-and-piano%3Fsi%3D0079a9ae8cec4bde86f0058d7c78c07b%26amp%3Butm_source%3Dclipboard%26amp%3Butm_medium%3Dtext%26amp%3Butm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-08-01T18:35:42+00:00",
  },
  {
    songTitle: "Ocean Currents (Desolate Guitar, Velvet Guitar, Noire, Continua)",
    artistName: "DavidEnglish",
    forumMember: "DavidEnglish",
    mediaUrl: "https://www.youtube.com/watch?v=ILF5GDxVR48",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69152/ocean-currents-desolate-guitar-velvet-guitar-noire-continua",
    embedCode: "https://www.youtube.com/embed/ILF5GDxVR48",
    fetchedAt: "2026-07-31T17:11:22+00:00",
  },
  {
    songTitle: "Chariots of Fire iPad cover- dedicated to AnalogMatthew",
    artistName: "DMfan",
    forumMember: "DMfan",
    mediaUrl: "https://www.youtube.com/watch?v=l7uZdcsE25o",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69141/chariots-of-fire-ipad-cover-dedicated-to-analogmatthew",
    embedCode: "https://www.youtube.com/embed/l7uZdcsE25o",
    fetchedAt: "2026-07-30T18:39:23+00:00",
  },
  {
    songTitle: "Svetslovska did the heavy lifting",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=J0fKhOEYqwY",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69135/svetslovska-did-the-heavy-lifting",
    embedCode: "https://www.youtube.com/embed/J0fKhOEYqwY",
    fetchedAt: "2026-07-30T14:20:46+00:00",
  },
  {
    songTitle: "First go with DelayScaper: Fluvial",
    artistName: "Svetlovska",
    forumMember: "Svetlovska",
    mediaUrl: "https://soundcloud.com/irena-svetlovska/fluvial?si=ea268aa5e63646798bead1bfcfa9f44f",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69133/first-go-with-delayscaper-fluvial",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/irena-svetlovska/fluvial?si=ea268aa5e63646798bead1bfcfa9f44f&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-07-30T12:20:43+00:00",
  },
  {
    songTitle: "\u201cSupernatural Intelligence\u201d",
    artistName: "McD",
    forumMember: "McD",
    mediaUrl: "https://soundcloud.com/user-403688328/supernatural-intelligence?si=10eaa92d279041b9a016070540c825b7",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69131/supernatural-intelligence",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-403688328/supernatural-intelligence?si=10eaa92d279041b9a016070540c825b7&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-07-30T03:54:41+00:00",
  },
  {
    songTitle: "This one is punctuated with voices",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=wMRtB-vYGG4",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69115/this-one-is-punctuated-with-voices",
    embedCode: "https://www.youtube.com/embed/wMRtB-vYGG4",
    fetchedAt: "2026-07-28T18:08:29+00:00",
  },
  {
    songTitle: "And now for something completely different 2 a new EP!",
    artistName: "Frenq",
    forumMember: "Frenq",
    mediaUrl: "https://hearthis.at/frenq",
    mediaType: "hearthis",
    threadUrl: "https://forum.loopypro.com/discussion/69110/and-now-for-something-completely-different-2-a-new-ep",
    embedCode: null,
    fetchedAt: "2026-07-27T01:28:12+00:00",
  },
  {
    songTitle: "Remembering Jaco Pastorius",
    artistName: "Paulieworld",
    forumMember: "Paulieworld",
    mediaUrl: "https://soundcloud.com/paulieworld/random-excess",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69107/remembering-jaco-pastorius",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/paulieworld/random-excess&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-07-26T14:31:26+00:00",
  },
  {
    songTitle: "A very minimal, ambient thing I made in koala.",
    artistName: "sevenape",
    forumMember: "sevenape",
    mediaUrl: "https://www.youtube.com/watch?v=xjZAQzD-3lc",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69106/a-very-minimal-ambient-thing-i-made-in-koala",
    embedCode: "https://www.youtube.com/embed/xjZAQzD-3lc",
    fetchedAt: "2026-07-26T13:01:30+00:00",
  },
  {
    songTitle: "New licensed Videogame covers, dedicated to a departed friend",
    artistName: "Fear2Stop",
    forumMember: "Fear2Stop",
    mediaUrl: "https://www.youtube.com/watch?v=9cliiZwGD9c",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69102/new-licensed-videogame-covers-dedicated-to-a-departed-friend",
    embedCode: "https://www.youtube.com/embed/9cliiZwGD9c",
    fetchedAt: "2026-07-26T03:56:28+00:00",
  },
  {
    songTitle: "My breath comes out like smoke",
    artistName: "barabajagal",
    forumMember: "barabajagal",
    mediaUrl: "https://soundcloud.com/barabajagal74/my-breath-comes-out-like-smoke",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69095/my-breath-comes-out-like-smoke",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/barabajagal74/my-breath-comes-out-like-smoke&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-07-24T13:48:59+00:00",
  },
  {
    songTitle: "Memory Corruption - Tessera/Continua et al",
    artistName: "id_23",
    forumMember: "id_23",
    mediaUrl: "https://www.youtube.com/watch?v=mkQA5Hw13qc",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69089/memory-corruption-tessera-continua-et-al",
    embedCode: "https://www.youtube.com/embed/mkQA5Hw13qc",
    fetchedAt: "2026-07-23T18:19:05+00:00",
  },
  {
    songTitle: "The Musical Mandala - Loopy Loop #1",
    artistName: "Mr_Mandala",
    forumMember: "Mr_Mandala",
    mediaUrl: "https://www.youtube.com/watch?v=quDlGxGvz90",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69082/the-musical-mandala-loopy-loop-1",
    embedCode: "https://www.youtube.com/embed/quDlGxGvz90",
    fetchedAt: "2026-07-22T19:36:41+00:00",
  },
  {
    songTitle: "The careless waste of time",
    artistName: "GeoTony",
    forumMember: "GeoTony",
    mediaUrl: "https://www.youtube.com/watch?v=aPZmc0OLD2s",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69081/the-careless-waste-of-time",
    embedCode: "https://www.youtube.com/embed/aPZmc0OLD2s",
    fetchedAt: "2026-07-22T19:23:25+00:00",
  },
  {
    songTitle: "AlchemDie and Outgrowth",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://soundcloud.com/irena-svetlovska/from-a-lyra-8?si=d6da748458f145b59b1fb41233f9948b",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69077/alchemdie-and-outgrowth",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/irena-svetlovska/from-a-lyra-8?si=d6da748458f145b59b1fb41233f9948b&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-07-22T11:39:14+00:00",
  },
  {
    songTitle: "Reverie Pro first go: The Sprawl",
    artistName: "Svetlovska",
    forumMember: "Svetlovska",
    mediaUrl: "https://soundcloud.com/irena-svetlovska/the-sprawl?si=1a6fd144feb04ec197776b482f1a5cb8",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69076/reverie-pro-first-go-the-sprawl",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/irena-svetlovska/the-sprawl?si=1a6fd144feb04ec197776b482f1a5cb8&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-07-22T10:33:49+00:00",
  },
  {
    songTitle: "Moment in Time.Improvisation.Two rock NAM PROFILE.",
    artistName: "flo",
    forumMember: "flo",
    mediaUrl: "https://www.youtube.com/watch?v=IjWBk77Y6SY",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69063/moment-in-time-improvisation-two-rock-nam-profile",
    embedCode: "https://www.youtube.com/embed/IjWBk77Y6SY",
    fetchedAt: "2026-07-20T17:20:58+00:00",
  },
  {
    songTitle: "Luc.A - Kaldoo (Tribal-Tech house in Korg Gadget)",
    artistName: "Luc_A",
    forumMember: "Luc_A",
    mediaUrl: "https://soundcloud.com/luca_production/kaldoo?si=8eea3da17fcb499caf74ed9cab40ff83",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69062/luc-a-kaldoo-tribal-tech-house-in-korg-gadget",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/luca_production/kaldoo?si=8eea3da17fcb499caf74ed9cab40ff83&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-07-20T17:05:28+00:00",
  },
  {
    songTitle: "First Contact (Solo, Intimate Cello, Jaeger, Velvet Guitar, Noire, Vital Series: Mallets, Continua)",
    artistName: "DavidEnglish",
    forumMember: "DavidEnglish",
    mediaUrl: "https://www.youtube.com/watch?v=D2nthMGdb_k",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69046/first-contact-solo-intimate-cello-jaeger-velvet-guitar-noire-vital-series-mallets-continua",
    embedCode: "https://www.youtube.com/embed/D2nthMGdb_k",
    fetchedAt: "2026-07-17T17:18:28+00:00",
  },
  {
    songTitle: "England vs France",
    artistName: "GeoTony",
    forumMember: "GeoTony",
    mediaUrl: "https://www.youtube.com/watch?v=bgQSoBwEujo",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69045/england-vs-france",
    embedCode: "https://www.youtube.com/embed/bgQSoBwEujo",
    fetchedAt: "2026-07-16T19:41:16+00:00",
  },
  {
    songTitle: "JWM - Reconnected (TripHop in Auxy Studio)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://on.soundcloud.com/Y25qIbnQ0y9utbQmlu",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69039/jwm-reconnected-triphop-in-auxy-studio",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjwmmakerofmusic%2Fjwm-reconnected%3Fsi%3D52da4e3fff6046c891971e812a930b1c%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-07-16T03:12:23+00:00",
  },
  {
    songTitle: "Two jams for the price of one\ud83d\ude09.",
    artistName: "flo",
    forumMember: "flo",
    mediaUrl: "https://www.youtube.com/watch?v=PO5gY4e_kfo",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69026/two-jams-for-the-price-of-one",
    embedCode: "https://www.youtube.com/embed/PO5gY4e_kfo",
    fetchedAt: "2026-07-14T19:02:35+00:00",
  },
  {
    songTitle: "Genome 2.0 Fuzz demo with Marshall (paradex).",
    artistName: "flo",
    forumMember: "flo",
    mediaUrl: "https://www.youtube.com/watch?v=mWGsO1y8BOA",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69020/genome-2-0-fuzz-demo-with-marshall-paradex",
    embedCode: "https://www.youtube.com/embed/mWGsO1y8BOA",
    fetchedAt: "2026-07-13T14:18:49+00:00",
  },
  {
    songTitle: "Chlorine X - Cataclysm of Smoke, Ash and Fire",
    artistName: "Johanso",
    forumMember: "Johanso",
    mediaUrl: "https://www.youtube.com/watch?v=qeuG843QM64",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69007/chlorine-x-cataclysm-of-smoke-ash-and-fire",
    embedCode: "https://www.youtube.com/embed/qeuG843QM64",
    fetchedAt: "2026-07-11T17:03:31+00:00",
  },
  {
    songTitle: "JWM - What Are You Lookin At (90s-styled House in Auxy Studio)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://on.soundcloud.com/AB0h5A3GCqAQE8zaIl",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69006/jwm-what-are-you-lookin-at-90s-styled-house-in-auxy-studio",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjwmmakerofmusic%2Fjwm-what-are-you-lookin-at%3Fsi%3Db19ad921f03742f8ac3e9dfae72fccab%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-07-11T14:56:09+00:00",
  },
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
    mediaUrl: "https://www.youtube.com/watch?v=JhnzXRyW9bA",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68973/folk-horror-with-sevenape",
    embedCode: "https://www.youtube.com/embed/JhnzXRyW9bA",
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
    songTitle: "Ambiotica Sound Demo | New Tutorial and sound demo Videos",
    artistName: "TheAudioDabbler",
    forumMember: "TheAudioDabbler",
    mediaUrl: "https://www.youtube.com/watch?v=qsTllWJeR0g",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68781/ambiotica-sound-demo-new-tutorial-and-sound-demo-videos",
    embedCode: "https://www.youtube.com/embed/qsTllWJeR0g",
    fetchedAt: "2026-06-17T15:23:49+00:00",
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
    songTitle: "Mojotele65/Elet Ojom\u2019s Music - 2026",
    artistName: "Mojotele65",
    forumMember: "Mojotele65",
    mediaUrl: "https://www.youtube.com/watch?v=wivU7WS81fM",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68267/mojotele65-elet-ojom-s-music-2026",
    embedCode: "https://www.youtube.com/embed/wivU7WS81fM",
    fetchedAt: "2026-04-24T12:21:55+00:00",
  },
  {
    songTitle: "Music and Action for Peace!",
    artistName: "zvon",
    forumMember: "zvon",
    mediaUrl: "https://www.youtube.com/watch?v=sm88ePdaqro",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/68100/music-and-action-for-peace",
    embedCode: "https://www.youtube.com/embed/sm88ePdaqro",
    fetchedAt: "2026-04-08T20:50:10+00:00",
  },
  {
    songTitle: "July update: lukesleepwalker\u2019s 2026 resolution: a track a month",
    artistName: "lukesleepwalker",
    forumMember: "lukesleepwalker",
    mediaUrl: "https://soundcloud.com/lukesleepwalker-1/july-wav",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/67430/july-update-lukesleepwalker-s-2026-resolution-a-track-a-month",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/lukesleepwalker-1/july-wav&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-01-28T15:18:52+00:00",
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
