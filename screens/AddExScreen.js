import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown } from 'react-native-element-dropdown';
import { Icon, Button } from '@rneui/themed';
import SplitOptionsOverlay from "../components/splitOptions";
import TagsDisplay from "../components/TagsDisplay";
import { useSelector, useDispatch } from "react-redux";
import { addExpense, loadActivities, loadGroups, updateUser } from "../data/Actions";


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
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState('');
  const [activityTags, setActivityTags] = useState('');
  const [carbonCost, setCarbonCost] = useState('');
  const [savedUserListWithExpense, setSavedUserListWithExpense] = useState(null);
  const [tagsAdjustment, setTagsAdjustment] = useState(0);
  const [showSavedOverlay, setShowSavedOverlay] = useState(false);

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
    const currCarbonCost = Number(carbonCost) + 2 * Number(expenseAmt) + Number(activityTags
      .filter(tag => selectedTags.includes(tag.key))
      .map(tag => tag.value)
      .reduce((sum, value) => sum + value, 0));
    setCarbonCost(currCarbonCost);
    const groupKey = group.key;
    const activityKey = selectedActivityType.key;
    const splitDetails = savedUserListWithExpense.map(({ key, expense, carbonCost }) => ({ userid: key, expense, carbonCost }));

    console.log("Inside calculateCarbonCost->activityKey = ", activityKey);
    console.log("Inside calculateCarbonCost->carbonCost = ", carbonCost);
    console.log("Inside calculateCarbonCost->groupKey = ", groupKey);
    console.log("Inside calculateCarbonCost->expenseAmt = ", expenseAmt);
    console.log("Inside calculateCarbonCost->SplitDetails = ", splitDetails);
    console.log("Inside calculateCarbonCost->Selected Tags = ", selectedTags);
    console.log("Inside calculateCarbonCost->savedUserListWithExpense = ", savedUserListWithExpense);

    dispatch(addExpense(activityKey, currCarbonCost, groupKey, expenseAmt, splitDetails, selectedTags));

    setActivityTags('')
    setCarbonCost('')
    setExpenseAmt('')
    setGroup('')
    setSavedUserListWithExpense(null)
    setSelectedActivityType('')
    setTagsAdjustment('')
  }

  const handleUserListWithExpense = (userList) => {
    setSavedUserListWithExpense(userList)
  };

  const updateUserList = () => {
    console.log(savedUserListWithExpense.length);


    savedUserListWithExpense.forEach(user => {
      // dispatch(updateUser(user
      //   // add all the parameters need to be updated here
      //   ));
      console.log("User: ", user.key)
      console.log("carbonCost: ", user.carbonCost)
      console.log("Expense: ", user.expense)
    });

    dispatch(updateUser(savedUserListWithExpense));
  }

  // popup for saving expense
  const SavedOverlay = () => (
    <View style={styles.savedOverlay}>
      <Text style={styles.savedText}>Saved</Text>
    </View>
  );


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
        {/* saved popup */}
        {showSavedOverlay && <SavedOverlay />}
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
              setActivityTags(item.tags);
              setSelectedTags([]);
              setCarbonCost(item.carbonCost);
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
          <Text
            style={styles.inputBox}>{expenseAmt}</Text>
        </View>
        {/* Container for Expense Amount */}

        {/* TODO: Add a date field and explore calendar component */}

        <View style={styles.buttonContainer}>
          <Button
            title="Split Options"
            onPress={() => {
              setOverlayVisible(true)
              setTagsAdjustment(activityTags
                .filter(tag => selectedTags.includes(tag.key))
                .map(tag => tag.value)
                .reduce((sum, value) => sum + value, 0));
            }
            }
            disabled={!selectedActivityType || !group}
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
              updateUserList()
              setShowSavedOverlay(true);
              setTimeout(() => setShowSavedOverlay(false), 2000);
            }}
          />
        </View>


        {selectedActivityType && group && <SplitOptionsOverlay
          isVisible={overlayVisible}
          onClose={() => setOverlayVisible(false)}
          selectedGroup={group}
          selectedActivityType={selectedActivityType}
          expenseAmt={expenseAmt}
          setExpenseAmt={setExpenseAmt}
          onSaveUserListWithExpense={handleUserListWithExpense}
          tagsAdjustment={tagsAdjustment}

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
  savedOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
  },
  savedText: {
    fontSize: 20,
    color: 'white',
  },
});

export default AddExScreen;
