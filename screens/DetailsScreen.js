import { useState } from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Input, Button, Icon } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
// import { Dropdown } from 'react-native-element-dropdown';

import { ADD_ITEM, UPDATE_ITEM } from '../Reducer';

function DetailsScreen (props) {

  const groupItems = useSelector(state=>state.groupItems);
  const allMembers = useSelector(state=>state.members);
  const dispatch = useDispatch();

  const { navigation, route } = props;
  const { item } = route.params; // not working

  const [inputText, setInputText] = useState(item.text);
  const [selectedMembers, setSelectedMembers] = useState(item.members);
  // const [value, setValue] = useState(null);
  // const [isFocus, setIsFocus] = useState(false);

  const addItem = (newText, members) => {
    dispatch({
      type: ADD_ITEM,
      payload: {
        text: newText,
        members: members
      }
    });
  }

  const updateItem = (item, newText, members) => {
    dispatch({
      type: UPDATE_ITEM,
      payload: {
        key: item.key,
        text: newText, 
        members: members
      }
    });

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Edit Group
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder='New Group'
          value={inputText}
          onChangeText={(text)=>setInputText(text)}
          style={styles.inputStyle}
        />
      </View>
      <View style={{flex: 0.07, width: '80%'}}>
        <FlatList
          contentContainerStyle={styles.memberContainer}
          data={allMembers}
          renderItem={({item})=>{
            return (
              <TouchableOpacity 
                style={[
                  styles.memberLabel, 
                  selectedMembers.includes(item.key) ? 
                  {borderColor: 'black', borderWidth: 2} : 
                  {}]}
                onPress={()=>{
                  let newSelectedMembers = [];
                  if (selectedMembers.includes(item.key)) {
                    newSelectedMembers = selectedMembers.filter(elem=>elem!==item.key);
                  } else {
                    newSelectedMembers = selectedMembers.concat(item.key);
                  }
                  setSelectedMembers(newSelectedMembers);
                }}>
                <Text>{item.memberName}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='Cancel'
          onPress={()=>{
            navigation.navigate('Groups');
          }}
        />
        <Button
          title='Save'
          onPress={()=>{
            if (item.key === -1) {
              addItem(inputText, selectedMembers);
            } else {
              updateItem(item, inputText, selectedMembers);
            }
            // navigation.goBack();
            navigation.navigate('Groups'); // save button not saving info
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: '20%'
  }, 
  header: {
    flex: 0.1,
    justifyContent: 'flex-end',
    paddingBottom: '5%'
  },
  headerText: {
    fontSize: 32
  },
  inputContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  // dropdown: {
  //   height: 50,
  //   borderColor: 'gray',
  //   borderWidth: 0.5,
  //   borderRadius: 8,
  //   paddingHorizontal: 8,
  //   width: '100%',
  // },
  memberContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  memberLabel: {
    margin: 3,
    padding: 3, 
    backgroundColor: 'lightgray',
    borderRadius: 6,
    borderWidth: 0
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  }
});

export default DetailsScreen;