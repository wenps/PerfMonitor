import { getPageInfo } from "./pageInfoEvent";

export function getHashRouter(fn:Function) { // 监听hash
    window.addEventListener('hashchange', (e) => fn({target:e, ...getRouterBaseInfo('hashchange')}), true);
    window.addEventListener("load", (e) => fn({target:e, ...getRouterBaseInfo('hashchange')}), true); // 初始化监听
}

export function getHistoryRouter(fn:Function) { // 监听history
    window.addEventListener('popstate', (e) => {
        fn({target:e, ...getRouterBaseInfo('popstate')})
    });

    const rawPushState = window.history.pushState; // 存储 pushState 原函数
    window.history.pushState = (...args) => {
        rawPushState.apply(window.history, args);
        fn({...getRouterBaseInfo('pushState')})
    };

    const rawReplaceState = window.history.replaceState; // 存储 pushState 原函数
    window.history.replaceState = (...args) => {
        rawReplaceState.apply(window.history, args);
        fn({...getRouterBaseInfo('replaceState')})
    };
    fn({...getRouterBaseInfo('pushState')}) // 初始化监听
}

// 函数封装
function getRouterBaseInfo(event:string) {
    return {
        date: new Date().getTime(),
        event,
        pageInfo: getPageInfo()
    }
}