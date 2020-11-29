import React from 'react'
import {FullHeart,EmptyHeart,Reply,Share} from '../../Common/Icons/Icons'
import colors from '../../Common/Styled Components/colors'


const QuotePublicAcions=({user,quote,like,reply,share})=> {
    const {likes} = user
  

    return (
        <div>
            <a onClick={e=>{ like(quote) }}>
                {
                likes.map(q=>q.id).includes(quote.id)
                ?<FullHeart  fontSize={"16px"} color={colors.quoteIconsColor} />
                :<EmptyHeart fontSize={"16px"} color={colors.quoteIconsColor} />
                }
            </a>
            <a onClick={e=>{ reply({quote, reply_text :"haha this is deep",id:"a7Fr8ODkeKUMk0e73t4eQHkF6bE3" ,image:"no_image",user_name :"mohMo"}) }}>
                <Reply fontSize={"16px"} color={colors.quoteIconsColor} />
            </a>
            <a onClick={e=>{ share(quote) }}>
                <Share fontSize={"16px"} color={colors.quoteIconsColor} />
            </a>
        </div>
    )

}

export default QuotePublicAcions
