import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../prisma.service';
import { ProjectStatus } from '@prisma/client';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let services: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [ProjectsService, PrismaService],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    services = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Interacción Controlador - Servidor', () => {
    it('Debe traer un proyecto por id', async () => {
      let result = {
        id: 1,
        name: 'Proyecto 1',
        description: 'Descripción del proyecto 1',
        status: ProjectStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
        tasks: [],
      }
      jest.spyOn(services, 'findOne').mockImplementation(async () => result);
        expect(await controller.findOne(1)).toBe(result);
      })
    });
  });
