const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom');

//npm i jsonwebtoken
const Jtw = require('jsonwebtoken')

const failAction = (request, headers, erro) => {
    throw erro;
}
const USER = {
    username: 'Xuxa',
    password: 'admin'
}
class AuthRoutes extends BaseRoute {
    constructor(secret) {
        super()
        this.secret = secret
    }
    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth:false,
                tags: ['api'],
                description: 'Obter token',
                notes: 'Faz o login com user e senha do banco',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                const { 
                    username, 
                    password
                 } = request.payload

                 
                if (username.toLowerCase() !== USER.username ||
                    password !== USER.password)
                
                    return Boom.unauthorized()
                
                    
                const token = Jwt.sign({
                    username: username,
                    id: 1
                }, this.secret)

                return {
                    token
                }
            }

        }
    }
}

module.exports = AuthRoutes