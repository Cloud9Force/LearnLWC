# Git Cheat Sheet (Team Workflow)
Update your local main
This is a short, practical guide for working on LWCs with a team.
git checkout main
git pull --no-rebase origin main
Create and switch to your branch
git checkout -b feature/my-new-lwc
Work, then commit
git add .
git commit -m "feat(lwc): add my-new-lwc"
Push your branch
git push -u origin feature/my-new-lwc
## What Git Is Doing (Concept)
- Git is a local version control system on your computer.
- It watches your files and records snapshots (commits).
- Local changes are not shared until you push to GitHub.
- GitHub (remote) is the shared copy for the team.
- Branches let you work safely without changing `main`.

## Daily Start
- Update your local main:
  - `git checkout main` → switch to your local `main` branch.
  - `git pull --no-rebase origin main` → download and merge the latest changes from GitHub.
  - `git checkout -b feature/new-branch` -> create a new branch for new work

## Start New Work
- Create a feature branch (one LWC or task per branch):
  - `git checkout -b feature/my-new-lwc` → create a new branch and switch to it.
- If you already have a branch from yesterday:
  - `git checkout feature/my-new-lwc` → switch to that branch.
  - `git pull --no-rebase origin feature/my-new-lwc` → update your branch from GitHub.

## While You Work
Modified = file exists in Git and has changes not staged yet.
Staged = changes you’ve added with git add; these will be included in the next commit.
Untracked = new file that Git isn’t tracking yet (never added before).
So the flow is:
Untracked/Modified → git add → Staged → git commit
- See what changed:
  - `git status` → list modified, staged, and untracked files.
- Stage files for commit:
  - `git add path/to/file` → stage specific files for the next commit.
- Commit your staged changes:
  - `git commit -m "feat(lwc): add my-new-lwc"` → save a snapshot locally with a message.

## Before You Push
- Pull latest main into your branch (safest: merge):
  - `git pull --no-rebase origin main` → bring in team changes before pushing.

## Push Your Branch
- `git push -u origin feature/my-new-lwc` → upload your branch to GitHub.

## Open a PR
- Create a Pull Request on GitHub.
- Get review and merge into `main`.

## If You See Conflicts
- Git will mark conflict sections in files.
- Edit the files to keep the correct content.
- Mark resolved:
  - `git add <file>` → mark conflicts as resolved.
- Finish merge:
  - `git commit` → complete the merge with a commit.

## How to Resolve a Conflict (Step-by-Step)
1. Run `git status` to see which files are conflicted.
2. Open the file and find conflict markers:
   - `<<<<<<<` (your changes)
   - `=======` (separator)
   - `>>>>>>>` (incoming changes)
3. Decide what to keep, then delete the markers.
4. Save the file.
5. Stage the resolved file:
   - `git add <file>`
6. After all conflicts are resolved, finish the merge:
   - `git commit`

## Quick Reference
- `git status` → see modified files
- `git add` → stage changes
- `git commit` → save snapshot locally
- `git pull` → get changes from GitHub
- `git push` → send changes to GitHub

## Best Practices
- One task per branch.
- Commit small, meaningful chunks.
- Pull from `main` before pushing.
