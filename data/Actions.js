import { initializeApp } from 'firebase/app';
import { addDoc, setDoc, updateDoc, deleteDoc, getDocs, doc, collection, getFirestore, writeBatch } from 'firebase/firestore';
import { firebaseConfig } from '../Secrets';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
import { LOAD_ACTIVITIES, LOAD_GROUPS, LOAD_USERS, ADD_GROUP, UPDATE_GROUP, DELETE_GROUP, ADD_EXPENSE, ADD_USER, UPDATE_USER } from "./Reducer"

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

// const addUser = (newDisplayName, newEmail) => {
//   return async (dispatch) => {
//     const docRef = await addDoc(collection(db, 'users'), {
//       displayName: newDisplayName, email: newEmail, expense: 0, carbonCost: 0,
//     });
//     const id = docRef.id;
//     dispatch({
//       type: ADD_USER,
//       payload: {
//         newDisplayName: newDisplayName,
//         newEmail: newEmail, // users
//         key: id,
//       }
//     });
//   }
// }

const addUser = (user) => {
  return async (dispatch) => {
    userToAdd = {
      displayName: user.displayName,
      email: user.email,
      key: user.uid,
      expense: 0, 
      carbonCost: 0,
    };
    await setDoc(doc(db, 'users', user.uid), userToAdd);
    dispatch({
      type: ADD_USER,
      payload: {
        listUsers: {...userToAdd}
      }
    });
  }
}

const addGroup = (newGroupName, newMembers) => {
  return async (dispatch) => {
    const docRef = await addDoc(collection(db, 'groups'), { groupName: newGroupName, members: newMembers });
    const id = docRef.id;
    dispatch({
      type: ADD_GROUP,
      payload: {
        newGroupName: newGroupName,
        newMembers: newMembers, // users
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

const updateUser = (updatatedUserList) => {
  return async (dispatch) => {
  // try {
    // see https://firebase.google.com/docs/firestore/quotas#writes_and_transactions
    // int writeBatchLimit = 500;
    // const totalUpdates = 0;

    // while (totalUpdates % 500 == 0) {
      const wb = writeBatch(db);
      // const documentsInBatch = updatatedUserList.length;

      // WriteBatch writeBatch = this.firestoreDB.batch();

      // List<QueryDocumentSnapshot> documentsInBatch =
      //     this.firestoreDB.collection("animals")
      //         .whereEqualTo("species", "cat")
      //         .limit(writeBatchLimit)
      //         .get()
      //         .get()
      //         .getDocuments();

      // if (documentsInBatch.isEmpty()) {
      //   break;
      // }

      updatatedUserList.forEach((user)=> {wb.update(doc(db, 'users', user.key), {
        carbonCost: user.carbonCost,
        expense: user.expense
      })
      // totalUpdates += documentsInBatch.size();
      });
      await wb.commit();
      console.log("In Actions.js -> updateUser -> Hit Firebase, users updated")
      console.log("In Actions.js -> sending updatatedUserList to reducer: ", updatatedUserList)

      dispatch({
        type: UPDATE_USER,
        payload: {
          // key: item.key,
          newUserList: updatatedUserList // sending updated user list
        }
      });

    }
  }
    
          // document -> );

      
    // }

    // console.log("Number of updates: " + totalUpdates);
  

  // } catch (Exception e) {
  //   return false;
  // }
  // return true;

// return async (dispatch) => {
//     await updateDoc(doc(db, 'users', item.key), {
//       ...updatedUser
//     });
//     console.log("saving users to firease")
//     dispatch({
//       type: UPDATE_USER,
//       payload: {
//         key: item.key,
//         updatedUser: { expense: 300 } // new expense value
//       }
//     });
//   }




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


export { loadActivities, loadGroups, loadUsers, addGroup, updateGroup, deleteGroup, addExpense, addUser, updateUser }



// export { addExpense, updateExpense, deleteExpense, loadExpenses, addGroup, updateGroup, deleteGroup, loadGroups }
