import { Image  } from "primereact/image";
import { getUser } from "../action";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import '../../user.css'
import { Button, Link } from "@mui/material";

import variables from '@/styles/variables.module.scss'
import { LocationOn, Phone } from "@mui/icons-material";


export default async function UserProfile({params}: {params: {username: string}}) {
    const {username} = params;
    const {user: user, error} = await getUser(username)
  
    return (
        <div className='h-full mx-auto px-4 md:p-2'>
            <div className='flex flex-rows flex-wrap justify-center gap-3'>
                <div className='flex '>
                    <Image imageClassName="avatar-img w-52 border-2 border-white" src={user.avatar_url} alt={`${user.fullname} avatar`} preview />
                </div>
                {/* <div className='h-fit flex flex-rows gap-2 flex-wrap items-center '>
                    <h1 className='text-2xl font-black'>{user.fullname}</h1>
                    <div className='w-2 h-2 bg-gray-200 rounded-full'></div>
                    <h4 className='text-md'>@{user.username}</h4>
                </div>
                <div>
                    <p>{user.bio}</p>
                </div> */}

                <div className="flex flex-col gap-3">
                    <div className='h-fit flex flex-rows gap-2 flex-wrap items-center '>
                        <h1 className='text-2xl font-black'>{user.fullname}</h1>
                        <div className='w-2 h-2 bg-gray-200 rounded-full'></div>
                        <h4 className='text-md'>@{user.username}</h4>
                    </div>
                    <div className="flex flex-row gap-2 flex-wrap">
                        <Button className={`${variables['filled']}`} >Follow</Button>
                        <Button className={`${variables['outlined']}`} variant="outlined">Message</Button>
                        {/* <Skeleton width="8rem" height="3rem" className=""></Skeleton>
                        <Skeleton width="8rem" height="3rem" className=""></Skeleton> */}
                    </div>
                    <div className="max-w-xl">
                        {/* {user.bio} */}
                        <p className="whitespace-normal">{user.bio}</p>
                    </div>
                    <div>
                        {
                            user.location ? (
                                <div className='flex flex-row gap-2 items-center'>
                                    <LocationOn />
                                    <span>{user.location}</span>
                                </div>
                            ) : null
                        }
                        {
                            user.website ? (
                                <div className='flex flex-row gap-2 items-center'>
                                    <Link />
                                    <a href={user.website} target="_blank" rel="noreferrer">{user.website}</a>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}