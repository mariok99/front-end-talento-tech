export function setAttrs(element, attrs) {
    Object.keys(attrs).forEach((key) => {
        if (attrs[key] !== undefined) {
            element.setAttribute(key, attrs[key]);
        }
    });
}
