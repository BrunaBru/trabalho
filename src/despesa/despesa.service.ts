import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DespesaEntity } from './despesa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DespesaDto } from './despesa.dto';

@Injectable()
export class DespesaService {
  constructor(
    @InjectRepository(DespesaEntity)
    private despesaRepository: Repository<DespesaEntity>,
  ) {}

  findAll(): Promise<DespesaEntity[]> {
    return this.despesaRepository.find();
  }

  async findById(id: string): Promise<DespesaEntity> {
    const despesa = await this.despesaRepository.findOne({where :{id}});
    if (despesa == null) {
      throw new NotFoundException(`Despesa de id ${id} não encontrada`);
    }
    return despesa;
  }

  async remove(id:string){
    const findById = await this.findById(id);
    await this.despesaRepository.remove(findById);
    return { ...findById, id};
  }
  
  async create(dto:DespesaDto){
    this.validate(dto);
    const newDespesa = this.despesaRepository.create(dto);
    return this.despesaRepository.save(newDespesa);
  }
  
  async update(dto : DespesaDto){
    this.validate(dto);
    const findById = await this.findById(dto.id);
    return this.despesaRepository.save(findById);
  }

  validate(dto: DespesaDto) {
    if (dto.categoria == null) {
      throw new BadRequestException(`Informe uma categoria`);
    }
    if (dto.descricao == null){
        throw new BadRequestException(`Informe uma descrição para a despesa`);
    }
    if( dto.valor == null){
      throw new BadRequestException (`O valor da despesa não pode ser zerado`);
    }
  }

}