import React from 'react'
import { useState } from 'react'
import Parser from 'html-react-parser';

export default function PrivacyPolicy() {
    const [text, setText] = useState("")

    fetch('https://www.privacypolicygenerator.info/live.php?token=umNBNeSfjjm2RAJNWBa0LuC3XayYGMNJ')
    .then(response => response.text())
    .then(text => {
        setText(text)
    })

  return (
    <div>
    {text ?
    <div> {Parser(text)}</div>
    :
   <div> Loading...</div>
  }

    </div>
  )
}
