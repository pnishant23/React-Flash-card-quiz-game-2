import React, {useState,useEffect, useRef} from "react";
import FlashCardList from "./components/FlashCardList";
import "./style.css";
import 'axios'
import axios from "axios";
import { FaGithubAlt } from 'react-icons/fa'

export default function App() {

  const [flashCards, setFlashCards] = useState([])

  const [category, setCategory] = useState([])

  const [loading, setLoading] = useState(false)

  const [helperText, setHelperText] = useState(true)

  const categoryEl = useRef()
  const numberEl = useRef()

  useEffect(()=>{
    axios.get('https://opentdb.com/api_category.php')
    .then(res => {
      setCategory(res.data.trivia_categories)
    })
  },[])
  
  /*useEffect( () => {
    setLoading(true)
    axios.get('https://opentdb.com/api.php?amount=10')
    .then( res => {
      setFlashCards( res.data.results.map((questionItem, index) => {
        const answer = questionItem.correct_answer
        const options = [...questionItem.incorrect_answers.map(a => decodeStr(a)), answer]
        return{
          id:`${index}-${Date.now()}`,
          question:decodeStr( questionItem.question),
          answer: decodeStr( answer ),
          options:options.sort(()=> Math.random() - .5)
      
        }
      })
      )
      setLoading(false)
    })
  },[])*/

  function decodeStr( str ){
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    axios.get('https://opentdb.com/api.php', {
      params:{
        amount:numberEl.current.value,
        category:categoryEl.current.value
      }
    })
    .then( res => {
      setFlashCards( res.data.results.map((questionItem, index) => {
        const answer = questionItem.correct_answer
        const options = [...questionItem.incorrect_answers.map(a => decodeStr(a)), answer]
        return{
          id:`${index}-${Date.now()}`,
          question:decodeStr( questionItem.question),
          answer: decodeStr( answer ),
          options:options.sort(()=> Math.random() - .5)
        }
      })
      )
      setLoading(false)
      setHelperText(false)
    })

  }

  const LOCAL_STORAGE_KEY = 'flashCards.Quiz'


  useEffect(()=>{
    const getFlashCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

    if (getFlashCards) return setFlashCards(getFlashCards) 
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(flashCards))
    setHelperText(false)
  },[flashCards])

  return (
    <>
    <form className='header' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='category'>category</label>
        <select id='category' ref={categoryEl}>
          {category.map(c => {
            return <option value={c.id} key={c.id}>{c.name}</option>
          })}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='number'>Number of Ouestions</label>
        <input type='number' id='number' min='1' step='1' min={1} defaultValue={10} ref={numberEl}/>
      </div>
      <div className='form-group'>
        <button className='btn'>Generate</button>
      </div>
    </form>

    <div className='container'>
      { helperText ?
      <div className='helperText'><p>'Select Category and number of questions and Tap Generate to view questions. <b/>For answer tap the question'</p></div> : null}

      {loading ? <h1 className='loading-cnt'><div className='loading'></div></h1> :
    <FlashCardList flashCards={flashCards }/>}
    </div>
    
    <footer  className='footer'>
      <p>Crafted with Passsion by Nishant Patil </p>
      <span id='github'><a href='https://github.com/pnishant23'><FaGithubAlt/></a>
      </span>
    </footer>
    </>
  );
}