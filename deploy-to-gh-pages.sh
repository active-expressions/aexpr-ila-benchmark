#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_BRANCH" == "master" ]; then

  echo -e "Publishing benchmark results...\n"

  cp -R results $HOME/results-to-push

  cd $HOME
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "travis-ci"
  git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/active-expressions/active-expressions-benchmark gh-pages > /dev/null

  cd gh-pages
  git rm -rf ./results
  cp -Rf $HOME/results-to-push ./results
  git add -f .
  git commit -m "Latest benchmark results on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to gh-pages"
  git push -fq origin gh-pages > /dev/null

  echo -e "Published benchmark results to gh-pages.\n"

fi