# Aww Bot - Discord bot using Cloudflare worker

awwbot is a cute app that brings many cuteness straight to your Discord server, hosted on Cloudflare workers. Cloudflare Workers are a convenient way to host Discord bots due to the free tier, simple development model, and automatically managed environment (no VMs!).

The project is bootstrapped using the tutorial [in the discord developer documentation](https://discord.com/developers/docs/tutorials/hosting-on-cloudflare-workers)

![awwbot in action](https://user-images.githubusercontent.com/534619/157503404-a6c79d1b-f0d0-40c2-93cb-164f9df7c138.gif)

## Invite Awwbot to your server
[Click to add](https://bit.ly/awwbot)

## Resources used

- [Itty Router](https://npm.io/itty-router) for routing 
- [Cloudflare Workers](https://workers.cloudflare.com/) for hosting

---

## Project structure

Below is a basic overview of the project structure:

```
root
│   .dev.vars           // Configuration file for development environment variables
│   .eslintignore       // Files and folders to be ignored by ESLint
│   .eslintrc.json      // ESLint configuration file
│   .prettierignore     // Files and folders to be ignored by Prettier
│   .prettierrc.json    // Prettier configuration file
│   .gitignore          // Files and folders to be ignored by Git
│   package.json        // Node.js package configuration file
│
└───src
    │   register.js     // File responsible for registering commands
    │   server.js       // Main server file
    │
    ├───commands        // Folder containing command modules
    │       ask.js      // Command module for asking questions
    │       aww.js      // Command module for displaying cute images
    │       blep.js     // Command module for displaying images with blep
    │       canvas.js   // Command module for generating canvas images
    │       content.js  // Command module for fetching various content
    │       index.js    // Main command handler module
    │       invite.js   // Command module for generating invitation links
    │       neko.js     // Command module for fetching neko images
    │       ping.js     // Command module for testing bot latency
    │
    ├───data            // Folder containing data files
    │       catfacts.json   // JSON file containing cat facts
    │       dogfacts.json   // JSON file containing dog facts
    │       jokes.json      // JSON file containing jokes
    │
    ├───discord         // Folder containing Discord-related modules
    │       CDN.js          // Module for working with Discord's CDN
    │       Interaction.js  // Module for handling Discord interactions
    │       types.js        // Module for defining custom Discord types
    │       utils.js        // Utility functions for Discord-related tasks
    │       verifyRequest.js    // Module for verifying Discord request signatures
    │
    └───utils           // Folder containing utility modules
            reddit.js       // Module for interacting with the Reddit API
```

## Configuring project

Before starting, you'll need a [Discord app](https://discord.com/developers/applications) with the following permissions:

- `bot` with the `Send Messages` and `Use Slash Command` permissions
- `applications.commands` scope

> ⚙️ Permissions can be configured by clicking on the `OAuth2` tab and using the `URL Generator`. After a URL is generated, you can install the app by pasting that URL into your browser and following the installation flow.

## Creating your Cloudflare worker

Next, you'll need to create a Cloudflare Worker.

- Visit the [Cloudflare dashboard](https://dash.cloudflare.com/)
- Click on the `Workers` tab, and create a new service using the same name as your Discord bot

## Running locally

First clone the project:

```
git clone https://github.com/LakhindarPal/awwbot.git
```

Then navigate to its directory and install dependencies:

```
cd awwbot
npm install
```

> ⚙️ The dependencies in this project require at least v20 of [Node.js](https://nodejs.org/en/)

### Local configuration

> 💡 More information about generating and fetching credentials can be found [in the tutorial](https://discord.com/developers/docs/tutorials/hosting-on-cloudflare-workers#storing-secrets)

Rename `example.dev.vars` to `.dev.vars`, and make sure to set each variable.

**`.dev.vars` contains sensitive data so make sure it does not get checked into git**.

### Register commands

The following command only needs to be run once:

```
$ npm run register
```

### Run app

Now you should be ready to start your server:

```
$ npm run dev
```

### Setting up ngrok

When a user types a slash command, Discord will send an HTTP request to a given endpoint. During local development this can be a little challenging, so we're going to use a tool called `ngrok` to create an HTTP tunnel.

```
$ npm run ngrok
```

![forwarding](https://user-images.githubusercontent.com/534619/157511497-19c8cef7-c349-40ec-a9d3-4bc0147909b0.png)

This is going to bounce requests off of an external endpoint, and forward them to your machine. Copy the HTTPS link provided by the tool. It should look something like `https://8098-24-22-245-250.ngrok.io`. Now head back to the Discord Developer Dashboard, and update the "Interactions Endpoint URL" for your bot:

![interactions-endpoint](https://user-images.githubusercontent.com/534619/157510959-6cf0327a-052a-432c-855b-c662824f15ce.png)

This is the process we'll use for local testing and development. When you've published your bot to Cloudflare, you will _want to update this field to use your Cloudflare Worker URL._

## Deploying app

This repository is set up to automatically deploy to Cloudflare Workers when new changes land on the `main` branch. To deploy manually, run `npm run deploy`, which uses the `wrangler deploy` command under the hood. Publishing via a GitHub Action requires obtaining an [API Token and your Account ID from Cloudflare](https://developers.cloudflare.com/workers/wrangler/cli-wrangler/authentication/#generate-tokens). These are stored [as secrets in the GitHub repository](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository), making them available to GitHub Actions. The following configuration in `.github/workflows/ci.yaml` demonstrates how to tie it all together:

```yaml
release:
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  needs: [test, lint]
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
    - run: npm install
    - run: npm run publish
      env:
        CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### Storing secrets

The credentials in `.dev.vars` are only applied locally. The production service needs access to credentials from your app:

```
$ wrangler secret put DISCORD_TOKEN
$ wrangler secret put DISCORD_PUBLIC_KEY
$ wrangler secret put DISCORD_APPLICATION_ID
```