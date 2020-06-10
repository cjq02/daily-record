import { Controller, Get } from '@nestjs/common';
import { IpAddress } from '../../decorator/IpAdress';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
    constructor(private readonly helloService: HelloService) { }

    @Get()
    getHello(): string {
        return this.helloService.getHello();
    }

    @Get('/ip')
    getIp(@IpAddress() IpAddress): string {
        console.log(IpAddress);
        return IpAddress;
    }
}
