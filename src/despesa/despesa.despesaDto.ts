import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDateString, IsEnum, IsNumber, ValidateNested } from "class-validator";
import { CategoriaEnum } from "./categoria.enum";
import { Type } from "class-transformer";
import { UsuarioDto } from "src/usuario/usuario.usuarioDto";

export class DespesaDto{
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    descricao:string;

    @IsEnum(CategoriaEnum)
    @IsOptional()
    categoria?: CategoriaEnum;

    @IsDateString()
    @IsOptional()
    data?: Date | string; 

    @IsNumber()
    @IsNotEmpty()
    valor:number;
    
    @IsOptional()
    @Type(() => UsuarioDto)
    @ValidateNested()
    usuario?: UsuarioDto;
}