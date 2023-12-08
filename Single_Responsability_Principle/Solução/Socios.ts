class SocioIndividual {
    constructor(
        public cpf: string, 
        public nome: string, 
        public senha: string,
    ){
        this.cpf = cpf
        this.nome = nome
        this.senha = senha
    }

}

class SocioFamilia extends SocioIndividual {
    constructor(_cpf: string, _nome: string, _senha: string){
        super(_cpf, _nome, _senha)
    }

}

export{ SocioIndividual, SocioFamilia }