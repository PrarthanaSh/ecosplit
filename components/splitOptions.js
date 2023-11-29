import { useState, useEffect } from 'react';
import { View, Modal, Text, StyleSheet, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon, Button } from '@rneui/themed';

const SplitOptionsOverlay = ({ isVisible, onClose, selectedGroup, selectedActivityType}) => {
  const isFocus = true
  const [selectedValue, setSelectedValue] = useState(null);
  const taglist = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },]

  useEffect(()=>{
    console.log('Activity Type (im inside modal) updated:', selectedActivityType)
  }, [])

  const handleDropdownChange = (item) => {
    setSelectedValue(item.value);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Split Expense: {selectedActivityType.name}</Text>
          <View style={styles.inputContainer}>
            <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            labelField="label"
            valueField="value"

            data={taglist}
            laceholder={!isFocus ? 'Splitting Options' : '...'}
            onChange={handleDropdownChange}
            value={selectedValue}

            />  
          </View>
          <View style={styles.groupMember}>
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
          </View>
          
          <Button
            buttonStyle={styles.button}
            title="Save" 
            onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: '5%',
    // fontWeight: 300,
    color: 'black'
  },
  selectedTextStyle: {
    fontSize: 20,
    color:"black"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: "85%",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center"
  },
  groupMember:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    paddingLeft: "2%",
    margin: "5%",
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
    backgroundColor: 'mediumseagreen',
    borderRadius: 40,
    padding: 12,
    width: "100%"
  },
});

export default SplitOptionsOverlay;