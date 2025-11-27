import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    getAdminDashboard() : string {
        return 'Welcome to the admin dashboard';
    }
}
