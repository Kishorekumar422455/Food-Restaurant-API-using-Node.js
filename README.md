# Food-App

This small Node/Express app uses dotenv to load environment variables in development.

Quick start

1. Copy `.env.example` to `.env` and edit values (do not commit `.env`).

2. Install dependencies:

   npm install

3. Run in development:

   npm run dev

4. Run in production:

   npm start

Notes on dotenv and secrets

- This project only loads `.env` when `NODE_ENV` is not `production` to avoid accidental overrides or injection of production secrets.
- The console message you saw like:

  [dotenv@17.2.3] injecting env (0) from env -- tip: 🔑 add access controls to secrets: https://dotenvx.com/ops

  comes from newer versions of dotenv informing you about env injection. For production, prefer platform-provided secret management and strict access controls.

- Never commit your real `.env` to source control. Add `.env` to `.gitignore` in your repo.

Security tip: Use a secrets manager (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault, etc.) for production secrets and restrict access using least-privilege IAM roles.

## Secrets lifecycle management

For production-grade secret handling, follow lifecycle and operational best practices. The dotenv team maintains a concise ops guide here:

https://dotenvx.com/ops

Key recommendations (summary):

- Use a dedicated secrets manager (cloud provider vault, HashiCorp Vault, or similar) instead of committing or relying on local files in production.
- Enforce access controls and least-privilege for any identity that can read secrets.
- Rotate secrets regularly and automate rotation where possible.
- Audit and monitor secret access; alert on unexpected reads or usage patterns.
- Have a revocation and incident response plan so compromised secrets can be revoked and replaced quickly.

Keep production credentials out of source control and avoid embedding long-lived secrets in application code or public repositories.

**Model Feature Flags**

This project supports per-model feature flags via `config/models.json` and environment variable overrides.

- The `claude_haiku` entry enables the "Claude Haiku" model. By default in this repository it is enabled for all clients.
- You can override at runtime with environment variables:
   - `CLAUDE_HAIKU_ENABLED` (true/false)
   - `CLAUDE_HAIKU_VERSION` (e.g. `4.5`)

Example (PowerShell):
```powershell
#$env:CLAUDE_HAIKU_ENABLED='false'; npm start
```

Programmatic usage example:
```js
const models = require('./lib/models');
const claude = models.getModel('claude_haiku');
if (claude && claude.enabled) {
   // Initialize client for claude.version
}
```


**Model Feature Flags**

This project includes a repository-level feature flag for optional models (example: Claude Haiku 4.5). The model is disabled by default. To enable it for the app, set the environment variable in your deployment or local `.env`:

- `CLAUDE_HAIKU_ENABLED=true`
- `CLAUDE_HAIKU_VERSION=4.5`

A small helper exists at `lib/models.js` which reads `config/models.json` and applies environment variable overrides. Use `const { getModel } = require('./lib/models');` and `getModel('claude_haiku')` to inspect whether the model is enabled and which version to use.

Notes:
- Keep feature flags off in production until you're ready to enable the model and have the required API keys or provider configuration in place.
- Do not commit real provider keys to the repo. Use environment variables or secret managers for model API keys.
