/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir do ID
2 Obter o endereço do usuario a partir do ID
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: "André",
            dataNascimento: new Date()
        })
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: "1199002",
            ddd: 11,
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: "Rua B",
            numero: 5
        })
    }, 2000);

}

function resolverUsuario(erro, usuario) {
    console.log("usuario", usuario)
}


obterUsuario(function resolverUsuario(error, usuario) {
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
})
//const telefone = obterTelefone(usuario.id)
//const endereco = obterEndereco(usuario.id)
//console.log('telefone', telefone)