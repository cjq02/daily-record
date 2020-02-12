import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RecordConfigEntity from '../../entity/record.config.entity';
import { RecordConfigController } from './controller/record.config.controller';
import { RecordConfigService } from './service/record.config.service';

@Module({
    imports: [TypeOrmModule.forFeature([RecordConfigEntity])],
    controllers: [RecordConfigController],
    providers: [RecordConfigService],
})
export class RecordModule {  }
