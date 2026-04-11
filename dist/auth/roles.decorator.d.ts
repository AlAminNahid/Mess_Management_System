import { UserRole } from 'src/dtos/role.enum';
export declare const ROLE_KEY = "roles";
export declare const Roles: (...roles: UserRole[]) => import("@nestjs/common").CustomDecorator<string>;
