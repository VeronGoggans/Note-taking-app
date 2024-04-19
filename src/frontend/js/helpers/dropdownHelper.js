export class DropdownHelper {
    constructor() {
        this.openDropdowns = [];
    }

    addOpenDropdown(dropdownId) {
        for (let i = 0; i < this.openDropdowns.length; i++) {
            if (this.openDropdowns[i] === dropdownId) {
                this.openDropdowns.splice(i, 1);
            } else {
                this.openDropdowns.push(dropdownId);
            }
        }
    }

    /**
     * This method toggles the visibility of a specified dropdown,
     * by toggling the visibility style property.
     */
    toggleVisibleDropdown(dropdownOptions, dropdownId) {
        dropdownOptions.style.visibility = dropdownOptions.style.visibility === 'visible' ? 'hidden' : 'visible';
        this.addOpenDropdown(dropdownId);
    }

    closeDropdown(dropdown) {
        dropdown.style.visibility = 'hidden';
    }

    closeDropdowns() {
        this.dropdowns.forEach((dropdown) => {
          dropdown.style.visibility = 'hidden';
        })
      }
}