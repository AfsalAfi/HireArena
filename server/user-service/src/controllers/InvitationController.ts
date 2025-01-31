import { Request, Response } from "express";
import InvitationService from "../services/InvitationService";

class InvitationController {
  constructor(private invitationService: InvitationService) {}

  async sendInvitation(req: Request, res: Response) {
    try {
      const { email, companyId, role } = req.body;
      const message = await this.invitationService.sendInvitation(email, companyId, role);
      res.status(200).json({ message });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async acceptInvitation(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const message = await this.invitationService.acceptInvitation(token);
      res.status(200).json({ message });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default InvitationController;
