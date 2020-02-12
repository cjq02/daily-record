import { Controller, Get, Post, Body } from '@nestjs/common';
import { RecordConfigService } from '../service/record.config.service';
import RecordConfigEntity from '../../../entity/record.config.entity';

@Controller('record/config')
export class RecordConfigController {

    constructor(private readonly recordConfigService: RecordConfigService) { }

    @Post('add')
    add(@Body() entity: RecordConfigEntity) {
        return this.recordConfigService.add(entity);
    }

    @Get('findAll')
    findAll() {
        return this.recordConfigService.findAll();
    }

    //   @Get(':id')
    //   findOne(@Param('id') id: string) {
    //     return `This action returns a #${id} cat`;
    //   }

    //   @Put(':id')
    //   update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    //     return `This action updates a #${id} cat`;
    //   }

    //   @Delete(':id')
    //   remove(@Param('id') id: string) {
    //     return `This action removes a #${id} cat`;
    //   }
}
