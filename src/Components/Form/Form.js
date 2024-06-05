import React, { useState } from 'react'
import styled from 'styled-components';

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css"
import { useGlobalContext } from '../../Context/globalcontext';
import Button from '../Button/Button';
function Form() {

    const {addIncome, getIncomes, error, setError} = useGlobalContext()

    const [inputState,setInputState] = useState({
        title:'',
        date:'',
        amount: '',
        category:'',
        description:'',

    })


    const {title,date,amount,category,description} = inputState;

    const handleInput = name => e => {
        setInputState({...inputState,[name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        addIncome(inputState)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
    }

  return (
    <FormStyled onSubmit={handleSubmit}>
        <div className="input-control">
            <input 
            type="text"
            value={title}
            name={'title'}
            placeholder='Title'
            onChange={handleInput('title')}
            
            />
        </div>

        <div className="input-control">
            <input 
            type="text"
            value={amount}
            name={'amount'}
            placeholder='Amount'
            onChange={handleInput('amount')}
            
            />
        </div>

        <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>

            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value=""  disabled >Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investiments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>  
                </select>
            </div>

            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Add Income'}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
    </FormStyled>
  )
}


const FormStyled = styled.form`



`;


export default Form