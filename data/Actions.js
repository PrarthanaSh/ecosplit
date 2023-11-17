// import { initializeApp } from 'firebase/app';
// import { addDoc, updateDoc, deleteDoc, getDocs, doc, collection, getFirestore } from 'firebase/firestore';

// import { firebaseConfig } from '../Secrets';

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE, LOAD_EXPENSES, ADD_GROUP, UPDATE_GROUP, DELETE_GROUP, LOAD_GROUPS } from "./Reducer";

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

// const addGroup = (newGroupTitle) => {
//     return async (dispatch) => {
//         const docRef = await addDoc(collection(db, 'ErrorHere'), { groupTitle: newGroupTitle});
//         const id = docRef.id;
//     dispatch({
//       type: ADD_GROUP,
//       payload: {
//         groupTitle: newGroupTitle,
//         key: id,
//       }
//     });
//   }
// }

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

// const updateGroup = (group, groupTitle = group.groupTitle) => {
//     return async (dispatch) => {
//         await updateDoc(doc(db, 'ErrorHere', group.key), { groupTitle: groupTitle});
//     dispatch({
//       type: UPDATE_GROUP,
//       payload: {
//         key: group.key,
//         groupTitle: groupTitle
//       }
//     });
//   }
// }


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

// const deleteGroup = (group) => {
//     return async (dispatch) => {
//     await deleteDoc(doc(db, 'ErrorHere', group.key));
//     dispatch({
//       type: DELETE_GROUP,
//       payload: {
//         key: group.key
//       }
//     })
//   }
// }

// const loadExpenses = () => {
//     return async (dispatch) => {
//       let querySnapshot = await getDocs(collection(db, 'ErrorHere'));
//       let newListExpenses = querySnapshot.docs.map(docSnap => {
//         return {
//           ...docSnap.data(),
//           key: docSnap.id
//         }
//       }
//       )
//       dispatch({
//         type: LOAD_EXPENSES,
//         payload: {
//             newListExpenses: newListExpenses,
//         }
//       }
//       );
//     }
//   }

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
  
// export { addExpense, updateExpense, deleteExpense, loadExpenses, addGroup, updateGroup, deleteGroup, loadGroups }