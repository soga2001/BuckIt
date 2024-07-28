import { InputText } from 'primereact/inputtext'
import { login } from './actions'

export default function LoginPage() {
  return (
    <form>
      {/* <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required /> */}
      <InputText id="email" name="email" type="email" required />
      <button formAction={login}>Log in</button>
    </form>
  )
}