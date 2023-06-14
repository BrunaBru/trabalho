import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DespesaService } from "./despesa.service";
import { DespesaEntity } from "./despesa.entity";
import { DespesaDto } from "./despesa.despesaDto";

@Controller('despesas')
export class DespesaController{
    
    constructor(private despesaService: DespesaService){}

    @Get()
    findAll(): Promise<DespesaEntity[]>{
        return this.despesaService.findAll();
    }

    @Get(':id')
    findById(@Param('id')id: string) {
        return this.despesaService.findById(id);
    }

    @Delete(':id')
    remove (@Param('id') id :string){
        return this.despesaService.remove(id);
    }

    @Post()
    create(@Body() dto: DespesaDto){
        return this.despesaService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: DespesaDto){
        return this.despesaService.update({ ...dto, id});
    }
}