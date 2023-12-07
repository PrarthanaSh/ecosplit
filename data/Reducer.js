// const ADD_CONTACT = 'ADD_CONTACT';
// const UPDATE_CONTACT = 'UPDATE_CONTACT';
// const DELETE_CONTACT = 'DELETE_CONTACT';

const LOAD_ACTIVITIES = 'LOAD_ACTIVITIES';
const LOAD_GROUPS = 'LOAD_GROUPS';
const LOAD_USERS = 'LOAD_USERS';
const ADD_GROUP = 'ADD_GROUP';
const UPDATE_GROUP = 'UPDATE_GROUP';
const DELETE_GROUP = 'DELETE_GROUP';
const ADD_USER = 'ADD_USER';
const ADD_EXPENSE = 'ADD_EXPENSE';
const UPDATE_USER = 'UPDATE_USER';

// const LOAD_GROUPS = 'LOAD_GROUPS';

// const ADD_ITEM= 'ADD_ITEM';
// const DELETE_ITEM = 'DELETE_ITEM';
// const UPDATE_ITEM = 'UPDATE_ITEM';

// const ADD_MEMBER = 'ADD_MEMBER';
// const UPDATE_MEMBER = 'UPDATE_MEMBER';
// const DELETE_MEMBER = 'DELETE_MEMBER';

const initGroups = [];
const initActivities = [];
const initUsers = [];
const initTags = [];
const initExpenses = [];
const initialState = {
  listActivities: initActivities,
  listGroups: initGroups,
  listUsers: initUsers,
  listTags: initTags,
  listExpenses: initExpenses
}

// const addItem = (state, newText, members) => {
//   let { groupItems } = state;
//   let newGroupItems = groupItems.concat({
//     text: newText,
//     key: Date.now() + Math.random(),
//     members: members,
//   });
//   return {
//     ...state, 
//     groupItems: newGroupItems
//   };
// }

// const updateItem = (state, itemId, newText, members) => {
//   let { groupItems } = state;
//   let newItem = {
//     text: newText,
//     key: itemId, 
//     members: members,
//   };
//   let newGroupItems = groupItems.map(elem=>elem.key===itemId?newItem:elem);
//   return {
//     ...state, 
//     groupItems: newGroupItems
//   };
// }

// const deleteItem = (state, itemId) => {
//   let { groupItems } = state;
//   let newGroupItems = groupItems.filter(elem=>elem.key !== itemId);
//   return {
//     ...state, 
//     groupItems: newGroupItems
//   }
// }

// const addMember = (state, memberName, memberColor) => {
//   return {
//     ...state,
//     members: state.members.concat({
//       memberName: memberName,
//       color: memberColor,
//       key: Date.now()
//     })
//   }
// }

// const updateMember = (state, memberId, memberName, memberColor) => {
//   let nwTag = {
//     memberName: memberName,
//     color: memberColor,
//     key: memberId
//   }
//   let newMembers = state.members.map(elm => elm.key===memberId ? nwTag : elm);
//   return {
//     ...state,
//     members: newMembers
//   }  
// }

// const deleteMember = (state, memberId) => {
//   let newListItems = [];
//   state.listItems.forEach(elem=>{
//     let newElem = {...elem};
//     newElem.members = elem.members.filter(memberKey=>memberKey!==memberId);
//     newListItems.push(newElem);
//   });
//   return {
//     ...state,
//     listItems: newListItems,
//     members: state.members.filter(elem=>elem.key!==memberId)
//   }

// }

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
    listGroups: [...groups]
  }
}



const loadUsers = (state, users) => {
  return {
    ...state,
    listUsers: [...users]
  }
}

const updateUsers = (state, key, updatedUser) => {
  let { listUsers } = state;
  let newUsers = listUsers.map(user => user.key === key ? { ...user, ...updatedUser } : user);
  return {
    ...state,
    listUsers: newUsers
  };
}
// const loadGroups = (state, groups) => {

//   return {
//     ...state,
//     groups: [...groups]
//   }
// }

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

const addGroup = (state, newGroupName, newMembers, key) => {
  let { groups } = state;
  let newGroups = groups.concat({
    groupName: newGroupName,
    members: newMembers,
    key: key
  });
  return {
    ...state,
    groups: newGroups
  };
}


const updateGroup = (state, newGroupName, newMembers, key) => {
  let { groups } = state;
  let newGroup = {
    groupName: newGroupName,
    members: newMembers,
    key: key
  };
  let newGroups = groups.map(elem => elem.key === key ? newGroup : elem);
  return {
    ...state,
    groups: newGroups
  };
}

const deleteGroup = (state, key) => {
  let { groups } = state;
  let newGroups = groups.filter(elem => elem.key !== key);
  return {
    ...state,
    groups: newGroups,
  }
}

// const addUser = (state, newDisplayName, newEmail, key) => {
//   let { listUsers } = state;
//   let newUsers = listUsers.concat({
//     displayName: newDisplayName,
//     email: newEmail,
//     // expense: 0,
//     // carbonCost: 0,
//     key: key
//   });
//   return {
//     ...state,
//     listUsers: newUsers
//   };
// }

const addUser = (state, payload) => {
  return {
    ...state, 
    listUsers: state.listUsers.concat({...payload.listUsers})
  }
}

const addExpense = (state, newActivityType, newCarbonCost, newGroup, newExpenseAmt, newSplit, newTags, key) => {
  let { listExpenses } = state;
  let newExpenses = listExpenses.concat({
    activityType: newActivityType,
    carbonCost: newCarbonCost,
    group: newGroup,
    expenseAmt: newExpenseAmt,
    split: newSplit,
    tags: newTags,
    key: key
  });
  return {
    ...state,
    listExpenses: newExpenses
  };
}

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
    case ADD_GROUP:
      return addGroup(state, action.payload.groupName, action.payload.members, payload.key);
    case UPDATE_GROUP:
      return updateGroup(state, action.payload.groupName, action.payload.members, payload.key);
    case DELETE_GROUP:
      return deleteGroup(state, payload.key);
    case ADD_USER:
      // return addUser(state, action.payload.newDisplayName, action.payload.newEmail, action.payload.newExpense, payload.key);
      return addUser(state, action.payload)
    case UPDATE_USER:
      return updateUser(state, payload.key, payload.updatedUser);
    case ADD_EXPENSE:
      return addExpense(state, action.payload.newActivityType, action.payload.newCarbonCost, action.payload.newGroup, action.payload.newExpenseAmt, action.payload.newSplit, action.payload.newTags, payload.key);
    // case UPDATE_GROUP:
    //   return updateGroup(state, action.payload.key, action.payload.groupTitle);
    // case DELETE_GROUP:
    //   return deleteGroup(state, action.payload.key);
    //   case LOAD_GROUPS:
    //     return loadGroups(state, payload.newGroups);
    case LOAD_ACTIVITIES:
      return loadActivities(state, payload.newListActivities);
    case LOAD_GROUPS:
      return loadGroups(state, payload.newListGroups);
    case LOAD_USERS:
      return loadUsers(state, payload.newListUsers);
    default:
      return state;
  }
}

export {
  rootReducer, LOAD_ACTIVITIES, LOAD_GROUPS, LOAD_USERS, ADD_GROUP, UPDATE_GROUP, DELETE_GROUP, ADD_EXPENSE, ADD_USER, UPDATE_USER
};