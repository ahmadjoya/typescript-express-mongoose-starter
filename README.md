<h1 align="center">
  <br>
  <img src="https://miro.medium.com/v2/resize:fit:826/1*lkp5yztcHJ1yPMLWQc4dwA.png" alt="Project Logo" />
  <br>
  <br>
  TypeScript Express Mongoose Starter
  <br>
</h1>

<h4 align="center">🚀 Express RESTful API Boilerplate with TypeScript and Mongoose</h4>

<p align="center">
  <a href="https://www.npmjs.com/package/typescript-express-mongoose-starter" target="_blank">
    <img src="https://img.shields.io/npm/v/typescript-express-mongoose-starter.svg" alt="npm Version" />
  </a>
  <a href="https://www.npmjs.com/package/typescript-express-mongoose-starter" target="_blank">
    <img src="https://img.shields.io/github/v/release/ahmadjoya/typescript-express-mongoose-starter" alt="npm Release Version" />
  </a>
  <a href="https://www.npmjs.com/package/typescript-express-mongoose-starter" target="_blank">
    <img src="https://img.shields.io/npm/dm/typescript-express-mongoose-starter.svg" alt="npm Downloads" />
  </a>
  <a href="https://www.npmjs.com/package/typescript-express-mongoose-starter" target="_blank">
    <img src="https://img.shields.io/npm/l/typescript-express-mongoose-starter.svg" alt="npm Package License" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/ahmadjoya/typescript-express-mongoose-starter/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/ahmadjoya/typescript-express-mongoose-starter" alt="github Stars" />
  </a>
  <a href="https://github.com/ahmadjoya/typescript-express-mongoose-starter/network/members" target="_blank">
    <img src="https://img.shields.io/github/forks/ahmadjoya/typescript-express-mongoose-starter" alt="github Forks" />
  </a>
  <a href="https://github.com/ahmadjoya/typescript-express-mongoose-starter/stargazers" target="_blank">
    <img src="https://img.shields.io/github/contributors/ahmadjoya/typescript-express-mongoose-starter" alt="github Contributors" />
  </a>
  <a href="https://github.com/ahmadjoya/typescript-express-mongoose-starter/issues" target="_blank">
    <img src="https://img.shields.io/github/issues/ahmadjoya/typescript-express-mongoose-starter" alt="github Issues" />
  </a>
</p>

<br />

<p align="center">
  <a href="https://github.com/ahmadjoya/typescript-express-mongoose-starter/actions/workflows/ci.yml" target="_blank">
    <img src="https://github.com/ahmadjoya/typescript-express-mongoose-starter/actions/workflows/ci.yml/badge.svg" alt="CI" />
  </a>
</p>

<br />

## 😎 Introduction

The TypeScript Express Mongoose Starter is a comprehensive boilerplate for building robust and scalable web applications using the TypeScript programming language, Express.js framework, and Mongoose ODM for MongoDB. It provides a solid foundation and a set of best practices to kickstart your TypeScript-based Express projects with ease.

## Features

- **TypeScript 5:** Enjoy the benefits of static typing, enhanced code maintainability, and better developer tooling with TypeScript.
- **Express 5:** Build powerful and flexible web APIs using the latest major release of Express.
- **Mongoose 8:** Utilize the elegant MongoDB object modeling library Mongoose for seamless integration with MongoDB databases.
- **User Authentication:** Includes a pre-configured user authentication system with password hashing using bcrypt and JWT-based authentication.
- **API Documentation:** OpenAPI 3.0 docs generated with Swagger and served through Swagger UI at `/api-docs`.
- **Error Handling:** Implement centralized error handling and consistent error responses across your application.
- **Environment Configuration:** Manage your application's configuration using environment variables, validated on boot with envalid.
- **Linting and Formatting:** ESLint 10 (flat config) and Prettier 3, pre-configured and Windows-friendly.
- **Testing with Jest:** Write unit tests and run them using the Jest testing framework.
- **Docker Integration:** Multi-stage Dockerfile on Node 22 plus a Compose stack with MongoDB and Nginx.
- **Nginx Reverse Proxy:** Set up Nginx as a reverse proxy to enhance performance, security, and load balancing capabilities.
- **Process Management:** Utilize PM2 or Nodemon for process management and automatic application restarts during development and production.
- **SWC Compiler:** Utilize the SWC compiler for faster TypeScript compilation and improved performance.

## 📋 Requirements

- **Node.js 20.19 or newer**
- A running **MongoDB** instance (local, Docker, or MongoDB Atlas)

## ⚒ How to Install

To create a new project using this starter template, you can use `npx` to quickly scaffold the project. If you don't write the project name yourself, the default name `typescript-express-mongoose-starter` will be used.

```bash
$ npx typescript-express-mongoose-starter <project-name>
```

Alternatively, you can clone the repository and install the dependencies:

```bash
$ git clone https://github.com/ahmadjoya/typescript-express-mongoose-starter.git
$ cd typescript-express-mongoose-starter
$ npm install
```

## Configuration

Environment variables are loaded from `.env.<NODE_ENV>.local` — so `.env.development.local` for `npm run dev`, `.env.test.local` for `npm test`, and `.env.production.local` for `npm start`. Copy [`.env.example`](.env.example) as your starting point. Every variable is validated on boot, and the app exits with a clear message if one is missing or malformed.

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3000` | Port the HTTP server listens on |
| `DB_HOST` | `127.0.0.1` | MongoDB host |
| `DB_PORT` | `27017` | MongoDB port |
| `DB_DATABASE` | `dev` | MongoDB database name |
| `DB_URI` | _(unset)_ | Full connection string. **Takes precedence** over the three variables above — use this for MongoDB Atlas (`mongodb+srv://...`) |
| `SECRET_KEY` | `secretKey` | JWT signing secret. **Change this before deploying to production** |
| `LOG_FORMAT` | `dev` | Morgan log format |
| `LOG_DIR` | `logs` | Log directory, relative to the project root (absolute paths are honoured as-is) |
| `ORIGIN` | `*` | CORS allowed origin |
| `CREDENTIALS` | `true` | Whether CORS allows credentials |

## 🚀 Usage

```bash
$ npm run dev      # start in development with hot reload (nodemon + ts-node)
$ npm start        # build and start in production
$ npm test         # run the Jest test suite
$ npm run lint     # lint with ESLint
$ npm run build    # compile to dist/ with SWC
```

| Script | What it does |
| --- | --- |
| `dev` | Runs the server through nodemon with hot reload |
| `start` | Builds and runs the compiled server in production mode |
| `build` | Compiles `src/` to `dist/` with SWC (fast) |
| `build:tsc` | Compiles with `tsc` + `tsc-alias` (type-checked build) |
| `typecheck` | Type-checks the whole project without emitting |
| `test` | Runs the Jest test suite |
| `test:coverage` | Runs the tests with a coverage report |
| `lint` / `lint:fix` | Lints (and auto-fixes) `src/` |
| `format` / `format:check` | Formats (and checks) `src/` with Prettier |
| `deploy:dev` / `deploy:prod` | Starts the app under PM2 using `ecosystem.config.js` |

Once running, the API docs are available at <http://localhost:3000/api-docs>.

## 🧪 Testing

The test suite runs entirely against mocked Mongoose models, so **no MongoDB instance is required**:

```bash
$ npm test
```

`npm test` sets `NODE_ENV=test`, which loads `.env.test.local`. That file ships with the repo, so the suite works on a fresh clone with no extra setup.

## 📁 Project Structure

```
src/
├── config/       Loads and exposes environment variables
├── controllers/  Request handlers — parse the request, call a service, shape the response
├── databases/    MongoDB connection string and options
├── dtos/         Data Transfer Objects — request body shapes validated by class-validator
├── exceptions/   Custom error types (HttpException) used by the error middleware
├── http/         REST Client request samples (.http files) for manual API testing in VS Code
├── interfaces/   Shared TypeScript types
├── middlewares/  Auth, validation, and centralized error handling
├── models/       Mongoose schemas and models
├── routes/       Route definitions, wiring paths to controllers
├── services/     Business logic and all database access
├── tests/        Jest test suites
└── utils/        Logger and small helpers
```

The `src/http` folder holds `.http` files you can execute directly from VS Code with the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension — a quick way to hit the API by hand without Postman.

## 🐳 Docker

Bring up the full stack (API + MongoDB + Nginx reverse proxy):

```bash
$ docker compose up -d
```

The API is then reachable on <http://localhost:3000> directly, or through Nginx on <http://localhost>.

To build the production image on its own:

```bash
$ docker build --target production-build-stage -t typescript-express .
```

## ⭐️ Stargazers

Thank you to everyone who has starred this project — see the full list on the [stargazers page](https://github.com/ahmadjoya/typescript-express-mongoose-starter/stargazers).

## 🍴 Forkers

Browse everyone building on top of this starter on the [forks page](https://github.com/ahmadjoya/typescript-express-mongoose-starter/network/members).

## Contributions

Contributions, bug reports, and feature requests are always welcome! If you encounter any issues or have ideas to improve the starter template, please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/ahmadjoya/typescript-express-mongoose-starter).
