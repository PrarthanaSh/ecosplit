import { initializeApp } from 'firebase/app';
import { addDoc, updateDoc, deleteDoc, getDocs, doc, collection, getFirestore } from 'firebase/firestore';

import { firebaseConfig } from '../Secrets';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import { LOAD_ACTIVITIES, LOAD_GROUPS, LOAD_USERS, ADD_GROUP, UPDATE_GROUP, DELETE_GROUP } from "./Reducer";
// import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE, LOAD_ACTIVITIES, ADD_GROUP, UPDATE_GROUP, DELETE_GROUP, LOAD_GROUPS } from "./Reducer";


// const addExpense = (expenseDict, newGroups) => {
//     return async (dispatch) => {
//         const docRef = await addDoc(collection(db, 'ErrorHere'), { expenseDict: expenseDict , groups: newGroups});
//         const id = docRef.id;
//         dispatch({
//             type: ADD_EXPENSE,
//             payload: {
//                 expenseDict: contactDict,
//                 groups: newGroups,
//                 key: id,
//             }
//         })
//     }
// }

const addGroup = (newGroupName, newMembers) => {
  console.log("In Actions: addGroup function");
              console.log(newGroupName);
              console.log(newMembers);

    return async (dispatch) => {
        const docRef = await addDoc(collection(db, 'groups'), {
          groupName: newGroupName, 
          members: newMembers
        });
        const id = docRef.id;
        dispatch({
          type: ADD_GROUP,
          payload: {
            groupName: newGroupName,
            members: newMembers, // users
            key: id,
      }
    });
  }
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
  console.log("In Actions: updateGroup function");
              console.log(newGroupName);
              console.log(newMembers);
    return async (dispatch) => {
        await updateDoc(doc(db, 'groups'), {
          groupName: newGroupName, 
          members: newMembers
        });
        // const id = docRef.id;
        dispatch({
          type: UPDATE_GROUP,
          payload: {
            groupName: newGroupName,
            members: newMembers, // users
            key: item.id,
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
    await deleteDoc(doc(db, 'groups'));
    dispatch({
      type: DELETE_GROUP,
      payload: {
        key: item.id
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
    console.log("In Actions .. Load Activities");
    console.log(newListActivities);

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
    console.log("In Actions .. Load Groups");
    console.log(newListGroups);

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
    console.log("In Actions .. Load Users");
    console.log(newListUsers);

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

export { loadActivities, loadGroups, loadUsers, addGroup, updateGroup, deleteGroup }

// export { addExpense, updateExpense, deleteExpense, loadExpenses, addGroup, updateGroup, deleteGroup, loadGroups }