import { useState, useCallback, useMemo } from "react";
import { UserContext } from "./userContext.js";
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const clearUser = useCallback(() => setUser(null), []);
    const value = useMemo(() => ({ user, setUser, clearUser }), [user, clearUser]);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
