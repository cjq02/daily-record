import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import RecordConfigEntity from '../../../entity/record.config.entity';
import { RecordConfigService } from '../service/record.config.service';

@Controller('record/config')
export class RecordConfigController {

    constructor(private readonly recordConfigService: RecordConfigService) { }

    @Post()
    add(@Body() entity: RecordConfigEntity) {
        return this.recordConfigService.add(entity);
    }

    @Get()
    findAll() {
        return this.recordConfigService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.recordConfigService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() entity: RecordConfigEntity) {
        return this.recordConfigService.update(id, entity);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.recordConfigService.delete(id);
    }
}
