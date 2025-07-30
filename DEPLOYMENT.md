# GitHub Pages Deployment Guide

This repository contains two GitHub Actions workflows for manually deploying your static site to GitHub Pages.

## Setup Instructions

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**

### 2. Choose Your Deployment Method

You can use either of the two provided workflows:

#### Option A: Modern GitHub Actions Approach (Recommended)
- File: `.github/workflows/deploy-page.yml`
- Uses official GitHub Actions for Pages
- More secure with proper permissions
- Better for future compatibility

#### Option B: Simple Deployment Approach
- File: `.github/workflows/deploy-page-alternative.yml`
- Uses peaceiris/actions-gh-pages action
- Simpler configuration
- Good for quick deployment

## How to Deploy

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. Find the "Deploy Page" workflow in the left sidebar
4. Click **Run workflow** button
5. Confirm by clicking **Run workflow** again

The deployment will start automatically and deploy your static site to GitHub Pages.

## What Gets Deployed

Both workflows deploy the entire repository content (since it's pre-built static content) including:
- `index.html`
- `assets/` folder (CSS, JS)
- `images/` folder
- All other static files

## Notes

- The workflows run **manually only** (no automatic triggers)
- Both workflows exclude unnecessary files like `.github/` folder from deployment
- Your site will be available at `https://[username].github.io/[repository-name]`
- First deployment might take a few minutes to be visible

## Troubleshooting

If the deployment fails, check:
1. Repository has GitHub Pages enabled in Settings
2. You have proper permissions to push to the repository
3. The workflow completed successfully (green checkmark in Actions tab)