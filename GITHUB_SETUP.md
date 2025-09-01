# GitHub Claude Setup Instructions

I've created the GitHub Actions workflow file for you at `.github/workflows/claude.yml`. Now you need to complete the setup manually since it requires GitHub permissions.

## Step 1: Install the Claude GitHub App

1. Go to: https://github.com/apps/claude
2. Click "Install" and select your repository (`uigen`)
3. Grant the necessary permissions

## Step 2: Add Your Anthropic API Key to GitHub Secrets

1. Go to your repository on GitHub
2. Click **Settings** (top navigation)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Set:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Your Anthropic API key (starts with `sk-ant-`)
6. Click **Add secret**

## Step 3: Test the Setup

Once setup is complete, you can:

### In Issues:
- Create a new issue
- Comment with `@claude help me with...` and Claude will respond

### In Pull Requests:
- Claude will automatically analyze PRs when they're opened
- Comment with `@claude` to ask specific questions
- Use PR review comments with `@claude` for code-specific help

## Features Enabled:

- **Issue Comments**: `@claude create a new button component`
- **PR Reviews**: `@claude review this implementation`
- **Code Analysis**: Automatic PR analysis
- **Context Aware**: Claude knows your project structure and tech stack

## Security Notes:

✅ **Your API key is stored securely** in GitHub's encrypted secrets  
✅ **Never commit API keys** to your repository  
✅ **The workflow only runs on specific triggers** (comments with @claude, PRs)

## Troubleshooting:

If it doesn't work:
1. Check that the Claude app is installed on your repository
2. Verify the `ANTHROPIC_API_KEY` secret is set correctly
3. Make sure you're using `@claude` in comments
4. Check the Actions tab for any workflow errors

The workflow file is configured with sensible defaults for your React/Next.js project!