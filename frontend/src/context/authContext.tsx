import React, { createContext, useEffect, useReducer } from "react";

type User = {
    avatar_url: string;
    email: string;
    firstname: string;
    lastname: string;
    mobile_number: string;
    id: number;
};

type AuthState = {
    user: User | null;
    refreshToken: string | null;
    accessToken: string | null;
};

type AuthAction =
    | { type: 'LOGIN', payload: User, refreshToken: string, accessToken: string }
    | { type: 'LOGOUT' };

type AuthContextType = {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
};

const initialAuthState: AuthState = {
    user: null,
    refreshToken: null,
    accessToken: null
};

export const AuthContext = createContext<AuthContextType>({
    state: initialAuthState,
    dispatch: () => {}
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                refreshToken: action.refreshToken,
                accessToken: action.accessToken
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                refreshToken: null,
                accessToken: null
            };
        default:
            return state;
    }
};

export const AuthContextProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    useEffect(() => {
        try {
            const user = localStorage.getItem('user');
            const refreshToken = localStorage.getItem('refreshToken');
            const accessToken = localStorage.getItem("accessToken");

            if (user && refreshToken && accessToken) {
                dispatch({ type: 'LOGIN', payload: JSON.parse(user), refreshToken, accessToken });
            } else {
                dispatch({ type: 'LOGOUT' });
            }
        } catch (error) {
            // Handle localStorage parsing error
            console.error("Error parsing localStorage:", error);
            dispatch({ type: 'LOGOUT' });
        }
    }, []);

    console.log("AuthContext state: ", state);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    );
};
