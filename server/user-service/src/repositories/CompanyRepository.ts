import { PrismaClient } from "@prisma/client";
import { ICompanyCreateRequest } from "../interfaces/ICompanyCreateRequest";
import { ICompany } from "../types/ICompany";
import { ICompanyRepository } from "../interfaces/ICompanyRepository";

class CompanyRepository implements ICompanyRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(companyData: ICompanyCreateRequest): Promise<ICompany> {
    try {
      return await this.prisma.company.create({
        data: {
          name: companyData.name,
          email: companyData.email,
          password: companyData.password,
          role: "company",
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
    } catch (error) {
      console.error("Error creating company:", error);
      throw new Error("Database query failed");
    }
  }

  async findByEmail(email: string): Promise<ICompany | null> {
    try {
      return await this.prisma.company.findUnique({ where: { email } });
    } catch (error) {
      console.error("Error finding company by email:", error);
      throw new Error("Database query failed");
    }
  }

  async findById(companyId: string): Promise<ICompany> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) throw new Error("Company not found");

    return company;
  }
}

export default CompanyRepository;
