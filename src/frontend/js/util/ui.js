export function removeContent(contentDiv) {
    while (contentDiv.firstChild) 
        contentDiv.removeChild(contentDiv.firstChild);
}

export function decrementString(string) {
    let num = Number(string);
    num--
    return String(num)
}