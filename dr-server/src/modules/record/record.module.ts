import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RecordConfigEntity from '../../entity/record.config.entity';
import RecordEntity from '../../entity/record.entity';
import { RecordConfigController } from './controller/record.config.controller';
import { RecordController } from './controller/record.controller';
import { RecordConfigService } from './service/record.config.service';
import { RecordService } from './service/record.service';

@Module({
    imports: [TypeOrmModule.forFeature([RecordConfigEntity, RecordEntity])],
    controllers: [RecordConfigController, RecordController],
    providers: [RecordConfigService, RecordService],
})
export class RecordModule {  }
