// const ADD_CONTACT = 'ADD_CONTACT';
// const UPDATE_CONTACT = 'UPDATE_CONTACT';
// const DELETE_CONTACT = 'DELETE_CONTACT';

const LOAD_ACTIVITIES = 'LOAD_ACTIVITIES';
const LOAD_GROUPS = 'LOAD_GROUPS';

const ADD_ITEM= 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';

// const initGroups = [];

const initGroupItems = [
  { text: 'Family', key: Date.now() },
  { text: 'Friends', key: Date.now() + 1},
  { text: 'Business', key: Date.now() + 2},
];

const initActivities=[];
const initialState = {
  listActivities: initActivities,
  groupItems: initGroupItems,
  // groups: initGroups
}

const addItem = (state, newText) => {
  let { groupItems } = state;
  let newGroupItems = groupItems.concat({
    text: newText,
    key: Date.now() + Math.random(),
  });
  return {
    ...state, 
    groupItems: newGroupItems
  };
}

const updateItem = (state, itemId, newText) => {
  let { groupItems } = state;
  let newItem = {
    text: newText,
    key: itemId, 
  };
  let newGroupItems = groupItems.map(elem=>elem.key===itemId?newItem:elem);
  return {
    ...state, 
    groupItems: newGroupItems
  };
}

const deleteItem = (state, itemId) => {
  let { groupItems } = state;
  let newGroupItems = groupItems.filter(elem=>elem.key !== itemId);
  return {
    ...state, 
    groupItems: newGroupItems
  }
}

// const addContact = (state, contactDict, groups, key) => {
//   let { listContacts } = state;
//   contactDict = {
//     firstName: contactDict.firstName,
//     lastName: contactDict.lastName,
//     company: contactDict.company,
//     phone: contactDict.phone,
//     email: contactDict.email,
//     address: contactDict.address,
//   }
//   let newlistContacts = listContacts.concat({
//     contactDict,
//     groups: groups,
//     key: key,
//   });
//   return {
//     ...state,
//     listContacts: newlistContacts
//   };

// }

// const updateContact = (state, itemId, contactDict, groups) => {
//   let { listContacts } = state;
//   contactDict = {
//     firstName: contactDict.firstName,
//     lastName: contactDict.lastName,
//     company: contactDict.company,
//     phone: contactDict.phone,
//     email: contactDict.email,
//     address: contactDict.address
//   }
//   let newItem = {
//     contactDict,
//     groups: groups,
//     key: itemId,
//   };
//   let newlistContacts = listContacts.map(elem => elem.key === itemId ? newItem : elem);
//   return {
//     ...state,
//     listContacts: newlistContacts
//   };
// }


// const deleteContact = (state, itemId) => {
//   let { listContacts } = state;
//   let newlistContacts = listContacts.filter(elem => elem.key !== itemId);
//   return {
//     ...state,
//     listContacts: newlistContacts
//   }
// }

const loadActivities = (state, activities) => {
  return {
    ...state,
    listActivities: [...activities]
  }
}

const loadGroups = (state, groups) => {
  return {
    ...state,
    groups: [...groups]
  }
}

// const deleteGroup = (state, groupId) => {
//   let { listContacts } = state;
//   let { groups } = state;

//   let newGroups = groups.filter(elem => elem.key !== groupId);
//   let newListContacts = listContacts.map(item => ({
//     ...item,
//     groups: item.groups.filter(group => group !== groupId),
//   }));

//   return {
//     ...state,
//     groups: newGroups,
//     listContacts: newListContacts
//   }
// }

// const addGroup = (state, newGroup, key) => {
//   let { groups } = state;
//   let newGroups = groups.concat({
//     groupTitle: newGroup,
//     key: key
//   });
//   return {
//     ...state,
//     groups: newGroups
//   };
// }

// const updateGroup = (state, groupId, newGroupName) => {
//   let { groups } = state;
//   let newGroup = {
//     groupTitle: newGroupName,
//     key: groupId
//   };
//   let newGroups = groups.map(elem => elem.key === groupId ? newGroup : elem);
//   return {
//     ...state,
//     groups: newGroups
//   };
// }


function rootReducer(state = initialState, action) {
  
  const { type, payload } = action;
  switch (type) {
    // case ADD_CONTACT:
    //   return addContact(state, payload.contactDict, payload.groups,payload.key );
    // case UPDATE_CONTACT:
    //   return updateContact(state, payload.key, payload.contactDict, payload.groups);
    // case DELETE_CONTACT:
    //   return deleteContact(state, payload.key);
    case LOAD_ACTIVITIES:
      return loadActivities(state, payload.newListActivities);
    // group and items
    case ADD_ITEM:
      return addItem(state, action.payload.text);
    case UPDATE_ITEM:
      return updateItem(state, action.payload.key, action.payload.text);
    case DELETE_ITEM:
      return deleteItem(state, action.payload.key);
    case LOAD_GROUPS:
      return loadGroups(state, payload.newGroups);
    default:
      return state;
  }
}

export {
  rootReducer, LOAD_ACTIVITIES, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, LOAD_GROUPS
  // ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT, LOAD_CONTACTS, DELETE_GROUP, ADD_GROUP, UPDATE_GROUP, LOAD_GROUPS
};