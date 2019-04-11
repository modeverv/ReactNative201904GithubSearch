/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {};
export default class App extends Component<Props> {
  onPressFetch() {
    console.log("onPressFetch");
    // https://api.github.com/search/repositories?q=react
    fetch("https://api.github.com/search/repositories?q=react")
      .then(response => response.json())
      .then(({ items })  => console.log(items));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.onPressFetch()}>
          <Text>Fetch</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
