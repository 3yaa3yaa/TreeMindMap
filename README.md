# Tree Mind Map
This software is released under the MIT License, see LICENSE.txt.

## What is this?

This is a NPM component of mind map tool written in React.
https://www.npmjs.com/package/treemindmap

## Projects that uses this component

* https://github.com/3yaa3yaa/TreeMindMap-Site
* https://github.com/3yaa3yaa/TreeMindMap-Electron

## How to use this?
Use "<Map />" tag with paramters "initialState" and "stateHandler".
* "initialState" : The first state to be load in the mindmap 
* "stateHandler" : This is triggered every time the state changed.

For example, you can specify the values as below.
https://github.com/3yaa3yaa/TreeMindMap-Electron/blob/master/app/index.js
```
import Map from 'treemindmap'
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


## What's it look like?
![howto](https://github.com/3yaa3yaa/TreeMindMap/blob/master/HowTo.png)
