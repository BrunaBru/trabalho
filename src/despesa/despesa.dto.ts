import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDateString, IsEnum, IsNumber, ValidateNested } from "class-validator";
import { CategoriaEnum } from "./categoria.enum";
import { Type } from "class-transformer";
import { UsuarioDto } from "src/usuario/usuario.dto";
import { Decimal128, Long } from "typeorm";

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
    valor:Number;
    
    @IsOptional()
    @Type(() => UsuarioDto)
    @ValidateNested()
    usuario?: UsuarioDto;
}