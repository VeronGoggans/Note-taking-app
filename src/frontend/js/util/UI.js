export function removeContentFromNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
