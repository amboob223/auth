import React, {useEffect, useState} from "react";
import axios from "axios";
import "./App.css";

function App(){
  const [usernameReg,setUsernameReg] = useState("");
  const [passWordReg, setPasswordReg] = useState("");

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [loginStatus,setLoginStatus] = useState("");



//got to do this line or it wont work
  axios.defaults.withCredentials = true;// necessary

// eslint-disable-next-line
  const register = ()=>{
    axios.post("http://localhost:3001/register",{
      username:usernameReg,
      password:passWordReg
    }).then((response)=>{
      console.log(response)
    })// this is teh reqbody stuff

  }


  axios.get("/login",(req,res)=>{
    if(req.session.user){
      res.send({
        loggedIn:true,
        user:req.session.user
      })
    }else{
      res.send({loggedIn:false})
    }
  })
  const login = ()=>{
    axios.post("http://localhost:3001/login",{
      username:username,
      password:password
    }).then((response)=>{
      console.log(response)
    })
  }

  useEffect(()=>{
    axios.get("http://localhost:3001/login").then((response)=>{
      if(response.data.loggedInd == true){
        setLoginStatus(response.data.user[0].username)
      }
    // this contains the object with data and heafers called content/application/json etc 
    })
    },[]) // this will run after every refresh and will do once since we ot the array next to it

  return (
    <div className="App">
      <div className="registration">
        <h1>registation</h1>
        <label>username</label>

          <input
              type="text"
              onChange={(e)=>{
                setUsernameReg(e.target.value)
              }} 
          />
          <label>password</label>
          <input
            type="text"
            onChange={(e)=>{
              setPasswordReg(e.target.value)
            }}
          />
          <button onClick={register}>register</button>
          <h1>login</h1>
          <label>username</label>
          <input
            type="text"
            onChange={(e)=>{
              setUsername(e.target.value)
            }}
            
            />
            
            <label>Password</label>
            <input
              type="text"
              onChange={(e)=>{
                setPassword(e.target.value)
              }} 
            />
            <button onChange={login}>click</button>
      </div>

    </div>
  )
}

export default App;