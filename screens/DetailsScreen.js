import { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Input, Button, Icon } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
// import { Dropdown } from 'react-native-element-dropdown';

import { loadUsers } from "../data/Actions";

function DetailsScreen(props) {

  const groupItems = useSelector(state => state.listGroups);
  const allMembers = useSelector(state => state.listUsers);

  const { navigation, route } = props;
  const { item } = route.params; // not working

  const [inputText, setInputText] = useState(item.text);
  const [selectedMembers, setSelectedMembers] = useState(item.members);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsers());
  }, []);

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
          onChangeText={(text) => setInputText(text)}
          style={styles.inputStyle}
        />
      </View>
      <View style={{ width: '80%' }}>
        <FlatList
          contentContainerStyle={styles.memberContainer}
          data={allMembers}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.memberLabel,
                  selectedMembers.includes(item.key) ?
                    { borderColor: 'black', borderWidth: 2 } :
                    {}]}
                onPress={() => {
                  let newSelectedMembers = [];
                  if (selectedMembers.includes(item.key)) {
                    newSelectedMembers = selectedMembers.filter(elem => elem !== item.key);
                  } else {
                    newSelectedMembers = selectedMembers.concat(item.key);
                  }
                  setSelectedMembers(newSelectedMembers);
                }}>
                <Text>{item.displayName}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='Cancel'
          onPress={() => {
            navigation.navigate('Groups');
          }}
        />
        <Button
          title='Save'
          onPress={() => {
            if (item.key === -1) {
              // addItem(inputText, selectedMembers);
            } else {
              // updateItem(item, inputText, selectedMembers);
            }
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
    flexDirection: 'column',
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