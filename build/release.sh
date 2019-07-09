#!/usr/bin/env sh
set -e

git checkout master
git merge develop

VERSION=`npx select-version-cli`
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # build
  VERSION=$VERSION

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"

  # publish
  git push github master
  git push origin master
  git checkout develop
  git rebase master
  git push github develop

fi
