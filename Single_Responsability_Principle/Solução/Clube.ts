import { SocioIndividual } from "./Socios";
import { Dependentes } from "./Dependentes";
import { Login } from "./Login";
import { ClubeService } from "./ClubeService";
import { ErroDeLoginException } from "../error/erros";

class Clube implements Login {
  private ClubeService: ClubeService;

  constructor() {
    this.ClubeService = new ClubeService();
  }

  autenticar(cpf: string, senha: string): boolean {
    try {
      this.ClubeService.autenticar(cpf, senha);
      return true;
    } catch (error) {
      if (error instanceof ErroDeLoginException) {
        return false;
      }
      throw error;
    }
  }

  totalSocios(): void {
    this.ClubeService.totalSocios();
  }

  totalDependentes(): void {
    this.ClubeService.totalDependentes();
  }

  criarSocios(socio: SocioIndividual): void {
    this.ClubeService.criarSocio(socio);
  }

  criarDependentes(dependente: Dependentes): void {
    this.ClubeService.criarDependente(dependente);
  }

  consultarSocio(cpf: string): SocioIndividual {
    return this.ClubeService.consultarSocio(cpf);
  }

  consultarDependente(cpf: string): Dependentes {
    return this.ClubeService.consultarDependente(cpf);
  }

  editarSocio(cpf: string, socio: SocioIndividual): void {
    this.ClubeService.editarSocio(cpf, socio);
  }

  editarDependentes(cpf: string, dependente: Dependentes): void {
    this.ClubeService.editarDependente(cpf, dependente);
  }

  deletarSocio(cpf: string): void {
    this.ClubeService.deletarSocio(cpf);
  }

  deletarDependentes(cpf: string): void {
    this.ClubeService.deletarDependente(cpf);
  }

  exibirSocio(cpf: string): SocioIndividual[] {
    return this.ClubeService.exibirSocio(cpf);
  }

  exibirDependente(cpf: string): Dependentes[] {
    return this.ClubeService.exibirDependente(cpf);
  }
}

export { Clube };