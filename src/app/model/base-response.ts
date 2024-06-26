export interface Alert {
    code: number;
    message: string;
    inner_message?: any;
}

export class BaseResponse{
    alert:Alert | undefined;
    data:any;
}