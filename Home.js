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
  View,
  TextInput 
} from "react-native";

type Props = {};
export default class App extends Component<Props> {
  state = {
    items: [],
    refreshing: false,
    text: '',
  };
  page = 0;

  fetchRepositories(refreshing = false) {
    const newPage = refreshing ? 1 : this.page + 1;
    this.setState({ refreshing });
    console.log(newPage);
    // https://api.github.com/search/repositories?q=react
    fetch(`https://api.github.com/search/repositories?q=${this.state.text}&page=${newPage}`)
      .then(response => response.json())
      .then(({ items }) => {
        this.page = newPage;
        if (refreshing) {
          this.setState({ items });
        } else {
          this.setState({ items: [...this.state.items, ...items] });
        }
        this.setState({ refreshing: false });
      });
  }

  navigateToDetail(item) {
    this.props.navigation.navigate('Detail', {item})
  }

  render() {
    console.log(this.state.items);
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({ text })}/>
          <TouchableOpacity
            onPress={() => this.fetchRepositories(true)}
          >
            <Text>Seach</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.navigateToDetail(item)}>
              <Text style={{ padding: 30 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          onEndReached={() => this.fetchRepositories()}
          onEndReachedThreshold={0.1}
          onRefresh={() => {
            this.fetchRepositories(true);
          }}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  inputWrapper: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,

  },
  input: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 10,
    marginRight: 5,
    borderRadius: 7,
  }
});
