import React from "react";
import { Image, Text, View } from "react-native";

export default class Detail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item.name
  });

  render() {
    const {
      navigation: {
        state: {
          params: { item }
        }
      }
    } = this.props;
    console.log(item);
      return (
        <View style={{ backgroundColor: "#222" }}>
          <View style={{backgroundColor:"#fff"}}>
            <Text style={{ fontSize: 30, fontWeight: "bold",padding:10 }}>
              {item.full_name}
            </Text>
            <View style={{ flexDirection: "row" ,padding:10}}>
              <Image
                style={{ width: 20, height: 20 }}
                source={{ url: item.owner.avatar_url }}
              />
              <Text style={{ fontSize: 20, marginLeft: 5 }}>
                {item.owner.login}
              </Text>
            </View>
            <Text style={{padding:10}}>{item.description}</Text>
            <Text style={{padding:10}}>{item.url}</Text>
          </View>
        </View>
      );
      }
    }
