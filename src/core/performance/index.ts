import { performance } from '../../interfaces/performance';
import { reportParams } from '../../interfaces/report';
import { performanceIndexFn, userExperienceIndexFn } from '../../metrics/index';
import { RT, TCP, TTFB, REQ, DOM, RES, TOTAL, UPLOAD, DNS, RESARR } from '../../metrics/index';
import { FID, DCL, TTI, LCP, FCP, FP, FBT, CLS, LOAD } from '../../metrics/index';
import { reportEvent } from '../../report/index';


// 性能核心对象
export class performanceCore {
    performanceTypes = [RT, TCP, TTFB, REQ, DOM, RES, TOTAL, UPLOAD, DNS, RESARR];
    userExperienceTypes = [FID, DCL, TTI, LCP, FCP, FP, FBT, CLS, LOAD];
    reportTypes: string[];
    report: reportParams;
    reportMap = {
        'performance': performanceIndexFn,
        'userExperience': userExperienceIndexFn
    }
    constructor(data: performance) {
        [this.report, this.reportTypes, this.performanceTypes, this.userExperienceTypes] = [
            data.reportParams,
            data.reportTypes,
            data.performanceTypes,
            data.userExperienceTypes
        ];
    }
    // 浏览器性能上报
    public performanceReport(data:object) {
        this.report.params = {...data}
        this.reportFn('performance', this.performanceTypes)
    }
    // 用户性能上报
    public userExperienceReport(data:object) {
        this.report.params = {...data}
        this.reportFn('userExperience', this.userExperienceTypes)
    }
    private reportFn(key:string, type:string[]) {
        this.reportMap[key](type).then((res) => {
            this.report.params = {...this.report.params, ...res}
            if (this.reportTypes.length == 0) {
                reportEvent(this.report)
            } else {
                reportEvent(this.report, this.reportTypes)
            }
        })
    }
}
