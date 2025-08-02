
//
export function createElement(tag, attributes, children) {

    //
    const element = document.createElement(tag);

    //
    if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }

    //
    if (typeof children === 'string') {
        element.textContent = children;
        return element;
    }

    //
    if (children) {
        children.forEach(child => {
            if (Array.isArray(child)) {
                element.appendChild(createElement(child[0], child[1], child[2]));
            } else {
                element.appendChild(child);
            }
        });
    }

    //
    return element;

}
