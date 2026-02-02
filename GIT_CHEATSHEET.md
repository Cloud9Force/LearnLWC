# Git Cheat Sheet (Team Workflow)
# Creating Repository in Github
Option 1) Either you have a Project in GitHub Repository and you have to get it into local to start working
Option 2) You already have a project in local but now you want to create a repo in GitHub and put your project in local  into the repo


# Working with option 2
Install git in your local machine

Create a new project in the local and put it into a new Github repo - Following are the steps

In your laptop go to your project folder in terminal cd /Users/bhupendra/ai-for-salesforce (Project folder)
git init (initialises git into project folder)
git add . (Add the files to staging)
git commit -m "Salesforce Data LWC commit" (commits the changes into local main)
git branch -M main (trying to name the local as main but it is generally main by default)
git remote add origin https://github.com/<your-username>/python-learning.git (connecting to repo you have created in GitHub named as Origin/main by default)
git push -u origin main (push your local main to remote)

# Always get changes from GitHub Repo(origin/main) into local Repo (main) before starting a new branch or task/proj.
git pull origin main
git pull origin task-work

# Always get changes from GitHub Repo(origin/main) or remote branch INTO local Repo (main)  or local branch before pushing the local(repo/branch) into the remote (repo/branch).
git push -u origin main 
git push origin task-work


Create my branch in local 
git checkout -b task-work  (creates new branch and checkout in one command)
Creates same branch in remote too
 git push -u origin task-work
git push -u origin feature/event-playground

Bring changes from Remote branch task-work  to my local branch
Check out local branch 
git checkout task-work

Bring changes from Remote branch task-work  to my local branch
git pull origin task-work

Push changes from my local branch to branch in remote
git push origin task-work


to stash a change in local file - before merging the branch to remote and then re apply stash locally to start working on it
git stash push -m "temp: stash before merge" && git checkout main && git merge feature/event-playground 

To merge your local branch task-work changes into local main repo:
git checkout main (checkout to local main repo)
git pull origin main (bring the changes from origin/main Remote to main local)
git merge task-work (now merge the local branch to local main)

Push the local main to remote origin/main
git push origin main
## What Git Is Doing (Concept)
- Git is a local version control system on your computer.
- It watches your files and records snapshots (commits).
- Local changes (main) are not shared until you push to GitHub.
- GitHub (remote origin/main) is the shared copy for the team.
- Branches let you work safely without changing `main` local.

## Daily Start
- Update your local main:
  - `git checkout main` → switch to your local `main` branch.
  - `git checkout branch-name` - switch to your local 'branch-name' branch if you are using branch 
  - `git pull --no-rebase origin main` → download and merge the latest changes from GitHub (origin/main) to local main.
  - `git checkout -b feature/new-branch` -> create/check out a new branch for new work

## Start New Work
- Create a feature branch (one LWC or task per branch):
  - `git checkout -b feature/my-new-lwc` → create a new branch and switch to it.
- If you already have a branch from yesterday:
  - `git checkout feature/my-new-lwc` → switch to that branch.
  - `git pull --no-rebase origin feature/my-new-lwc` → update your branch from GitHub (origin/main or branch in Github).

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

## Before You Push changes from local to Remmote always:
- Pull latest origin/main or remote branch into your local main or local branch (safest: merge):
  - `git pull --no-rebase origin main` → always bring in team changes in origin/main to local main or local branch before pushing back to remote.
`git pull origin task-work`- Bring changes from Remote branch task-work)  to my local branch task-work


## Push Your Branch
-
- `git push -u origin feature/my-new-lwc` → upload your branch from local branch to GitHub (origin/main ) or remote branch. If branch does not exit in remote it is created

## Open a PR
-Create a pull request so that manager can see the changes you.  have made and then he can confirm your changes to be merged into remote origin/main
- Create a Pull Request on GitHub.
- Get reviewed by Manager and merge into `origin/main`.

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
