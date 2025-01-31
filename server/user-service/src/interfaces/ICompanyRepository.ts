import { ICompany } from "../types/ICompany";
import { ICompanyCreateRequest } from "../interfaces/ICompanyCreateRequest";

export interface ICompanyRepository {
  findById(companyId: string): Promise<ICompany>;
  findByEmail(email: string): Promise<ICompany | null>;
  create(companyData: ICompanyCreateRequest): Promise<ICompany>;
  // Add more methods as necessary (e.g., updating company details, deleting companies, etc.)
}
