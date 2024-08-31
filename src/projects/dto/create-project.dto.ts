import { ProjectStatus } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class CreateProjectDto {
	@IsString()
	name: string;
  
	@IsString()
	description: string;
	
	@IsEnum(ProjectStatus)
	status: ProjectStatus;
}
