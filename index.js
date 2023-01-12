const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const JWTSecret = "kljhuhhçhhjbbm,nohihohljlkhjhjhjhkhhhk"


app.use(cors())

app.use(bodyParser.urlencoded({extends: false}))
app.use(bodyParser.json())


function auth(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){

        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token,JWTSecret,(err, data) => {
            if(err){
                res.json({err:"Token inválido!"});
                res.status(401);
            }else{

                req.token = token;
                req.loggedUser = {id: data.id,email: data.email};
                req.empresa = "Carlos mota";                
                next();
            }
        });
    }else{
        res.json({err:"Token inválido!"});
        res.status(401);
    } 
}



var DB ={
    game:[

        {
            id:23,
            title:"Call of duty",
            year: 219,
            price: 60
        },
        {
            id: 65,
            title: "Sea of Thieves",        //Simulação de banco de dados
            year: 2018,
            price: 40
        },
        {
            id:2,
            title: "Minecraft",
            year: 2012,
            price: 20
        }
    ],
    users:[
        {
            id: 1,
            name: "carlos mota",
            email: "carlosmota81@gmail.com",
            password: "1234"
        },
        {
            id: 10,
            name: "icaro mota",
            email: "icaro81@gmail.com",
            password: "1212"
        }
    ]
}


app.get("/games",auth,(req,res)=>{
    res.statusCode = 200;       //rota de listagem geral de produtos
    res.json(DB.game)
})
//---------------------------------------------------------------------------------

app.get("/games/:id",auth, (req,res)=>{
    if(isNaN(req.params.id)){                       //tratamento para busca correta por numero do id
        res.sendStatus(400);                         //busca por id do produto
    }else{
        var id = parseInt(req.params.id);
        var game = DB.game.find(g => g.id == id)

        if(game != undefined){
            res.json(game)
            res.statusCode(200)
        }else{
            res.sendStatus(404)
        }
    }
})

//-----------------------------------------------------------------------------------

app.post("/game",auth,(req,res)=>{
    var {title, price, year} = req.body;

    DB.game.push({
        id: 12,
        title,                                      //cadastrando produtos
        price,
        year
    })
    res.sendStatus(200)
    
})

//-------------------------------------------------------------------------------------

app.delete("/game/:nodemon index.js",auth,(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{                                                  //deletando id do banco
        var id = parseInt(req.params.id)
        var index = DB.game.findIndex(g=> g.id == id)

        if(index == -1){
            res.sendStatus(404)
        }else{
            DB.game.splice(index,1)
            res.sendStatus(200)
        }
    }
})

//---------------------------------------------------------------------------------------


app.put("/game/:id",auth,(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{

        var id = parseInt(req.params.id)
        var game = DB.game.find(g => g.id == id)

        if(game != undefined){

            var {title, price, year} = req.body             //Edição de dados

            if(title != undefined){
                game.title = title;
            }

            if(price != undefined){
                game.price = price
            }

            if(year != undefined){
                game.year = year;
            }

            res.sendStatus(200)

        }else{
            res.sendStatus(404)
        }
    }
})


app.post("/auth",(req, res) => {

    var {email, password} = req.body;

    if(email != undefined){

        var user = DB.users.find(u => u.email == email);
        if(user != undefined){
            if(user.password == password){
                jwt.sign({id: user.id, email: user.email},JWTSecret,{expiresIn:'48h'},(err, token) => {
                    if(err){
                        res.status(400);
                        res.json({err:"Falha interna"});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                })
            }else{
                res.status(401);
                res.json({err: "Credenciais inválidas!"});
            }
        }else{
            res.status(404);
            res.json({err: "O E-mail enviado não existe na base de dados!"});
        }

    }else{
        res.status(400);
        res.send({err: "O E-mail enviado é inválido"});
    }
});







app.listen(4000,()=>{
    console.log("Servidor rodando!");
})