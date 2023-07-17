import { performance } from '../../interfaces/performance';
import { performanceIndexFn, userExperienceIndexFn } from '../../performance/index';
export class performanceCore {
    performanceTypes: string[];
    userExperienceTypes: string[];
    reportTypes: string[];
    report: object;
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
    public performanceReport() {
        this.reportFn('performance', this.performanceTypes)
    }
    public userExperienceReport() {
        this.reportFn('userExperience', this.userExperienceTypes)
    }
    private reportFn(key:string, type:string[]) {
        this.reportMap[key](type).then((res) => {

        })
    }
}
