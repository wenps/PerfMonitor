import { sendAjax, sendBeacon, sendImg } from "../event/reportEvent";

export const IMG = 'img'
export const BEACON = 'beacon'
export const AJAX = 'ajax'

export const EVENT_REPORT_FUNCTION_MAP = {
    [IMG]: sendBeacon,
    [BEACON]: sendImg,
    [AJAX]: sendAjax
}