const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const Sequelize = require('sequelize')

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }
    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._driver.readyState]

    }
    defineModel() {
        const heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        this._herois = Mongoose.model('herois', heroiSchema)
    }
    connect() {
        Mongoose.connect('mongodb://lucas:lucas@localhost:27017/herois',
            { useNewUrlParser: true }, function (error) {
                if (!error) return;

                console.log('Falha na conexão!', error)
            })

        const connection = Mongoose.connection
        this._driver = connection
        connection.once('open', () => console.log('Database rodando!'))
        this.defineModel()
        
    }   
    create(item) {
        return this._herois.create(item)
    }
    read(item, skip=0, limit=10){
        return this._herois.find(item).skip(skip).limit(limit)
        // return this._herois.count()
    }
}

module.exports = MongoDB