
import {PERFORMANCE_INDEX_MAP} from "../constant/performance"
import {USER_EXPERIENCE_INDEX_MAP} from "../constant/userExperience"

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

// 浏览器性能指标函数
export function performanceIndexFn(types:string[]) {
    return IndexFn(types, PERFORMANCE_INDEX_MAP)
}

// 用户性能指标函数
export function userExperienceIndexFn(types:string[]) {
    return IndexFn(types, USER_EXPERIENCE_INDEX_MAP)
}