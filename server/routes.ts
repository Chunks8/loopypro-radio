import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import type { InsertTrack } from "@shared/schema";
import * as https from "https";
import * as http from "http";

// Corrected, deduplicated seed tracks — most recent post per thread
const SEED_TRACKS: InsertTrack[] = [
  {
    songTitle: "Leaving now",
    artistName: "barabajagal",
    forumMember: "barabajagal",
    mediaUrl: "https://soundcloud.com/barabajagal74/leaving-now",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69369/leaving-now",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/barabajagal74/leaving-now&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-08-23T19:16:45+00:00",
  },
  {
    songTitle: "Ambient Guitar - Everspace, Timeless, Irio Pro and Soundbox",
    artistName: "richardyot",
    forumMember: "richardyot",
    mediaUrl: "https://www.youtube.com/watch?v=zgOK_HaMrAA",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69367/ambient-guitar-everspace-timeless-irio-pro-and-soundbox",
    embedCode: "https://www.youtube.com/embed/zgOK_HaMrAA",
    fetchedAt: "2026-08-23T12:52:47+00:00",
  },
  {
    songTitle: "A one-app tryout of Pulsar-ES vintage drum machine app: The Thing With Wings",
    artistName: "Svetlovska",
    forumMember: "Svetlovska",
    mediaUrl: "https://soundcloud.com/irena-svetlovska/the-thing-with-wings?si=fd25402f7bbc4da09416380d5ddcbb0b",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69365/a-one-app-tryout-of-pulsar-es-vintage-drum-machine-app-the-thing-with-wings",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/irena-svetlovska/the-thing-with-wings?si=fd25402f7bbc4da09416380d5ddcbb0b&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-08-23T10:14:22+00:00",
  },
  {
    songTitle: "Apologies for the purple patch, but\u2026Wail: Power Electronics",
    artistName: "Svetlovska",
    forumMember: "Svetlovska",
    mediaUrl: "https://soundcloud.com/irena-svetlovska/power-electronics?si=a514255750754eb6952c5d6043384920",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69355/apologies-for-the-purple-patch-but-wail-power-electronics",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/irena-svetlovska/power-electronics?si=a514255750754eb6952c5d6043384920&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-08-22T09:24:08+00:00",
  },
  {
    songTitle: "Noisy Run4",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=TX7cjAoCihI",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69347/noisy-run4",
    embedCode: "https://www.youtube.com/embed/TX7cjAoCihI",
    fetchedAt: "2026-08-21T14:52:26+00:00",
  },
  {
    songTitle: "Wind chime for accents: Brother Sun, Sister Moon",
    artistName: "Svetlovska",
    forumMember: "Svetlovska",
    mediaUrl: "https://soundcloud.com/irena-svetlovska/brother-sun-sister-moon?si=53179ab365324a1b932eddae40097116",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69346/wind-chime-for-accents-brother-sun-sister-moon",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/irena-svetlovska/brother-sun-sister-moon?si=53179ab365324a1b932eddae40097116&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-08-21T14:19:01+00:00",
  },
  {
    songTitle: "Synthhead galore cover: Photographic, a Depeche Mode classic from 1981",
    artistName: "DMfan",
    forumMember: "DMfan",
    mediaUrl: "https://www.youtube.com/watch?v=v_HqclMNfes",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69338/synthhead-galore-cover-photographic-a-depeche-mode-classic-from-1981",
    embedCode: "https://www.youtube.com/embed/v_HqclMNfes",
    fetchedAt: "2026-08-21T04:43:50+00:00",
  },
  {
    songTitle: "Experiment with Harmonicer, Polythemus and Riffer in AUM",
    artistName: "Keopathy",
    forumMember: "Keopathy",
    mediaUrl: "https://www.youtube.com/watch?v=rlEYh6LTKzs",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69331/experiment-with-harmonicer-polythemus-and-riffer-in-aum",
    embedCode: "https://www.youtube.com/embed/rlEYh6LTKzs",
    fetchedAt: "2026-08-20T16:05:17+00:00",
  },
  {
    songTitle: "Another day, another Run4 track",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=uVqTJXDBw6I",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69318/another-day-another-run4-track",
    embedCode: "https://www.youtube.com/embed/uVqTJXDBw6I",
    fetchedAt: "2026-08-19T13:31:01+00:00",
  },
  {
    songTitle: "JWM - Dear Sir (Experimental Techno in GR2)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://on.soundcloud.com/xL3ifMX99sRA8IvuBy",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69301/jwm-dear-sir-experimental-techno-in-gr2",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjwmmakerofmusic%2Fjwm-dear-sir%3Fsi%3D3e1d9e9cde5e48b5a570cfcf533bd61b%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-08-18T01:35:46+00:00",
  },
  {
    songTitle: "Another Run4 track",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=vhkfnDf7ncA",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69294/another-run4-track",
    embedCode: "https://www.youtube.com/embed/vhkfnDf7ncA",
    fetchedAt: "2026-08-17T17:08:17+00:00",
  },
  {
    songTitle: "Cult Of Velocity (extreme fusion @ ludicrous speed)",
    artistName: "Paulieworld",
    forumMember: "Paulieworld",
    mediaUrl: "https://soundcloud.com/paulieworld/dark-helmet",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69291/cult-of-velocity-extreme-fusion-ludicrous-speed",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/paulieworld/dark-helmet&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-08-17T13:14:41+00:00",
  },
  {
    songTitle: "Can Nocturne LoFi Dark Ambient?: The Summoning",
    artistName: "Svetlovska",
    forumMember: "Svetlovska",
    mediaUrl: "https://soundcloud.com/irena-svetlovska/the-summoning?si=1fbbf166b38d48328fd9ffbe6a157ef8",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69289/can-nocturne-lofi-dark-ambient-the-summoning",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/irena-svetlovska/the-summoning?si=1fbbf166b38d48328fd9ffbe6a157ef8&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-08-17T08:24:53+00:00",
  },
  {
    songTitle: "Living by the book a new track",
    artistName: "Frenq",
    forumMember: "Frenq",
    mediaUrl: "https://hearthis.at/frenq/living-by-the-book",
    mediaType: "hearthis",
    threadUrl: "https://forum.loopypro.com/discussion/69287/living-by-the-book-a-new-track",
    embedCode: "https://app.hearthis.at/embed/14629680/transparent_black/?",
    fetchedAt: "2026-08-16T18:13:49+00:00",
  },
  {
    songTitle: "Another bite of the poisoned Strange Loop fruit, with added AD 202s : Ingesting Axplakadine",
    artistName: "Svetlovska",
    forumMember: "Svetlovska",
    mediaUrl: "https://www.youtube.com/watch?v=iJ_O2ZJIw84",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69276/another-bite-of-the-poisoned-strange-loop-fruit-with-added-ad-202s-ingesting-axplakadine",
    embedCode: "https://www.youtube.com/embed/iJ_O2ZJIw84",
    fetchedAt: "2026-08-15T14:05:10+00:00",
  },
  {
    songTitle: "Guitarish",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=bCDlf5DstOs",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69275/guitarish",
    embedCode: "https://www.youtube.com/embed/bCDlf5DstOs",
    fetchedAt: "2026-08-15T14:04:23+00:00",
  },
  {
    songTitle: "irio pro ambient-ish guitar demo",
    artistName: "richardyot",
    forumMember: "richardyot",
    mediaUrl: "https://www.youtube.com/watch?v=rM6t2lfQZ8M",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69274/irio-pro-ambient-ish-guitar-demo",
    embedCode: "https://www.youtube.com/embed/rM6t2lfQZ8M",
    fetchedAt: "2026-08-15T13:45:14+00:00",
  },
  {
    songTitle: "If Only (Jaeger, Intimate Cello, Velvet Guitar, Noire, Continua)",
    artistName: "DavidEnglish",
    forumMember: "DavidEnglish",
    mediaUrl: "https://www.youtube.com/watch?v=hsT2cXzIuiE",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69267/if-only-jaeger-intimate-cello-velvet-guitar-noire-continua",
    embedCode: "https://www.youtube.com/embed/hsT2cXzIuiE",
    fetchedAt: "2026-08-14T18:10:23+00:00",
  },
  {
    songTitle: "Run4 and Fluss",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=yopqISHEuf8",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69266/run4-and-fluss",
    embedCode: "https://www.youtube.com/embed/yopqISHEuf8",
    fetchedAt: "2026-08-14T16:45:18+00:00",
  },
  {
    songTitle: "Strangely attracted to Strange Loop: The Secret Order",
    artistName: "Svetlovska",
    forumMember: "Svetlovska",
    mediaUrl: "https://www.youtube.com/watch?v=AF9F2tgGtbQ",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69265/strangely-attracted-to-strange-loop-the-secret-order",
    embedCode: "https://www.youtube.com/embed/AF9F2tgGtbQ",
    fetchedAt: "2026-08-14T11:44:35+00:00",
  },
  {
    songTitle: "Strange Loop",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=jhuHthicp7c",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69259/strange-loop",
    embedCode: "https://www.youtube.com/embed/jhuHthicp7c",
    fetchedAt: "2026-08-13T14:37:18+00:00",
  },
  {
    songTitle: "When You\u2019re Smiling (1928) - Pianoteq + Accurate Salamander SFZ piano combined",
    artistName: "Dav",
    forumMember: "Dav",
    mediaUrl: "https://www.youtube.com/watch?v=yP-h2Mv_PqI",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69258/when-you-re-smiling-1928-pianoteq-accurate-salamander-sfz-piano-combined",
    embedCode: "https://www.youtube.com/embed/yP-h2Mv_PqI",
    fetchedAt: "2026-08-13T12:32:44+00:00",
  },
  {
    songTitle: "Swirl - short ambient improv",
    artistName: "espiegel123",
    forumMember: "espiegel123",
    mediaUrl: "https://www.youtube.com/watch?v=QI8VmGcDQW8",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69255/swirl-short-ambient-improv",
    embedCode: "https://www.youtube.com/embed/QI8VmGcDQW8",
    fetchedAt: "2026-08-12T21:14:30+00:00",
  },
  {
    songTitle: "Going to go through a backlog of jams...",
    artistName: "audiblevideo",
    forumMember: "audiblevideo",
    mediaUrl: "https://www.youtube.com/watch?v=gCniJHBdd1I",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69253/going-to-go-through-a-backlog-of-jams",
    embedCode: "https://www.youtube.com/embed/gCniJHBdd1I",
    fetchedAt: "2026-08-12T06:03:34+00:00",
  },
  {
    songTitle: "Particle Continuum - Continua and Tessera etc!",
    artistName: "id_23",
    forumMember: "id_23",
    mediaUrl: "https://www.youtube.com/watch?v=MMHKo7f6Xws",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69252/particle-continuum-continua-and-tessera-etc",
    embedCode: "https://www.youtube.com/embed/MMHKo7f6Xws",
    fetchedAt: "2026-08-11T22:02:12+00:00",
  },
  {
    songTitle: "I was one of the lucky ones",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=Esr3jOCE0V8",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69250/i-was-one-of-the-lucky-ones",
    embedCode: "https://www.youtube.com/embed/Esr3jOCE0V8",
    fetchedAt: "2026-08-11T15:56:23+00:00",
  },
  {
    songTitle: "JWM - GR II Ambient (Ambient tracks in GR2)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://on.soundcloud.com/Sic5pLBMEKD0QMIibd",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69245/jwm-gr-ii-ambient-ambient-tracks-in-gr2",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjwmmakerofmusic%2Fjwm-a-jarring-lullaby%3Fsi%3Dad9841e2fef646c99c44c6081ed1c837%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-08-10T23:12:34+00:00",
  },
  {
    songTitle: "Luc.A - Pressure (Deep house music in Korg Gadget)",
    artistName: "Luc_A",
    forumMember: "Luc_A",
    mediaUrl: "https://soundcloud.com/luca_production/pressure?si=703b558360e04dd2b7366ae7675faaa0",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69241/luc-a-pressure-deep-house-music-in-korg-gadget",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/luca_production/pressure?si=703b558360e04dd2b7366ae7675faaa0&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-08-10T17:31:17+00:00",
  },
  {
    songTitle: "The ambient calm of the Great Dutch Rivers 2. A new EP.",
    artistName: "Frenq",
    forumMember: "Frenq",
    mediaUrl: "https://hearthis.at/frenq/the-great-dutch-rivers-2",
    mediaType: "hearthis",
    threadUrl: "https://forum.loopypro.com/discussion/69237/the-ambient-calm-of-the-great-dutch-rivers-2-a-new-ep",
    embedCode: "https://app.hearthis.at/embed/14621265/transparent_black/?",
    fetchedAt: "2026-08-10T07:08:40+00:00",
  },
  {
    songTitle: "Backing Tracks: Ambiotica Ambient Jam in Bb/Eb major (and now with flute added)",
    artistName: "jimhanks",
    forumMember: "jimhanks",
    mediaUrl: "https://www.youtube.com/watch?v=TJVbSdTOpG8",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69232/backing-tracks-ambiotica-ambient-jam-in-bb-eb-major-and-now-with-flute-added",
    embedCode: "https://www.youtube.com/embed/TJVbSdTOpG8",
    fetchedAt: "2026-08-09T19:58:51+00:00",
  },
  {
    songTitle: "HALion Sonic, mostly",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=jRt8xQPnOXM",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69231/halion-sonic-mostly",
    embedCode: "https://www.youtube.com/embed/jRt8xQPnOXM",
    fetchedAt: "2026-08-09T18:33:31+00:00",
  },
  {
    songTitle: "JWM - A Little Something (Orchestral Jazz in GR2)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://on.soundcloud.com/cFlpQaDcMAE9KDdFG9",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69229/jwm-a-little-something-orchestral-jazz-in-gr2",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjwmmakerofmusic%2Fjwm-a-little-something%3Fsi%3D893b34569dee4814966fb9ac68fdf98c%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-08-09T16:57:38+00:00",
  },
  {
    songTitle: "Get your glitch here!",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=AohHuezvd7c",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69217/get-your-glitch-here",
    embedCode: "https://www.youtube.com/embed/AohHuezvd7c",
    fetchedAt: "2026-08-07T17:49:09+00:00",
  },
  {
    songTitle: "Gavin says it\u2019s NOT pronounced  \u2018Die\u2019, but hey\u2026 Even Death May Die (Dee? Dee-eh?)",
    artistName: "Svetlovska",
    forumMember: "Svetlovska",
    mediaUrl: "https://www.youtube.com/watch?v=NmmCJal1OG4",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69215/gavin-says-it-s-not-pronounced-die-but-hey-even-death-may-die-dee-dee-eh",
    embedCode: "https://www.youtube.com/embed/NmmCJal1OG4",
    fetchedAt: "2026-08-07T10:12:12+00:00",
  },
  {
    songTitle: "JWM - Fantastical (Orchestral Piece in GR2)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://www.youtube.com/watch?v=G77ev9pks4I",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69213/jwm-fantastical-orchestral-piece-in-gr2",
    embedCode: "https://www.youtube.com/embed/G77ev9pks4I",
    fetchedAt: "2026-08-07T00:18:38+00:00",
  },
  {
    songTitle: "New Ambient Album: \"i hear them sometimes\"",
    artistName: "as_in_the_skies",
    forumMember: "as_in_the_skies",
    mediaUrl: "https://soundcloud.com/as-in-the-skies/sets/i-hear-them-sometimes?si=2c5029cde12446d7b8c21544fa5bd3e3",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69205/new-ambient-album-i-hear-them-sometimes",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/as-in-the-skies/sets/i-hear-them-sometimes?si=2c5029cde12446d7b8c21544fa5bd3e3&amp;utm_source=clipboard&amp;utm_medium=text&amp;utm_campaign=social_sharing&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-08-06T16:04:48+00:00",
  },
  {
    songTitle: "Two for the price of none!",
    artistName: "rottencat",
    forumMember: "rottencat",
    mediaUrl: "https://www.youtube.com/watch?v=5rzWHAv7Cu4",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69204/two-for-the-price-of-none",
    embedCode: "https://www.youtube.com/embed/5rzWHAv7Cu4",
    fetchedAt: "2026-08-06T15:28:42+00:00",
  },
  {
    songTitle: "JWM - Good Riddance (EDM in GR2, using Halion Sonic Play)",
    artistName: "jwmmakerofmusic",
    forumMember: "jwmmakerofmusic",
    mediaUrl: "https://soundcloud.com/jwmmakerofmusic/jwm-good-riddance",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69190/jwm-good-riddance-edm-in-gr2-using-halion-sonic-play",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/jwmmakerofmusic/jwm-good-riddance&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
    fetchedAt: "2026-08-04T19:20:36+00:00",
  },
  {
    songTitle: "Probably subconsciously inspired by Massive Attack's Teardrop :)",
    artistName: "kyrillik",
    forumMember: "kyrillik",
    mediaUrl: "https://www.youtube.com/watch?v=VVXvuOoFuPQ",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69182/probably-subconsciously-inspired-by-massive-attacks-teardrop",
    embedCode: "https://www.youtube.com/embed/VVXvuOoFuPQ",
    fetchedAt: "2026-08-03T23:51:02+00:00",
  },
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
    mediaUrl: "https://soundcloud.com/dominion-harmonics",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/69171/pilgrim-circuit",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fdominion-harmonics&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
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
    mediaUrl: "https://www.youtube.com/watch?v=jJOQTPAXTLc",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69155/song-for-flute-and-piano-swam-variflute-pure-piano",
    embedCode: "https://www.youtube.com/embed/jJOQTPAXTLc",
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
    songTitle: "Chariots of Fire iPad electro cover- dedicated to AnalogMatthew",
    artistName: "DMfan",
    forumMember: "DMfan",
    mediaUrl: "https://www.youtube.com/watch?v=l7uZdcsE25o",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/69141/chariots-of-fire-ipad-electro-cover-dedicated-to-analogmatthew",
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
    songTitle: "The Offices of Dr. Rabbitfoot",
    artistName: "Drrabbitfoot",
    forumMember: "Drrabbitfoot",
    mediaUrl: "https://on.soundcloud.com/nnYVsxGZSbE8cd8OQN",
    mediaType: "soundcloud",
    threadUrl: "https://forum.loopypro.com/discussion/67232/the-offices-of-dr-rabbitfoot",
    embedCode: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fdrrabbitfoot%2Fgreen-ham-eggs%3Fref%3Dclipboard%26p%3Di%26c%3D1%26si%3DF8551C902A524B2C8723FB45742743FA%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false",
    fetchedAt: "2026-01-08T13:57:28+00:00",
  },
  {
    songTitle: "-The Pixel Producers - Everyday Music Thread",
    artistName: "Thepixelproducers",
    forumMember: "Thepixelproducers",
    mediaUrl: "https://www.youtube.com/watch?v=tyTCXhAWF5U",
    mediaType: "youtube",
    threadUrl: "https://forum.loopypro.com/discussion/49403/the-pixel-producers-everyday-music-thread",
    embedCode: "https://www.youtube.com/embed/tyTCXhAWF5U",
    fetchedAt: "2022-03-09T00:37:27+00:00",
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
