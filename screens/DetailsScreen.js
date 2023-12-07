import { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Input, Button, Icon } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
// import { Dropdown } from 'react-native-element-dropdown';

import { loadUsers, addGroup, updateGroup } from "../data/Actions";

function DetailsScreen(props) {

  const groupItems = useSelector(state => state.listGroups);
  const allMembers = useSelector(state => state.listUsers);

  const { navigation, route } = props;
  const { item } = route.params; // not working

  const [groupName, setGroupName] = useState(item.groupName);
  const [selectedMembers, setSelectedMembers] = useState(item.members); // need to update

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
          value={groupName}
          onChangeText={(text) => setGroupName(text)}
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
            navigation.navigate('GroupsHome');
          }}
          buttonStyle={styles.cancel}
        />
        <Button
          title='Save'
          onPress={() => {
            if (item.key === -1) {
              dispatch(addGroup(groupName, selectedMembers));
            } else {
              dispatch(updateGroup(item, groupName, selectedMembers));
            }
            navigation.navigate('GroupsHome');
          }}
          buttonStyle={styles.save}
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
    paddingTop: '20%',
    backgroundColor: 'ivory'
  },
  header: {
    flex: 0.1,
    justifyContent: 'flex-end',
    paddingBottom: '5%'
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'gray'
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
    flex: 0.6,
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
  },
  save:{
    backgroundColor: '#252926',
    borderRadius: 40,
    padding: "4%",
  },
  cancel: {
    backgroundColor: 'lightgray',
    borderRadius: 40,
    padding: "4%",
  },
});

export default DetailsScreen;
