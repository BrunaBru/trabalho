import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDateString, IsEnum, ValidateNested } from "class-validator";
import { GeneroEnum } from "./genero.enum";
import { TarefaDto } from "src/tarefa/tarefa.dto";

export class UsuarioDto{
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @IsNotEmpty()
    nome:string;

    @IsString()
    @IsNotEmpty()
    apelido:string;

    @IsString()
    @IsNotEmpty()
    email:string;

    @IsDateString()
    @IsOptional()
    nascimento?: Date | string; 

    @IsEnum(GeneroEnum)
    @IsOptional()
    genero?: GeneroEnum;

}