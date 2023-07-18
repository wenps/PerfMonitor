import { reportParams } from "../../../types/report"

export function getClickInfo(Fn:Function, transform: Function[], report: reportParams) {
    window.addEventListener('click', (e)=>{
        Fn({target:e}, transform, report)
    })
}

export function getInputInfo(Fn:Function, transform: Function[], report: reportParams) {
    window.addEventListener('input', (e)=>{
        Fn({target:e}, transform, report)
    })
}