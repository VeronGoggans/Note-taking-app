/**
 * This method formats a given name so that 
 * a name longer than 25 characters will never be fully displayed
 * on the folders / notes. 
 * 
 * @param {String} name 
 * @returns 
 */
export function formatName(name) {
    if (name.length <= 25) return name;
    else return name.slice(0, 22) + '...';
}

export function filterNotePreview(content) {
    let segments = content.split("<div>");

    if (segments.length > 10) {
        segments = segments.slice(0, 10);
        return segments.join("<div>");
    } else {
        return segments.join("<div>");
    }
}