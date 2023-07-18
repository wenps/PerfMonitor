import { reportEventFn } from '../../../report'
import { transformFn } from '../../../utils/transform'
import {reportObj, reportParams} from '../../../types/report'
import { ROUTER_EVENT_MAP, TAG_EVENT_MAP, HTTP_EVENT_MAP, GET_PAGE_INFO, GET_USER_AGENT_INFO } from "../../../metrics/index";

let commandReportTypes = []

// http请求 上报
export function httpInfoReportFn(types: string[], reportObj:reportObj, data:object, transform: any[]) {
    eventReportFn(types, ROUTER_EVENT_MAP, reportObj, data, transform)
}

// 路由事件 上报
export function routerInfoReportFn(types: string[], reportObj:reportObj, data:object, transform: any[]) {
    eventReportFn(types, HTTP_EVENT_MAP, reportObj, data, transform)
}

// 标签事件 上报
export function tagInfoReportFn(types: string[], reportObj:reportObj, data:object, transform: any[]) {
    eventReportFn(types, TAG_EVENT_MAP, reportObj, data, transform)
}

// 页面基础 上报
export function pageInfoReportFn(reportObj:reportObj, data:object, transform: any[]) {
    baseReportFn(GET_PAGE_INFO, reportObj, data, transform)
}

// userAgent 上报
export function userAgentInfoReportFn(reportObj:reportObj, data:object, transform: any[]) {
    baseReportFn(GET_USER_AGENT_INFO, reportObj, data, transform)
}

// 基础上报函数
function baseReportFn(infoFn: Function, reportObj:reportObj, data:object, transform: any[]) {
    const { report, reportTypes } = reportObj
    commandReportTypes = reportTypes
    const cpReport = JSON.parse(JSON.stringify(report))
    // 暂存默认参数
    cpReport.params = {...data}
    const pageInfo = infoFn()
    reportInfoFn({...pageInfo, ...data}, transform, cpReport)
}

// 事件上报函数
function eventReportFn(types: string[], maps: object, reportObj:reportObj, data:object, transform: any[]) {
    const { report, reportTypes } = reportObj
    commandReportTypes = reportTypes
    types.map((item, index) => {
        const cpReport = JSON.parse(JSON.stringify(report))
        // 暂存默认参数
        cpReport.params = {...data}
        maps[item](reportInfoFn, transform[index], cpReport)
    })
}

function reportInfoFn(data:Object, transform: Function[], report: reportParams) {
    report.params = { ...data, ...report.params };
    // 对数据格式进行操作
    transformFn(transform, report)
    reportEventFn(report, commandReportTypes);
}