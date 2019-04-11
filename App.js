/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View ,FlatList} from "react-native";

type Props = {};
export default class App extends Component<Props> {

  state = {
    items: [],
  }

  onPressFetch() {
    console.log("onPressFetch");
    // https://api.github.com/search/repositories?q=react
    fetch("https://api.github.com/search/repositories?q=react")
      .then(response => response.json())
      .then(({ items }) => this.setState({ items }));
  }

  render() {
    console.log(this.state.items)
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{marginTop:40}} onPress={() => this.onPressFetch()}>
          <Text>Fetch</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={( item ) => item.id}
        >
          </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});
