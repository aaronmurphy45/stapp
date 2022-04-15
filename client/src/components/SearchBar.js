import { Input } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import  { useGetAutoCompleteQuery } from '../services/autoComplete'

export default function SearchBar() {
    const [keyword, setKeyword] = React.useState('')
    const [searchTerm, setSearchTerm] = React.useState('')


    const { data: search , isFetching } = useGetAutoCompleteQuery(keyword);



    const onChange = (e) => {
        setSearchTerm(e.target.value)
       
    }
    const handleClick = (e) => {
        setKeyword('')
        setSearchTerm('')
    }

    useEffect(() => {
        setKeyword(searchTerm)
    }, [searchTerm])



    const containerStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '10px',
        //boxShadow: '3px 3px 3px 3px rgba(0,0,0,0.75)',
        border: '1px solid #e8e8e8',
        boxShadow: '0px 0px 5px #000000',
        marginBottom: '10px',

    }

    const rowstyle = {
        backgroundColor : 'white',
        width :'100%',
        borderRadius : '5px',

    }
  return (



      <div style = {containerStyle}>
           <Input placeholder='Search' onChange={onChange} value= {keyword}></Input>
           {keyword && keyword.length > 1 && search !=null && search!=undefined && search.map(item => (
               <div >
               <Link to = {`/stock/${item.symbol}`} onClick={handleClick}style = {rowstyle}>{item.name} ({item.symbol})</Link><br/>
               </div>
              ))}
      </div>
   
  )
}
