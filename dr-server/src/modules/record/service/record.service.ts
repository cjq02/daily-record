import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import Constants from '../../../common/Constants';
import RecordEntity from '../../../entity/record.entity';

@Injectable()
export class RecordService {

    constructor(
        @InjectRepository(RecordEntity)
        private readonly RecordRepo: Repository<RecordEntity>,
    ) { }

    add(entity: RecordEntity): Promise<RecordEntity> {
        entity.createAt = new Date();
        entity.createUserId = Constants.openId;
        return this.RecordRepo.save(entity);
    }

    update(id: string, entity: RecordEntity): Promise<UpdateResult> {
        entity.updateAt = new Date();
        entity.updateUserId = Constants.openId;
        return this.RecordRepo.update(id, entity);
    }

    findAll(): Promise<RecordEntity[]> {
        return this.RecordRepo.find();
    }

    findOne(id: string): Promise<RecordEntity> {
        return this.RecordRepo.findOne(id);
    }

    delete(id: string): Promise<DeleteResult> {
        return this.RecordRepo.delete(id);
    }

}
