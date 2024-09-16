# Dockerfile for nodejs + typescriapt
FROM node


WORKDIR /8flow/src
ADD . /8flow/src

ENV NODE_PATH /8flow/src/node_modules
# RUN yarn install --ignore-engines

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

ENTRYPOINT []
CMD ["npm", "run", "start"]
