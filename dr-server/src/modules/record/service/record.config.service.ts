import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Constants from '../../../common/Constants';
import RecordConfigEntity from '../../../entity/record.config.entity';

@Injectable()
export class RecordConfigService {

    constructor(
        @InjectRepository(RecordConfigEntity)
        private readonly recordConfigRepo: Repository<RecordConfigEntity>,
    ) { }

    add(entity: RecordConfigEntity): Promise<RecordConfigEntity> {
        entity.createAt = new Date();
        entity.createUserId = Constants.openId;
        return this.recordConfigRepo.save(entity);
    }

    findAll(): Promise<RecordConfigEntity[]> {
        return this.recordConfigRepo.find();
    }

}
