# report

埋点上报模块

埋点上报方式：`img，ajax，beacon`

埋点上报函数： `reportEvent、reportAjaxEvent、reportImgEvent、reportBeaconEvent`

| 名称 | 参数类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| reportEvent | `reportParams`、[]、 ... | `reportParams`、[IMG, BEACON, AJAX]、 ... | 基础上报函数，默认支持三种上报方式及其优先级为：IMG, BEACON, AJAX，**如若希望修改上报方式类型或顺序修改第二个参数即可，IMG, BEACON, AJAX为支持的类型** |
| reportAjaxEvent | `reportParams`、 ...  | `reportParams`、[AJAX]、 ... | 只支持ajax上报 |
| reportImgEvent | `reportParams`、 ...  | `reportParams`、[IMG]、 ... | 只支持img上报 |
| reportBeaconEvent |  `reportParams`、 ... | `reportParams`、[BEACON]、 ... | 只支持beacon上报 |

注： `reportParams` 是埋点上报基本格式，接口类型如下：
```ts
interface reportParams {
    url?: string; // beacon 上报请求
    img?: string; // img 上报图片
    req?: string; // req 上报请求
    params: object; // 上报内容
}
```
注：上述 IMG, BEACON, AJAX 等常量均在report默认导出中  

注: report默认导出中包含`EVENT_REPORT_FUNCTION_MAP`，含义为上报原始函数与上报常量的映射。  
可通过`EVENT_REPORT_FUNCTION_MAP[`IMG`]` 等方式获取原生上报函数。

使用示例：
```js
const params = {
    url: 'http://a.com/a'; 
    img: 'http://a.com/b.gif'; 
    req: 'http://a.com/c'; 
    params: {
        name: 'xs'
    }; 
}
reportEvent(params)
```