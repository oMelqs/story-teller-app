import React, {useState, useEffect} from 'react';

import api from './services/api';

import './App.css';

import Header from './components/Header';

/**
 * Componente
 * Propriedade
 * Estado & Imutabilidade
 */

function App() {
  const [story, setStory] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [titles, setTitles] = useState([]);
  

  // useState retorna um array com 2 posições
  //
  // 1. Variável com seu valor inicial
  // 2. Função para atualizarmos esse valor

  useEffect(() => {
    api.get('daily').then(res => {
      setStory(res.data);
    })

    api.get('authors').then(res =>{
      setAuthors(res.data.authors)
    })
    
  }, []);

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


  return (
    <>
      <Header title="StoryTeller" />
      <br></br>

      <div id='mainContent'>
        <br/>
        {story.map(
          content => <h2 key={content.title}>{content.title}</h2>)}
            <br></br>
        {story.map(
          content => <h3 key={content.author}>{content.author}</h3>)}
            <br></br>
        {story.map(
            content => <p key={content.lines}>{content.lines.map(
                      line => <p key={content.lines.line}>{line}</p>)}
                  </p>)}
            <br></br>
      </div>

      <div id='authorsContent'>
        <h2>Authors</h2>
        <ul>
        {authors.map(
          author=><li><button value={author} onClick={handleAuthors}>{author}</button></li>)}
          </ul>
      </div>

      <div id='storysContent'>
      <h2>Storys</h2>
        <ul>
          {titles.map(
            title=><li><button value={title.title} onClick={handleStorys}>{title.title}</button></li>)}
          </ul>
      </div>
    </>
  )
}

export default App