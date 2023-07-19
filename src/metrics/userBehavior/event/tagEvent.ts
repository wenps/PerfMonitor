import { reportParams } from "../../../types/report"

export function getClickInfo(Fn:Function, transform: Function[], report: reportParams, commandReportTypes:string[]) {
    window.addEventListener('click', (e)=>{
        Fn({target:e}, transform, report, commandReportTypes)
    })
}

export function getInputInfo(Fn:Function, transform: Function[], report: reportParams, commandReportTypes:string[]) {
    window.addEventListener('input', (e)=>{
        Fn({target:e}, transform, report, commandReportTypes)
    })
}