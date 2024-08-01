import { Image  } from "primereact/image";
import { getUser } from "../action";


/*


primereact/resources/themes/bootstrap4-light-blue/theme.css
primereact/resources/themes/bootstrap4-light-purple/theme.css
primereact/resources/themes/bootstrap4-dark-blue/theme.css
primereact/resources/themes/bootstrap4-dark-purple/theme.css
primereact/resources/themes/md-light-indigo/theme.css
primereact/resources/themes/md-light-deeppurple/theme.css
primereact/resources/themes/md-dark-indigo/theme.css
primereact/resources/themes/md-dark-deeppurple/theme.css
primereact/resources/themes/mdc-light-indigo/theme.css
primereact/resources/themes/mdc-light-deeppurple/theme.css
primereact/resources/themes/mdc-dark-indigo/theme.css
primereact/resources/themes/mdc-dark-deeppurple/theme.css
primereact/resources/themes/tailwind-light/theme.css
primereact/resources/themes/fluent-light/theme.css
primereact/resources/themes/lara-light-blue/theme.css
primereact/resources/themes/lara-light-indigo/theme.css
primereact/resources/themes/lara-light-purple/theme.css
primereact/resources/themes/lara-light-teal/theme.css
primereact/resources/themes/lara-dark-blue/theme.css
primereact/resources/themes/lara-dark-indigo/theme.css
primereact/resources/themes/lara-dark-purple/theme.css
primereact/resources/themes/lara-dark-teal/theme.css
primereact/resources/themes/soho-light/theme.css
primereact/resources/themes/soho-dark/theme.css
primereact/resources/themes/viva-light/theme.css
primereact/resources/themes/viva-dark/theme.css
primereact/resources/themes/mira/theme.css
primereact/resources/themes/nano/theme.css
primereact/resources/themes/saga-blue/theme.css
primereact/resources/themes/saga-green/theme.css
primereact/resources/themes/saga-orange/theme.css
primereact/resources/themes/saga-purple/theme.css
primereact/resources/themes/vela-blue/theme.css
primereact/resources/themes/vela-green/theme.css
primereact/resources/themes/vela-orange/theme.css
primereact/resources/themes/vela-purple/theme.css
primereact/resources/themes/arya-blue/theme.css
primereact/resources/themes/arya-green/theme.css
primereact/resources/themes/arya-orange/theme.css
primereact/resources/themes/arya-purple/theme.css
        

*/

import '../../user.css'
import { Skeleton } from "primereact/skeleton";


export default async function LoadingProfile() {
  
    return (
        <div className='h-full w-full mx-auto'>
            <div className='flex flex-row flex-wrap justify-center gap-3'>
                <div className=''>
                    {/* <Image imageClassName="avatar-img w-52 border-2 border-white" src={user.avatar_url} alt={`${user.fullname} avatar`} preview /> */}
                    <Skeleton shape="circle" size="13rem" className="w-52"></Skeleton>
                </div>
                <div className="flex flex-col gap-3">
                    <div className='h-fit flex flex-rows gap-2 flex-wrap items-center '>
                        <Skeleton width="11rem" height="2.5rem" className=""></Skeleton>
                        <div className='w-2 h-2 bg-gray-200 rounded-full'></div>
                        <Skeleton width="6rem" height="2rem" className=""></Skeleton>
                    </div>
                    <div className="flex flex-row gap-2 flex-wrap">
                        <Skeleton width="8rem" height="3rem" className=""></Skeleton>
                        <Skeleton width="8rem" height="3rem" className=""></Skeleton>
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