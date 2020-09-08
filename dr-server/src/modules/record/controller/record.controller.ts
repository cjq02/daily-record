import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import RecordEntity from '../../../entity/record.entity';
import { RecordService } from '../service/record.service';

@Controller('record')
export class RecordController {

    constructor(private readonly RecordService: RecordService) { }

    @Post()
    add(@Body() entity: RecordEntity) {
        return this.RecordService.add(entity);
    }

    @Get()
    findAll() {
        return this.RecordService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.RecordService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() entity: RecordEntity) {
        return this.RecordService.update(id, entity);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.RecordService.delete(id);
    }
}
