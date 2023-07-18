import { reportParams } from '../../interfaces/report';
import { userBehavior } from '../../interfaces/userBehavior';
import { ROUTER_EVENT_MAP, HASH, HISTORY, GET_PAGE_INFO, GET_CLICK_INFO } from "../../metrics/index";
import { reportEventFn } from '../../report';

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
        this.reportInfoFn({...pageInfo, ...data})
    }

    // 路由监听
    public reportRouterInfo(data:Object) {
        // 暂存默认参数
        this.report.params = {...data}
        this.routerTypes.map(item => {
            ROUTER_EVENT_MAP[item](this.reportInfoFn)
        })
    }

    // 点击监听
    public reportClickInfo(data:Object) {
        // 暂存默认参数
        this.report.params = {...data}
        GET_CLICK_INFO(this.reportInfoFn)
    }

    // 变更上报
    private reportInfoFn(data:Object) {
        this.report.params = { ...data, ...this.report.params };
        reportEventFn(this.report, this.reportTypes);
    }
}
