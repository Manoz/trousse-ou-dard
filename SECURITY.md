# Security Policy

## Supported Versions

This is a personal project. Only the latest version on the `main` branch is actively maintained.

| Version | Supported |
| ------- | --------- |
| latest  | Yes       |

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not open a public issue**.

Instead, report it privately via GitHub's security advisories:
**[Report a vulnerability](https://github.com/Manoz/trousse-ou-dard/security/advisories/new)**

Please include:

- A description of the vulnerability
- Steps to reproduce it
- Potential impact
- Any suggested fix (optional)

I'll do my best to respond within a reasonable timeframe. Given the nature of this project (a party game for friends), the attack surface is minimal, but reports are still welcome.

## Scope

Things worth reporting:

- Exposure of the JSONBin.io API key via the client bundle or network requests
- XSS vulnerabilities in user-submitted content
- Any unintended data exposure

Out of scope:

- Issues requiring physical access to a device
- Social engineering attacks
- Denial of service attacks on a personal project with no SLA
