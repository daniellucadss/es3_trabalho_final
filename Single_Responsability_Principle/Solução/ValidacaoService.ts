import { SocioIndividual } from "./Socios";
import { Dependentes } from "./Dependentes";
import { ErroDeLoginException, SocioExistenteException } from "../error/erros";
import { RepoService } from "./RepoService";
import { Login } from "./Login";

class ValidacaoService implements Login {
  private repoService: RepoService;

  constructor() {
    this.repoService = new RepoService();
  }

  validarSocioExistente(cpf: string, socios: SocioIndividual[]): void {
    for (const socio of socios) {
      if (cpf.length !== 11 || cpf === socio.cpf) {
        throw new SocioExistenteException(
          "Sócio já existe ou campo inválido!"
        );
      }
    }
  }

  validarDependenteExistente(cpf: string, dependentes: Dependentes[]): void {
    for (const dependente of dependentes) {
      if (cpf.length !== 11 || cpf === dependente.cpf) {
        throw new SocioExistenteException(
          "Dependente já existe ou campo inválido!"
        );
      }
    }
  }

  autenticar(cpf: string, senha: string, socios: SocioIndividual[]): SocioIndividual | null {
    const socioAutenticado = socios.find(
      (socio) => socio.cpf === cpf && socio.senha === senha
    );

    if (socioAutenticado) {
      return socioAutenticado;
    } else {
      throw new ErroDeLoginException(
        "Sócio não encontrado ou senha incorreta!"
      );
    }
  }
}

export { ValidacaoService };