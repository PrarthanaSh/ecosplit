import { useState, useEffect } from 'react';
import { View, Modal, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon, Button } from '@rneui/themed';
import { Overlay } from 'react-native-elements';
import { loadUsers, updateUser } from '../data/Actions';
import { useDispatch, useSelector } from 'react-redux';

const SplitOptionsOverlay = ({ isVisible, onClose, selectedGroup, selectedActivityType, expenseAmt, setExpenseAmt, onSaveUserListWithExpense, tagsAdjustment }) => {
  const isFocus = true
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  // set split options
  const [selectedSplitOption, setSelectedSplitOption] = useState(1);
  const splitOptions = [
    { name: "Split Evenly", value: 1 },
    { name: "Split With Percentage", value: 2 },
  ]

  // prepare user list using keys in group.members
  const userList = useSelector((state) => state.listUsers);
  const usersInGroup = selectedGroup
    ? userList.filter(user => selectedGroup.members.includes(user.key))
    : [];

  // calculations
  const userNum = usersInGroup.length
  const totalExpense = expenseAmt
  const tagsCalc = tagsAdjustment;
  const currCarbonCost = Number(selectedActivityType.carbonCost) + 2 * Number(expenseAmt) + tagsCalc;

  // SplitEvenly
  const userListWithExpenseandCarbonSplitEvenly = usersInGroup.map(obj => {
    return {
      ...obj,
      expense: totalExpense / userNum,
      carbonCost: currCarbonCost / userNum
    };
  });

  // Split with %
  const [splitPercentages, setSplitPercentages] = useState(null)
  const [totalPercentage, setTotalPercentage] = useState(0);

  useEffect(() => {
    if (selectedSplitOption === 2) {
      const newPercentages = usersInGroup.map(user => ({
        displayName: user.displayName,
        key: user.key,
        percentage: ""
      }));
      setSplitPercentages(newPercentages);
    } else {
      setSplitPercentages([]);
    }
  }, [selectedSplitOption]);

  const handlePercentageChange = (key, newPercentage) => {
    setSplitPercentages(prevData => prevData.map(item =>
      item.key === key ? { ...item, percentage: newPercentage } : item
    ));
  };

  useEffect(() => {
    if (splitPercentages) {
      const newTotal = splitPercentages.reduce((sum, obj) => {
        return sum + parseFloat(obj.percentage || 0);
      }, 0);
      setTotalPercentage(newTotal);
    }
  }, [splitPercentages]);

  const handleInputChange = (text, item) => {
    if (text === '') {
      handlePercentageChange(item.key, '');
      return;
    }
    // Parse the input to a number
    const numericValue = parseFloat(text);
    // Check if the value is a number and less than or equal to 100
    if (!isNaN(numericValue) && numericValue <= 100) {
      handlePercentageChange(item.key, text);
    }
  };



  // save data to AddExScreen
  const handleSave = (userListWithExpenseandCarbonSplitEvenly, usersInGroup, selectedSplitOption) => {
    const userListwithExpenseSplitPercentage = usersInGroup.map(user => {
      const percentageObj = splitPercentages.find(obj => obj.key === user.key);
      const userExpense = percentageObj
        ? totalExpense * (parseFloat(percentageObj.percentage) * 0.01)
        : 0; // Default to 0 if no percentage found
      const userCarbonCost = percentageObj
        ? currCarbonCost * (parseFloat(percentageObj.percentage) * 0.01)
        : 0; // Default to 0 if no percentage found
      return {
        ...user,
        expense: userExpense,
        carbonCost: userCarbonCost,
      };
    });
    if (selectedSplitOption === 1) {
      onSaveUserListWithExpense(userListWithExpenseandCarbonSplitEvenly);
    } else if (selectedSplitOption ===2 ){
      onSaveUserListWithExpense(userListwithExpenseSplitPercentage)
    }
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
          onChange={(item) => { setSelectedSplitOption(item.value) }}
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
      {/* Warning message for Split With Percentage option */}
      {totalPercentage !== 100 && selectedSplitOption === 2 && (
        <Text style={styles.warningText}>
          Warning: Percentages do not add up to 100% (Current total: {totalPercentage}%)
        </Text>
      )}

      {/* List for Split Evenly option */}
      {userListWithExpenseandCarbonSplitEvenly && selectedSplitOption === 1 && (
        <FlatList
          data={userListWithExpenseandCarbonSplitEvenly}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <SplitEvenly item={item} />
          )}
        />
      )}

      {/* List for Split With Percentage option */}
      {selectedSplitOption === 2 && (
        <FlatList
          data={splitPercentages}
          renderItem={({ item }) => (
            <SplitPercentages
              item={item}
              handlePercentageChange={handlePercentageChange}
              handleInputChange={handleInputChange}

            />
          )}
        />
      )}
      <Button
        buttonStyle={styles.button}
        title="Save"
        onPress={() => {
          handleSave(userListWithExpenseandCarbonSplitEvenly, userListwithExpenseSplitPercentage, selectedSplitOption)

        }}
        disabled={selectedSplitOption === 2 && totalPercentage !== 100}
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
function SplitPercentages({ item, handlePercentageChange, handleInputChange }) {

  return (
    <View style={styles.groupMember}>
      <Icon
        name='user'
        type='font-awesome'
      />
      <Text style={styles.modalText}>{item.displayName}</Text>
      <View style={{ width: "50%", flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly' }}>
        <TextInput
          style={styles.inputBox}
          value={String(item.percentage)}
          keyboardType="numeric"
          onChangeText={(text) => { handleInputChange(text, item) }}
          placeholder='0'
        />
        <Text>%</Text>
      </View>

    </View>
  )
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
    width: '50%',
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
  warningText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SplitOptionsOverlay;