export function objectToQueryString(obj:Object):String {
    const params = new URLSearchParams();
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            params.append(key, obj[key]);
        }
    }
    return params.toString();
}

export function deV(data: Object, props: Array<string>, defaultValue: any) {
    let value = data;
    for (const prop of props) {
      if (value && value.hasOwnProperty(prop)) {
        value = value[prop];
      } else {
        value = '';
        break;
      }
    }
    return value || defaultValue;
}