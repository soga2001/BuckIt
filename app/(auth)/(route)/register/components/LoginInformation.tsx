import variables from '@/styles/variables.module.scss'
import styles from './styles.module.scss'
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { InputText } from 'primereact/inputtext';
import Google from '@mui/icons-material/Google';
import Apple from '@mui/icons-material/Apple';

type LoginInformationProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    data: {
        email: string;
        password: string;
        confirmPassword: string;
    }
}

export default function LoginInformation(props: LoginInformationProps) {

    const { handleChange } = props

    return (
        <form className={`${styles['form']} flex flex-col gap-4 items-center w-full`}>
            <h1 className="text-4xl font-bold">Login Information</h1>
            <div className='flex flex-col gap-2 w-full'>
                <label className="text-2xl" htmlFor="email">Email:</label>
                <div className={`${variables['inputGroup']}`}>
                    <EmailIcon className={`${variables['iconStart']}`} />
                    <InputText onChange={handleChange} className={`${variables['input']}`} placeholder='Enter your email' id="email" name="email" type="email" required />
                </div>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label className="text-2xl" htmlFor="email">Password:</label>
                <div className={`${variables['inputGroup']}`}>
                <PasswordIcon className={`${variables['iconStart']}`} />
                <InputText onChange={handleChange} className={`${variables['input']}`} placeholder='Enter your password' id="password"  name="password" type="password" required />
                </div>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label className="text-2xl" htmlFor="email">Confirm Password:</label>
                <div className={`${variables['inputGroup']}`}>
                <PasswordIcon className={`${variables['iconStart']}`} />
                <InputText onChange={handleChange} className={`${variables['input']}`} placeholder='Confirm your password' id="confirmPassword"  name="confirmPassword" type="password" required />
                </div>
            </div>
            <div className={`${styles['separator']} my-5`}>
                <hr className={`${styles['line']}`}/>
                <span className='note'>Or</span>
                <hr className={`${styles['line']}`}/>
            </div>
            <div className='w-full grid min-[1100px]:grid-cols-2 gap-3 place-items-center'>
                <div>
                <button className={`${styles['socials']} flex justify-center items-center w-full mx-5 font-black`}>
                    <Google fontSize='small' />
                    Sign up with Google
                    </button>
                </div>
                <div>
                <button className={`${styles['socials']} flex justify-center items-center w-full mx-5 font-black`}>
                    <Apple fontSize='small' />
                    Sign up with Apple
                    </button>
                </div>        
            </div>
            <div className='mt-4 w-full flex justify-center '>
                <p className="signup">Already have an account? 
                <a href="/login" className={`${variables['link']}`}>   Sign In</a>
                </p>
            </div>
        </form>
    )
}