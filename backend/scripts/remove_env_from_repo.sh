#!/usr/bin/env bash
# Safe helper script with commands to remove `backend/.env` from git tracking and optionally purge history.
# This script only prints commands for review; do not run it blindly. Review and run each command manually.

echo "Step 1: stop tracking the file and commit"
echo "  git rm --cached backend/.env"
echo "  git commit -m 'Remove committed backend .env from repository'"
echo "  git push origin $(git rev-parse --abbrev-ref HEAD)"

echo "\nIf you need to PURGE the file from git history, pick one of the following approaches."
echo "Option A: Use git-filter-repo (recommended)"
echo "  pip install git-filter-repo"
echo "  git clone --mirror <repo-url> repo-mirror.git"
echo "  cd repo-mirror.git"
echo "  git filter-repo --path backend/.env --invert-paths"
echo "  git push --force origin refs/heads/*"

echo "Option B: Use BFG (simpler but rewrites history)
  # install BFG (java required)
  java -jar bfg.jar --delete-files .env
  git reflog expire --expire=now --all
  git gc --prune=now --aggressive
  git push --force"

echo "\nAfter removing the file, rotate any exposed credentials (see SECURITY_ROTATION.md)."
