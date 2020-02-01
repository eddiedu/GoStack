Module 03

Multer para upload de arquivos

yarn add date-fns@next - biblioteca para lidar com datas

nodemailer

template engine, arquivos html que podem receber vars do node
yarn add express-handlebars nodemailer-express-handlebars
http://handlebarsjs.com

instalando o redis
docker run --name redis -p 6379:6379 -d -t redis:alpine

lib para usar o redis tem algumas limitações
yarn add bee-queue

Caso precise de mais coisa, menos performance mas mais controle
kue


ferramente de monitoramente de erros

bug? snag?

sentry.io

para que sentry pegue os erros async

ajuda na trativa de erro


dotenv - para as variáveis de ambiente
import 'dotenv/config';

disponibiliza dentro de process.env as vars que criei


================================================================================
Module 02

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

