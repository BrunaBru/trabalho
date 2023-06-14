import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DespesaEntity } from './despesa.entity';
import { DespesaService } from './despesa.service';
import { DespesaController } from './despesa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DespesaEntity])],
  controllers: [DespesaController],
  providers: [DespesaService],
})
export class DespesaModule {}