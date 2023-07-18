import { reportParams } from "../../../interfaces/report"

export function getClickInfo(Fn:Function, transform: Function[], report: reportParams) {
    window.addEventListener('click', (e)=>{
        Fn({target:e}, transform, report)
    })
}