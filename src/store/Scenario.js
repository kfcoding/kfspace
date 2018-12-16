import {types, flow, getRoot} from 'mobx-state-tree';
import {Step} from "./Step";
import io from 'socket.io-client';
import {Terminal} from "./Terminal";

export const Scenario = types
  .model('Scenario', {
    dir: types.identifier,
    title: '',
    description: '',
    steps: types.array(Step),
    terminals: types.array(Terminal)
  }).volatile(self => ({
    stepDirs: [],
    socket: io.connect('//ws.katacoda.com', {
      transports: ["websocket"],
      timeout: 120 * 1e3,
      reconnection: false,
      query: 'dockerimage=dind&course=docker&id=deploying-first-container&originalPathwayId='
    })
  })).actions(self => {
    const createTerminal = flow(function* () {
      const rawResponse = yield fetch('http://api.kfcoding.com/api/basic/workspaces', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({dockerImage: 'registry-vpc.cn-shanghai.aliyuncs.com/kfcoding/workspace-envs:ubuntu', type: 'terminal'})
      });
      const content = yield rawResponse.json();
      console.log(content)
    })

    const fetchSteps = flow(function* () {
      for (let i in self.stepDirs) {
        try {
          let dir = self.stepDirs[i];
          let data = yield getRoot(self).pfs.readFile(self.dir + '/' + dir + '/config.json');
          let config = JSON.parse(data.toString());
          let step = Step.create({
            dir: dir,
            title: config.title,
            description: config.description
          });
          step.setTextDir(config.text);
          self.steps.push(step)
          yield step.fetchText();
        } catch (e) {
          console.error(e);
        }
      }
    });

    return {
      afterCreate() {
        self.terminals.push({})

        self.socket.on('data', function (data) {console.log(data)
          self.terminals[0].terminal.write(data.data)
        });
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
      setStepDirs(dirs) {
        self.stepDirs = dirs;
      },
      setTerminal(t) {
        self.terminal = t;
      },
      fetchSteps
    }
  });
