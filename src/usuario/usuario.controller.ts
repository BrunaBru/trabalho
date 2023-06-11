import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioDto } from "./usuario.usuarioDto";

@Controller('usuarios')
export class UsuarioController{
    
    constructor(private usuarioService: UsuarioService){}

    @Get()
    findAll(): Promise<UsuarioEntity[]>{
        return this.usuarioService.findAll();
    }

    @Get(':id')
    findById(@Param('id')id: string) {
        return this.usuarioService.findById(id);
    }

    @Delete(':id')
    remove (@Param('id') id :string){
        return this.usuarioService.remove(id);
    }

    @Post()
    create(@Body() dto: UsuarioDto){
        return this.usuarioService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UsuarioDto){
        return this.usuarioService.update({ ...dto, id});
    }
}