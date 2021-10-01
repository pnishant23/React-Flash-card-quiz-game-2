import React from 'react'
import FlashCard from './FlashCard'

function FlashCardList ({ flashCards }){
  return(
    <>
      <div className='card-grid'>
        {flashCards.map( FlashCardItem => {
          return <FlashCard FlashCardItem={FlashCardItem} key={FlashCardItem.id}/>
        })}
      </div>
    </>
  )
}

export default FlashCardList