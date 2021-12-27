#!/bin/sh

set -e

echo "|-----------------------------|"
echo "|  Welcome to BUGGZI-API      |"
echo "|       Generating ENV        |"
echo $'|-----------------------------|\n'

cwd="${PWD##*/}"

if [ $cwd == "scripts" ]; then
  cd ../
fi

echo "ENV will be generated here: $(pwd)"

read -r -p "Continue? [y/N] " exec_continue

if [[ "$exec_continue" =~ ^([yY])$ ]]; then
  if [[ -f ".env" ]]; then
    rm .env
  fi
  # Create .env file.
  echo "PORT=3000
DOMAIN=localhost
DB_URI=mongodb://localhost:27017/BuggziAPI
TOKEN_SIGN_KEY=$(openssl rand -hex 32)" >> .env
else
  exit
fi

echo $'\n|----------------|'
echo "|      DONE      |"
echo $'|----------------|\n'

exit