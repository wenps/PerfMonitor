import { reportObj, reportParams } from '../../types/report';
import { userBehavior } from '../../types/userBehavior';
import { ROUTER_EVENT_MAP, TAG_EVENT_MAP, HTTP_EVENT_MAP } from "../../metrics/index";
import { httpInfoReportFn, routerInfoReportFn, tagInfoReportFn, pageInfoReportFn, userAgentInfoReportFn } from '../../metrics/index'

// 用户行为核心对象
export class userBehaviorCore {
    routerTypes = [...Object.keys(ROUTER_EVENT_MAP)];
    tagTypes = [...Object.keys(TAG_EVENT_MAP)];
    httpTypes = [...Object.keys(HTTP_EVENT_MAP)];
    reportTypes: string[];
    report: reportParams;
    reportObj: reportObj;
    
    constructor(data: userBehavior) {
        [this.report, this.reportTypes] = [
            data.reportParams,
            data.reportTypes,
        ];
        this.reportObj = {
            report: this.report,
            reportTypes: this.reportTypes
        }
        if(data.routerTypes.length != 0) this.routerTypes = data.routerTypes
        if(data.tagTypes.length != 0) this.tagTypes = data.tagTypes
        if(data.httpTypes.length != 0) this.httpTypes = data.httpTypes
    }

    // 页面基础信息上报
    public reportPageInfo(data:Object, transform:Function[]) {
        pageInfoReportFn(this.reportObj, data, transform)
    }

    // 用户代理上报
    public reportUserAgentInfo(data:Object, transform:Function[]) {
        userAgentInfoReportFn(this.reportObj, data, transform)
    }

    // 路由上报
    public reportRouterInfo(data:Object, transform:[]) {
        routerInfoReportFn(this.routerTypes, this.reportObj, data, transform)
    }

    // 标签事件上报
    public reportTagInfo(data:Object, transform:[]) {
        tagInfoReportFn(this.tagTypes, this.reportObj, data, transform)
    }

    // Http上报
    public reportHttpInfo(data:Object, transform:[]) {
        httpInfoReportFn(this.httpTypes, this.reportObj, data, transform)
    }
}
