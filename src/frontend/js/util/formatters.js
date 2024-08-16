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


export function formatDocumentLocation(folderNames, documentLocationTag) {
    let formattedDocumentLocation = ' ';
    const filteredNames = filterFolderNames(folderNames);
    filteredNames.forEach(name => {
        formattedDocumentLocation += `${name} / `;
    });
    // Remove the last '/ ' from the location string
    documentLocationTag.textContent = formattedDocumentLocation.slice(0, -2);
}


function filterFolderNames(folderNames) {
    const specialFolders = ['Templates', 'Favorites'];
    let lastSpecialFolder = null;

    // Iterate through folderNames from the end to find the last occurrence of any special folder
    for (let i = folderNames.length - 1; i >= 0; i--) {
        if (specialFolders.includes(folderNames[i])) {
            lastSpecialFolder = folderNames[i];
            break;
        }
    }

    if (lastSpecialFolder) {
        return [lastSpecialFolder];
    }

    return folderNames;
}


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
