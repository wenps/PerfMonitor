import { EVENT_REPORT_FUNCTION_MAP, IMG, BEACON, AJAX } from "../constant/report";
import { reportParams } from "../../types/report";
import { transformFn } from "../../utils/transform";

// 基础上报函数
export async function reportEvent(params: reportParams, reportType:string[] = [IMG, BEACON, AJAX], ...args:any[]) {
    let finalType = false
    for (const key in reportType) {
        if (!finalType) {
            try {
                await EVENT_REPORT_FUNCTION_MAP[key](params, ...args).then(()=>{
                    finalType = true
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
    return finalType
}

// 抛出img上报函数
export function reportImgEvent(params: reportParams, ...args: any[]) {
    return reportEvent(params, [IMG], ...args)
}

// 抛出ajax上报函数
export function reportAjaxEvent(params: reportParams, ...args: any[]) {
    return reportEvent(params, [AJAX], ...args)
}

// 抛出beacon上报函数
export function reportBeaconEvent(params: reportParams, ...args: any[]) {
    return reportEvent(params, [BEACON], ...args)
}

// core核心上报方法
export function reportEventFn( reportParams:reportParams, reportTypes:string[] = []) {
    if (reportTypes.length == 0) {
        reportEvent(reportParams)
    } else {
        reportEvent(reportParams, reportTypes)
    }
}

export function augmentReportFn(data:Object, transform: Function[], report: reportParams, commandReportTypes:string[]) {
    report.params = { ...data, ...report.params };
    // 对数据格式进行操作
    transformFn(transform, report)
    reportEventFn(report, commandReportTypes);
}