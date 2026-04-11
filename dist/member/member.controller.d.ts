import { MemberService } from './member.service';
import { NoticeDTO } from 'src/dtos/notice.dto';
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    getMemberDashboard(): string;
    sendNotice(info: NoticeDTO, req: any): Promise<{
        message: string;
        title: string;
        description: string;
        date: import("typeorm").Timestamp;
        notice_type: string;
        sended_by: string;
    }>;
}
