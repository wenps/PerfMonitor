import { getClickInfo, getInputInfo } from "../event/tagEvent";
import { getPageInfo } from "../event/pageInfoEvent";
import { getUserAgentInfo } from "../event/userAgentEvent";
import { getHashRouter, getHistoryRouter } from "../event/routerEvent";

export const HASH = 'HASH_ROUTER'
export const HISTORY = 'HISTORY_ROUTER'

export const ROUTER_EVENT_MAP = {
    [HASH]: getHashRouter,
    [HISTORY]: getHistoryRouter
}

export const CLICK = 'CLICK_EVENT'
export const INPUT = 'INPUT_EVENT'

export const TAG_EVENT_MAP = {
    [CLICK]: getClickInfo,
    [INPUT]: getInputInfo
}


export const GET_PAGE_INFO = getPageInfo
export const GET_USER_AGENT_INFO = getUserAgentInfo

