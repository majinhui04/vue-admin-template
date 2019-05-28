function addEvent(evnt, elem, func) {
    if (elem.addEventListener) {
        elem.addEventListener(evnt, func, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + evnt, func);
    } else {
        elem[evnt] = func;
    }
}
function closestElement(child, nodeName) {
    if (child.nodeName === nodeName) {
        return child;
    }

    if (!child.parentNode) {
        return;
    }

    if (child.parentNode.nodeName === nodeName) {
        return child.parentNode;
    }

    if (child.parentNode === document.body) {
        return;
    }

    return closestElement(child.parentNode, nodeName);
}
export default {
    addEvent,
    closestElement
};
