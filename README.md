# api-games-docs
Esta api é estudo sobre um seistema de vendas de jogos online

## Endpoints

### Get /games
Esse endpoint e responsavel por listar todos os jogos cadastrados no banco de dados.
####Parametros
nenhum
#### Respostas
##### ok 200
caso resposta aconteça vai receber a listagem de todos os games
Exenplo de resposta:
```
[
    {
        "id": 23,
        "title": "Call of duty",
        "year": 219,
        "price": 60
    },
    {
        "id": 65,
        "title": "Sea of Thieves",
        "year": 2018,
        "price": 40
    },
    {
        "id": 2,
        "title": "Minecraft",
        "year": 2012,
        "price": 20
    }
]
```
##### Falha na autenticação ! 401
Caso resposta acontença, significa que aconteceu falha durante o processo de autenticação da requisição: Motivos: token inválido, token expirado.
Exemplo de resposta:
```
{
    "err": "Token inválido!"
}
```



## Endpoints

### Post /auth
Esse endpoint e responsavel por fazer o login.
####Parametros
email: Email do usuario cadastrado
password: Senha do usuario cadastrado, com determinado email
```
{
    "email": "carlosmota81@gmail.com",
    "password": "1234"
}
```
#### Respostas
##### ok 200
caso resposta aconteça vai receber o token jwt para acessar endpoints protegidos na api
Exenplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjYXJsb3Ntb3RhODFAZ21haWwuY29tIiwiaWF0IjoxNjczNTM2OTg2LCJleHAiOjE2NzM3MDk3ODZ9.e11JOSReA4O7XoIrtbFnWg5qUBsugQ66VEecyWHg8go"
}
```
##### Falha na autenticação ! 401
Caso resposta acontença, significa que aconteceu falha durante o processo de autenticação da requisição: Motivos: senha ou email incorretos.
Exemplo de resposta:
```
{err: "Credenciais inválidas!"}
```
