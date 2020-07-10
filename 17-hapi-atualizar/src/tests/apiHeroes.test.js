const assert = require('assert')
const api = require('./../api')
let app = {}
const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
}
const MOCK_HEROI_INICIAL = { 
    nome: 'Gavião Negro',
    poder: 'A Mira'
}
let MOCK_ID = ''
describe.only('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })
        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
    })

    it('Listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })
    it('Listar /heroes - deve retornar somente 3 registros', async () => {
        const TAMANHO_LIMITE = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        console.log('Dados', dados.length)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('Listar /heroes - deve retornar um erro com limit incorreto', async () => {
        const TAMANHO_LIMITE = 'AEEE'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const errorResult = {
            "statusCode":400,"error":"Bad Request","message":"child \"limit\" fails because [\"limit\" must be a number]","validation":{"source":"query","keys":["limit"]
            }
        }
        assert.deepEqual(result.statusCode, 400)
        assert.deepEqual(result.payload, JSON.stringify(errorResult))

    })
    it('Listar GET - /heroes - deve filtrar um item', async () => {
        const NAME = 'Homem Aranha-1593546620547'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=100&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados[0].nome, NAME)
    })

    it('Cadastrar POST - /herois - deve cadastrar um item', async () => {
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        })
        const statusCode = result.statusCode
        console.log('Resultado', result.payload)
        const {
            message,
            _id
        } = JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message, "Heroi cadastrado com sucesso")
    })

    it('Atualizar PATCH - /herois/:id', async () =>{
        const _id = `5f07acd9e1a45a1d040828c1`
        const expected = {
            poder: 'Super Mira'
        }
  
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Heroi atualizado com sucesso!')
    })

    // it('Atualizar PATCH - /herois/:id - não deve atualizar com ID incorreto', async () =>{
    //     const _id = `${MOCK_ID}01`
    //     const expected = {
    //         poder: 'Super Mira'
    //     }
  
    //     const result = await app.inject({
    //         method: 'PATCH',
    //         url: `/herois/${_id}`,
    //         payload: JSON.stringify(expected)
    //     })
       
    //     const statusCode = result.statusCode
    //     const dados = JSON.parse(result.payload)

    //     assert.ok(statusCode === 200)
    //     assert.deepEqual(dados.message, 'Não foi possivel atualizar!')
    // })
})


