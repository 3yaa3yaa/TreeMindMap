[![npm version](https://badge.fury.io/js/treemindmap.svg)](https://badge.fury.io/js/treemindmap)
[![Build Status](https://travis-ci.org/3yaa3yaa/TreeMindMap.svg?branch=master)](https://travis-ci.org/3yaa3yaa/TreeMindMap)
# Tree Mind Map
This software is released under the MIT License, see LICENSE.txt.

## What is this?

This is a NPM component of mind map tool written in React.
https://www.npmjs.com/package/treemindmap

## What's it look like?
Sample page -- https://3yaa3yaa.github.io/TreeMindMap-Site/
![howto](https://github.com/3yaa3yaa/TreeMindMap/blob/master/howto.png)

## Projects that uses this component
* https://github.com/3yaa3yaa/TreeMindMap-Site

## How to use this component?
Use "<Map />" with parameters "initialState" and "stateHandler".
* "initialState" : The first state to be load in the mindmap 
* "stateHandler" : This is triggered every time the state changed.

For example, you can specify the values as below.

### ES6
```
import { Map}  from 'treemindmap'
...
render(
  <Map
    initialState={initialdata.value}
    stateHandler={state => {
      changeddata.set(state);
    }}
  />,
  document.getElementById('root')
);
```

### ES5
```
const ReactDOM = require('react-dom');
const Render=require('treemindmap').Render;
...
Render(
  container.data.value,
  (state) => {
    container.data.set(JSON.stringify(state));
    SaveFile(container.filepath.value, container.data.value);
  },
  'root', /* id of DOM */
  ReactDOM
)
```

