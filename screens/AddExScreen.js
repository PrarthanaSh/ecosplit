import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon, Button } from '@rneui/themed';
import SplitOptionsOverlay from "../components/splitOptions";
import { useSelector, useDispatch} from "react-redux";
import { loadActivities, loadGroups } from "../data/Actions";


function AddExScreen({ navigation }) {

  const [activityType, setActivityType] = useState('');
  const [expense, setExpense] = useState('');
  const [group, setGroup] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const isDisabled = !activityType;
  // const isDisabled = false

  const listActivities = useSelector((state) => state.listActivities);
  const listGroups = useSelector((state)=> state.listGroups);


// Dropdown component state variables
  const [isAcFocus, setIsAcFocus] = useState(false);
  const [isGrFocus, setIsGrFocus] = useState(false);


  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadActivities());
    console.log('Activity Type updated:', activityType)
    dispatch(loadGroups());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <Text style={styles.labelText}>Expense Title</Text>
        <Dropdown
          style={[styles.dropdown, isAcFocus && { borderColor: '#aaf0d1' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listActivities}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={!isAcFocus ? 'Select activity' : '...'}
          searchPlaceholder="Search..."
          value={activityType}
          onFocus={() => setIsAcFocus(true)}
          onBlur={() => setIsAcFocus(false)}
          onChange={(item) => {
            setIsAcFocus(false);
            setActivityType(item.name);
            console.log('Dropdown Value:', item);
          }}
          renderLeftIcon={() => (
            <Icon
              name="money"
              color={isAcFocus ? '#aaf0d1' : 'gray'}
              size={20}
            />
          )}
        />
      </View>
      <View style={styles.inputContainer}>
      <Text style={styles.labelText}>Group Name</Text>
        <Dropdown
          style={[styles.dropdown, isGrFocus && { borderColor: '#aaf0d1' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listGroups}
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
            setGroup(item.groupName);
            console.log('Dropdown Value:', item);
          }}
          renderLeftIcon={() => (
            <Icon
              name="money"
              color={isGrFocus ? '#aaf0d1' : 'gray'}
              size={20}
            />
          )}
        />
      </View>

      
      

      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Expense Amount</Text>
        <TextInput
          style={styles.inputBox}
          value={expense}
          onChangeText={(text) => setExpense(text)}
          placeholder='0.00'
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Split Options"
          onPress={() => setModalVisible(true)}
          disabled={!activityType}
          disabledStyle={styles.disabledButton}
          disabledTitleStyle={styles.disabledTitle}
          buttonStyle={isDisabled ? styles.buttonDisabled : styles.buttonEnabled}
          titleStyle={isDisabled ? styles.titleDisabled : styles.titleEnabled}
          containerStyle={styles.splitOptions}
        />
        <Button
          title="Save"
          containerStyle={styles.splitOptions}
          buttonStyle={styles.save}
          
        />
      </View>
      

      <SplitOptionsOverlay
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedGroup={group}
        selectedActivityType={activityType}
      />
    </View>
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
  buttonContainer:{
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: "10%",
    
  },
  splitOptions:{
    width: '85%',
    margin: "1%",
  },
  buttonEnabled: {
    backgroundColor: 'mediumseagreen',
    borderRadius: 40,
    padding: "4%",
  },
  titleEnabled: {
    color: 'white',
  },
  disabledButton: {
    backgroundColor: 'lightgray',
    borderRadius: 40,
    padding: "4%",

  },
  disabledTitle: {
    color: 'darkgray', 
  },
  save:{
    backgroundColor: '#252926',
    borderRadius: 40,
    padding: "4%",
  },
});

export default AddExScreen;