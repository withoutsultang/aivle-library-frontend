import { useContext } from "react";
import { UserContext } from "./userContext.js";
export function useUser() { return useContext(UserContext); }
