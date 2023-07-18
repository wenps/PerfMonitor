import { reportParams } from "./report";
import { RT, TCP, TTFB, REQ, DOM, RES, TOTAL, UPLOAD, DNS, RESARR } from '../metrics/index';
import { FID, DCL, TTI, LCP, FCP, FP, FBT, CLS, LOAD } from '../metrics/index';

type performanceType = typeof RT | typeof TCP | typeof TTFB | typeof REQ | typeof DOM | typeof RES | typeof TOTAL | typeof UPLOAD | typeof DNS | typeof RESARR

type userExperienceType = typeof FID | typeof DCL | typeof TTI | typeof LCP | typeof FCP | typeof FP | typeof FBT | typeof CLS | typeof LOAD

export interface performance {
    reportParams: reportParams, // 上报格式
    reportTypes: Array<string> // 上报类型集合
    performanceTypes: Array<performanceType> // 性能指标集合
    userExperienceTypes: Array<userExperienceType> // 用户指标集合
}