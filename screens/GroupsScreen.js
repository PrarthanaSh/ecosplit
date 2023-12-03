import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { Button } from "@rneui/base";

import GroupItem from "../components/GroupItem";
import { loadGroups } from "../data/Actions";


function GroupsScreen(props) {
  const { navigation, route } = props;
  const groupItems = useSelector((state) => state.listGroups);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGroups());
  }, [groupItems]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Groups List</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={groupItems}
          renderItem={({ item }) => {
            return (
              <GroupItem item={item} navigation={navigation} />
            );
          }}
          style={styles.listText}
        />
      </View>
      <Button
        title='Add'
        onPress={() => {
          navigation.navigate('Details', {
            item: { key: -1, text: '', members: [] }
          });
        }}
        buttonStyle={styles.addButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'ivory'
  },
  header: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '10%',
    paddingTop: '25%'
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'gray'
  },
  listText: {
    fontSize: 18,
    color: 'gray'
  },
  listContainer: {
    flex: 0.6,
    width: '100%',
    paddingLeft: '10%',
    paddingTop: '10%'
  },
  addButton:{
    backgroundColor: '#252926',
    borderRadius: 40,
    padding: "4%",
  },
  menuContainer: {
    padding: '5%'
  },
  menuText: {
    fontSize: 32
  }
});

export default GroupsScreen;
