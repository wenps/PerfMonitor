import { reportParams } from '../../interfaces/report';
import { userBehavior } from '../../interfaces/userBehavior';
import { ROUTER_EVENT_MAP, TAG_EVENT_MAP, GET_PAGE_INFO } from "../../metrics/index";
import { reportEventFn } from '../../report';
import { transformFn } from '../../utils/transform';

// 用户行为核心对象
export class userBehaviorCore {
    routerTypes = [...Object.keys(ROUTER_EVENT_MAP)];
    tagTypes = [...Object.keys(TAG_EVENT_MAP)];
    reportTypes: string[];
    report: reportParams;
    
    constructor(data: userBehavior) {
        [this.report, this.reportTypes] = [
            data.reportParams,
            data.reportTypes,
        ];
        if(data.routerTypes.length != 0) this.routerTypes = data.routerTypes
        if(data.tagTypes.length != 0) this.tagTypes = data.tagTypes
    }
    // 页面基础信息上报
    public reportPageInfo(data:Object, transform:Function[]) {
        const cpReport = JSON.parse(JSON.stringify(this.report))
        // 暂存默认参数
        cpReport.params = {...data}
        const pageInfo = GET_PAGE_INFO()
        this.reportInfoFn({...pageInfo, ...data}, transform, cpReport)
    }

    // 路由监听
    public reportRouterInfo(data:Object, transform:[]) {
        this.routerTypes.map((item, index) => {
            const cpReport = JSON.parse(JSON.stringify(this.report))
            // 暂存默认参数
            cpReport.params = {...data}
            ROUTER_EVENT_MAP[item](this.reportInfoFn, transform[index], cpReport)
        })
    }

    // 点击监听
    public reportTagInfo(data:Object, transform:[]) {
        this.tagTypes.map((item, index) => {
            const cpReport = JSON.parse(JSON.stringify(this.report))
            // 暂存默认参数
            cpReport.params = {...data}
            TAG_EVENT_MAP[item](this.reportInfoFn, transform[index], cpReport)
        })
    }

    // 变更上报
    private reportInfoFn(data:Object, transform: Function[], report: reportParams) {
        report.params = { ...data, ...report.params };
        // 对数据格式进行操作
        transformFn(transform, report)
        reportEventFn(report, this.reportTypes);
    }
}
