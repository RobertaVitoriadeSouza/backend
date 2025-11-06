import express from "express"
import cors  from "cors"
import mysql from "mysql2"
const{DB_USER,DB_PASSWORD,DB_NAME,DB_HOST}=process.env

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
  const searchCommand = "SELECT id, name, email, nickname FROM roberta_22B"
  database.query(searchCommand, (error, users) => {
    if (error) {
      console.log(error)
       return
    }
    response.json(users)
  })
})
app.post("/cadastrar", (request, response) => {
  const { user } = request.body;

  console.log(user);

  const insertCommand = `
  INSERT INTO roberta_22B (name, email, password, nickname)
   VALUES (?, ?, ?, ?)
  ` 
database.query(insertCommand,[user.name, user.email, user.password, user.nickname], (error) => {
  response.status(201).json({ message: "Usuário cadastrado com sucesso!" })
  if (error) {
    console.log(error)
    return
  }
  
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}!`)
})

const database = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 10
})