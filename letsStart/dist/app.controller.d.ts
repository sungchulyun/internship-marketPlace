import { CatsService } from './cats/cats.service';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly CatsService;
    constructor(appService: AppService, CatsService: CatsService);
    getHello(): string;
}
