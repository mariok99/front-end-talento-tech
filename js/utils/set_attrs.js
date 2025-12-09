export function set_attrs(element, attrs) {
    Object.keys(attrs).forEach((key) => {
        if (attrs[key] !== undefined) {
            element.setAttribute(key, attrs[key]);
        }
    });
}
