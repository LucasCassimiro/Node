/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir do ID
2 Obter o endereço do usuario a partir do ID
*/
//Importamos um módulo interno do Node.js//
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function () {
            //return reject(new Error("Deu erro de verdade))

            return resolve({
                id: 1,
                nome: "André",
                dataNascimento: new Date()
            })
        }, 1000);
    })

}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() => {
            return resolve ({
                telefone: "1199002",
                ddd: 11,
            })
        }, 2000);
    })
   
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: "Rua B",
            numero: 5
        })
    }, 2000);

}

//function resolverUsuario(erro, usuario) {
//    console.log("usuario", usuario)
//}
 
//1º passo - adcionar a palavra async -> automaticamente ela retornara uma promise
main()
async function main() {
    try{
        console.time('medida-promise')
        const usuario = await obterUsuario()
       // const telefone = await obterTelefone(usuario.id)
       // const endereco = await obterEnderecoAsync(usuario.id)
       const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
       ])
        const endereco = resultado[1]
        const telefone = resultado[0]
        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.telefone},
            Endereço: ${endereco.rua},${endereco.numero}
        `)
        console.timeEnd('medida-promise')
    }
    catch(error){
        console.error("Deu erro", error)
    }
}



/*const usuarioPromise = obterUsuario()
//para manipular o sucesso usamos a função .then//
//para manipular erros usamos a função .catch//
usuarioPromise
    .then(function(usuario){
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result){
                return {
                    usuario:{
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
        })
    })
    .then(function(resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })

    .then(function(resultado){
        console.log(`
        Nome: ${resultado.usuario.nome}
        Endereço: ${resultado.endereco.rua},${resultado.endereco.numero}
        Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
})
    .catch(function(error){
        console.error("Deu erro!",error)
    })

/*obterUsuario(function resolverUsuario(error, usuario) {
    if (error) {
        console.error("Erro em Usuario", error)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if (error1) {
            console.error("Erro em Telefone", error)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if (error2) {
                console.error("Erro em Endereço", error)
                return;
            }

            console.log(`
            Nome: ${usuario.nome}
            Endereço: ${endereco.rua},${endereco.numero}
            Telefone: (${telefone.ddd})${telefone.telefone}
            `)
        })

    })
})*/
//const telefone = obterTelefone(usuario.id)
//const endereco = obterEndereco(usuario.id)
//console.log('telefone', telefone)