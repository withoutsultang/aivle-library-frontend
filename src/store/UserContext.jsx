import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

//UserProvider 아래에 있어야 User 정보 접근 가능
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const clearUser = () => setUser(null);

    return (
        <UserContext.Provider value={{ user, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
