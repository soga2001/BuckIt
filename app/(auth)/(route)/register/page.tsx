import RegisterComponent from './components/RegisterComponent';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Register",
  description: "Register an account",
};

export default function LoginPage() {
  return (
    <div>
      <RegisterComponent />
    </div>
  )
}