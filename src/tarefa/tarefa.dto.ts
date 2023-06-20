import { IsNotEmpty, IsOptional, IsString, IsUUID, IsEnum, ValidateNested, IsDateString } from 'class-validator';
import { PrioridadeEnum } from './prioridade.enum';
import { UsuarioDto } from 'src/usuario/usuario.dto';
import { Type } from 'class-transformer';

export class TarefaDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsOptional()
  @IsString()
  descricao: string;

  @IsDateString()
  @IsOptional()
  dataInicial?: Date | string; 

  @IsDateString()
  @IsOptional()
  dataFinal?: Date | string; 

  @IsEnum(PrioridadeEnum)
  @IsOptional()
  prioridade?: PrioridadeEnum;
  
}