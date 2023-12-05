import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown } from 'react-native-element-dropdown';
import { Icon, Button } from '@rneui/themed';
import SplitOptionsOverlay from "../components/splitOptions";
import TagsDisplay from "../components/TagsDisplay";
import { useSelector, useDispatch } from "react-redux";
import { addExpense, loadActivities, loadGroups } from "../data/Actions";

import { getAuthUser, signOut } from '../AuthManager'; //Need to add the expense for the user

function AddExScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadActivities());
    dispatch(loadGroups());
    
  }, []);


  const allActivites = useSelector((state) => state.listActivities);
  const allGroups = useSelector((state) => state.listGroups);
  

  const [selectedActivityType, setSelectedActivityType] = useState('');
  const [expenseAmt, setExpenseAmt] = useState('');
  const [group, setGroup] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState('');
  const [activityTags, setActivityTags] = useState('');
  const [carbonCost, setCarbonCost] = useState('');
  const [savedUserListWithExpense, setSavedUserListWithExpense] = useState(null);

  //Modal component
  const isDisabled = !selectedActivityType;


  // Dropdown component
  const [isAcFocus, setIsAcFocus] = useState(false);
  const [isGrFocus, setIsGrFocus] = useState(false);
  const activities_data = allActivites.map(obj => {
    const { _index, ...rest } = obj;
    return rest;
  });

  const groups_data = allGroups.map(obj => {
    const { _index, ...rest } = obj;
    return rest;
  });

  const calculateCarbonCost = () => {
    // console.log("Inside calculateCarbonCost->Selected Tags = ", selectedTags);
    // console.log("Inside calculateCarbonCost->Activity Tags = ", activityTags);
    const tagsAdjustment = activityTags
      .filter(tag => selectedTags.includes(tag.key))
      .map(tag => tag.value)
      .reduce((sum, value) => sum + value, 0) + carbonCost + (2 * Number(expenseAmt));

    console.log("Inside calculateCarbonCost->tagAdjustment = ", tagsAdjustment);
    setCarbonCost(tagsAdjustment);
    const groupKey = (groups_data.find(gr => gr.groupName === group) || {}).key;

    const activityKey = selectedActivityType.key;

    //This code will change based on split options
    const splitMembers = groups_data.map(({ members }) => members.map(member => ({ [member]: [1, 5] })));
    const splitDetails = [].concat(...splitMembers);
    //This code will change based on split options

    // dispatch(addExpense(activityKey, carbonCost, groupKey, expenseAmt, splitDetails, selectedTags));
    console.log(savedUserListWithExpense)
  }

  const handleUserListWithExpense = (userList) => {
    // Process or save userList in the state of AddExScreen
    // For example:
    setSavedUserListWithExpense(userList)
    // console.log(savedUserListWithExpense)
  };

  console.log()

  return (
    // <KeyboardAvoidingView
    // behavior={Platform.OS === 'ios' ? 'padding' : null}
    // style={styles.container}
    // >
    <ScrollView
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        {/* Container for Expense Title dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Expense Title</Text>

          <Dropdown
            style={[styles.dropdown, isAcFocus && { borderColor: '#AAF0D1' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={activities_data}
            search
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder={!isAcFocus ? 'Select activity' : '...'}
            searchPlaceholder="Search..."
            value={selectedActivityType}
            onFocus={() => setIsAcFocus(true)}
            onBlur={() => setIsAcFocus(false)}
            onChange={(item) => {
              setIsAcFocus(false);
              setSelectedActivityType(item);
              // console.log('In AddEx screen -> Expense title Dropdown Value:', item);
              setActivityTags(item.tags);
              setSelectedTags([]);
              setCarbonCost(item.value);
            }}
            renderLeftIcon={() => (
              <Icon
                name="money"
                color={isAcFocus ? '#AAF0D1' : 'gray'}
                size={20}
              />
            )}
          />
        </View>
        {/* Container for Expense Title dropdown */}

        {/* Container for Group dropdown.
          TODO: Fix bug where only those groups are loaded, in which the logged in member is present. */}
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Group Name</Text>
          <Dropdown
            style={[styles.dropdown, isGrFocus && { borderColor: '#AAF0D1' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={groups_data}
            search
            maxHeight={300}
            labelField="groupName"
            valueField="groupName"
            placeholder={!isGrFocus ? 'Select group' : '...'}
            searchPlaceholder="Search..."
            value={group}
            onFocus={() => setIsGrFocus(true)}
            onBlur={() => setIsGrFocus(false)}
            onChange={(item) => {
              setIsGrFocus(false);
              setGroup(item);
              // console.log("groups", group)
            }}
            renderLeftIcon={() => (
              <Icon
                name="group"
                color={isGrFocus ? '#AAF0D1' : 'gray'}
                size={20}
              />
            )}
          />
        </View>
        {/* Container for Group dropdown */}


        {/* Container for Expense Details tags */}
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Expense Details</Text>
          <TagsDisplay activityTags={activityTags} activitySelected={!isDisabled} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </View>
        {/* Container for Expense Details tags */}

        {/* Container for Expense Amount */}
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Expense Amount</Text>
          <TextInput
            style={styles.inputBox}
            value={expenseAmt}
            onChangeText={(text) => setExpenseAmt(text)}
            placeholder='0.00'
          // disabled='true'
          />
        </View>
        {/* Container for Expense Amount */}

        {/* TODO: Add a date field and explore calendar component */}

        <View style={styles.buttonContainer}>
          <Button
            title="Split Options"
            onPress={() => setModalVisible(true)}
            disabled={!selectedActivityType || !group }
            disabledStyle={styles.disabledButton}
            disabledTitleStyle={styles.disabledTitle}
            buttonStyle={isDisabled ? styles.disabledButton : styles.buttonEnabled}
            titleStyle={isDisabled ? styles.disabledTitle : styles.titleEnabled}
            containerStyle={styles.splitOptions}
          />
          <Button
            title="Save"
            containerStyle={styles.splitOptions}
            buttonStyle={styles.save}
            onPress={() => {
              calculateCarbonCost()
            }}
          />
        </View>


        {selectedActivityType&&group&&<SplitOptionsOverlay
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          selectedGroup={group}
          selectedActivityType={selectedActivityType}
          expenseAmt={expenseAmt}
          setExpenseAmt={setExpenseAmt}
          onSaveUserListWithExpense={handleUserListWithExpense}
          
        />}
      </View>
    </ScrollView>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ivory',
    paddingTop: '5%',
  },
  inputContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: '5%',
    paddingVertical: '1%',
    marginVertical: '2.5%'
  },
  inputBox: {
    width: '100%',
    borderColor: 'lightgray',
    borderWidth: .5,
    borderColor: 'gray',
    padding: '2%',
    fontSize: 20,
    borderRadius: 6,
    marginVertical: '3%'
  },
  labelText:
  {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray'
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: '5%',
    fontWeight: 300,
    color: 'gray'
  },
  selectedTextStyle: {
    fontSize: 20,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  buttonContainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: "10%",

  },
  splitOptions: {
    width: '85%',
    margin: "1%",
  },
  buttonEnabled: {
    backgroundColor: '#AAF0D1',
    borderRadius: 40,
    padding: "4%",
  },
  titleEnabled: {
    color: '#252926',
  },
  disabledButton: {
    backgroundColor: 'lightgray',
    borderRadius: 40,
    padding: "4%",
  },
  disabledTitle: {
    color: 'darkgray',
  },
  save: {
    backgroundColor: '#252926',
    borderRadius: 40,
    padding: "4%",
  },
});

export default AddExScreen;