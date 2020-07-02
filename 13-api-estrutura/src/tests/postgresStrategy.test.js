const assert = require('assert')
const Postgres = require('./../db/strategies/postgres/postgres')
const HeroiSchema = require('./../db/strategies/postgres/schemas/heroiSchema')
const Context = require('./../db/strategies/base/contextStrategy')


const MOCK_HEROI_CADASTRAR = {
    nome: 'Sova',
    poder: 'Flexas'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: 'Phoenix',
    poder: 'Renascer'
}
let context = {}
describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroiSchema)
        context = new Context(new Postgres(connection, model))
        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
   })

    it('PostgresSQL Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('Cadastrar', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('Listar', async function () {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete result.id
        //pegar a primeira posição 
        // const posicaoZero = result [0]
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('Atualizar', async function () {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Sage'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id })
        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.nome, novoItem.nome)
        /*No Javascript temos uma tecninca chamada rest/spread que é um metodo usado
        para mergear objetos ou separa-lo
        {
            nome: 'Batman'
            poder: 'Dinhero'
        }
        {
            dataNascimento: '1999-01-01'
        }
        //no final 
        {
            nome: 'Batman'
            poder: 'Dinhero'
            dataNascimento: '1999-01-01'
        }
        */
    })
    it('Remover por id', async function () {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})