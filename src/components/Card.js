import React, {useState} from 'react'
import './card.css'

export default function Card({info, children}) {
    return  <div className={'card'}>
        {children}
    </div>
}