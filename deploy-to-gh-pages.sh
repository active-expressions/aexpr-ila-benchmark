#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_BRANCH" == "master" ]; then

  echo -e "Publishing benchmark results...\n"

  cp -R results $HOME/results-to-push

  cd $HOME
  git config --global user.email "stefan.ramson@hpi.de"
  git config --global user.name "onsetsu"
  git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/active-expressions/active-expressions-benchmark-results gh-pages > /dev/null

  cd results-to-push

  for file in *.json
  do
    cp "$file" "../gh-pages/benchmarks/latest.json"
    cp "$file" "../gh-pages/benchmarks/history/$file"
    echo "$file">>../gh-pages/benchmarks/results.json
  done

  cd ..
  cd gh-pages
  git add -f .
  git commit -m "Latest benchmark results on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to gh-pages"
  git push -fq origin gh-pages > /dev/null

  echo -e "Published benchmark results to gh-pages.\n"

fi