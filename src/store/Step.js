import {types, flow, getRoot, getParent} from 'mobx-state-tree';

export const Step = types
  .model('Step', {
    dir: '',
    title: '',
    description: '',
    text: ''
  }).volatile(self => ({
    textDir: ''
  })).actions(self => {
    const fetchText = flow(function* () {
      let data = yield getRoot(self).pfs.readFile(getParent(getParent(self)).dir + '/' + self.dir + '/' + self.textDir);
      self.text = data.toString();
    })
    return {
      afterCreate() {
      },
      setDir(dir) {
        self.dir = dir;
      },
      setTitle(title) {
        self.title = title;
      },
      setDescription(desc) {
        self.description = desc;
      },
      setTextDir(dir) {
        self.textDir = dir;
      },
      fetchText
    }
  });
