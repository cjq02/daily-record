import { Entity, Column } from 'typeorm';
import RecordTypeEnum from '../enumerate/record.type.enum';
import BaseEntity from '../base/base.entity';

@Entity("t_dr_record_config")
export default class RecordConfigEntity extends BaseEntity {

    @Column({ unique: true })
    name: string;

    @Column({
        type: "enum",
        enum: RecordTypeEnum
    })
    type: RecordTypeEnum
}