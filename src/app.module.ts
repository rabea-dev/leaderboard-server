import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AdminController} from "./controllers/admin.controller";
import {EmployeeController} from "./controllers/employee.controller";
import {OfficeController} from "./controllers/office.controller";
import {TargetController} from "./controllers/target.controller";
import {TransactionController} from "./controllers/transaction.controller";
import {AdminService} from "./services/admin.service";
import {EmployeeService} from "./services/employee.service";
import {OfficeService} from "./services/office.service";
import {TargetService} from "./services/target.service";
import {TransactionService} from "./services/transaction.service";

@Module({
    imports: [],
    controllers: [AppController, AdminController, EmployeeController, OfficeController, TargetController, TransactionController],
    providers: [AppService, AdminService, EmployeeService, OfficeService, TargetService, TransactionService],
})
export class AppModule {
}
