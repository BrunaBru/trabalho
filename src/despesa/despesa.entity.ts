import { Column,Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { CategoriaEnum } from "./categoria.enum";
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Entity({ name: 'despesas' })
export class DespesaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    descricao: string

    @Column({
        type: 'enum',
        enum: CategoriaEnum,
        default: CategoriaEnum.Outras,
        nullable:  true,
    })
    categoria: CategoriaEnum;

    @Column({ type: 'date', name: 'data', nullable : true})
    data?: Date;

    @Column({ type: 'number', name: 'valor', nullable : true})
    valor?: number;
    
    @OneToMany(() => UsuarioEntity, (usuario) => usuario.despesa)
    usuario: UsuarioEntity[];
}