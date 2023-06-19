import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    this.validate(dto);
    const newTarefa = await this.tarefaRepository.create();
    return this.tarefaRepository.save(newTarefa);
  }

  async update(dto : TarefaDto){
    this.validate(dto);
    const findById = await this.findById(dto.id);
    return this.tarefaRepository.save(findById);
  }

  validate(dto: TarefaDto) {
    if (new Date(dto.dataInicial).getTime() < new Date().getTime()) {
      throw new BadRequestException(
        'A data inicial da tarefa nao pode ser menor que hoje',
      );
    }
    if (dto.descricao == null ){
        throw new BadRequestException(`A descrição da tarefa é obrigatoria`);
    }      
    if (new Date(dto.dataInicial).getTime()  == null ){
        throw new BadRequestException(`Tarefa deve ter uma data final`);
    }
  }
}