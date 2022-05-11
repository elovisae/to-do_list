import {View, Text, Button, SectionList, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Home({navigation}) {
    // const tasks = [
    //   {
    //     title: 'Tasks to do:',
    //     data: [{task: 'Städa', deadline:'2 pm', done: false}]
    //   },
    //   {
    //     title: 'Done with:',
    //     data: [{task: 'Äta vattenmelon', deadline: '4 pm'}]
    //   }
    // ]
    // const GridList = ({data}) => {
  
    // }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>THINGS TO DO:</Text>
        {/* <SectionList 
          sections={tasks}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Text style={styles.listItem}>- {item}</Text>}
          renderSectionHeader={({section: {title} }) => <Text style={styles.subTitle}>{title}</Text>}
        /> */}
        <StatusBar style="auto" />
        <Button
        title="Add a task"
        onPress={() => navigation.navigate('Add')}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: 60,
      flex: 1,
      backgroundColor: '#F67AD4',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 40,
    },
    subTitle: {
      fontSize: 30,
    },
    listItem: {
      fontSize: 16
    }
  });