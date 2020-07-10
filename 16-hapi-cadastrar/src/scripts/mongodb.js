docker ps
docker exec -it 3bc02501c883 mongo -u lucas -p lucas --authenticationDatabase herois

//databases
show dbs 
//mudando o contexto para uma database
use herois
//mostrar tabelas (conexões)
show collections 

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find().pretty()

for(let i=0; i<=1000; i++){
    db.herois.insert({
        nome: `Clone${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

db.herois.count()
db.herois.findOne()
db.herois.find().limit(20).sort({nome: -1})
db.herois.find({},{poder: -1, _id: 0})

//create 
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//read
db.herois.find()

//update
db.herois.update({_id: ObjectId("5efa5e5d30830139b3e2e879")},
    {nome:'Mulher Maravilha'})

db.herois.update({_id: ObjectId("5efa62efa43eaca727e3b1fa")}, 
    {$set:{ nome: 'Lanter Verde'}})

//delete
db.herois.remove({})    //remove todos
db.herois.remove({nome:'Mulher Maravilha'})