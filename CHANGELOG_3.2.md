# WebRadio v3.2 — 24/7 OAuth Auto-Renew

- Uses Google `expires_in` to renew before access-token expiry.
- Silent renewal after initial consent.
- One automatic retry after Drive HTTP 401.
- Applied to standard player, Hi-Fi player, and Drive monitor.
- Preserves existing Live Library, Smart Shuffle/rotation, monitor manifest, and Live Bridge behavior.
- No paid backend, Client Secret, or stored Google password.
