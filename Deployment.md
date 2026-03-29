# GitHub Pages Deployment Guide

Your portfolio is built using pure HTML, CSS, and JS, which makes it incredibly simple to host for **free** on GitHub Pages. Follow these steps to get your portfolio live on the internet!

## Step 1: Create a Repository on GitHub
1. Log in to your GitHub account (https://github.com/).
2. Click the **+** icon in the top right corner and select **New repository**.
3. **Repository name**: You have two options:
   - Name it exactly `[your-github-username].github.io` (e.g., `DebjitMajumdar.github.io`). This will give you a clean URL matching the repo name.
   - Name it something else like `Portfolio`. The URL will be `[username].github.io/Portfolio`.
4. Make sure the repository is set to **Public**.
5. Leave "Add a README file" unchecked (since you already have your files locally).
6. Click **Create repository**.

## Step 2: Push Your Local Code to GitHub
You already have a folder (`C:\Users\KIIT\Portfolio`) with your files. Open your **Command Prompt** or **Terminal**, navigate to your folder, and run these commands:

```bash
# If you haven't initialized Git yet:
git init

# Add all your files to Git
git add .

# Save your changes with a commit message
git commit -m "Initial portfolio commit"

# Link your local folder to your new GitHub repository (REPLACE THE URL BELOW)
git remote add origin https://github.com/DebjitMajumdar/YOUR-REPO-NAME.git

# Push your code to the 'main' branch
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages
1. Go back to your repository page on GitHub.com.
2. Click on the **Settings** tab (the gear icon near the top right of the repo).
3. On the left sidebar, scroll down and click on **Pages** (under the "Code and automation" section).
4. Under the **Build and deployment** section:
   - For the **Source**, ensure it says "Deploy from a branch".
   - For the **Branch**, click the dropdown that says `None` and select `main`.
   - Leave the folder as `/ (root)`.
5. Click **Save**.

## Step 4: Wait and View Your Live Site
* GitHub takes about 1-2 minutes to build your site. 
* Refresh the GitHub Pages settings page, and you should see a message at the top saying: **"Your site is live at https://..."**
* Click the link to view your live portfolio!

---
> **Note on Updates:** Any time you change your `index.html` or `style.css` in the future, simply run `git add .`, `git commit -m "Update"`, and `git push` in your terminal. GitHub will automatically refresh your live site within minutes!
