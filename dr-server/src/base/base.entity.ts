import { Column, ObjectIdColumn } from 'typeorm';

export default abstract class BaseEntity {

    @ObjectIdColumn()
    id: string;

    @Column({ type: 'timestamp' })
    createAt: Date;

    @Column()
    createUserId: string;

    @Column({ type: 'timestamp', nullable: true })
    updateAt: Date;

    @Column({ nullable: true })
    updateUserId: string;

}