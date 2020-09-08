import { Column, Entity } from 'typeorm';
import BaseEntity from '../base/base.entity';

@Entity("record")
export default class RecordEntity extends BaseEntity {

    @Column({ unique: true })
    name: string;

    @Column()
    recordConfigId: String
    
    @Column()
    minutes: number

    @Column()
    count: number

    @Column()
    remark: String
}