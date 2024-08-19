
/**
 * This class is used to store the previous view.
 * So that when a user clicks on a back button,
 * they get taken to the view they were in prevoiusly. 
 */
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