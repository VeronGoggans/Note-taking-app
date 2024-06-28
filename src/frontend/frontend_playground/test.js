const documentLocation = document.querySelector('.document-location')

function formatDocumentLocation(folderNames) {
    let formattedDocumentLocation = ' ';
    folderNames.forEach(folderName => {
        formattedDocumentLocation += `${folderName} / `
    });
    // Remove the last '/ ' from the location string
    documentLocation.textContent = formattedDocumentLocation.slice(0, -2);
}

formatDocumentLocation(['Home', 'School', 'CICQ2'])

