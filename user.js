const express = require('express')
const app = express()
app.use( express.json() )


/** Daqui pra cima só quando eu ensinar */

var vusers = []

function create_user(req, res) {
    let {genero, idade, nome} = req.body

    var ouser = {
        "id":vusers.length,
        "genero":genero,
        "idade":idade,
        "nome":nome,
        "deletedAt":null
    }
    vusers.push(ouser)

    return res.status(201).json({
        message: "Usuario criado",
        db: vusers
    })
}
app.post('/user', create_user)

function read_user(req, res) {
    return res.status(201).json({
        message: "Todos os usuario",
        db: vusers.filter(u => u.deletedAt == null)
    })
}
app.get('/user', read_user)

function filter(vetor){
    novo = []
    for(let i=0; i<vetor.length; i++){
        if(vetor[i].deletedAt == null){
            novo.push(vetor[i])
        }
    }
    return novo
}


function show_user(req, res) {
    let {id} = req.params

    const idx = vusers.findIndex(u => u.id == id)

    if(idx == -1 || vusers[idx].deletedAt != null){
        return res.status(404).json({
            message: "Não encontrado",
            db: null
        })
    }
    
    return res.status(202).json({
        message: "Encontrei",
        db: vusers[idx]
    })
}
app.get('/user/:id', show_user)

function update_user(req, res) {
    let {id} = req.params

    const idx = vusers.findIndex(u => u.id == id)

    if(idx == -1 || vusers[idx].deletedAt != null){
        return res.status(404).json({
            message: "Não encontrado",
            db: null
        })
    }

    let {genero, idade, nome} = req.body

    if(genero) vusers[idx].genero = genero
    if(idade) vusers[idx].idade = idade
    if(nome) vusers[idx].nome = nome

    return res.status(202).json({
        message: "Encontrei",
        db: vusers[idx]
    })
}
app.put('/user/:id', update_user)

function delete_user(req, res){
    let {id} = req.params

    const idx = vusers.findIndex(u => u.id == id)
    if(idx != -1){
        vusers[idx].deletedAt = new Date()
        return res.status(203).json({
            message: "Foi de base"
        })
    }

    return res.status(404).json({
        message: "Não encontrado"
    })
}
app.delete('/user/:id', delete_user)


/** aqui pra baixo não é pra ter nada */


app.listen(3000, () => {
    console.log('http://localhost:3000')
})