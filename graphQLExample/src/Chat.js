import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Dimensions, StatusBar, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


import Input from './Input';

StatusBar.setBarStyle('light-content');

class Chat extends Component {
  componentDidMount() {
    this.props.conversation.subscribeToMore({
      document: gql `
        subscription onMessageAdded($author: String!) {
          Message(filter: {
            mutation_in: [CREATED]
            node: {
              from_not: $author
            }
          }) {
            node {
              id
              from
              message
            }
          }
        }
      `,
      variables: { author: 'Walter' },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data['Message']) return prev;
        const newItem = subscriptionData.data['Message'].node;
        return { ...prev, allMessages: [...prev.allMessages, newItem ]}
      }
    })
  }

  componentDidUpdate() {
    setTimeout(() => [
      this._scrollview.scrollToEnd({ animated: false })
    ], 0)
  }

  handleAddMessage = (proxy, { data: {createMessage} }) => {
    const data = proxy.readQuery({
      query: ConversationQuery
    });

    data.allMessages.push(createMessage)
    proxy.writeQuery({
      query: ConversationQuery,
      data
    })
  }

  renderChat = () => (
    this.props.conversation.allMessages.map(item => (
      <View
        key={item.id}
        style={[
          styles.bubble,
          item.from === 'Walter'
           ? styles['bubble-right']
           : styles['bubble-left']
        ]}
      >
        <Text style={styles.author}>{item.from}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    ))
  );

  render () {
    return  (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.os === 'ios' ? 'padding' : null }
      >
        <ScrollView
          keyboardShouldPersistTap="never"
          ref={scrollview => this._scrollview = scrollview}
          contentContainerStyle={styles.conversation}
        >
          { this.props.conversation.loading
            ? <ActivityIndicator style={styles.loading} color='#fff'/>
            : this.renderChat()
          }
        </ScrollView>
        <Input onAddMessage={this.handleAddMessage}/>
      </KeyboardAvoidingView>
    );
  }
}
 

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C4241',
    ...Platform.select({
      ios: { paddingTop: 40 },
    }),
  },

  conversation: {
    padding: 10,
  },

  bubble: {
    padding: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    marginTop: 10,
    maxWidth: width - 60,
    minWidth: width - 200,
  },

  'bubble-left': {
    alignSelf: 'flex-start',
  },

  'bubble-right': {
    alignSelf: 'flex-end',
    backgroundColor: '#D1EDC1',
  },

  author: {
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#333',
  },

  message: {
    fontSize: 16,
    color: '#333',
  },
});

const ConversationQuery = gql`
  query {
    allMessages(
      orderBy: createdAt_ASC
    ) {
      id
      from
      message
    }
  }
`;

export default graphql(ConversationQuery, {
  name: 'conversation',
})(Chat);