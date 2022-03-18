ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN yarn install