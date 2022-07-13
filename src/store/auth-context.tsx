import React, { ReactNode, useState } from "react";

type AuthContextType = {
  id: string | null;
  isLoggedIn: boolean;
  onLoggout: () => void;
  onLoggin: (id: string) => void;
};

type Props = {
  children: ReactNode;
};

const AuthContext = React.createContext<AuthContextType>({
  id: "",
  isLoggedIn: false,
  onLoggout: () => {},
  onLoggin: (id) => {},
});

export const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  const initialId = localStorage.getItem("id");

  const [userId, setUserId] = useState(initialId);

  const userIsLoggedIn = !!userId;

  const loggoutHanler = () => {
    setUserId(null);
    localStorage.removeItem("id");
  };

  const logginHandler = (id: string) => {
    setUserId(id);
    localStorage.setItem("id", id);
  };

  const AuthContextValue: AuthContextType = {
    id: userId,
    isLoggedIn: userIsLoggedIn,
    onLoggout: loggoutHanler,
    onLoggin: logginHandler,
  };

  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
