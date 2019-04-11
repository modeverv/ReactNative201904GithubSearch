/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

type Props = {};
export default class App extends Component<Props> {
  state = {
    items: []
  };
  page = 0;

  fetchRepositories() {
    const newPage = this.page + 1;
    console.log(newPage)
    // https://api.github.com/search/repositories?q=react
    fetch(`https://api.github.com/search/repositories?q=react&page=${newPage}`)
      .then(response => response.json())
      .then(({ items }) => {
        this.page = newPage;
        this.setState({ items: [...this.state.items, ...items] });
      });
  }

  render() {
    console.log(this.state.items);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ marginTop: 40 }}
          onPress={() => this.fetchRepositories()}
        >
          <Text>Fetch</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => (
            <Text style={{ padding: 30 }}>{item.name}</Text>
          )}
          keyExtractor={(item) => item.id}
          onEndReached={() => this.fetchRepositories()}
          onEndReachedThreshold={0.1}
        />
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
