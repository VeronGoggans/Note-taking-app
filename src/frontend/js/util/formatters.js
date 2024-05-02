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