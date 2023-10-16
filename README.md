<h1 align="center">
  <br>
  <img src="https://miro.medium.com/v2/resize:fit:826/1*lkp5yztcHJ1yPMLWQc4dwA.png" alt="Project Logo" />
  <br>
  <br>
  TypeScript Express Mongoose Starter
  <br>
</h1>

<h4 align="center">🚀 Express RESTful API Boilerplate with TypeScript and Mongoose</h4>

<p align ="center">
  <a href="https://nodei.co/npm/typescript-express-mongoose-starter" target="_blank">
    <img src="https://nodei.co/npm/typescript-express-mongoose-starter.png" alt="npm Info" />
  </a>
</p>

<p align="center">
  <a href="http://npm.im/typescript-express-mongoose-starter" target="_blank">
    <img src="https://img.shields.io/npm/v/typescript-express-mongoose-starter.svg" alt="npm Version" />
  </a>
  <a href="http://npm.im/typescript-express-mongoose-starter" target="_blank">
    <img src="https://img.shields.io/github/v/release/ahmadjoya/typescript-express-mongoose-starter" alt="npm Release Version" />
  </a>
  <a href="http://npm.im/typescript-express-mongoose-starter" target="_blank">
    <img src="https://img.shields.io/npm/dm/typescript-express-mongoose-starter.svg" alt="npm Downloads" />
  </a>
  <a href="http://npm.im/typescript-express-mongoose-starter" target="_blank">
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


<br />

## 😎 Introduction

The TypeScript Express Mongoose Starter is a comprehensive boilerplate for building robust and scalable web applications using the TypeScript programming language, Express.js framework, and Mongoose ORM for MongoDB. It provides a solid foundation and a set of best practices to kickstart your TypeScript-based Express projects with ease.

## Features

- **TypeScript:** Enjoy the benefits of static typing, enhanced code maintainability, and better developer tooling with TypeScript.
- **Express.js:** Build powerful and flexible web APIs using the popular Express.js framework.
- **Mongoose:** Utilize the elegant MongoDB object modeling library Mongoose for seamless integration with MongoDB databases.
- **User Authentication:** Includes a pre-configured user authentication system with password hashing using bcrypt and JWT-based authentication.
- **API Documentation:** Generate API documentation effortlessly with Swagger and Swagger UI integration.
- **Error Handling:** Implement centralized error handling and consistent error responses across your application.
- **Environment Configuration:** Manage your application's configuration using environment variables with the help of the dotenv library.
- **Linting and Formatting:** Maintain clean and consistent code with ESLint and Prettier pre-configured.
- **Testing with Jest:** Write unit tests and run them using the Jest testing framework.
- **Docker Integration:** Easily containerize your application using Docker for simplified deployment and scalability.
- **Nginx Reverse Proxy:** Set up Nginx as a reverse proxy to enhance performance, security, and load balancing capabilities.
- **Process Management:** Utilize PM2 or Nodemon for process management and automatic application restarts during development and production.
- **SWC Compiler:** Utilize the SWC compiler for faster TypeScript compilation and improved performance.

## ⚒ How to Install


To create a new project using this starter template, you can use `npx` to quickly scaffold the project. if you don't write the project name yourself, default name typescript-express-mongoose-starter will be used.

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

Before starting the project, make sure to set up your database credentials in the `.env.development.local` file. This file is used for local development and should not be committed to version control. Here's an example of how the `.env.development.local` file should be structured:
### Database Configuration
- **DB_HOST=** 127.0.0.1
- **DB_PORT=** 27017
- **DB_DATABASE=** dev
- **LOG_FORMAT=** dev
- **LOG_DIR=** ../logs

## ⭐️ Stargazers

[![Stargazers repo roster for @ahmdjoya/typescript-express-mongoose-starter](https://reporoster.com/stars/ahmadjoya/typescript-express-mongoose-starter)](https://github.com/ahmadjoya/typescript-express-mongoose-starter/stargazers)

## 🍴 Forkers

[![Forkers repo roster for @ahmadjoya/typescript-express-mongoose-starter](https://reporoster.com/forks/ahmadjoya/typescript-express-mongoose-starter)](https://github.com/ahmadjoya/typescript-express-mongoose-starter/network/members)
## Contributions

Contributions, bug reports, and feature requests are always welcome! If you encounter any issues or have ideas to improve the starter template, please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/ahmadjoya/typescript-express-mongoose-starter).
