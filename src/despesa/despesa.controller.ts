import { Body, Controller, Delete, Get, Param, Post, Put,Query } from "@nestjs/common";
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

    @Get(':id')
    async findPaginacao(
      @Param('id') id: string,
      @Query('page') page: number,
      @Query('limit') limit: number,
      @Query('descricao') descricao?: string,
    ) 
    {
        return this.despesaService.findPaginacao(id, page, limit, descricao);
    }
    
    @Delete(':id')
    async remove (@Param('id') id :string){
        return await this.despesaService.remove(id);
    }

    @Post()
    create(@Body() dto: DespesaDto){
        return this.despesaService.create(dto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: DespesaDto){
        return await this.despesaService.update({ ...dto, id});
    }
}