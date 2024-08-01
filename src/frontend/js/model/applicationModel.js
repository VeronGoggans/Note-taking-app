export class ApplicationModel {
    constructor() {
        this.previousView = null;
    }

    setPreviousView(viewId) {
        this.previousView = viewId;
    }

    getPreviousView() {
        const previousView = this.previousView;
        this.previousView = null;
        return previousView
    }
}