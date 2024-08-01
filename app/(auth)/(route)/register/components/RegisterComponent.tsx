'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import '../../globals.css';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import "primereact/resources/themes/lara-light-cyan/theme.css";

import { signup } from './actions';

import { Lock, Person, Image, Check, ArrowForward, ArrowBack, CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

import LoginInformation from './LoginInformation';
import AccountInformation from './AccountInformation';
import UploadAvatar from './UploadAvatar';
import VerifyAccount from './VerifyAccount';
import { UserMetaData } from '@/app/assets/interface/users';

import { searchUsers } from '../actions'
import { MentionSearchEvent } from 'primereact/mention';
import { InputMaskChangeEvent } from 'primereact/inputmask';
import { Toast } from 'primereact/toast';

import { redirect } from 'next/navigation';




const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(90deg, rgb(255, 0, 212), purple)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(90deg, rgb(255, 0, 212), purple)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[700],
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[700],
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient(90deg,  purple, rgb(255, 0, 212))',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    background: 'linear-gradient(90deg,  purple, rgb(255, 0, 212))',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <Lock />,
    2: <Person />,
    3: <Image />,
    4: <Check />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}



export default function RegisterComponent() {
    const toast = React.useRef<Toast>(null);

    const steps = ['Login Information', 'Account Information', 'Upload an Avatar', 'Verify Account'];

    const [users, setUsers] = React.useState<UserMetaData[]>();

    const [disabled, setDisabled] = React.useState<boolean>(true);


    const [loginInformation, setLoginInformation] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [accountInformation, setAccountInformation] = React.useState({
        fullname: '',
        username: '',
        bio: '',
        location: '',
        website: '',
        phone: '',
        avatar_url: '',
        year: '0',
        month: '0',
        day: '0',
    });

    const saveLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginInformation({
            ...loginInformation,
            [name]: value,
        });
    }

    const saveAccountInformation = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setAccountInformation({
            ...accountInformation,
            [name]: value,
        });

        console.log(accountInformation)
    }

    const handleDOB = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setAccountInformation({
          ...accountInformation,
          [name]: value,
      });

    }

    const handleMaskChange = (e: InputMaskChangeEvent) => {
        // regex to remove (999) 999-9999
        if(e.target.value) {
            const value = e.target.value.replace(/\D/g, '');
            console.log(value)
            setAccountInformation({
                ...accountInformation,
                phone: value,
            });
        }
        
    }

    const validateInformation = () => {
        let validate = loginInformation.email.length > 0 && loginInformation.password.length > 6 && loginInformation.confirmPassword.length > 6;
        validate = validate && accountInformation.fullname.length > 0 && accountInformation.username.length > 0 && parseInt(accountInformation.day) > 0 && parseInt(accountInformation.month) > 0 && accountInformation.year.length > 0;
        return validate;
    }

    
    const bioChange = async (e: MentionSearchEvent) => {
        const value = e.query;
        const result = await searchUsers(value as string);
        setUsers(result.user as UserMetaData[]);
    }

    const components = [ 
        <LoginInformation data={loginInformation} handleChange={saveLogin} />, 
        <AccountInformation data={accountInformation} handleChange={saveAccountInformation} handleDob={handleDOB} handleMaskChange={handleMaskChange} searchUsers={bioChange} users={users} />, 
        <UploadAvatar />, 
        <VerifyAccount email={loginInformation.email} /> 
    ];

    const [activeStep, setActiveStep] = React.useState(0);
    
    const totalSteps = () => {
        return steps.length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const handleNext = () => {
        const newActiveStep = isLastStep() ? 3 : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const submitForm = async () => {
        const data = {
            loginInformation,
            accountInformation
        }
        const result = await signup(data);
        
        if(result.status === 200) {
            toast.current?.clear();
            toast.current?.show({severity:'success', summary: 'Successfully Signed Up', detail: result.message, life: 3000, icon: <CheckCircleOutline />});
            setActiveStep(activeStep + 1)
        }
        else {
            toast.current?.clear();
            toast.current?.show({severity:'error', summary: 'Error Signing Up', detail: result.message, life: 3000, icon: <ErrorOutline />, className: 'bg-red-300 text-red-800'});
        }
    };

    React.useEffect(() => {
        setDisabled(!validateInformation())
    }, [accountInformation, loginInformation])

    const skipVerification = () => {
        redirect('/home')
    }





  return (
    <div>
        
        <Stack className='sticky top-0 py-2 z-50 bg-black' spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                <Step disabled key={label}>
                    <StepLabel className='text-white' StepIconComponent={ColorlibStepIcon}><span className='text-white'>{label}</span></StepLabel>
                </Step>
                ))}
            </Stepper>
        </Stack>
        <>
            <div className='my-2 z-1'>
                {components[activeStep]}
            </div>
            <Toast ref={toast} />
            {/* <Toast
                ref={toast}
                content={({ message }) => (
                    <section className="flex flex-rows p-3 gap-3 w-full text-red-800 bg-red-300" style={{ borderRadius: '10px' }}>
                        <i className="pi pi-cloud-upload text-primary-500 text-2xl"></i>
                        <div className="flex flex-rows gap-3 w-full">
                            <div>
                                {message.severity === 'success' ? <CheckCircleOutline className="text-green-500 text-2xl" /> : <ErrorOutline className="text-red-800" />}
                            </div>
                            <div>
                                <p className="m-0 font-semibold text-base">{message.summary}</p>
                                <p className="m-0 text-base text-700">{message.detail}</p>
                            </div>
                            
                        </div>
                    </section>
                )}
            ></Toast> */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                className='button w-24 flex flex-row gap-2 '
                disabled={activeStep === 0 || activeStep === 2}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                <ArrowBack />
                Back
              </Button>


              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep === 1 ? <Button disabled={disabled} className='button w-fit flex flex-row gap-2' onClick={submitForm} sx={{ mr: 1 }}>
                Sign Up
                <ExitToAppIcon />
              </Button> : null}
              {activeStep === 0 ? 
              <Button className='button w-24 flex flex-row gap-2' onClick={handleNext} sx={{ mr: 1 }}>
                Next
                <ArrowForward />
              </Button> : null}
   
              {
                activeStep === 2 ? 
                <Button className='button w-24 flex flex-row gap-2' onClick={handleNext} sx={{ mr: 1 }}>
                  Skip
                  <ArrowForward />
                </Button> : null
              }
              {
                activeStep === 3 ? 
                <Button className='button w-24 flex flex-row gap-2' onClick={skipVerification} sx={{ mr: 1 }}>
                  Skip
                  <ArrowForward />
                </Button> : null
              }
            

            </Box>
        </>
    </div>
  );
}
