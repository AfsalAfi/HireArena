import { PrismaClient } from "@prisma/client";
import { IInvitationRepository } from "../interfaces/IInvitationRepository";

class InvitationRepository implements IInvitationRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createInvitation(email: string, companyId: string, role: string, token: string): Promise<void> {
    await this.prisma.invitation.create({
      data: {
        email,
        companyId,
        role,
        token,
        status: "pending",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
      },
    });
  }

  async findInvitationByToken(token: string): Promise<{ email: string; companyId: string; role: string } | null> {
    const invitation = await this.prisma.invitation.findUnique({ where: { token } });
    return invitation ? { email: invitation.email, companyId: invitation.companyId, role: invitation.role } : null;
  }

  async deleteInvitation(token: string): Promise<void> {
    await this.prisma.invitation.delete({ where: { token } });
  }
}

export default InvitationRepository;
