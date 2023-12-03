import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";

const TagsDisplay = (props) =>
{
    const {activityTags, activitySelected, selectedTags, setSelectedTags} = props;
    if (activitySelected){
        content =  <FlatList
        contentContainerStyle={styles.tagContainer}
        data={activityTags}
        horizontal={false}
        numColumns={2}
        renderItem={({item})=>{
          return (
            <TouchableOpacity 
              style={[
                styles.tagLabel, 
                selectedTags.includes(item.key) ? 
                {borderColor: 'lightgray',backgroundColor:'#aaf0d1', borderWidth: 2} : 
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
              <Text style={[{fontSize: 18, color:'gray'}, selectedTags.includes(item.key) ? 
                {color:'black'} : 
                {}]}>{item.name}</Text>
            </TouchableOpacity>
          )
        }}
      />
    }
    else
    content =<Text style={{color: 'gray', fontStyle: 'italic'}}>Select an expense to see and add details</Text>

    return(
        <View style={{ width: '100%', paddingVertical: '3%'}}>{content}</View>
    )
}

const styles = StyleSheet.create({
tagContainer: {
    justifyContent: 'space-around',
    alignItems: 'space-evenly',
    width: '90%',
    margin: '2%',
    padding: '2%',
  },
  tagLabel: {
    margin: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'lightgray',
    borderRadius: 6,
    borderWidth: 0,
  }});

export default TagsDisplay;