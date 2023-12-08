import { InfratorJaCadastradoError, InfratorNaoEncontradoError, InfracaoJaCadastradoError, ValorInvalidoError } from "./excecoes";

interface IInfrator {
    id: string;
    cpf: string;
    nome: string;
    sobrenome: string;
    infracoes: IInfracao[];
    inserir(infracao: IInfracao): void;
    consultar(id: string): IInfracao;
    listarInfracoes(): string;
}

interface IInfracao {
    id: string;
    descricao: string;
    multa: number;
    tipo: TipoInfracao;
}

interface TipoInfracao {
    calcularMulta(): number;
}

class Infrator implements IInfrator {
    private _id: string;
    private _cpf: string;
    private _nome: string;
    private _sobrenome: string;
    private _infracoes: IInfracao[] = [];

    constructor(id: string, cpf: string, nome: string, sobrenome: string) {
        this._id = id;
        this._cpf = cpf;
        this._nome = nome;
        this._sobrenome = sobrenome;
    }

    public get id(): string {
        return this._id;
    }

    public get cpf(): string {
        return this._cpf;
    }

    public get nome(): string {
        return this._nome;
    }

    public get sobrenome(): string {
        return this._sobrenome;
    }

    public get infracoes(): IInfracao[] {
        return this._infracoes;
    }

    public inserir(infracao: IInfracao) {
        if (this.consultar(infracao.id)) {
            throw new InfracaoJaCadastradoError(`\nInfração com ID ${infracao.id} já cadastrada.`);
        }
        
        this._infracoes.push(infracao);
    }

    public consultar(id: string): IInfracao {
        let infracaoProcurada!: IInfracao;

        for (let i = 0; i < this._infracoes.length; i++) {
            if (this._infracoes[i].id == id) {
                infracaoProcurada = this._infracoes[i];
            }
        }

        return infracaoProcurada;
    }

    listarInfracoes(): string {
        let listaStrings = "";
        console.log("\nInfrações: \n");

        for (let i: number = 0; i < this._infracoes.length; i++) {
            listaStrings = listaStrings +
                "" + this._infracoes[i].descricao + "\n";      
        }

        return listaStrings;
    }

}

class Infracao implements IInfracao {
    private _id: string;
    private _descricao: string;
    private _multa: number;
    private _tipo: TipoInfracao;

    constructor(id: string, descricao: string, tipo: TipoInfracao) {
        this._id = id;
        this._descricao = descricao;
        this._tipo = tipo;
        this._multa = this._tipo.calcularMulta();
    }

    public get id(): string {
        return this._id;
    }

    public get descricao(): string {
        return this._descricao;
    }

    public get multa(): number {
        return this._multa;
    }

    public get tipo(): TipoInfracao {
        return this._tipo;
    }

}

class InfracaoLeve implements TipoInfracao {
    calcularMulta(): number {
        return 88.38;
    }
}

class InfracaoGrave implements TipoInfracao {
    calcularMulta(): number {
        return 195.23;
    }
}

class GerenciadorDeInfratores {
    private _infratores: IInfrator[] = [];

    public get infratores(): IInfrator[] {
        return this._infratores;
    }

    inserir(infrator: IInfrator): void {
        if (this.consultar(infrator.id)) {
            throw new InfratorJaCadastradoError(`\nInfrator com ID ${infrator.id} já cadastrado.`);
        }
        
        this._infratores.push(infrator);
    }

    consultar(id: string): IInfrator {
        let infratorProcurado!: IInfrator;

        for (let i = 0; i < this._infratores.length; i++) {
            if (this._infratores[i].id == id) {
                infratorProcurado = this._infratores[i];
            }
        }

        return infratorProcurado;
    }

    public consultarPorIndice(id: string): number {
        let indiceProcurado: number = -1;

        for (let i = 0; i < this._infratores.length; i++) {
            if (this._infratores[i].id == id) {
                indiceProcurado = i;
            }
        }

        if (indiceProcurado == -1) {
            throw new InfratorNaoEncontradoError(`\nInfrator com ID ${id} não cadastrado.`);
        }

        return indiceProcurado;
    }

    alterar(infrator: IInfrator): void {
        let indice: number = this.consultarPorIndice(infrator.id);
        this._infratores[indice] = infrator;
    }

    excluir(id: string): void {
        let indice: number = this.consultarPorIndice(id);

        for (var i = indice; i < this._infratores.length; i++) {
            this._infratores[i] = this._infratores[i + 1];
        }

        this._infratores.pop();
    }

    listarInfratores(): string {
        let listaStrings = "";

        for (let i: number = 0; i < this._infratores.length; i++) {
            listaStrings = listaStrings +
                "\nID: " + this._infratores[i].id +
                " - Nome Completo: " + this._infratores[i].nome + " " + this._infratores[i].sobrenome + "\n";
        }

        return listaStrings;
    }

}