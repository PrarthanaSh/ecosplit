
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const SET_NICKNAME = 'SET_NICKNAME';
const ADD_TAG = 'ADD_TAG';
const UPDATE_TAG = 'UPDATE_TAG';
const DELETE_TAG = 'DELETE_TAG';

const colors = [
  'rgb(113, 212, 245)', // lightblue
  'rgb(209, 137, 132)', // red
  'rgb(103, 168, 133)', // green
  'rgb(171, 232, 245)', // skyblue
  'rgb(179, 113, 245)', // purple
  'rgb(255, 215, 0)'  // orange
]

const initTags = [
  { tagName: 'Transportation', color: colors[0], key: Date.now() },
  { tagName: 'School', color: colors[2], key: Date.now() + 1},
  { tagName: 'Work', color: colors[3], key: Date.now() + 2},
];

const initGroupItems = [
  { text: 'Family', tags: [initTags[0].key], key: Date.now() },
  { text: 'Friends', tags: [initTags[0].key], key: Date.now() + 1},
  { text: 'Business', tags: [initTags[1].key, initTags[2].key], key: Date.now() + 2},
];

const initialState = {
  tags: initTags,
  groupItems: initGroupItems,
  colors: colors,
}

const addItem = (state, newText, tags) => {
  let { groupItems } = state;
  let newGroupItems = groupItems.concat({
    text: newText,
    key: Date.now() + Math.random(),
    tags: tags
  });
  return {
    ...state, 
    groupItems: newGroupItems
  };
}

const updateItem = (state, itemId, newText, tags) => {
  let { groupItems } = state;
  let newItem = {
    text: newText,
    key: itemId, 
    tags: tags
  };
  let newGroupItems = groupItems.map(elem=>elem.key===itemId?newItem:elem);
  return {
    ...state, 
    groupItems: newGroupItems
  };
}

const deleteItem = (state, itemId) => {
  let { groupItems } = state;
  let newListItems = groupItems.filter(elem=>elem.key !== itemId);
  return {
    ...state, 
    groupItems: newGroupItems
  }
}

const setNickname = (state, newName) => {
  return {
    ...state, 
    nickname: newName
  }
}

const addTag = (state, tagName, tagColor) => {
  return {
    ...state,
    tags: state.tags.concat({
      tagName: tagName,
      color: tagColor,
      key: Date.now()
    })
  }
}

const updateTag = (state, tagId, tagName, tagColor) => {
  let nwTag = {
    tagName: tagName,
    color: tagColor,
    key: tagId
  }
  console.log('updating tag', tagId, 'old tags', state.tags);
  let newTags = state.tags.map(elm => elm.key===tagId ? nwTag : elm);
  console.log('new tags', newTags);
  return {
    ...state,
    tags: newTags
  }  
}

const deleteTag = (state, tagId) => {
  let newGroupItems = [];
  state.groupItems.forEach(elem=>{
    let newElem = {...elem};
    newElem.tags = elem.tags.filter(tagKey=>tagKey!==tagId);
    newListItems.push(newElem);
  });
  return {
    ...state,
    groupItems: newGroupItems,
    tags: state.tags.filter(elem=>elem.key!==tagId)
  }
  
}

function rootReducer(state=initialState, action) {

  const { type, payload } = action;

  switch (action.type) {
    case ADD_ITEM:
      return addItem(state, action.payload.text, action.payload.tags);
    case UPDATE_ITEM:
      return updateItem(state, action.payload.key, action.payload.text, action.payload.tags);
    case DELETE_ITEM:
      return deleteItem(state, action.payload.key);
    case SET_NICKNAME:
      return setNickname(state, action.payload.nickname);
    case ADD_TAG:
      return addTag(state, payload.tagName, payload.tagColor);
    case UPDATE_TAG:
      return updateTag(state, payload.key, payload.tagName, payload.tagColor);
    case DELETE_TAG:
      return deleteTag(state, payload.key);
    default:
      return state;
  }
}

export { rootReducer, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, SET_NICKNAME, ADD_TAG, UPDATE_TAG, DELETE_TAG };