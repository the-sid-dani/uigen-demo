# Create GitHub Repository Instructions

Your local git repository is ready! Now you need to create the GitHub repository and push your code.

## Step 1: Create GitHub Repository

### Option A: Using GitHub CLI (if installed)
```bash
gh repo create uigen --public --description "AI-powered React component generator with live preview"
git push -u origin main
```

### Option B: Using GitHub Website
1. Go to https://github.com/new
2. Set **Repository name**: `uigen`
3. Set **Description**: `AI-powered React component generator with live preview`
4. Choose **Public** (recommended for open source)
5. **Don't** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

## Step 2: Push Your Code

After creating the repo, run these commands:

```bash
# Add the GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/uigen.git

# Push your code
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Set Up Claude GitHub Integration

Once the repo is created, follow the instructions in `GITHUB_SETUP.md`:

1. Install the Claude GitHub App: https://github.com/apps/claude
2. Add your `ANTHROPIC_API_KEY` to repository secrets
3. Test by creating an issue and commenting with `@claude`

## What's Already Set Up:

✅ **Git repository initialized**  
✅ **All code committed with proper history**  
✅ **GitHub Actions workflow configured**  
✅ **Documentation and setup guides**  
✅ **Proper .gitignore with security considerations**

## Repository Structure:
```
uigen/
├── .github/workflows/claude.yml  # Claude GitHub Actions
├── src/                          # Application source code
├── prisma/                       # Database schema
├── CLAUDE.md                     # Claude Code documentation
├── GITHUB_SETUP.md              # GitHub integration setup
├── README.md                     # Project documentation
└── package.json                  # Dependencies and scripts
```

Your repository is ready to be shared and collaborated on!