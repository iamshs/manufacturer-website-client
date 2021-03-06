import React, { useEffect, useState } from 'react';
import Tool from './Tool';

const Tools = () => {
    const [tools,setTools]=useState([]);
    useEffect(()=>{
        fetch('https://thawing-island-69083.herokuapp.com/tool')
    .then(res=>res.json())
    .then(data=>{
        
        setTools(data)
    })
    },[])
    return (
        <div>
          <h1 className='text-4xl font-extrabold my-10 text-center'>Featured Tools</h1>
          <div className=' grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {
              tools.slice(0,6).map(tool=><Tool key={tool._id} tool={tool} ></Tool> )
          }    
          </div>  
        </div>
    );
};

export default Tools;