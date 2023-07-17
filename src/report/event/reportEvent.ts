import { reportParams } from "../../interfaces/report";
import { postAction } from "../../utils/ajaxManage";
import { objectToQueryString } from "../../utils/formatConversion";

// sendBeacon 上报
export async function sendBeacon( {url = '', params }: reportParams, ...args: any[]) {
    if (navigator?.sendBeacon && url) {
      const isSuccess = await navigator?.sendBeacon(url, JSON.stringify(params));
      if (isSuccess) return true;
    }
    return false;
}

// img 上报
export function sendImg({ img = '', params }: reportParams, ...args: any[]) {
    return new Promise<boolean>((resolve, reject) => {
        const imageData  = objectToQueryString(params)
        const img_o = new Image();
        img_o.onload = () => resolve(true);
        img_o.onerror = () => reject(false);
        img_o.src = `${img}?${imageData}`;
    })
}

// ajax 上报
export function sendAjax({ req = '', params }: reportParams, ...args: any[]) {
    return new Promise<boolean>((resolve, reject) => {
        if (req) {
        postAction(req, params)
            .then(() => resolve(true))
            .catch(() => reject(false));
        } else {
            reject(false);
        }
    });
}