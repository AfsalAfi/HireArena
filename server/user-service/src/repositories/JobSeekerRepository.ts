import { PrismaClient } from "@prisma/client";
import { IJobSeekerRepository } from "../interfaces/IJobSeekerRepository";
import { IUser } from "../types/IUser";
import { IUserCreateRequest } from "../types/IUserCreateRequest";

class JobSeekerRepository implements IJobSeekerRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.prisma.jobSeeker.findUnique({ where: { email } });
    } catch (error) {
      console.error("Error finding job seeker by email:", error);
      throw new Error("Database query failed");
    }
  }

  async findById(userId: string): Promise<IUser> {
    const user = await this.prisma.jobSeeker.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("Job seeker not found");

    return user;
  }

  async create(userData: IUserCreateRequest): Promise<IUser> {
    try {
      return await this.prisma.jobSeeker.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: "job-seeker",
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
    } catch (error) {
      console.error("Error creating job seeker:", error);
      throw new Error("Database query failed");
    }
  }
}

export default JobSeekerRepository;
