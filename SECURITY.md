# Security

## API keys

- Never hard-coded.
- Never logged.
- Never sent to a Loreweave account (there isn't one).
- Masked in the UI; reveal is explicit; delete is available.
- Multiple keys are for *your* legitimate accounts (failover), not for evading vendor limits.

## Permissions (Chrome)

| Permission | Why |
| --- | --- |
| `storage` | Local keys, notes, stories |
| `sidePanel` | Persistent assistant |
| `contextMenus` | Selection actions |
| `activeTab` + `scripting` | Read the tab you asked about |
| `tabs` | Title/URL for context you requested |
| `commands` | Shortcuts |
| `alarms` | Reserved for future local quotas |
| Host access to known API origins | Talk to providers you configured |
| Optional `http(s)://*/*` | Only if you grant site access to read pages |

## Threat notes

- XSS on a page cannot read `chrome.storage` of the extension.
- A malicious webpage cannot receive your keys.
- If you paste a key into the **web** studio, a compromised studio host could see it during a proxied request. Use the extension for stronger isolation.
- Do not install unpackaged forks from untrusted zips.

## Reporting

Open a GitHub issue or contact the maintainer. Do not attach live keys.
