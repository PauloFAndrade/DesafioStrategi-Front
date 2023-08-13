import UserContext from "./UserContext";
import useUserProvider from "../hooks/useUserProvider"

function UserProvider(props) {
    const userProvider = useUserProvider();
    return (
      <UserContext.Provider value={userProvider}>
        {props.children}
      </UserContext.Provider>
    );
  }

export default UserProvider;