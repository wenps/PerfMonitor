import { reportParams } from '../../interfaces/report';
import { userBehavior } from '../../interfaces/userBehavior';
import { ROUTER_EVENT_MAP, TAG_EVENT_MAP, HTTP_EVENT_MAP, GET_PAGE_INFO, GET_USER_AGENT_INFO } from "../../metrics/index";
import { reportEventFn } from '../../report';
import { transformFn } from '../../utils/transform';

// 用户行为核心对象
export class userBehaviorCore {
    routerTypes = [...Object.keys(ROUTER_EVENT_MAP)];
    tagTypes = [...Object.keys(TAG_EVENT_MAP)];
    httpTypes = [...Object.keys(HTTP_EVENT_MAP)];
    reportTypes: string[];
    report: reportParams;
    
    constructor(data: userBehavior) {
        [this.report, this.reportTypes] = [
            data.reportParams,
            data.reportTypes,
        ];
        if(data.routerTypes.length != 0) this.routerTypes = data.routerTypes
        if(data.tagTypes.length != 0) this.tagTypes = data.tagTypes
        if(data.httpTypes.length != 0) this.httpTypes = data.httpTypes
    }

    // 页面基础信息上报
    public reportPageInfo(data:Object, transform:Function[]) {
        const cpReport = JSON.parse(JSON.stringify(this.report))
        // 暂存默认参数
        cpReport.params = {...data}
        const pageInfo = GET_PAGE_INFO()
        this.reportInfoFn({...pageInfo, ...data}, transform, cpReport)
    }

    // 用户代理上报
    public reportUserAgentInfo(data:Object, transform:Function[]) {
        const cpReport = JSON.parse(JSON.stringify(this.report))
        // 暂存默认参数
        cpReport.params = {...data}
        const pageInfo = GET_USER_AGENT_INFO()
        this.reportInfoFn({...pageInfo, ...data}, transform, cpReport)
    }

    // 路由上报
    public reportRouterInfo(data:Object, transform:[]) {
        this.routerTypes.map((item, index) => {
            const cpReport = JSON.parse(JSON.stringify(this.report))
            // 暂存默认参数
            cpReport.params = {...data}
            ROUTER_EVENT_MAP[item](this.reportInfoFn, transform[index], cpReport)
        })
    }

    // 标签事件上报
    public reportTagInfo(data:Object, transform:[]) {
        this.tagTypes.map((item, index) => {
            const cpReport = JSON.parse(JSON.stringify(this.report))
            // 暂存默认参数
            cpReport.params = {...data}
            TAG_EVENT_MAP[item](this.reportInfoFn, transform[index], cpReport)
        })
    }

    public reportHttpInfo(data:Object, transform:[]) {
        this.httpTypes.map((item, index) => {
            const cpReport = JSON.parse(JSON.stringify(this.report))
            // 暂存默认参数
            cpReport.params = {...data}
            HTTP_EVENT_MAP[item](this.reportInfoFn, transform[index], cpReport)
        })
    }

    // 上报函数
    private reportInfoFn(data:Object, transform: Function[], report: reportParams) {
        report.params = { ...data, ...report.params };
        // 对数据格式进行操作
        transformFn(transform, report)
        reportEventFn(report, this.reportTypes);
    }
}
