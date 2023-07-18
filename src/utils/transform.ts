export function transformFn(transform: Function[], data: object) {
    if (transform && transform.length > 0) {
        transform.forEach(element => {
            element(data)
        });
    }
}