import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TarefaService } from "./tarefa.service";
import { TarefaEntity } from "./tarefa.entity";
import { TarefaDto } from "./tarefa.dto";

@Controller('tarefas')
export class TarefaController{
    
    constructor(private tarefaService: TarefaService){}

    @Get()
    findAll(): Promise<TarefaEntity[]>{
        return this.tarefaService.findAll();
    }

    @Get(':id')
    findById(@Param('id')id: string) {
        return this.tarefaService.findById(id);
    }

    @Delete(':id')
    async remove (@Param('id') id :string){
        return await this.tarefaService.remove(id);
    }

    @Post()
    create(@Body() dto: TarefaDto){
        return this.tarefaService.create(dto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: TarefaDto){
        return await this.tarefaService.update({ ...dto, id});
    }
}