import { reportEvent } from '../../report/index';
import { reportParams } from '../../interfaces/report';
import { userBehavior } from '../../interfaces/userBehavior';
import { ROUTER_EVENT_MAP, HASH, HISTORY, GET_PAGE_INFO } from "../../metrics/index";

// 用户行为核心对象
export class userBehaviorCore {
    routerTypes = [HASH, HISTORY];
    reportTypes: string[];
    report: reportParams;
    
    constructor(data: userBehavior) {
        [this.report, this.reportTypes] = [
            data.reportParams,
            data.reportTypes,
        ];
        if(data.routerTypes.length != 0) this.routerTypes = data.routerTypes
    }
    // 页面基础信息上报
    public reportPageInfo(data:Object) {
        const pageInfo = GET_PAGE_INFO()
        this.report.params = {...pageInfo, ...data}
        this.reportEventFn()
    }

    // 路由监听
    public reportRouterInfo(data:Object) {
        // 暂存默认参数
        this.report.params = {...data}
        this.reportTypes.map(item => {
            ROUTER_EVENT_MAP[item](this.reportRouterInfoFn)
        })
    }

    // 路由变更上报
    private reportRouterInfoFn(data:Object) {
        this.report.params = {...data, ...this.report.params}
        this.reportEventFn()
    }

    // 上报函数
    private reportEventFn() {
        if (this.reportTypes.length == 0) {
            reportEvent(this.report)
        } else {
            reportEvent(this.report, this.reportTypes)
        }
    }
}
