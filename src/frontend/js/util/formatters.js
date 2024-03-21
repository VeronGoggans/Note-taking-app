/**
 * This method formats a given name so that 
 * a name longer than 25 characters will never be fully displayed
 * on the folders / notes. 
 * 
 * @param {String} name 
 * @returns 
 */
export function formatName(name) {
    if (name.length <= 25) {
        return name;
    } else {
        return name.slice(0, 22) + '...';
    }
}

/**
 * This method will take in a embed link and
 * replace the original title with an empty string
 * 
 * This is because surten title's on youtube are written 
 * with special encoding methods that python (backend) does not support 
 * out of the box. 
 * 
 * @param {String} link 
 */
export function formatEmbedLink(link) {
    let linkParts = link.replace();
    let formattedLink = null;
}