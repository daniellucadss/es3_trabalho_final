import { SocioIndividual } from "./Socios";
import { Dependentes } from "./Dependentes";
import { cp } from "fs/promises";

const socioDB: string = "./src/db/socios.json";
const dependentesDB: string = "./src/db/dependentes.json";

class RepoService {
  private fs = require("fs");

  lerSocios(): SocioIndividual[] {
    return JSON.parse(this.fs.readFileSync(socioDB, { encoding: "utf-8" }));
  }

  escreverSocios(socios: SocioIndividual[]): void {
    this.fs.writeFileSync(socioDB, JSON.stringify(socios), { encoding: "utf-8" });
  }

  lerDependentes(): Dependentes[] {
    return JSON.parse(this.fs.readFileSync(dependentesDB, { encoding: "utf-8" }));
  }

  escreverDependentes(dependentes: Dependentes[]): void {
    this.fs.writeFileSync(dependentesDB, JSON.stringify(dependentes), { encoding: "utf-8" });
  }
}

export { RepoService };