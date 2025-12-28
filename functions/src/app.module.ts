import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AdminController} from "./controllers/admin.controller";
import {EmployeeController} from "./controllers/employee.controller";
import {OfficeController} from "./controllers/office.controller";
import {TargetController} from "./controllers/target.controller";
import {TransactionController} from "./controllers/transaction.controller";
import {PromotionController} from "./controllers/promotion.controller";
import {LazyEmployeeController} from "./controllers/lazy-employee.controller";
@Module({
    imports: [],
    controllers: [AppController, AdminController, EmployeeController, OfficeController, TargetController, TransactionController, PromotionController, LazyEmployeeController],
})
export class AppModule {
    constructor() {
        console.log('✅ AppModule initialized');
    }
}

