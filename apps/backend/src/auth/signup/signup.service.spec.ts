import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { SignupService } from "./signup.service";
import { SupabaseService } from "src/common/supabase/supabase.service";
import { PrismaService } from "src/common/prisma/prisma.service";

const mockSupabaseService = {
  getClient: jest.fn().mockReturnValue({
    auth: {
      signUp: jest.fn(),
    },
  }),
};

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

describe("SignupService", () => {
  let service: SignupService;
  let supabaseService: SupabaseService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignupService,
        {
          provide: SupabaseService,
          useValue: mockSupabaseService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SignupService>(SignupService);
    supabaseService = module.get<SupabaseService>(SupabaseService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should throw BadRequestException if email already exists", async () => {
    const dto = {
      email: "existing@example.com",
      password: "password123",
      username: "testuser",
    };

    mockPrismaService.user.findUnique.mockResolvedValueOnce({ id: "1" });

    await expect(service.signup(dto)).rejects.toThrow(BadRequestException);
    await expect(service.signup(dto)).rejects.toThrow("Email already exists");
  });

  it("should throw BadRequestException if username already exists", async () => {
    const dto = {
      email: "new@example.com",
      password: "password123",
      username: "existinguser",
    };

    mockPrismaService.user.findUnique.mockResolvedValueOnce(null);
    mockPrismaService.user.findFirst.mockResolvedValueOnce({ id: "1" });

    await expect(service.signup(dto)).rejects.toThrow(BadRequestException);
    await expect(service.signup(dto)).rejects.toThrow("Username already exists");
  });
});
