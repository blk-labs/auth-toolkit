import {createContext, type PropsWithChildren} from 'react'



const AuthContext = createContext(null)




export default function AuthProvider({children}: PropsWithChildren) {
  return <AuthContext.Provider value={null}>
    {children}
    </AuthContext.Provider>
}
