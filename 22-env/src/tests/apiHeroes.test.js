const assert = require('assert')
const api = require('./../api')
let app = {}
const TOKEN = ''

const headers = {
    Authorization: TOKEN
}
const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Bionica'
}
const MOCK_HEROI_INICIAL = {
    nome: 'Gavião Negro',
    poder: 'A Mira'
}
let MOCK_ID = ''
describe('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            headers,
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })
        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
    })

    it('Listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            headers,
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
            headers,
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
            headers,
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const errorResult = {
            "statusCode": 400, "error": "Bad Request", "message": "child \"limit\" fails because [\"limit\" must be a number]", "validation": {
                "source": "query", "keys": ["limit"]
            }
        }
        assert.deepEqual(result.statusCode, 400)
        assert.deepEqual(result.payload, JSON.stringify(errorResult))

    })
    it('Listar GET - /heroes - deve filtrar um item', async () => {

        const NAME = MOCK_HEROI_INICIAL.nome
        const result = await app.inject({
            method: 'GET',
            headers,
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
            headers,
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

    it('Atualizar PATCH - /herois/:id', async () => {
        const _id = MOCK_ID
        const expected = {
            poder: 'Super Mira'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            headers,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Heroi atualizado com sucesso!')
    })

    it('Atualizar PATCH - /herois/:id - não deve atualizar com ID incorreto', async () => {
        const _id = `5f1721778981f534187a3ec2`

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            headers,
            payload: JSON.stringify({
                poder: 'Super Mira'
            })
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'ID não encontrado no banco'
        }


        assert.ok(statusCode === 412)
        assert.deepEqual(dados, expected)
    })

    it('Remover DELETE - /herois/id', async () => {
        const _id = MOCK_ID
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Herói removido com sucesso')
    })

    it('Remover DELETE - /herois/id não deve remover', async () => {
        const _id = `5f1721778981f534187a3ec2`
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Id não encontrado no banco'
        }
        assert.ok(statusCode === 412)
        assert.deepEqual(dados, expected)
    })

    it('Remover DELETE - /herois/id não deve remover com id invalido', async () => {
        const _id = 'ID_INVALIDO'
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/herois/${_id}`
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        const expected = {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred',
            statusCode: 500
        }
        
        assert.ok(statusCode === 500)
        assert.deepEqual(dados, expected)
    })
})


