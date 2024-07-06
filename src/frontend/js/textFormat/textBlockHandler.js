export class TextBlockHandler {
    constructor(page) {
        this.page = page;
        this.importantBlocks = []
        this.quoteBlocks = []
        this.copyBlocks = []
    }

    parse() {
        console.log('Hello world');
        
    }

    empty() {
        this.importantBlocks = []
        this.quoteBlocks = []
        this.copyBlocks = []
    }

    
}