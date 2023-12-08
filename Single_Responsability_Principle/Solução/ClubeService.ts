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
import { RepoService } from "./RepoService";
import { ValidacaoService } from "./ValidacaoService";

class ClubeService {
  private RepoService: RepoService;
  private validacaoService: ValidacaoService;

  constructor() {
    this.RepoService = new RepoService();
    this.validacaoService = new ValidacaoService();
  }

  private consultarSocioIndice(cpf: string): number {
    const socios = this.RepoService.lerSocios();
    let indice: number = -1;
    for (let i: number = 0; i < socios.length; i++) {
      if (socios[i].cpf == cpf) {
        indice = i;
        return indice;
      }
    }
    throw new ConsultaException("Sócio não cadastrado!");
  }

  private consultarDependentesIndice(cpf: string): number {
    const dependentes = this.RepoService.lerDependentes();
    let indice: number = -1;
    for (let i: number = 0; i < dependentes.length; i++) {
      if (dependentes[i].cpf == cpf) {
        indice = i;
        break;
      }
    }
    return indice;
  }

  validarSocioExistente(cpf: string, socios: SocioIndividual[]): void {
    this.validacaoService.validarSocioExistente(cpf, socios);
  }

  validarDependenteExistente(cpf: string, dependentes: Dependentes[]): void {
    this.validacaoService.validarDependenteExistente(cpf, dependentes);
  }

  autenticar(cpf: string, senha: string): boolean {
      const socios = this.RepoService.lerSocios();
      return this.validacaoService.autenticar(cpf, senha, socios) !== null;
  }

  criarSocio(socio: SocioIndividual): void {
      const socios = this.RepoService.lerSocios();
      this.validarSocioExistente(socio.cpf, socios);
      socios.push(socio);
      this.RepoService.escreverSocios(socios);
      console.log("Sócio criado com sucesso!");
  }

  criarDependente(dependente: Dependentes): void {
    const dependentes = this.RepoService.lerDependentes();
    this.validarDependenteExistente(dependente.cpf, dependentes);
    dependentes.push(dependente);
    this.RepoService.escreverDependentes(dependentes);
    console.log("Dependente criado com sucesso!");
  }

  consultarSocio(cpf: string): SocioIndividual {
    const socios = this.RepoService.lerSocios();
    for (let i = 0; i < socios.length; i++) {
      if (socios[i].cpf === cpf) {
        return socios[i];
      }
    }
    throw new ConsultaException("Sócio não cadastrado!");
  }

  consultarDependente(cpf: string): Dependentes {
    const dependentes = this.RepoService.lerDependentes();
    let dependenteProcurado!: Dependentes;
    for (let dependente of dependentes) {
      if (dependente.cpf == cpf) {
        dependenteProcurado = dependente;
        return dependenteProcurado;
      }
    }
    throw new ConsultaException("Dependente não cadastrado!");
  }

  editarSocio(cpf: string, socio: SocioIndividual): void {
    const socios = this.RepoService.lerSocios();
    let indice = this.consultarSocioIndice(cpf);
    if (indice == -1) {
      throw new AlteracaoException("Não foi possível realizar a alteração!");
    } else {
      socios[indice] = socio;
      this.RepoService.escreverSocios(socios);
      console.log("Sócio alterado com sucesso!");
    }
  }

  editarDependente(cpf: string, dependente: Dependentes): void {
    const dependentes = this.RepoService.lerDependentes();
    let indice = this.consultarDependentesIndice(cpf);
    if (indice == -1) {
      throw new AlteracaoException("Não foi possível realizar a alteração!");
    } else {
      dependentes[indice] = dependente;
      this.RepoService.escreverDependentes(dependentes);
      console.log("Dependente alterado com sucesso!");
    }
  }

  deletarSocio(cpf: string): void {
    const socios = this.RepoService.lerSocios();
    let indice: number = this.consultarSocioIndice(cpf);
    if (indice == -1) {
      throw new ExclusaoException("Falha ao excluir o sócio!");
    } else {
      socios.splice(indice, 1);
      this.RepoService.escreverSocios(socios);
      console.log("Sócio excluído com sucesso!");
    }
  }

  deletarDependente(cpf: string): void {
    const dependentes = this.RepoService.lerDependentes();
    let indice: number = this.consultarDependentesIndice(cpf);
    if (indice == -1) {
      throw new ExclusaoException("Falha ao excluir o dependente!");
    } else {
      dependentes.splice(indice, 1);
      this.RepoService.escreverDependentes(dependentes);
      console.log("Dependente excluído com sucesso!");
    }
  }

  totalSocios(): void {
    const socios = this.RepoService.lerSocios();
    console.log(`Total de sócios: ${socios.length}`);
  }

  totalDependentes(): void {
    const dependentes = this.RepoService.lerDependentes();
    console.log(`Total de dependentes: ${dependentes.length}`);
  }

  exibirSocio(cpf: string): SocioIndividual[] {
    const socios = this.RepoService.lerSocios();
    let socioProcurado: SocioIndividual[] = [];
    for (let i = 0; i < socios.length; i++) {
      if (socios[i].cpf === cpf) {
        socioProcurado.push(socios[i]);
      }
    }
    return socioProcurado;
  }

  exibirDependente(cpf: string): Dependentes[] {
    const dependentes = this.RepoService.lerDependentes();
    let dependenteProcurado: Dependentes[] = [];
    for (let i = 0; i < dependentes.length; i++) {
      if (dependentes[i].cpf === cpf) {
        dependenteProcurado.push(dependentes[i]);
      }
    }
    return dependenteProcurado;
  }
}

export { ClubeService };