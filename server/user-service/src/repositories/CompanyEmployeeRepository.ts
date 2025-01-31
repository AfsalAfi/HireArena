import { PrismaClient } from "@prisma/client";
import { ICompanyEmployeeRepository } from "../interfaces/ICompanyEmployeeRepository";

class CompanyEmployeeRepository implements ICompanyEmployeeRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async addEmployee(userId: string, companyId: string, role: string): Promise<void> {
    await this.prisma.companyEmployee.create({
      data: { userId, companyId, role },
    });
  }
}

export default CompanyEmployeeRepository;
