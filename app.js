import  express  from "express"
import {v4} from 'uuid'
import conexao from '../infra/conexao.js'

const app = express()
//express lendo boby como json
app.use(express.json())
// var sla=[]

// function buscarUsr(id){
//     return sla.filter( sla => sla.id ==id)
// }

// function buscaIndex(id){
//     const index = sla.findIndex(user => user.id === id)
// }

//rotas
app.get('/users', (req, res) =>{
    //envia a lista de usuarios(json)
    const sql = "SELECT * FROM new_table;"
    conexao.query(sql, (error, result)=>{
        if(error){
            res.status(404).send(error)
        }else{
            res.status(200).json(result)
        }
    })
})


app.get('/users/:id', (req, res) =>{
    const id = req.params.id
    const consultaId = "SELECT * FROM new_table WHERE id=?;"
    conexao.query(consultaId, id, (erro, result)=>{
        if(erro){
            res.status(404).send({"erro":erro });
        }else{
            res.status(200).json(result)
        }
    })
})



app.post('/users', (req, res) =>{
    const selecao = req.body
    const sql = "INSERT INTO  new_table SET ?;"
    conexao.query(sql, selecao, (erro, result)=>{
        if(erro){
            res.status(400).send({"erro": erro})
        }else{
            res.status(201).json(result)
        }
    }) 
})



app.delete('/delete/:id' , (req, res) =>{
    const sql = "DELETE FROM new_table WHERE id =?;"
    const id = req.params.id
    conexao.query(sql, id, (erro, result)=>{
        if(erro){
            res.status(400).json({"erro": erro})
        }else{
            res.status(201).json(result)
        }
    })



})
app.put('/put/:id', (req, res)=>{
    const sql = 'UPDATE new_table SET ? WHERE id=?;'
    const id = req.params.id
    const dados = req.body
    conexao.query(sql, [dados, id], (erro, result)=>{
        if(erro){
            res.status(400).json({'erro':erro})
            
        }else{
            res.status(200).json(result)
        }

    })
})
export default app