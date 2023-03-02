ARG NODE_BUILD_VERSION
FROM registry.gitlab.com/affinidi/container-image-cache/node-base:${NODE_BUILD_VERSION}

COPY --chown=node:node ./bin ./bin
RUN chmod +x -R ./bin

COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node ./dist ./dist
COPY --chown=node:node ./node_modules ./node_modules
COPY --chown=node:node ./swagger.json ./swagger.json

ENV NODE_ENV production

EXPOSE 3000

USER 1000

CMD [ "npm", "start" ]
