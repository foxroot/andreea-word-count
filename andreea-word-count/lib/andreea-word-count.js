'use babel';
import AndreeaWordCountView from './andreea-word-count-view';
import { CompositeDisposable } from 'atom';
export default {
  andreeaWordCountView: null,
  modalPanel: null,
  subscriptions: null,
  activate(state) {
    this.andreeaWordCountView = new AndreeaWordCountView(state.andreeaWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.andreeaWordCountView.getElement(),
      visible: false
    });
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'andreea-word-count:toggle': () => this.toggle()
    }));
  },
  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.andreeaWordCountView.destroy();
  },
  serialize() {
    return {
      andreeaWordCountViewState: this.andreeaWordCountView.serialize()
    };
  },
  toggle() {
if (this.modalPanel.isVisible()) {
this.modalPanel.hide();
} else {
const editor = atom.workspace.getActiveTextEditor();
const words = editor.getText().split(/\s+/).length;
this.andreeaWordCountView.setCount(words);
this.modalPanel.show();
}
}
};
