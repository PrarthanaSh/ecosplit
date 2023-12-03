import { initializeApp } from 'firebase/app';
import { addDoc, updateDoc, deleteDoc, getDocs, doc, collection, getFirestore } from 'firebase/firestore';

import { firebaseConfig } from '../Secrets';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
import { LOAD_ACTIVITIES, LOAD_GROUPS, LOAD_USERS, ADD_GROUP, UPDATE_GROUP, DELETE_GROUP, ADD_EXPENSE, ADD_USER } from "./Reducer

const addExpense = (newActivityType, newCarbonCost, newGroup, newExpenseAmt, newSplit, newTags) => {
  return async (dispatch) => {
    const docRef = await addDoc(collection(db, 'expenses'), { activityType: newActivityType, carbonCost: newCarbonCost, group: newGroup, expenseAmt: newExpenseAmt, split: newSplit, tags: newTags });
    const Expid = docRef.id;
    dispatch({
      type: ADD_EXPENSE,
      payload: {
        newActivityType: newActivityType,
        newCarbonCost: newCarbonCost,
        newGroup: newGroup,
        newExpenseAmt: newExpenseAmt,
        newSplit: newSplit,
        newTags: newTags,
        key: Expid,
      }
    });
  }
}

const addUser = (newDisplayName, newEmail, newExpense) => {
  return async (dispatch) => {
    const docRef = await addDoc(collection(db, 'users'), { displayName: newDisplayName, email: newEmail, expense: newExpense });
    const id = docRef.id;
    dispatch({
      type: ADD_USER,
      payload: {
        newDisplayName: newDisplayName,
        newEmail: newEmail, // users
        newExpense: newExpense,
        key: id,
      }
    });
  }
}

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

// const updateExpense = (contact, contactDict, newGroups) => {
//     return async (dispatch) => {
//         await updateDoc(doc(db, 'ErrorHere', contact.key), { contactDict: contactDict, groups: newGroups});
//         dispatch({
//             type: UPDATE_EXPENSE,
//             payload: {
//                 key: contact.key,
//                 contactDict: contactDict,
//                 groups: newGroups,
//             }
//         })
//     }
// }

const updateGroup = (item, newGroupName, newMembers) => {
    return async (dispatch) => {
        await updateDoc(doc(db, 'groups', item.key), {
          groupName: newGroupName, 
          members: newMembers
        });
        dispatch({
          type: UPDATE_GROUP,
          payload: {
            groupName: newGroupName,
            members: newMembers, // users
            key: item.key,
      }
    });
  }
}


// const deleteExpense = (contact) => {
//     return async (dispatch) => {
//         await deleteDoc(doc(db, 'ErrorHere', contact.key));
//         dispatch({
//             type: DELETE_EXPENSE,
//             payload: {
//                 key: contact.key
//             }
//         })
//     }
// }

const deleteGroup = (item) => {
    return async (dispatch) => {
    await deleteDoc(doc(db, 'groups', item.key));
    dispatch({
      type: DELETE_GROUP,
      payload: {
        key: item.key
      }
    })
  }
}

const loadActivities = () => {
  return async (dispatch) => {
    let querySnapshot = await getDocs(collection(db, 'activityType'));
    let newListActivities = querySnapshot.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        key: docSnap.id
      }
    }
    )
    dispatch({
      type: LOAD_ACTIVITIES,
      payload: {
        newListActivities: newListActivities,
      }
    }
    );
  }
}

const loadGroups = () => {
  return async (dispatch) => {
    let querySnapshot = await getDocs(collection(db, 'groups'));
    let newListGroups = querySnapshot.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        key: docSnap.id
      }
    }
    )
    dispatch({
      type: LOAD_GROUPS,
      payload: {
        newListGroups: newListGroups,
      }
    }
    );
  }
}

const loadUsers = () => {
  return async (dispatch) => {
    let querySnapshot = await getDocs(collection(db, 'users'));
    let newListUsers = querySnapshot.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        key: docSnap.id
      }
    }
    )
    dispatch({
      type: LOAD_USERS,
      payload: {
        newListUsers: newListUsers,
      }
    }
    );
  }
}

//   const loadGroups = () => {
//     return async (dispatch) => {
//       let querySnapshot = await getDocs(collection(db, 'ErrorHere'));
//       let newGroups = querySnapshot.docs.map(docSnap => {
//         return {
//           ...docSnap.data(),
//           key: docSnap.id
//         }
//       }
//       )
//       dispatch({
//         type: LOAD_GROUPS,
//         payload: {
//             newGroups: newGroups,
//         }
//       }
//       );
//     }
//   }


export { loadActivities, loadGroups, loadUsers, addGroup, updateGroup, deleteGroup, addExpense, addUser}



// export { addExpense, updateExpense, deleteExpense, loadExpenses, addGroup, updateGroup, deleteGroup, loadGroups }