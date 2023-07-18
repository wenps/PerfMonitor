import { reportParams } from "./report";
import { HASH, HISTORY, CLICK, INPUT } from "../metrics/index";

type routerType = typeof HASH | typeof HISTORY
type tagType = typeof CLICK | typeof INPUT

export interface userBehavior {
    reportParams: reportParams, // 上报格式
    reportTypes: Array<string> // 上报类型集合
    routerTypes?: Array<routerType> // 路由类型集合
    tagTypes?: Array<tagType> // 路由类型集合
}