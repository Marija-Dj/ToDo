import React, {useState, useEffect} from 'react';
import axios from "./axios.js";
//import requests from './requests.js';
import { useNavigate } from "react-router-dom";

//import { Link } from 'react-router-dom';
/*//! NE Rabota
const getLocal = () =>
{
    let list=localStorage.getItem('lists');
    
    console.log(list);
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
        
    
}
*/

function ToDoList () {

    //!2
    //const [todos, setToDos] = useState(getLocal());

//1:
    const [todos, setToDos] = useState([]);
    let navigateUser = useNavigate();
    const [query, setQuery]=useState("");
    
    //const [filteredTodos, setFilteredTodos]=useState([]);
    
    



    const removeItem = async (id) => {
        await axios.delete(`/todos/${id}`);
        setToDos(todos.filter((p) => p.id !== id));
        //alert(id);
    
    }

    const completedItem = async (todo) => {
        await axios.put(`/todos/${todo.id}`);
        setToDos(todos.map((p) =>{
            if (p.id === todo.id){
                return {
                    ...p, 
                    completed : !p.completed,
                };
            }
            return p;
        })) 
    }

    
    const filterBtns = (e) => {
        //alert(e)

        //await axios.get(`/todos`);
        e.preventDefault();
        let word = e.target.value;
        if (word === "all"){
            setToDos(todos);
        }
        else if(word === "completed"){
            setToDos(todos.filter((f)=> (f.completed === true)))
        }
        else if(word === "uncompleted"){
            setToDos(todos.filter((un)=> un.completed === false)) 
        } 
    }
    


/*
    const filterHandler = () => {
        switch (status) {
        case "completed":
            setToDos(todos.filter((todo) => todo.completed === true));
            break;
        case "uncompleted":
            setToDos (todos.filter((todo) => todo.completed != true ));
          break;
        default:
            setToDos(todos);
            break;
        };
    }
       */ 

    
    


    



    

    useEffect(() => {
        async function fetchData() {
           // const request = await axios.get(requests.fetchToDos);

 
           const request = await axios.get(`/todos?q=${query}`);
            console.log(request);

            setToDos(request.data);
            return request;
             //! localStorage.setItem('list', JSON.stringify(request));
        }
        if (query.length === 0 || query.length > 2) fetchData(); 
    }, [query]);

    console.log(todos);


    return (
        <div className="todoApp">
            <form>
    
             <input className="search" placeholder="Search..." onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
             
             <div class="select">
                <button className='select-btn' value={'all'} onClick={() => filterBtns('all')}>All</button>      
                <button className='select-btn' value={'completed'} onClick={ filterBtns }>Completed</button>  
                <button className='select-btn' value={'uncompleted'} onClick={filterBtns}>Uncompleted</button>    
             </div>

             </form>


        {<div className= "todo-list" >
            

            
        {todos.map(todo =>(

           <div key={todo.id} className={'todo-row'}>

            <input className="form-check-input" type="checkbox" key={todo.completed} id="flexCheckDefault" onClick={()=> completedItem(todo)}  checked={todo.completed=== true} ></input>
            

            <p onClick={() => navigateUser(`/user/${todo.userId}`)} className={todo.completed? 'complete text' :'text '}> {todo.title}</p>
            <button type="button" className="delete-btn" onClick={() => removeItem(todo.id)} > <i class = "fas fa-trash-alt trash"></i>  </button>
            
            


            </div>
            ))}
            
        </div>}


    </div>
    )
}

export default ToDoList