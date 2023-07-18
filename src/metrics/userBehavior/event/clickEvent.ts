export function getClickInfo(Fn:Function) {
    window.addEventListener('click', (e)=>{
        Fn({target:e})
    })
}