import { SocioIndividual } from "./Socios";
import { Dependentes } from "./Dependentes";
import { Login } from "./Login";
import {
  ErroDeLoginException,
  ConsultaException,
  AlteracaoException,
  ExclusaoException,
  SocioInexistenteException,
  SocioExistenteException,
} from "../error/erros";
import { cp } from "fs/promises";

const socioDB: string = "./src/db/socios.json";
const dependentesDB: string = "./src/db/dependentes.json";

class Clube implements Login {
  public socios: SocioIndividual[] = [];
  public dependentes: Dependentes[] = [];
  public fs = require("fs");

  lerSocios(): SocioIndividual[] {
    this.socios = JSON.parse(
      this.fs.readFileSync(socioDB, { enconding: "utf-8" })
    );
    return this.socios;
  }

  lerDependentes(): Dependentes[] {
    this.dependentes = JSON.parse(
      this.fs.readFileSync(dependentesDB, { enconding: "utf-8" })
    );
    return this.dependentes;
  }

  validaSocio(cpf: string) {
    this.lerSocios();
    for (let i = 0; i < this.socios.length; i++) {
      if (
        cpf.length < 11 ||
        cpf.length > 11 ||
        cpf == this.socios[i].cpf ||
        typeof cpf != "string"
      ) {
        throw new SocioExistenteException("Sócio já existe ou campo invalido!");
      }
    }
  }

  validaDependente(cpf: string) {
    this.lerDependentes();
    for (let i = 0; i < this.dependentes.length; i++) {
      if (
        cpf.length < 11 ||
        cpf.length > 11 ||
        cpf == this.dependentes[i].cpf ||
        typeof cpf != "string"
      ) {
        throw new SocioExistenteException(
          "Dependente já existe ou campo invalido!"
        );
      }
    }
  }

  criarSocios(socio: SocioIndividual): void {
    this.lerSocios();
    this.validaSocio(socio.cpf);
    this.socios.push(socio);
    this.fs.writeFileSync(socioDB, JSON.stringify(this.socios), {
      encondig: "utf-8",
    });
    console.log("Sócio Criado com Sucesso!");
  }

  criarDependentes(dependente: Dependentes): void {
    this.lerDependentes();
    this.validaDependente(dependente.cpf);
    this.dependentes.push(dependente);
    this.fs.writeFileSync(dependentesDB, JSON.stringify(this.dependentes), {
      encondig: "utf-8",
    });
    console.log("Dependente Criado com Sucesso!");
  }

  consultarSocio(cpf: string): SocioIndividual {
    this.lerSocios();
    for (let i = 0; i < this.socios.length; i++) {
      if (this.socios[i].cpf === cpf) {
        return this.socios[i];
      }
    }
    throw new ConsultaException("Sócio não cadastrado!");
  }

  consultarDependente(cpf: string) {
    this.lerDependentes();
    let dependenteProcurado!: Dependentes;
    for (let dependente of this.dependentes) {
      if (dependente.cpf == cpf) {
        dependenteProcurado = dependente;
        return dependenteProcurado;
      }
    }
    throw new ConsultaException("Dependente não cadastrado!");
  }

  private consultarSocioIndice(cpf: string): number {
    this.lerSocios();
    let indice: number = -1;
    for (let i: number = 0; i < this.socios.length; i++) {
      if (this.socios[i].cpf == cpf) {
        indice = i;
        return indice;
      }
    }
    throw new ConsultaException("Sócio não cadastrado!");
  }

  private consultarDependentesIndice(cpf: string): number {
    this.lerDependentes();
    let indice: number = -1;
    for (let i: number = 0; i < this.dependentes.length; i++) {
      if (this.dependentes[i].cpf == cpf) {
        indice = i;
        break;
      }
    }
    return indice;
  }

  editarSocio(cpf: string, socio: SocioIndividual): void {
    this.lerSocios();
    let indice = this.consultarSocioIndice(cpf);
    if (indice == -1) {
      throw new AlteracaoException("Não foi possível realizar a alteração!");
    } else {
      this.socios[indice] = socio;
      this.fs.writeFileSync(socioDB, JSON.stringify(this.socios), {
        encondig: "utf-8",
      });
      console.log("Sócio Alterado com sucesso!");
    }
  }

  editarDependentes(cpf: string, dependente: Dependentes): void {
    this.lerDependentes();
    let indice = this.consultarDependentesIndice(cpf);
    if (indice == -1) {
      throw new AlteracaoException("Não foi possível realizar a alteração!");
    } else {
      this.dependentes[indice] = dependente;
      this.fs.writeFileSync(dependentesDB, JSON.stringify(this.dependentes), {
        encondig: "utf-8",
      });
      console.log("Dependente Alterado com sucesso!");
    }
  }

  deletarSocio(cpf: string) {
    this.lerSocios();
    let indice: number = this.consultarSocioIndice(cpf);
    if (indice == -1) {
      throw new ExclusaoException("Falha ao Excluir o Sócio!");
    } else {
      for (let i: number = indice; i < this.socios.length; i++) {
        this.socios[i] = this.socios[i + 1];
      }
      this.socios.splice(indice, 1);
      this.fs.writeFileSync(socioDB, JSON.stringify(this.socios), {
        encondig: "utf-8",
      });
      console.log("Sócio Deletado com Sucesso!");
    }
  }

  deletarDependentes(cpf: string) {
    this.lerDependentes();
    let indice: number = this.consultarDependentesIndice(cpf);
    if (indice == -1) {
      throw new ExclusaoException("Falha ao Excluir o Sócio!");
    } else {
      for (let i: number = indice; i < this.dependentes.length; i++) {
        this.dependentes[i] = this.dependentes[i + 1];
      }
      this.dependentes.splice(indice, 1);
      this.fs.writeFileSync(dependentesDB, JSON.stringify(this.dependentes), {
        encondig: "utf-8",
      });
      console.log("Dependente Deletado com Sucesso!");
    }
  }

  autenticar(cpf: string, senha: string): boolean {
    this.lerSocios();
    if (cpf != cpf || senha != senha) {
      throw new ErroDeLoginException("Senha incorreta!");
    } else {
      return true;
    }
  }

  totalSocios() {
    this.lerSocios();
    console.log(`Total de socios: ${this.socios.length}`);
  }

  totalDependentes() {
    this.lerDependentes();
    console.log(`Total de dependentes: ${this.dependentes.length}`);
  }

  exibirSocio(cpf: string): SocioIndividual[] {
    this.lerSocios();
    let socioProcurado: SocioIndividual[] = [];
    for (let i = 0; i < this.socios.length; i++) {
      if (this.socios[i].cpf === cpf) {
        socioProcurado.push(this.socios[i]);
      }
    }
    return socioProcurado;
  }
  exibirDependente(cpf: string): Dependentes[] {
    this.lerDependentes();
    let dependenteProcurado: Dependentes[] = [];
    for (let i = 0; i < this.dependentes.length; i++) {
      if (this.dependentes[i].cpf === cpf) {
        dependenteProcurado.push(this.dependentes[i]);
      }
    }
    return dependenteProcurado;
  }
}

export { Clube };