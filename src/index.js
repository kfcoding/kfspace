import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'mobx-react';
import {Store} from './store/index';
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { onSnapshot } from 'mobx-state-tree';

const browserfs = require('browserfs');
const pify = require('pify');
const git = require('isomorphic-git');

moment.locale('zh-cn');
const store = Store.create();

onSnapshot(store, (snapshot) => {
  console.dir(JSON.stringify(snapshot))
})

browserfs.configure({fs: "IndexedDB", options: {}}, (err) => {
  if (err) return console.log(err);
  let bfs = browserfs.BFSRequire("fs");
  let pfs = pify(bfs);
  store.setBfs(bfs);
  store.setPfs(pfs);

  ReactDOM.render(<Provider store={store}><LocaleProvider
    locale={zh_CN}><App/></LocaleProvider></Provider>, document.getElementById('root'));
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
