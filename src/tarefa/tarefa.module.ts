import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarefaEntity } from './tarefa.entity';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TarefaEntity])],
  controllers: [TarefaController],
  providers: [TarefaService],
})
export class TarefaModule {}