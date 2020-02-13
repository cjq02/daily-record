import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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

    update(id: string, entity: RecordConfigEntity): Promise<UpdateResult> {
        entity.updateAt = new Date();
        entity.updateUserId = Constants.openId;
        return this.recordConfigRepo.update(id, entity);
    }

    findAll(): Promise<RecordConfigEntity[]> {
        return this.recordConfigRepo.find();
    }

    findOne(id: string): Promise<RecordConfigEntity> {
        return this.recordConfigRepo.findOne(id);
    }

    delete(id: string): Promise<DeleteResult> {
        return this.recordConfigRepo.delete(id);
    }

}
