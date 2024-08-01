import { getUser } from './action';

import LoadingProfile from './components/LoadingProfile';

import UserProfile from './components/UserProfile';
import { Suspense } from 'react';
        

export async function generateMetadata({ params }: { params: { username: string } }) {
    const { username } = params;

    const {user: user, error} = await getUser(username)

    if(user) {
        return {
            title: user.fullname,
            description: user.bio,
        }
    }
    else {
        return {
            title: 'User not found',
            description: 'User not found',
        }
    }
  }

export default async function Page({ params, children }: { params: { username: string }, children: Readonly<{
    children: React.ReactNode;
  }> }) {


    return (
        <div className='h-full w-full mx-auto'>
            <Suspense fallback={<LoadingProfile />}>
                <UserProfile params={params} />
            </Suspense>
        </div>
    )
}