import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma.service';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProjectDto): Promise<Project> {
    return this.prisma.project.create({
      data,
    });
  }

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany({
    });
  }

  async findOne(id: number): Promise<Project> {
    return this.prisma.project.findUnique({
      where: { id },

    });
  }

  async update(id: number, data: UpdateProjectDto): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Project> {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
