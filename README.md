# Mattermost slash command proxy

Proxy Mattermost slash commands and formulate a useful response.

# Build process

Future: Deploy to Heroku as a Docker container via GitHub Action.

## Building/ running docker container

```bash
# to run locally
docker build --tag $USER/mm-slash-commands .
docker run --name mm-slash-commands -d $USER/mm-slash-commands
```

## Resources

[Deploying to Heroku from GitHub Action](https://dev.to/heroku/deploying-to-heroku-from-github-actions-29ej)
