import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { HelloModule } from './modules/hello/hello.module';
import { RecordModule } from './modules/record/record.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        HelloModule,
        RecordModule
    ]
})
export class AppModule {
    constructor(private readonly connection: Connection) {  }
}
