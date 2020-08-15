# Mattermost slash command proxy

Proxy Mattermost slash commands and formulate a useful response.

# Build process

## Building/ running docker container

```bash
# to run locally
docker build --tag $USER/mm-slash-commands .
docker run --name mm-slash-commands -d -p 80:80 $USER/mm-slash-commands
```

### Environment Variables

`PORT` is the port the server will run on.

## Resources

[Deploying to Heroku from GitHub Action](https://dev.to/heroku/deploying-to-heroku-from-github-actions-29ej)
