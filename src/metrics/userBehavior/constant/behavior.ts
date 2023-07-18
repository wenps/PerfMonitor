import { getClickInfo } from "../event/clickEvent";
import { getPageInfo } from "../event/pageInfoEvent";
import { getHashRouter, getHistoryRouter } from "../event/routerEvent";

export const HASH = 'HASH_ROUTER'
export const HISTORY = 'HISTORY_ROUTER'

export const ROUTER_EVENT_MAP = {
    [HASH]: getHashRouter,
    [HISTORY]: getHistoryRouter
}

export const GET_PAGE_INFO = getPageInfo
export const GET_CLICK_INFO =getClickInfo

