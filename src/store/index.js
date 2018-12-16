import {types, flow, getRoot} from 'mobx-state-tree';
import {Course} from './Course';
import {Scenario} from "./Scenario";
import {Step} from "./Step";

const git = require('isomorphic-git');

export const Store = types.model('Store', {
  loading: true,
  repo: 'https://github.com/kfcoding/kfcoding-cource-example.git',
  course: types.optional(Course, {}),
  hasCurrentScenario: false,
  currentScenario: types.maybe(types.reference(Scenario)),
  stepIndex: 0,
  currentStep: types.maybe(types.reference(Step)),
  page: ''
}).volatile(self => ({
  bfs: null,
  pfs: null,
})).actions(self => {
  const fetchGit = flow(function* (repo) {
    git.plugins.set('fs', self.bfs);
    yield git.clone({
      dir: '.',
      corsProxy: 'https://cors.isomorphic-git.org',
      url: repo,
      singleBranch: true,
      depth: 1
    })
  })
  const fetchCourse = flow(function* (repo) {
    git.plugins.set('fs', self.bfs);
    yield git.clone({
      dir: '.',
      corsProxy: 'https://cors.isomorphic-git.org',
      url: repo,
      singleBranch: true,
      depth: 1
    })
    let data = yield self.pfs.readFile('config.json');
    let config = JSON.parse(data.toString());

    self.course.setTitle(config.title);
    self.course.setDescription(config.description);
    self.course.setAuthor(config.author);
    self.course.setScenarioDirs(config.scenarios);
    yield self.course.fetchScenarios();

  })
  return ({
    setBfs(bfs) {
      self.bfs = bfs;
    },
    setPfs(pfs) {
      self.pfs = pfs;
    },
    setRepo(repo) {
      self.repo = repo;
    },
    setCurrentScenario(scenario) {
      self.currentScenario = scenario;
      // self.course.scenarios.map(s => {console.log(dir)
      //   if (s.dir == dir) {
      //     self.currentScenario = s;
      //     self.hasCurrentScenario = true;
      //   }
      // })
    },
    setLoading(flag) {
      self.loading = flag;
    },
    setStepIndex(index) {
      self.stepIndex = index;
    },
    setPage(page) {
      self.page = page;
    },
    nextStep() {
      self.stepIndex++;
    },
    prevStep() {
      self.stepIndex--;
    },
    fetchGit,
    fetchCourse
  })
});
