const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const SENHA = '123'
const HASH = '$2b$04$crCcINVJUcxH4NGNWrLWluPcCMpHgMRIxbfvq7JMt9offVAvJQWi6'

describe('UserHelper test suite', function (){
    it('Deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)
        //console.log('result', result)
        assert.ok(result.length>10)
    })

    it('Deve comparar uma senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        
        assert.ok(result)
    })
})