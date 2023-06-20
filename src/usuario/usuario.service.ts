import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { IsNull, Repository } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioDto } from "./usuario.dto";
import { isEmpty } from "rxjs";

@Injectable()
export class UsuarioService{

    constructor(
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: Repository<UsuarioEntity>
    ){}

    findAll(): Promise<UsuarioEntity[]>{
        return this.usuarioRepository.find();
    }

    async findById(id: string): Promise<UsuarioEntity> {
        const findOne = await this.usuarioRepository.findOne({where :{ id } });
        if (findOne == null){
            throw new NotFoundException(`Usuario não encontrado para o id: ${id}`);
        }
        return findOne;
    }

    async remove(id:string){
        const findById = await this.findById(id);
        await this.usuarioRepository.remove(findById);
        return { ...findById, id};
    }

    async create(dto:UsuarioDto){
        this.validate(dto);
        const newUsuario = this.usuarioRepository.create(dto);
        return this.usuarioRepository.save(newUsuario);
    }

    async update(dto : UsuarioDto){
        this.validate(dto);
        await this.findById(dto.id);
        return this.usuarioRepository.save(dto);
    }

    validate(dto: UsuarioDto) {
        if (new Date().getTime() < new Date(dto.nascimento).getTime()) {
          throw new BadRequestException(
            'A data de nascimento do usuario nao pode ser igual hoje',
          );
        }
        if (dto.email == null ){
            throw new BadRequestException(`O e-mail deve ser informado`);
        }      
        if (dto.nome == null ){
            throw new BadRequestException(`O nome é obrigatorio`);
        }
      }
}