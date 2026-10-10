# Word lists used in Aunty Carol's Scrabble

The official tournament lists — Collins Scrabble Words (© HarperCollins) and the NASPA Word List (© NASPA) —
are copyrighted and licensed, so they are **not** bundled. The game uses openly licensed lists instead:

| In the game | What it actually is | Words |
|---|---|---|
| Collins-style (open international) | ENABLE + SCOWL 2020.12.07 size ≤70 (English, American, British, British-z, Canadian, Australian + variant spellings) + the Collins two-letter word set | ~180,000 |
| NWL-style (ENABLE) | ENABLE + the NWL2020 two-letter word set | ~168,600 |
| Kid-friendly | SCOWL size ≤35 (English/American/British common words) minus a blocklist of rude/grown-up words | ~40,000 |

All words are 2–15 letters, lowercase letters only (no proper nouns, abbreviations or apostrophes).

Licences
- ENABLE (Enhanced North American Benchmark LExicon, Alan Beale & M. Cooper): public domain.
- SCOWL (Spell Checker Oriented Word Lists), © 2000–2018 Kevin Atkinson: "Permission to use, copy, modify, distribute and sell these word lists ... for any purpose is hereby granted without fee, provided that the above copyright notice appears in all copies and that both that copyright notice and this permission notice appear in supporting documentation." Includes public-domain material from Moby Words II and the UK English Wordlist (Brian Kelk), among others.
- Two-letter word sets: short lists of individual words (facts), added so 2-letter plays like QI, ZA, OK, CH, ZO behave as players expect.

Format: each list is a DAWG (minimised trie) stored as a little-endian Uint32 edge array (`dict/*.dawg`), fetched only when that dictionary is used.
