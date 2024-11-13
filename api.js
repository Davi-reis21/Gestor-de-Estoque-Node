const express = require('express');
const path = require('path');
const sqlite = require('sqlite3').verbose();

const app = express();

app.use(express.json());

const db = new sqlite.Database('Mercado.sqlite')

app.use(express.static(path.join(__dirname, 'public')));


function Criar_tabela() {
    var query = "CREATE TABLE IF NOT EXISTS USUARIOS(";
    query += "ID INTEGER PRIMARY KEY AUTOINCREMENT,";
    query += "NOME VARCHAR,";
    query += "CPF VARCHAR,";
    query += "MATRICULA INT,";
    query += "SENHA VARCHAR)";

    db.run(query, (err) => {
        if (err) console.log(err)
        else console.log('Tabela Criada com Sucesso!')
    });
}

//Criar_tabela()



function Produto_tabela() {
    var query = "CREATE TABLE IF NOT EXISTS PRODUTOS(";
    query += "ID INTEGER PRIMARY KEY AUTOINCREMENT,";
    query += "NOME VARCHAR,";
    query += "QUANTIDADE VARCHAR,";
    query += "PRECO REAL,";
    query += "MATRICULA INT,";
    query += "SENHA VARCHAR)";

    db.run(query, (err) => {
        if (err) console.log(err)
        else console.log('Tabela Criada com Sucesso!')
    });
}

//Produto_tabela()


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/login.html'))
})






app.post('/validarlogin', function (req, res) {

    console.log(req.body);

    var cpf = req.body.cpf;
    var senha = req.body.senha;

    if (cpf == 'admin' && senha == '123') res.send('principal.html')
    else res.send('/')


})








app.post('/addusuario', function (req, res) {

    console.log(req.body);

    var nome = req.body.nome;
    var cpf = req.body.nome;
    var matricula = req.body.matricula;
    var senha = req.body.nome;

    var sql = "INSERT INTO USUARIOS (NOME, CPF, MATRICULA, SENHA) VALUES (?, ?, ?, ?)"

    db.run(sql, [nome, cpf, matricula, senha], (err) => {

        if (err) res.send(err)
        else res.send('Usuario Cadastrado');

    })

})


app.post("/addprodutos", function (req, res) {

    console.log(req.body);

    var nome = req.body.nome;
    var quantidade = req.body.quantidade;
    var preco = req.body.preco;
    var codigo = req.body.codigo
    var marca = req.body.marca;
    var categoria = req.body.categoria;
    var peso = req.body.peso;

    var sql = 'INSERT INTO PRODUTOS (NOME, QUANTIDADE, PRECO, CODIGO, MARCA, CATEGORIA, PESO) VALUES (?, ?, ?, ?, ?, ?, ?)'

    db.run(sql, [nome, quantidade, preco, codigo, marca, categoria, peso], (err) => {
        if (err) res.send(err)
        else res.send("Produto Cadastrado!")
    })
})






app.get("/consultar/:param", (req, res) => {


    var query = "SELECT * FROM PRODUTOS WHERE CODIGO = ?";

    db.all(query, [req.params.codigo], (err, rows) => {
        if (err) res.send(err);
        else res.json(rows);
    })

    
})





app.listen(3000, console.log('Rodando..., http://localhost:2000'))