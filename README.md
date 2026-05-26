# Rudrarise Structures LLP — Company Website

Official website for **Rudrarise Structures LLP** — a premier real estate, construction, and architecture firm.

Built with **React + Vite**, styled with **W3.CSS**, deployed via **GitHub Pages** with a custom GoDaddy domain.

---

## 🚀 Deployment Guide — GitHub Pages + GoDaddy Domain

Follow these steps **once** to go live. After that, every `git push` to `main` auto-deploys.

---

### STEP 1 — Push code to GitHub

```bash
# Inside the project folder
git add .
git commit -m "Initial commit — Rudrarise Structures LLP website"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

> Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repo name.

---

### STEP 2 — Enable GitHub Pages

1. Go to your GitHub repo → **Settings** tab
2. Click **Pages** in the left sidebar
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

The first deployment will run automatically. You can watch it under the **Actions** tab.

---

### STEP 3 — Update CNAME with your real domain

Open `public/CNAME` and replace the placeholder with your **actual GoDaddy domain**:

```
www.rudrarisestructures.com
```

> Use `www.yourdomain.com` (with www) — recommended for stability.
> Then commit and push — the deployment will update automatically.

---

### STEP 4 — Configure GoDaddy DNS

Log in to [GoDaddy DNS Manager](https://dcc.godaddy.com/manage/dns) for your domain and add these records:

#### For `www` subdomain (primary):
| Type  | Name | Value                        | TTL  |
|-------|------|------------------------------|------|
| CNAME | www  | `YOUR_USERNAME.github.io`    | 600s |

#### For root domain `@` (redirects to www):
| Type | Name | Value             | TTL  |
|------|------|-------------------|------|
| A    | @    | `185.199.108.153` | 600s |
| A    | @    | `185.199.109.153` | 600s |
| A    | @    | `185.199.110.153` | 600s |
| A    | @    | `185.199.111.153` | 600s |

> These 4 IP addresses are GitHub Pages' official IP addresses. Adding all 4 ensures high availability.

---

### STEP 5 — Add custom domain in GitHub Pages settings

1. Go to repo **Settings → Pages**
2. Under **Custom domain**, type: `www.yourdomain.com`
3. Click **Save**
4. Wait for the **DNS check** to turn green ✅ (can take 10–30 mins)
5. Once green, tick **Enforce HTTPS** ✅

---

### ✅ Done! Your website is live

| URL | What it does |
|-----|-------------|
| `https://www.yourdomain.com` | Live website via GoDaddy domain |
| `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME` | Direct GitHub Pages URL (also works) |

---

## 🔄 How to Update the Website

Just edit files and push — GitHub Actions handles the rest automatically:

```bash
git add .
git commit -m "Updated contact info"
git push
```

GitHub Actions will:
1. Install dependencies (`npm ci`)
2. Build the project (`npm run build`)
3. Deploy the `dist/` folder to GitHub Pages

Deployment takes about **1–2 minutes**. Watch progress under the **Actions** tab.

---

## 💻 Local Development

```bash
npm install       # first time only
npm run dev       # starts dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

---

## 📁 Project Structure

```
├── public/
│   ├── photos/          ← All 13 site construction photos
│   └── CNAME            ← Your custom domain (e.g. www.yourdomain.com)
├── src/
│   ├── App.jsx          ← Full website (Navbar, Hero, Services, Projects, About, Contact, Footer)
│   ├── App.css          ← All custom styles
│   └── index.css        ← Global reset
├── .github/
│   └── workflows/
│       └── deploy.yml   ← GitHub Actions CI/CD pipeline
├── index.html           ← Entry HTML (W3.CSS + Font Awesome CDN)
└── vite.config.js       ← Vite configuration (base: '/')
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 + Vite | UI framework + build tool |
| W3.CSS (CDN) | Base styling (W3 Architect template) |
| Font Awesome 6 (CDN) | Icons |
| Google Fonts — Inter | Typography |
| GitHub Actions | Auto CI/CD on every push |
| GitHub Pages | Free static hosting |
| GoDaddy | Custom domain (DNS only) |
