import React, {useEffect, useState} from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';

import api from './services/api'

export default function App(){
    const [story, setStory] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [titles, setTitles] = useState([]);

    useEffect(()=>{
        api.get('daily').then(res => {
            setStory(res.data);
          })
      
          api.get('authors').then(res =>{
            setAuthors(res.data.authors)
          })
    }, [])

    async function handleAuthors(){

        const res  = await api.post('author', {
          author: `${event.target.value}`
        });
        setTitles(res.data)
      }
    
      async function handleStorys(){
        const res  = await api.post('title', {
          title: `${event.target.value}`
        });
        setStory(res.data)
      }
    

    return(
        <>
        <StatusBar barStyle='dark-content' backgroundColor='#333'/>
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <Text style={styles.titlePage}>StoryTeller</Text>
            {story.map(
                content => <Text style={styles.titleStory} key={content.title}>{content.title}</Text>)}
            {story.map(
                content => <Text style={styles.author} key={content.author}>{content.author}</Text>)}
            {story.map(
                content => <Text style={styles.content} key={content.lines}>{content.lines.map(
                                                        line => <Text key={content.lines.line}>{line}</Text>)}</Text>)}   
        </ScrollView>
        </SafeAreaView>
    </>
)}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#333',

    },
    titlePage:{
        marginTop: '2.5%',
        textAlign: 'center',
        color: '#f5f5f5',
        fontSize:42,
        fontWeight: 'bold'
    },
    titleStory:{
        position:'relative',
        marginTop: '5%',
        marginLeft:'2.5%',
        marginRight:'5%',
        color: '#f5f5f5',
        fontSize:21,
        fontWeight: 'bold'
    },
    author:{
        position:'relative',
        marginTop: '2.5%',
        marginLeft:'2.5%',
        marginRight:'2.5%',
        color: '#f5f5f5',
        fontSize:18,
    },
    content:{
        position:'relative',
        textAlign:'justify',
        marginTop: '2.5%',
        marginLeft:'2.5%',
        marginRight:'2.5%',
        color: '#f5f5f5',
        fontSize:16,
    },
    title:{
        color: '#FFF',
        fontSize:50,
        fontWeight: 'bold'
    },
    project:{
        color: '#FFF',
        fontSize: 20
    },
    button:{
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontWeight:'bold',
        fontSize:20
    }
})