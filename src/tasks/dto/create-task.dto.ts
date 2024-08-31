import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {    

    @IsDate()
    @IsNotEmpty()
    fecha: Date;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsBoolean()
    @IsNotEmpty()
    realizado: boolean;
    
}
