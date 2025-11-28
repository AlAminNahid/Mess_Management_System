import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {
    getMemberDashboard() : string {
        return 'Welcome to the member dashboard';
    }
}
