import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TarefaEntity } from './tarefa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TarefaDto } from './tarefa.dto';

@Injectable()
export class TarefaService {
  constructor(
    @InjectRepository(TarefaEntity)
    private readonly tarefaRepository: Repository<TarefaEntity>,
  ) {}

  findAll(): Promise<TarefaEntity[]> {
    return this.tarefaRepository.find();
  }

  async findById(id: string): Promise<TarefaEntity> {
    const tarefa = await this.tarefaRepository.findOne({ where: { id }});
    if (tarefa == null) {
      throw new NotFoundException(`tarefa de id${id} não encontrada`);
    }
    return tarefa;
  }

  async remove(id:string){
    const findById = await this.findById(id);
    await this.tarefaRepository.remove(findById);
    return { ...findById, id};
}

  async create(dto:TarefaDto){
      const newTarefa = await this.tarefaRepository.create();
      return this.tarefaRepository.save(newTarefa);
  }

  async update(dto : TarefaDto){
    const findById = await this.findById(dto.id);
      return this.tarefaRepository.save(findById);
  }
}