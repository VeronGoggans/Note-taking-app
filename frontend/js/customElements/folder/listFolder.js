
// export class ListFolder extends LitElement {
//     static get properties() {
//         return {
//           folderName: { type: String }
//         }
//     }

//     constructor() {
//         super();
//         this.folderName = 'Untitled'; // Defualt folder name.
//     }

//     render() {
//         return html`
//             <div class="list-view-folder">
//                 <span class="folder-name">${this.folderName}</span>
//             </div>
//        `
//     }

//     static get styles() {
//         return css`
//           :host {
//             cursor: pointer;
//             margin-left: 10px;
//             margin-bottom: 10px;
//             padding: 10px 0;
//             display: inline-block;
//             width: calc(100% - 20px);
//             background-color: #fff;
//             color: #444863;
//             box-shadow: 5px 5px 5px rgb(217 238 255);
//             border-radius: 5px;
//           }

//           span {
//             margin-left: 5px;
//           }          
//         `
//       }
// }

// window.customElements.define('list-folder', ListFolder);