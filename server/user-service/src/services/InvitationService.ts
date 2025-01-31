import crypto from "crypto";
import { IInvitationRepository } from "../interfaces/IInvitationRepository";
import { ICompanyEmployeeRepository } from "../interfaces/ICompanyEmployeeRepository";
import { IUserRepository } from "../interfaces/IUserRepository";
import EmailService from "./EmailService";

class InvitationService {
  constructor(
    private invitationRepository: IInvitationRepository,
    private companyEmployeeRepository: ICompanyEmployeeRepository,
    private userRepository: IUserRepository,
    private emailService: EmailService
  ) {}

  async sendInvitation(email: string, companyId: string, role: string): Promise<string> {
    const token = crypto.randomBytes(20).toString("hex");
    
    await this.invitationRepository.createInvitation(email, companyId, role, token);
    
    const inviteLink = `https://your-frontend.com/accept-invite?token=${token}`;
    await this.emailService.send(email, "Company Invitation", `Click here to accept: ${inviteLink}`);

    return "Invitation sent successfully.";
  }

  async acceptInvitation(token: string): Promise<string> {
    const invitation = await this.invitationRepository.findInvitationByToken(token);
    if (!invitation) throw new Error("Invalid or expired invitation.");

    let user = await this.userRepository.findByEmail(invitation.email);
    if (!user) throw new Error("User does not exist. Please sign up first.");

    await this.companyEmployeeRepository.addEmployee(user.id, invitation.companyId, invitation.role);
    
    await this.invitationRepository.deleteInvitation(token);

    return "Invitation accepted. You are now part of the company.";
  }
}

export default InvitationService;
