import { reportParams } from "./report";

export interface performance {
    reportParams: reportParams, // 上报格式
    reportTypes: Array<string> // 上报类型集合
    ,performanceTypes: Array<string> // 性能指标集合
    userExperienceTypes: Array<string> // 用户指标集合
}