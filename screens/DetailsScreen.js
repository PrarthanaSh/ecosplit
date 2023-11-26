import { useState } from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Input, Button } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';

import { ADD_ITEM, UPDATE_ITEM } from '../Reducer';

function DetailsScreen (props) {

  const groupItems = useSelector(state=>state.groupItems);
  const allTags = useSelector(state=>state.tags);
  const dispatch = useDispatch();

  const { navigation, route } = props;
  const { item } = route.params; // not working

  const [inputText, setInputText] = useState(item.text);
  const [selectedTags, setSelectedTags] = useState(item.tags);

  const addItem = (newText, tags) => {
    dispatch({
      type: ADD_ITEM,
      payload: {
        text: newText,
        tags: tags
      }
    });
  }

  const updateItem = (item, newText, tags) => {
    dispatch({
      type: UPDATE_ITEM,
      payload: {
        key: item.key,
        text: newText, 
        tags: tags
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
          contentContainerStyle={styles.tagContainer}
          data={allTags}
          renderItem={({item})=>{
            return (
              <TouchableOpacity 
                style={[
                  styles.tagLabel, 
                  selectedTags.includes(item.key) ? 
                  {borderColor: 'black', borderWidth: 2} : 
                  {}]}
                onPress={()=>{
                  let newSelectedTags = [];
                  if (selectedTags.includes(item.key)) {
                    newSelectedTags = selectedTags.filter(elem=>elem!==item.key);
                  } else {
                    newSelectedTags = selectedTags.concat(item.key);
                  }
                  setSelectedTags(newSelectedTags);
                }}>
                <Text>{item.tagName}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='Cancel'
          onPress={()=>{
            navigation.navigate('Home');
          }}
        />
        <Button
          title='Save'
          onPress={()=>{
            if (item.key === -1) {
              addItem(inputText, selectedTags);
            } else {
              updateItem(item, inputText, selectedTags);
            }
            navigation.goBack();
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
  tagContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  tagLabel: {
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