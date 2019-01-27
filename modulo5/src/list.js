import React, { Component } from 'react';
import { View, Text, ScrollView, Button, AsyncStorage } from 'react-native';

import Post from './post';

export default class List extends Component {
  state = {
    posts: []
  }

  renderPosts = () => (
    <ScrollView>
      {this.state.posts.map(post => <Post key={post.id} post={post} onDelete={this.deletePost}/>)}
    </ScrollView>
  )

  addNewPost = () => {
    this.setState({
      posts: [ ...this.state.posts, { id: Math.random(), title: "test", description: 'test'}]
    })
  }

  deletePost = (id) => {
    this.setState( prevState => ({
      posts: prevState.posts.filter(post => post.id !== id)
    }))
  }

  savePost = async () => {
    await AsyncStorage.setItem('@testRN:posts', JSON.stringify(this.state.posts));
  }

  async componentDidMount(){
    const posts = JSON.parse(await AsyncStorage.getItem('@testRN:posts')) || []
    this.setState( { posts })
  }

  render() {
    return (
      <View>
        { this.state.posts.length > 0 
          ? this.renderPosts()
          : <Text>Nenhum Post</Text>
        }

        <Button id="new" title="add new Post" onPress={this.addNewPost} />
        <Button id="save" title="save Post" onPress={this.savePost} />
      </View>
    )
  }
}
