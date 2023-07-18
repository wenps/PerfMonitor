import { reportParams } from "./report";
import { HASH, HISTORY } from "../metrics/index";

type routerType = typeof HASH | typeof HISTORY

export interface userBehavior {
    reportParams: reportParams, // 上报格式
    reportTypes: Array<string> // 上报类型集合
    routerTypes?: Array<routerType> // 路由类型集合
}