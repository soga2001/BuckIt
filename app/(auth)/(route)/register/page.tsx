'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import '../globals.css';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

import { Lock, Person, Image, Check, ArrowForward, ArrowBack } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import LoginInformation from './components/LoginInformation';
import AccountInformation from './components/AccountInformation';
import UploadAvatar from './components/UploadAvatar';
import VerifyAccount from './components/VerifyAccount';
import Head from 'next/head'
import { UserMetaData } from '@/app/assets/interface/users';

import { login, searchUsers } from './actions'
import { MentionSearchEvent } from 'primereact/mention';
import { InputMaskChangeEvent } from 'primereact/inputmask';
import { useEffect } from 'react';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }),
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

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



export default function Register() {

    const steps = ['Login Information', 'Account Information', 'Upload an Avatar', 'Verify Account'];

    const [users, setUsers] = React.useState<UserMetaData[]>();


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
        phoneNumber: '',
        maskedPhoneNumber: '',
        avatar_url: '',
        year: '',
        month: '',
        day: '',
    });

    const saveLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginInformation({
            ...loginInformation,
            [name]: value,
        });
    }

    const saveAccountInformation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setAccountInformation({
            ...accountInformation,
            [name]: value,
        });

        console.log(accountInformation)
    }

    const handleMaskChange = (e: InputMaskChangeEvent) => {
        // regex to remove (999) 999-9999
        if(e.target.value) {
            const value = e.target.value.replace(/\D/g, '');
            setAccountInformation({
                ...accountInformation,
                phoneNumber: value,
                maskedPhoneNumber: e.target.value
            });
        }
        
    }
    
    const bioChange = async (e: MentionSearchEvent) => {
        const value = e.query;
        const result = await searchUsers(value as string);
        setUsers(result.user as UserMetaData[]);
    }

    const components = [ 
        <LoginInformation data={loginInformation} handleChange={saveLogin} />, 
        <AccountInformation data={accountInformation} handleChange={saveAccountInformation} handleMaskChange={handleMaskChange} searchUsers={bioChange} users={users} />, 
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




  return (
    <div>
        
        <Stack className='sticky top-0 bg-black' spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                <Step disabled key={label}>
                    <StepLabel className='text-white' StepIconComponent={ColorlibStepIcon}><span className='text-white'>{label}</span></StepLabel>
                </Step>
                ))}
            </Stepper>
        </Stack>
        <>
            <div className='my-2'>
                {components[activeStep]}
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                className='button w-24 flex flex-row gap-2 '
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                <ArrowBack />
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {!isLastStep() ? 
              <Button className='button w-24 flex flex-row gap-2' onClick={handleNext} sx={{ mr: 1 }}>
                Next
                <ArrowForward />
              </Button> : null}
            </Box>
        </>
    </div>
  );
}
