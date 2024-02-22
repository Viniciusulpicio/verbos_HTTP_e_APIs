    // chamar o arquivo exp
    const api = require('./api')

    // chamar express
    const express = require("express");

    // criando uma instancia com nome server
    const server = express();
    server.use(express.json());

    // deixar o server publico na porta 3000
    server.listen(3000);
    server.get('/first', (req, res) => {
        return res.send({first: "Hello Word"});
    })

    server.get("/parametro", (req, res) => {
        const {nome, idade} = req.query;
        return res.send({resultado: `Seja bem vindo ${nome} e minha idade é ${idade}`});
    })

    //http://localhost:3000/parametro?nome=douMinhaBunda&idade=6

    let produtos = []
    // post = insert

    server.post('/produtos', (req,res) =>{
        const{id, nome, preco} = req.body

        produtos.push({id: id,nome:nome,preco:preco})
        res.send({messagem: "Sucesso!"})
    })

    server.get('/produtos', (req, res) =>{
        res.send ({Produtos: produtos})
    })

    server.put('/produto', (req,res) =>{
        const {id, nome,preco} = req.body
        const {outronome} = req.query

        const posicao = produtos.findIndex(item => item,nome === outronome)

        produtos[posicao].nome = nome;
        produtos[posicao].id = nome;
        produtos[posicao].preco = nome;

        res.send({Mensagem:"Sucesso!"})

    })

    server.delete('/produto/:id', (req, res) =>{
        const {id} = req.params;

        const newProduto = produtos.filter(item => item.id !== parseInt(id));

        produtos = newProduto;

        res.send({messagem: 'Sucesso!'})
    })

    // async => assincrona (não tem tempo para responder)
    // await => 

    server.get('/pokemon/:id', async (req, res) => {
        const {id} = req.params;
        try{
            const {data} = await api.get(`pokemon/${id}`)
            return res.send({name: data.name})

        } catch(error){
            res.send({erro : error.message})
        }
    })



const apikey = '2ddd26983f7ffd6b7eef0b7331d1b3ca';
const axios = require('axios');

server.get('/climatempo/:cidade', async(req, res) => {
    const city = req.params.cidade;
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
        res.send({Temperatura: response.data.main.temp})

    }catch (error){
        res.send({erro: 'deu erro ai viado', error})
    }
})