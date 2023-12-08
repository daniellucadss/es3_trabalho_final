import { SocioFamilia } from "./Socios";

class Dependentes {
  owner: string;
  constructor(
    public cpf: string,
    public idade: number,
    public nome: string,
    owner: SocioFamilia
  ) {
    this.cpf = cpf
    this.idade = idade
    this.nome = nome
    this.owner = owner.cpf;
  }

}

export { Dependentes }