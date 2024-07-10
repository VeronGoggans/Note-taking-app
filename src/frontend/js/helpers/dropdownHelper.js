export class DropdownHelper {
    constructor(view) {
        this.view = view;
        this.#initializeDomElements();
        this.#attachEventListeners();
    }


    listenForTemplateClicks() {
        const templateOptions = this.templateList.children;
        for(let i = 0; i < templateOptions.length; i++) {
            const option = templateOptions[i];
            option.addEventListener('click', async () => {
            this.view.loadInTemplate(option.id);
            })
        }
    }


    renderTemplatesDropdown(allTemplateNames) {
        let html = '';
        allTemplateNames.forEach(element => {
          html += `<li id=${element.id}>${element.name}</li>`;
        });
        this.templateList.innerHTML = html;
        this.listenForTemplateClicks();
      }


      closeDropdowns(target) {
        this.dropdownOptions.forEach((dropdown) => {
          if (dropdown !== target) {
            dropdown.style.visibility = 'hidden';
            dropdown.style.opacity = '0';
          }
        })
      }


      toggleVisibleDropdown(dropdownOptions) {
        this.closeDropdowns(dropdownOptions);
        dropdownOptions.style.visibility = dropdownOptions.style.visibility === 'visible' ? 'hidden' : 'visible';
        dropdownOptions.style.opacity = dropdownOptions.style.opacity === '1' ? '0' : '1';
      }


      #initializeDomElements() {
        this.templateDropdown = document.querySelector('.templates-dropdown');
        this.templateDropdownOptions = this.templateDropdown.querySelector('.options');
        this.templateList = this.templateDropdownOptions.querySelector('.templates-container');
        this.editorDropdown = document.querySelector('.editor-options-dropdown');
        this.editorDropdownOptions = this.editorDropdown.querySelector('.options');
        this.dropdowns = [this.editorDropdown, this.templateDropdown]
        this.dropdownOptions = [this.editorDropdownOptions, this.templateDropdownOptions]
      }


      #attachEventListeners() {
        for (let i = 0; i < this.dropdowns.length; i++) {
            this.dropdowns[i].addEventListener('click', () => {
                this.toggleVisibleDropdown(this.dropdownOptions[i])
            });
          }
      }
}