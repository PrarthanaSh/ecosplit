import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; // might not be compatible with expo
// bottomsheet, overlay
import { Icon } from '@rneui/themed';

import { useSelector, useDispatch} from "react-redux";
import { loadActivities } from "../data/Actions";


function AddExScreen({ navigation }) {

  const [activityType, setActivityType] = useState('');
  const [expense, setExpense] = useState('');
  const [group, setGroup] = useState('');

  const listActivities = useSelector((state) => state.listActivities);


// Dropdown component state variables
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadActivities());
    // dispatch(loadGroups());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <Text style={styles.labelText}>Expense Title</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#aaf0d1' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listActivities}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={!isFocus ? 'Select group' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon
              name="money"
              color={isFocus ? '#aaf0d1' : 'gray'}
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

      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Group</Text>
        <TextInput
          style={styles.inputBox}
          value={group}
          onChangeText={(text) => setGroup(text)}
          placeholder='Group Name'
        />
      </View>
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
});

export default AddExScreen;