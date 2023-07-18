import { performance } from '../../types/performance';
import { reportObj, reportParams } from '../../types/report';
import { PERFORMANCE_INDEX_MAP } from '../../metrics/index';
import { USER_EXPERIENCE_INDEX_MAP } from '../../metrics/index';
import { performanceIndexReportFn, userExperienceIndexReportFn } from '../../metrics/performance/index';


// 性能核心对象
export class performanceCore {
    performanceTypes = [...Object.keys(PERFORMANCE_INDEX_MAP)];
    userExperienceTypes = [...Object.keys(USER_EXPERIENCE_INDEX_MAP)];
    reportTypes: string[];
    report: reportParams;
    reportObj: reportObj;
    constructor(data: performance) {
        [this.report, this.reportTypes] = [
            data.reportParams,
            data.reportTypes
        ];
        this.reportObj = {
            report: this.report,
            reportTypes: this.reportTypes
        }
        if(data.performanceTypes.length != 0) this.performanceTypes = data.performanceTypes
        if(data.userExperienceTypes.length != 0) this.userExperienceTypes = data.userExperienceTypes
    }

    // 浏览器性能上报
    public performanceReport(data:object, transform: Function[]) {
        performanceIndexReportFn(this.performanceTypes, this.reportObj, data, transform)
    }

    // 用户性能上报
    public userExperienceReport(data:object, transform: Function[]) {
        userExperienceIndexReportFn(this.performanceTypes, this.reportObj, data, transform)
    }
}
