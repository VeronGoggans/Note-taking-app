import { Editor } from '../../../node_modules/@tiptap/core'
import StarterKit from '../../../node_modules/@tiptap/starter-kit'

new Editor({
  element: document.querySelector('.element'),
  extensions: [
    StarterKit,
  ],
  content: '<p>Hello World!</p>',
})