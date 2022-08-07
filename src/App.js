import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout/Layout";
import { setUserActions } from "./store/auth.slice";

function App() {
  const dispatch = useDispatch();

  const checkUserExists = async () => {
    const res = await axios.get("https://backend-8am.herokuapp.com/api/check").catch((err) => {
      return;
    })
    if (res?.data) {
      let user = {
        id: res.data._id,
        email: res.data.email,
        role: res.data.role,
        name: res.data.name
      }
      dispatch(setUserActions.setAuthState({ ...user }))
    }
  }

  useEffect(() => {
    checkUserExists();
  }, []);
  return <Layout />;
}

export default App;
