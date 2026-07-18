# Three.js Starter

A minimal Three.js scene (rotating icosahedron, lighting, orbit controls, starfield) set up with Vite, ready to deploy to GitHub Pages for free.

## 1. Run it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## 2. Before deploying: set your repo name

Open `vite.config.js` and change:

```js
base: '/your-repo-name/',
```

to match your actual GitHub repo name exactly (case-sensitive), e.g. `base: '/my-threejs-site/'`.

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

(Create the empty repo on GitHub first if you haven't.)

## 4. Deploy to GitHub Pages

Install the deploy helper (already in package.json) and run:

```bash
npm install
npm run build
npm run deploy
```

This builds the project into `dist/` and pushes it to a `gh-pages` branch.

Then in your GitHub repo: **Settings → Pages → Source → Deploy from branch → `gh-pages` / root**.

Your site will be live at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

(may take a minute or two to go live the first time)

## Customizing

- Edit `src/main.js` — swap the icosahedron for any geometry (`THREE.BoxGeometry`, `THREE.TorusKnotGeometry`, load a `.glb` model with `GLTFLoader`, etc.)
- Colors, lights, and camera position are all near the top of the file
