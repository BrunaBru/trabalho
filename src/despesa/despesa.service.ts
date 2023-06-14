import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DespesaEntity } from './despesa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DespesaDto } from './despesa.despesaDto';

@Injectable()
export class DespesaService {
  constructor(
    @InjectRepository(DespesaEntity)
    private readonly despesaRepository: Repository<DespesaEntity>,
  ) {}

  findAll(): Promise<DespesaEntity[]> {
    return this.despesaRepository.find();
  }

  async findById(
    id: string,
    relations: string[] = [],
  ): Promise<DespesaEntity> {
    const despesa = await this.despesaRepository.findOne({
      relations,
      where: { id },
    });
    if (!despesa) {
      throw new NotFoundException('despesa não encontrada');
    }
    return despesa;
  }

  async remove(id:string){
    const findById = await this.findById(id);
    await this.despesaRepository.remove(findById);
    return { ...findById, id};
}

async create(dto:DespesaDto){
  const newDespesa = this.despesaRepository.create(dto);
  return this.despesaRepository.save(newDespesa);
}

async update({id, ...dto} : DespesaDto){
  await this.findById(id);
  return this.despesaRepository.save({id, ...dto});
}
}