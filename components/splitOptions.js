import { useState, useEffect } from 'react';
import { View, Modal, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon, Button } from '@rneui/themed';
import { Overlay } from 'react-native-elements';
import { loadUsers, updateUser } from '../data/Actions';
import { useDispatch, useSelector } from 'react-redux';

const addOrSelectChat = (user1id, user2id) => {

  // return async (dispatch) => {

  //   const chatQuery = query(collection(db, 'chats'),
  //     where('participants', 'array-contains', user1id),
  //   );
  //   const results = await getDocs(chatQuery);
  //   /*
  //     Ideally we would do this:
  //     const chatQuery = query(
  //       collection(db, 'chats'),
  //       where('participants', 'array-contains', user1id),
  //       where('participants', 'array-contains', user2id)
  //     );
  //     but Firestore doesn't allow more than one 'array-contains'
  //     where clauses in a single query. So instead we do the 
  //     second 'array-contains' clause "manually"
  //   );
  //   */
  //   chatSnap = results.docs?.find(
  //     elem => elem.data().participants.includes(user2id));
  //   let theChat;

  // }
}
const SplitOptionsOverlay = ({ isVisible, onClose, selectedGroup, selectedActivityType, expenseAmt, setExpenseAmt, onSaveUserListWithExpense }) => {
  const isFocus = true
  const [selectedSplitOption, setSelectedSplitOption] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true); 
  const splitOptions = [
    { value: "Split Evenly", },
    { value: "Split With Percentage", },
  ]
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  const userList = useSelector((state) => state.listUsers);
  const usersInGroup = selectedGroup
    ? userList.filter(user => selectedGroup.members.includes(user.key))
    : [];
  const userNum = usersInGroup.length
  const totalExpense = expenseAmt
  const userListwithExpense = usersInGroup.map(obj => {
    return { ...obj, expense: totalExpense/userNum};
  })

  
  // console.log("users:", userList)
  // console.log('group (im inside modal) updated:', selectedGroup)
  // console.log("filtered-----", usersInGroup)
  // console.log(selectedActivityType)

  const handleDropdownChange = (item) => {
    setSelectedSplitOption(item.value);
  };

  const handleSave = () => {
    const userListWithExpense = usersInGroup.map(obj => {
      return { ...obj, expense: totalExpense/userNum };
    });
  
    onSaveUserListWithExpense(userListWithExpense);
  };


  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose} // Close overlay when backdrop is pressed
      overlayStyle={styles.overlayStyle} // Custom style for overlay
    >
      <Text style={[styles.modalText, { fontSize: 20, paddingBottom: 10 }]}>Split Expense: {selectedActivityType.name}</Text>
      <View style={styles.inputContainer}>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          labelField="value"
          valueField="value"
          data={splitOptions}
          placeholder={!isFocus ? 'Splitting Evenly' : '...'}
          onChange={handleDropdownChange}
          value={selectedSplitOption}

        />
      </View>

      <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Expense Amount</Text>
          <TextInput
            style={styles.inputBox}
            value={expenseAmt}
            onChangeText={(text) => {setExpenseAmt(text)}}
            placeholder='0.00'
          // disabled='true'
          />
        </View>

      {userListwithExpense && <FlatList
        data={userListwithExpense}
        renderItem={({ item }) => {
          return (
            // <Text>{console.log(item)}</Text>
            <SplitEvenly item={item} />
          );
        }}
      />
      }

      {/* <View style={styles.groupMember}>
            <Icon
              name='user'
              type='font-awesome'
            />
            <Text style={styles.modalText}>You</Text>
            <TextInput
              style={styles.inputBox}
              // value={expense}
              // onChangeText={(text) => setExpense(text)}
              placeholder='0.00'
            />
          </View> */}

      <Button
        buttonStyle={styles.button}
        title="Save"
        onPress={handleSave}
        
      />

    </Overlay>
  );
};

function SplitEvenly({ item }) {

  return <View style={styles.groupMember}>
    <Icon
      name='user'
      type='font-awesome'
    />
    {/* {console.log(item)} */}
    <Text style={styles.modalText}>{item.displayName}</Text>
    <TextInput
      style={styles.inputBox}
      value={String(item.expense)}
      // onChangeText={(text) => setExpense(text)}
      placeholder='0.00'
    />
  </View>

}

const styles = StyleSheet.create({
  overlayStyle: {
    width: "90%",
    height: "75%",
    // backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark background
    borderRadius: 20,
    // padding: 20,
  },
  inputContainer: {
    width: "100%",
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: '5%',
    // fontWeight: 300,
    color: 'black'
  },
  selectedTextStyle: {
    fontSize: 20,
    color: "black"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22
  },
  modalView: {
    width: "80%",
    padding: 15,
    alignItems: "center",

  },
  modalText: {
    // marginBottom: 15,
    marginTop: 15,
    textAlign: "center",
    marginVertical: 10,
  },
  groupMember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "90%",
    paddingLeft: "2%",
    paddingRight: "2%",
    marginHorizontal: "5%",
    // margin: "5%",
  },
  inputBox: {
    width: '40%',
    borderColor: 'lightgray',
    borderWidth: .5,
    borderColor: 'gray',
    padding: '2%',
    fontSize: 20,
    borderRadius: 6,
    marginVertical: '3%'
  },
  button: {
    textAlign: 'center',
    backgroundColor: 'mediumseagreen',
    borderRadius: 40,
    padding: 12,
    width: "100%"
  },
});

export default SplitOptionsOverlay;