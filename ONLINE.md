# Online play — how it works

**Why the old version said "disconnected":** online games used PeerJS (direct WebRTC phone-to-phone, STUN only, no TURN).
Across carrier-grade/symmetric NAT (common on Indian mobile networks) a direct link often can't form at all, and iOS kills
WebRTC/WebSockets when Safari goes to the background — and the whole game lived only on the host's phone.

**Now:** no direct link and no server of our own. Every move/chat is a small *record*, end-to-end encrypted (AES-GCM, key derived
from the secret in the invite link), sent to several free public relays at once over plain HTTPS/WebSockets:

| relay | port | keeps history |
|---|---|---|
| ntfy.sh (HTTPS POST + WebSocket) | 443 | ~12 h |
| shiftr.io public MQTT | 443 | retained messages |
| HiveMQ public MQTT | 8884 | retained messages |
| EMQX public MQTT | 8084 | retained messages |

No accounts. Topic = hash of the secret, so the relays only ever see ciphertext. Each phone also keeps the full record set.
Both phones rebuild the game by **deterministic replay** through the rules engine (seeded bag), so malformed or illegal records are
simply ignored, and either player can close the app / lose signal / reload and carry on. When a phone comes back (reopen, foreground,
network back) it reconnects and re-reads everything; records a relay lost are re-sent.

Limits: ntfy.sh allows 250 messages/day per IP for anonymous use (a game is ~50–80); if exceeded the MQTT relays carry on.
A shared custom word list goes as an encrypted ntfy attachment (kept 3 h; re-shared automatically when the other phone asks).
Players in the same room trust each other (anyone with the invite link can act as a player; racks are part of the replayed state).
Hints are never part of any record — they are computed only on the jp3 device.
