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
    items: [],
    refreshing: false
  };
  page = 0;

  fetchRepositories(refreshing = false) {
    const newPage = refreshing ? 1 : this.page + 1;
    this.setState({ refreshing });
    console.log(newPage);
    // https://api.github.com/search/repositories?q=react
    fetch(`https://api.github.com/search/repositories?q=react&page=${newPage}`)
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
        <TouchableOpacity
          style={{ marginTop: 40 }}
          onPress={() => this.fetchRepositories()}
        >
          <Text>Fetch</Text>
        </TouchableOpacity>
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
  }
});
