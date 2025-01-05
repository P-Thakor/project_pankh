import SignIn from "@/components/SignIn"
import UserContextProvider from "@/context/UserContextProvider";

const SignInPage = () => {
  return (
    <UserContextProvider>
      <SignIn />
    </UserContextProvider>
  )
}

export default SignInPage;
