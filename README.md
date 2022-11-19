# grammarcheckerai.web

# Gitty Grammar

This is Gritty Grammar monrepo bootstrapped lerna.

## Getting Started

Make sure you have nodejs installed by running the following command:

```bash
node --version
```

If the output is not the version of your nodejs installation, install nodejs from [here](https://nodejs.org/en/download/)

Then install the dependencies after cloning the project _please use npm_:

```bash
npm install
```

## Start the server

Then, start up the application.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### **Building**

```bash
npm build
```

## Editor setup

We're using eslint for js linting, and prettier for code formating, make sure you install eslint and prettier plugins in your editor so you can
see linting errors as you code and have your code formatted on save by prettier. If formatOnSave doesn't work please google how to set up
format on save for the eslint & prettier plugins in your editor 🙃

## Contributing

All pull requests should be made to the `dev branch` addequate commit message must be use and has been enforced throght commitlint your commit messages should be in this form `{commit type}: {commit message}` eg `ci: setup eslint and prettier to ensure code linting and formatting` refer to our commit lint file [here](commitlint.config.js)

**Note pre-commit `npm run lint` is run.**

```bash
npm  run lint # to lint only js,jsx files # in project directory

npm  run prettify # to prettify files # in project directory
```

you can also lint for all files in the repo by running that command in the root folder.
