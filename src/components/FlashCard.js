import React,{useState, useEffect, useRef} from 'react'

function FlashCard ({FlashCardItem}){
  const [flip, setFlip] = useState(false)

  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight (){
    const frontHeight = frontEl.current.getBoundingClientRect().height

    const backHeight = backEl.current.getBoundingClientRect().height
    
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(()=>{
    setMaxHeight()
  },[FlashCardItem.answer, FlashCardItem.question, FlashCardItem.options])

  useEffect(()=>{
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  },[])

  return(
    <>
    <div className={ `card ${flip ? 'flip' : '' } ` } 
    style={{height:height}}
    onClick={() => setFlip(!flip)}>
    <div className='front' ref={frontEl}>
      <div className='category'>category</div>
      {FlashCardItem.question}
      <div className='options'>
        {FlashCardItem.options.map(option => {
          return <div className='option' key={option}>{option}</div>
        })}
      </div>
    </div>

    <div className='back' ref={backEl}>{FlashCardItem.answer}</div>

    </div>
    </>
  )
}

export default FlashCard