import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class CardImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calcHeight: 0,
    };
  }

  render() {
    const newStyle = this.props.style || {};
    const newTextStyle = this.props.textStyle || {};
    return (
      <View
        style={[styles.cardImage, newStyle]}
        onLayout={e => this.setState({ calcHeight: e.nativeEvent.layout.width * 9 / 16 })}>
        {this.props.source !== undefined && (
          <Image
            source={this.props.source}
            resizeMode={this.props.resizeMode || 'stretch'}
            resizeMethod={this.props.resizeMethod || 'resize'}
            style={[StyleSheet.absoluteFill, styles.image]}
          />
        )}
        {this.props.source === undefined && this.props.children}
        <View style={[styles.imageContainer, { height: this.state.calcHeight }]}>
          {this.props.title !== undefined && this.props.singleLineTitle && (
            <Text
              numberOfLines={1}
              style={[styles.imageTitleText, newTextStyle]}
            >
              {this.props.title}
            </Text>
          )}
          { /* eslint-disable-next-line max-len */ }
          {this.props.title !== undefined && (!this.props.singleLineTitle || this.props.singleLineTitle === undefined) && (
            <Text style={[styles.imageTitleText, newTextStyle]}>{this.props.title}</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardImage: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    borderBottomWidth: 0,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.5,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height:70,
    width:70
    
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    paddingTop: 16,
    justifyContent: 'flex-end',
    marginRight:10
    
  },
  image: {
    // position: 'absolute',
    top: 10,
    left: 10,
    bottom:10,
    right:10,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent:"center",
    alignItems:"center"
  
 },
  imageTitleText: {
    fontSize: 24,
    color: 'rgba(255 ,255 ,255 , 0.87)',
  },
});