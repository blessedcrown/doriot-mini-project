import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, FlatList, AsyncStorage, Button, TextInput, Keyboard, Platform } from "react-native";

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

class update extends Component{
  render(){
    return(
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Add Tasks"
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
    );
  }
}
export default class TodoList extends Component {
  constructor(props){
    super(props)
    obj = new update();
  }
  state = {
    tasks: [],
    text: ""
  };

  //handles text change events
  //takes text as input and updates state of a task
  changeTextHandler = text => {
    this.setState({ text: text });
  };

  //
  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;

    //if the given user input length is longer than 0
    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text } = prevState;
          return {
            tasks: tasks.concat({ key: tasks.length, text: text }),
            text: ""
          };
        },
        //then save the current state
        () => Tasks.save(this.state.tasks)
      );
    }
  };

  //takes an index as a parameter, delete and save the state
  deleteTask = i => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();

        //delete task positioned at index i
        tasks.splice(i, 1);

        return { tasks: tasks };
      },
      //then save state
      () => Tasks.save(this.state.tasks)
    );
  };

  //need some last few touches on this function
  // updateTask = i => {
  //   this.setState(
  //     prevState => {
  //       let tasks = prevState.tasks.slice();

  //       //need to get a text input from a user and render data!!!!!!!!
  //       tasks.splice(i, 1, );
  //     },
  //     () => Tasks.save(this.state.tasks)
  //   )
  // };

  

  render() {
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewMargin }]}
      >
        {/* displays data as flatlist */}
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemCont}>
                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                <View>
                  <Button title="U" onPress={() => this.updateTask(index)} />
                  <Button title="X" onPress={() => this.deleteTask(index)} />
                </View>
              </View>
            </View>}
        />


        {/* this is the text input at the bottom of the screen */}
        <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Add Tasks"
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
    );
  }
}

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};


//CSS
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: viewPadding,
    paddingTop: 20
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "green",
    borderWidth: 1
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%"
  }
});

AppRegistry.registerComponent("TodoList", () => TodoList);
