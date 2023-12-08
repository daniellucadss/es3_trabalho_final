import { SocioIndividual } from './Socios';
interface Login {
    autenticar(cpf: string, senha: string, socios: SocioIndividual[]): SocioIndividual | null;
}

export { Login }
