export class TextBlockHandler {
    constructor(page) {
        this.page = page;
    }

    parse() {        
        this.headings = this.page.querySelectorAll('h1, h2, h3, h4, h5, h6');
        this.anchorTags = this.page.querySelectorAll('a');
        this.#attachEventListeners();
    }

    renderLinkPreview() {
        console.log("Preview ?");
        
    }

    #attachEventListeners() {
        this.headings.forEach(heading => {
            heading.addEventListener('keydown', (event) => {
              console.log('Keydown event');
              
              // If the Backspace key is pressed and heading text is empty, remove the heading
              if (event.key === 'Backspace' && heading.textContent.trim() === '') {
                event.preventDefault();
                heading.remove();
              }
            });
        });

        // When links are loaded in they don't have eventlisteners on them by default.
        // This method creates those event listener for each link.

        this.anchorTags.forEach(function(link) {
            link.addEventListener('click', () => {
                window.open(link.href)
            });
        });

        this.anchorTags.forEach((link) => {
            link.addEventListener('mouseover', () => {
                this.renderLinkPreview();
            });
        })
    }
}
