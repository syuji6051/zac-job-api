FROM public.ecr.aws/lambda/nodejs:12 AS builder

ARG NPM_GITHUB_TOKEN

WORKDIR /opt/build

COPY package*.json ./
COPY .npmrc ./

RUN npm config set //npm.pkg.github.com/:_authToken $NPM_GITHUB_TOKEN

RUN npm ci

COPY . .

RUN npm run build

##### ##### ##### #####
FROM public.ecr.aws/lambda/nodejs:12 AS runner

ARG NPM_GITHUB_TOKEN

COPY --from=builder \
  /opt/build/.npmrc ./

COPY --from=builder \
  /opt/build/package*.json ./

RUN npm config set //npm.pkg.github.com/:_authToken $NPM_GITHUB_TOKEN

COPY --from=builder \
  /opt/build/dist ./dist

RUN npm ci --only=production

CMD ["dist/app"]
