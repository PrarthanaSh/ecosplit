import { useState, useEffect } from 'react';
import { View, Modal, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon, Button } from '@rneui/themed';
import { Overlay } from 'react-native-elements';
import { loadUsers, updateUser } from '../data/Actions';
import { useDispatch, useSelector } from 'react-redux';

const SplitOptionsOverlay = ({ isVisible, onClose, selectedGroup, selectedActivityType, expenseAmt, setExpenseAmt, onSaveUserListWithExpense, tagsAdjustment }) => {
  const isFocus = true
  const [selectedSplitOption, setSelectedSplitOption] = useState(null);
  const splitOptions = [
    { name: "Split Evenly", value: 1 },
    { name: "Split With Percentage", value: 2 },
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
    return { ...obj, expense: totalExpense / userNum };
  })
  const tagsCalc = tagsAdjustment;

  const handleDropdownChange = (item) => {
    setSelectedSplitOption(item.value);
  };

  const handleSave = (userListWithExpense, tagsCalc) => {
    const currCarbonCost = Number(selectedActivityType.carbonCost) + 2 * Number(expenseAmt) + tagsCalc;
    const userListWithExpenseandCarbon = userListWithExpense.map(obj => {
      return { ...obj, carbonCost: currCarbonCost / userNum };
    });
    onSaveUserListWithExpense(userListWithExpenseandCarbon);
    onClose();
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
          labelField="name"
          valueField="value"
          data={splitOptions}
          placeholder={!isFocus ? 'Splitting Evenly' : '...'}
          onChange={() => { handleDropdownChange }}
          value={selectedSplitOption}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Expense Amount</Text>
        <TextInput
          style={[styles.inputBox, { width: '100%' }]}
          value={expenseAmt}
          onChangeText={(text) => { setExpenseAmt(text) }}
          placeholder='0.00'
        />
      </View>

      {userListwithExpense && <FlatList
        data={userListwithExpense}
        renderItem={({ item }) => {
          return (
            <SplitEvenly item={item} />
          );
        }}
      />
      }

      <Button
        buttonStyle={styles.button}
        title="Save"
        onPress={() => {
          handleSave(userListwithExpense, tagsCalc)
          console.log("Inside SplitOptions Screen->tagsCalc = ", tagsCalc);
        }}
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
    <Text style={styles.modalText}>{item.displayName}</Text>
    <TextInput
      style={styles.inputBox}
      value={String(item.expense)}
      placeholder='0.00'
    />
  </View>

}

//This is for displaying percentages 
function SplitPercentages({ item }) {
  return <View style={styles.groupMember}>
    <Icon
      name='user'
      type='font-awesome'
    />
    <Text style={styles.modalText}>{item.displayName}</Text>
    <TextInput
      style={styles.inputBox}
      value={String(item.expense)}
      placeholder='0.00'
    />
  </View>
}
//This is for displaying percentages 


const styles = StyleSheet.create({
  overlayStyle: {
    width: "90%",
    height: "75%",
    borderRadius: 20,
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
  },
  modalView: {
    width: "80%",
    padding: 15,
    alignItems: "center",

  },
  modalText: {
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
  inputContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: '5%',
    paddingVertical: '1%',
    marginVertical: '2.5%'
  },
  labelText:
  {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray'
  },
});

export default SplitOptionsOverlay;