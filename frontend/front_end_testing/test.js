import {createEditor} from 'lexical';

const config = {
  namespace: 'MyEditor',
  theme: {
  },
  onError: console.error
};

const editor = createEditor(config);

const contentEditableElement = document.getElementById('editor');

editor.setRootElement(contentEditableElement);

const stringifiedEditorState = JSON.stringify(editor.getEditorState().toJSON());

const newEditorState = editor.parseEditorState(stringifiedEditorState);