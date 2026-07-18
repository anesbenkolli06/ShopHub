import React, { Children, useContext, useState, createContext } from 'react'
export const AuthContext = createContext(null);

function AuthProvider({children}) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const [user, setUser] = useState(localStorage.getItem('currentUserEmail') ? {email: localStorage.getItem('currentUserEmail')} : null);
  function signUp(email, password){
    const newUser = {email, password}
    if(users.find(u => {return u.email === email})){
        return({success: false, error: "Email is already exists,try with new one!"})
    }
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email)
    setUser({email})
    return({success: true})
  }

  function login(email, password){
    if(!users.find(u => email === u.email && password === u.password)){
      return {success: false, error: "Invalid email or password,check it again"}
    }
    localStorage.setItem('currentUserEmail', email)
    setUser({email})
    return({success: true})
  }
  function logout(){
    setUser(null)
    localStorage.removeItem('currentUserEmail'); 
  }
    return (
    <AuthContext.Provider value={{signUp, user, logout, login}}>{children}</AuthContext.Provider>
  )
}
export function useAuth(){
  const context = useContext(AuthContext);
  return(context);
}

export default AuthProvider