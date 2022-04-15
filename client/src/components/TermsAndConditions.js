import React from 'react'
import { useState } from 'react'
import Parser from 'html-react-parser';

export default function TermsAndConditions() {
    const [text, setText] = useState("")

    fetch('https://www.termsandconditionsgenerator.com/live.php?token=ZcsWA91K8fMsuYajCYmb2MxQRpvHkFst')
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
