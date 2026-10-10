# Word lists used in Aunty Carol's Scrabble

The official tournament lists — Collins Scrabble Words (© HarperCollins) and the NASPA Word List (© NASPA) —
are copyrighted and licensed, so they are **not** bundled. The game uses openly licensed lists instead, and lets
players load their own list (for example a CSW file they are licensed to use).

| In the game | What it actually is | Words |
|---|---|---|
| Collins-style (open international) | ENABLE + Wordnik game wordlist (2021-07-29) + SCOWL 2020.12.07 size ≤70 (English, American, British, British-z, Canadian, Australian + variant spellings) + the Collins two-letter word set | 202,236 |
| NWL-style (ENABLE) | ENABLE + the NWL2020 two-letter word set | 168,561 |
| Kid-friendly | SCOWL size ≤35 (English/American/British common words) minus a blocklist of rude/grown-up words | 40,028 |
| My own word list | Any plain-text list the player imports (file or link), one word per line | yours |

All built-in words are 2–15 letters, lowercase letters only (no proper nouns, abbreviations or apostrophes).
The Wordnik list added ~22,000 words over the previous Collins-style build, many of them Collins-only words
(e.g. TOWTS, RAWNS, SNABS, SWOPPER, SPAZA, YARBOROUGHS). SCOWL size 80 was evaluated and **not** used: it mostly adds
-ize/-ise derivatives that Collins doesn't accept. Coverage against the real CSW was not measured (the list can't be used here).

## Your own list, and agreed words
- **My own word list**: choose a .txt file (or paste a link; the site must allow cross-site downloads). The first run of letters
  on each line is taken as the word, so lists with definitions after the word work. It is built into the same compact format
  on the device (in a background worker) and kept in IndexedDB — it never leaves the device except to go to the other player:
  in an online game the host's device sends a copy straight to the guest's device over the game connection.
- **Trust mode (challenge only)**: words aren't checked automatically; the next player can challenge, and the loaded list decides.
- **Accept this word**: when auto-check rejects a word, the player can ask the others to accept it. If everyone agrees, the play
  goes down and the word is saved to "My custom words" on each device (Settings), counting as good in later games.

## Licences
- ENABLE (Enhanced North American Benchmark LExicon, Alan Beale & M. Cooper): public domain.
- Wordnik wordlist (https://github.com/wordnik/wordlist), © 2020 Wordnik: MIT licence — see WORDNIK-LICENSE.txt.
- SCOWL (Spell Checker Oriented Word Lists), © 2000–2018 Kevin Atkinson: "Permission to use, copy, modify, distribute and sell these word lists ... for any purpose is hereby granted without fee, provided that the above copyright notice appears in all copies and that both that copyright notice and this permission notice appear in supporting documentation." Includes public-domain material from Moby Words II and the UK English Wordlist (Brian Kelk), among others. See SCOWL-COPYRIGHT.txt.
- Two-letter word sets: short lists of individual words (facts), added so 2-letter plays like QI, ZA, OK, CH, ZO behave as players expect.

Format: each list is a DAWG (minimised trie) stored as a little-endian Uint32 edge array (`dict/*.dawg`). The selected list is
preloaded when the game is set up / joined, so checking a word is a local lookup of a few microseconds.

## Play the computer — which words it uses
- **Easy** finds its moves in the kid-friendly everyday list (SCOWL size 35), then keeps only plays whose words are *also* valid in the game's chosen dictionary. It picks at random from the 25th–60th percentile of scores. If no everyday-word play fits the board, it falls back to the game dictionary. The computer never plays words outside the game's dictionary.
- **Medium** uses the game dictionary and picks at random from the 60th–80th percentile of scores.
- **Expert** uses the game dictionary. It plays for score plus a simple leave value: it values keeping a blank, S, E, R, X, Z, ER, ING or QU, and penalises duplicate tiles, vowel-heavy or consonant-heavy leaves, and Q/V/W/U. When its rack is bad and the bag has at least 7 tiles, it swaps tiles instead.
- In trust (challenge-only) mode only Expert challenges, and it challenges only words that aren't in the dictionary. If you ask the computer to accept a word, it always agrees.
