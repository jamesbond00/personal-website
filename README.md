# Alexander Khundoev · Portfolio

A single-page Astro portfolio with a monochrome terminal and browser-local command history.

## Local development

Use Node.js 22 or later.

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

Edit `src/data/profile.ts` to update the public copy, TraderLab status and links. Contact links and the repository action appear only when configured. Check any URL before adding it. Add a CV or another project once approved public material is available.

The terminal accepts a fixed set of commands. Run `help` to see them and use the arrow keys to recall commands. History and output reset on a page reload. The portfolio sections and navigation work with JavaScript disabled.

## GitHub Pages

1. Push this repository to the GitHub repository you want to use. The workflow expects the default branch to be named `main`.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Run **Deploy to GitHub Pages** from the **Actions** tab, or push to `main`. The workflow reads the Pages origin and base path to build for either a repository subpath or a root site.
4. For an optional custom domain, configure it under **Settings → Pages**, add the DNS records GitHub specifies for that domain, then rerun the workflow and enable HTTPS when available.

To check a subpath build locally, run `SITE_BASE=/personal-website/ npm run build`. Set `SITE_URL` to the verified site origin if you want Astro to emit a canonical URL.
