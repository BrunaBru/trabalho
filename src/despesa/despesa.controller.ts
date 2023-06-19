import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DespesaService } from "./despesa.service";
import { DespesaEntity } from "./despesa.entity";
import { DespesaDto } from "./despesa.dto";

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
    async remove (@Param('id') id :string){
        return await this.despesaService.remove(id);
    }

    @Post()
    async create(@Body() dto: DespesaDto){
        return await this.despesaService.create(dto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: DespesaDto){
        return await this.despesaService.update({ ...dto, id});
    }
}