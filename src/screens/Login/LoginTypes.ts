export type LoginScreenViewProps = {
    email: string,
    password: string,
    emailError: string,
    passwordError: string,
    loading: boolean,
    setEmail: (active: string) => void;
    setPassword: (active: string) => void;
    handleSubmit: () => void
  
  }