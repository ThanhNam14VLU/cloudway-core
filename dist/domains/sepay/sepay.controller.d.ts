import { SepayService } from './sepay.service';
import type { Response, Request } from 'express';
export declare class SepayController {
    private readonly sepayService;
    private readonly webhookKey;
    constructor(sepayService: SepayService);
    handleWebhook(headers: Record<string, string>, req: Request, body: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
