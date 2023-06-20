import { Column,Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { GeneroEnum } from "./genero.enum";
import { TarefaEntity } from 'src/tarefa/tarefa.entity';
import { DespesaEntity } from "src/despesa/despesa.entity";

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nome: string

    @Column()
    apelido: string

    @Column()
    email: string

    @Column({ type: 'date', name: 'nascimento', nullable : true})
    nascimento: Date;

    @Column({
        type: 'enum',
        enum: GeneroEnum,
        default: GeneroEnum.PREFIRONAOINFORMAR,
        nullable:  true,
    })
    genero: GeneroEnum;

    @OneToMany(
        () => TarefaEntity,
        (tarefa) => tarefa.usuario,
        { eager: true },
      )
    @JoinColumn({
        name: 'tarefa_id',
        foreignKeyConstraintName: 'tarefa_fk',
        referencedColumnName: 'id',
    })
    tarefa: TarefaEntity[];

    @OneToMany(
       () => DespesaEntity,
       (despesa) => despesa.usuario,
       { eager: true },
    )
    @JoinColumn({
       name: 'despesa_id',
       foreignKeyConstraintName: 'despesa_fk',
       referencedColumnName: 'id',
    })
    despesa: DespesaEntity;
}