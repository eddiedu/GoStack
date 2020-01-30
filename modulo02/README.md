Dependencies

Express - server http
Sucrase - para trazer novas funcionalidades
    ex: import express from 'express'
Nodemon - automatic refresh

Docker

docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

Client Postgres
https://www.electronjs.org/apps/postbird

Logs do docker
docker logs postgres

Eslint

DEpois de instalasr a dep rodar:
 yarn eslint --init

 Adicionado no settings.json

     "[javascript]": {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
        },
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "[javascriptreact]": {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
        },
    },

 alterado o eslintrc

 adicionado mais deps de dev
 yarn add prettier eslint-prettier eslint-plugin-prettier -D

 Rodar para atualizar sem ter que abrir o arquivo
 yarn eslint --fix src --ext .js

 Editor config
 Se tiver devs diferentes que usam editores diferentes


 SEQUELIZE

Comando para criar
yarn sequelize migration:create --name=create-users

Comando para rodar
yarn sequelize db:migrate

Comando para desfazer ultima migration
yarn sequelize db:migrate:undo

Comando para desfazer ultima migration todas
yarn sequelize db:migrate:undo:all

