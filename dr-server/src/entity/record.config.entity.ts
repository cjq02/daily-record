import { Column, Entity } from 'typeorm';
import BaseEntity from '../base/base.entity';
import RecordTypeEnum from '../enumerate/record.type.enum';

@Entity("recordConfig")
export default class RecordConfigEntity extends BaseEntity {

    @Column({ unique: true })
    name: string;

    @Column({
        type: "enum",
        enum: RecordTypeEnum
    })
    type: RecordTypeEnum
}