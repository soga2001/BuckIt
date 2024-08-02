import '../../user.css'
import { Skeleton } from "primereact/skeleton";
import { Button } from "@mui/material";
import variables from '@/styles/variables.module.scss'

import "primereact/resources/themes/lara-light-cyan/theme.css";



export default async function LoadingProfile() {
  
    return (
        <div className='h-full w-full mx-auto'>
            <div className='flex flex-row flex-wrap justify-center gap-3'>
                <div className=''>
                    {/* <Image imageClassName="avatar-img w-52 border-2 border-white" src={user.avatar_url} alt={`${user.fullname} avatar`} preview /> */}
                    <Skeleton shape="circle" size="13rem"></Skeleton>
                </div>
                <div className="flex flex-col gap-3">
                    <div className='h-fit flex flex-rows gap-2 max-[800px]:flex-col flex-wrap items-center '>
                        <Skeleton width="11rem" height="2.5rem" className=""></Skeleton>
                        <div className='w-2 h-2 bg-gray-200 max-[800px]:hidden rounded-full'></div>
                        <Skeleton width="6rem" height="2rem" className=""></Skeleton>
                    </div>
                    <div className="flex flex-row  gap-2 max-[800px]:justify-center flex-wrap">
                        <Skeleton width="6rem"height="2.5rem" className=""></Skeleton>
                        <Skeleton width="6rem" height="2.5rem" className=""></Skeleton>
                        {/* <Button className={`${variables['filled']}`} >Follow</Button> */}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Skeleton width="100%" height="1rem" className=""></Skeleton>
                        <Skeleton width="100%" height="1rem" className=""></Skeleton>
                        <Skeleton width="100%" height="1rem" className=""></Skeleton>
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}