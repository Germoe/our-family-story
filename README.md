# Our Family Story – Static Site

This repo hosts a lightweight, single-page React site built with Vite and Tailwind CSS. Content is managed through YAML so copy and images can be updated without touching the layout code.

## Editing content

- Update text and links in [`src/content/site.yaml`](src/content/site.yaml). The YAML is validated at build time so missing
  fields or typos are caught with a clear error message.
- Place photos in [`src/assets`](src/assets) and reference the filenames in the YAML file.
- The layout automatically pulls from the YAML and will rebuild with the new content.

## Local development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

The static files are emitted to `dist/` and can be deployed to any static host.

## Deploying

- **Vercel:** Import the repo and use the `npm run build` command. Set the output directory to `dist`.
- **GitHub Pages / Actions:** Build with `npm run build` in a workflow and publish the `dist` folder with the `actions/upload-pages-artifact` and `actions/deploy-pages` actions.
