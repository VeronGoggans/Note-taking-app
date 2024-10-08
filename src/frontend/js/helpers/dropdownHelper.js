export class DropdownHelper {
    constructor(view, dropdowns, dropdownOptions, templateList = null) {
        this.view = view;
        this.dropdowns = dropdowns;
        this.dropdownOptions = dropdownOptions
        this.templateList = templateList;
        this.#eventListeners();
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


      toggleDropdown(dropdownOptions) {
        this.closeDropdowns(dropdownOptions);
        dropdownOptions.style.visibility = dropdownOptions.style.visibility === 'visible' ? 'hidden' : 'visible';
        dropdownOptions.style.opacity = dropdownOptions.style.opacity === '1' ? '0' : '1';
      }


      #eventListeners() {
        for (let i = 0; i < this.dropdowns.length; i++) {
            this.dropdowns[i].addEventListener('click', () => {
                this.toggleDropdown(this.dropdownOptions[i])
            });
          }
      }
}