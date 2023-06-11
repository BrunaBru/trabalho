import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TarefaEntity } from './tarefa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TarefaDto } from './tarefa.tarefa.Dto';

@Injectable()
export class TarefaService {
  constructor(
    @InjectRepository(TarefaEntity)
    private readonly tarefaRepository: Repository<TarefaEntity>,
  ) {}

  findAll(): Promise<TarefaEntity[]> {
    return this.tarefaRepository.find();
  }

  async findById(
    id: string,
    relations: string[] = [],
  ): Promise<TarefaEntity> {
    const tarefa = await this.tarefaRepository.findOne({
      relations,
      where: { id },
    });
    if (!tarefa) {
      throw new NotFoundException('tarefa não encontrada');
    }
    return tarefa;
  }

  async remove(id:string){
    const findById = await this.findById(id);
    await this.tarefaRepository.remove(findById);
    return { ...findById, id};
}

async create(dto:TarefaDto){
    const newTarefa = this.tarefaRepository.create(dto);
    return this.tarefaRepository.save(newTarefa);
}

async update({id, ...dto} : TarefaDto){
    await this.findById(id);
    return this.tarefaRepository.save({id, ...dto});
}
}