import { Column,Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { PrioridadeEnum } from "./prioridade.enum";
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Entity({ name: 'tarefas' })
export class TarefaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    descricao: string

    @Column({
        type: 'enum',
        enum: PrioridadeEnum,
        default: PrioridadeEnum.Normal,
        nullable:  true,
    })
    prioridade: PrioridadeEnum;

    @Column({ type: 'date', name: 'dataInicial', nullable : true})
    dataInicial?: Date;

    @Column({ type: 'date', name: 'dataFinal', nullable : true})
    dataFinal?: Date;
    
    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.tarefa)
    usuario: UsuarioEntity[];
}