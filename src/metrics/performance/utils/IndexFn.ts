
import { reportEventFn } from "../../../report"
import { reportObj } from "../../../types/report"
import { transformFn } from "../../../utils/transform"
import {PERFORMANCE_INDEX_MAP} from "../constant/performance"
import {USER_EXPERIENCE_INDEX_MAP} from "../constant/userExperience"

let commandReportTypes = []

let reportMap = {
    'performance': performanceIndexFn,
    'userExperience': userExperienceIndexFn
}

// 浏览器性能指标 上报
export function performanceIndexReportFn(types:string[], reportObj: reportObj, data:object, transform: Function[]) {
    reportFn('performance', types, reportObj, data, transform)
}

// 用户性能指标 上报
export function userExperienceIndexReportFn(types:string[], reportObj: reportObj, data:object, transform: Function[]) {
    reportFn('userExperience', types, reportObj, data, transform)
}

// 指标上报函数
function reportFn(key:string, type:string[], reportObj: reportObj, data:object, transform: Function[]) {
    const { report, reportTypes } = reportObj
    commandReportTypes = reportTypes
    const cpReport = JSON.parse(JSON.stringify(report))
    // 暂存默认参数
    cpReport.params = {...data}
    reportMap[key](type).then((res) => {
        cpReport.params = {...cpReport.params, ...res}
        // 对数据格式进行操作
        transformFn(transform, cpReport)
        reportEventFn(cpReport, commandReportTypes);
    })
}

// 浏览器性能指标函数
function performanceIndexFn(types:string[]) {
    return IndexFn(types, PERFORMANCE_INDEX_MAP)
}

// 用户性能指标函数
function userExperienceIndexFn(types:string[]) {
    return IndexFn(types, USER_EXPERIENCE_INDEX_MAP)
}

// 指标函数
function IndexFn(types:string[], map: Object) {
    const promiseList = []
    types.map(item => {
        promiseList.push(map[item]())
    })
    return new Promise((resolve, reject) => {
        Promise.allSettled(promiseList).then((res)=> {
            const resObj = {}
            res.map((item, index) => {
                resObj[types[index]] = item
            })
            resolve(resObj)
        }).catch((err)=>{
            console.log(err);
        })
    })
}