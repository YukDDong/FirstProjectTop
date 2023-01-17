import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { registerUser } from '../_actions/user_action';
import { useHistory } from "react-router-dom";

function RegisterPage(){
    const history=useHistory()
    const dispatch=useDispatch()

    const [Email, setEmail]=useState("")
    const [Name, setName]=useState("")
    const [Password, setPassword]=useState("")
    const [ConfirmPassword, setConfirmPassword]=useState("")

    const onEmailHandler=(e)=>{
        setEmail(e.currentTarget.value)
    }

    const onNameHandler=(e)=>{
        setName(e.currentTarget.value)
    }

    const onPasswordHandler=(e)=>{
        setPassword(e.currentTarget.value)
    }

    const onConfirmPasswordHandler=(e)=>{
        setConfirmPassword(e.currentTarget.value)
    }

    const onSubmitHandler=(e)=>{
        e.preventDefault();

        if(Password !== ConfirmPassword){
            return alert('비밀번호확인이 일치하지 않습니다.')
        }

        let body={
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response=>{
                if(response.payload.success){
                    history.push("/login")
                }else{
                    alert('회원가입실패')
                }
            })
        
    }
    return(
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '300px', height: '500px'
        }}>
            <form style={{display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>


                <button>
                    Join
                </button>
            </form>
        </div>
    )
}

export default RegisterPage