export interface reportParams {
    url?: string;
    img?: string;
    req?: string;
    params: object;
}

export interface reportObj {
    report: reportParams;
    reportTypes: string[]
}