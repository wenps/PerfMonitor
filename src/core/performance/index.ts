import { performance } from '../../interfaces/performance';
import { reportParams } from '../../interfaces/report';
import { performanceIndexFn, userExperienceIndexFn } from '../../metrics/index';
import { PERFORMANCE_INDEX_MAP } from '../../metrics/index';
import { USER_EXPERIENCE_INDEX_MAP } from '../../metrics/index';
import { reportEventFn } from '../../report';
import { transformFn } from '../../utils/transform';


// 性能核心对象
export class performanceCore {
    performanceTypes = [...Object.keys(PERFORMANCE_INDEX_MAP)];
    userExperienceTypes = [...Object.keys(USER_EXPERIENCE_INDEX_MAP)];
    reportTypes: string[];
    report: reportParams;
    reportMap = {
        'performance': performanceIndexFn,
        'userExperience': userExperienceIndexFn
    }
    constructor(data: performance) {
        [this.report, this.reportTypes] = [
            data.reportParams,
            data.reportTypes
        ];
        if(data.performanceTypes.length != 0) this.performanceTypes = data.performanceTypes
        if(data.userExperienceTypes.length != 0) this.userExperienceTypes = data.userExperienceTypes
    }

    // 浏览器性能上报
    public performanceReport(data:object, transform: Function[]) {
        const cpReport = JSON.parse(JSON.stringify(this.report))
        // 暂存默认参数
        cpReport.params = {...data}
        this.reportFn('performance', this.performanceTypes, transform, cpReport)
    }

    // 用户性能上报
    public userExperienceReport(data:object, transform: Function[]) {
        const cpReport = JSON.parse(JSON.stringify(this.report))
        // 暂存默认参数
        cpReport.params = {...data}
        this.reportFn('userExperience', this.userExperienceTypes, transform, cpReport)
    }

    // 上报函数
    private reportFn(key:string, type:string[], transform: Function[], report: reportParams) {
        this.reportMap[key](type).then((res) => {
            report.params = {...report.params, ...res}
            // 对数据格式进行操作
            transformFn(transform, report)
            reportEventFn(report, this.reportTypes)
        })
    }
}
