import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../_actions/user_action';


function LoginPage() {
    const history=useHistory()

    const dispatch=useDispatch()

    const [Email, setEmail]=useState("")
    const [Password, setPassword]=useState("")

    const onEmailHandler=(e)=>{
        setEmail(e.currentTarget.value)
    }

    const onPasswordHandler=(e)=>{
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler=(e)=>{
        e.preventDefault();

        let body={
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response=>{
                if(response.payload.loginSuccess){
                    alert('로그인 성공')
                    history.push('/')
                }else{
                    alert('Error')
                }
            })
        
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '300px', height: '500px'
        }}>
            <form style={{display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
