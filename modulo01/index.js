const express = require('express');

const server = express();

server.use(express.json());

//middleware - funciona como um filtro que passa antes da requisição 
server.use((req, res, next) => {
    console.time('Request'); //Calculo de tempo inicio
    console.log(`Método:: ${req.method} || URL:: ${req.url}`);
    next() //propaga a requisição para frente

    console.timeEnd('Request');//Calculo de tempo fim
});

function checkSomething(req, res, next) {
    const url = req.url;
    if (url !== "/teste") {
        return res.send(400).json({ 'error': 'Url não existe' });
    }

    return next();
}

server.get('/teste*', checkSomething, (req, res) => {
    return res.json({ msg: 'Hello World' });
});

server.listen(3000);