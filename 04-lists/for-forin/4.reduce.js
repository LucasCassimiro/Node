const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = valorInicial

    for (let index = 0; index <= this.length - 1; index++) {
        valorFinal = typeof valorFinal !== "undefined" ? callback(valorFinal, this[index], this) : callback(this[index],
            this[++index], this)
    }
    return valorFinal
}


async function main() {
    try {
        const { results } = await obterPessoas(`a`)
        const pesos = results.map(item => parseInt(item.height))
        console.log('Pesos', pesos)
        // const total = pesos.reduce((anterior, proximo) => {
        //     return anterior + proximo
        // })
        const minhaLista = [
            ['Lucas', 'Cassimiro'],['NodeBR', 'Gamer']
        ]

        const total = minhaLista.meuReduce((anterior,proximo)=>{
            return anterior.concat(proximo)
        },[])
            .join(',')
        console.log('Total', total)

    }
    catch (error) {
        console.error("Deu Erro", error)
    }

}

main()
