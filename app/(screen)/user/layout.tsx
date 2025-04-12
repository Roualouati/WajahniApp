import { UserDashboard } from "@/app/components/userDashboard";

type Props = {
    children: React.ReactNode;
    };
const layout =({children}:Props)=>{
return(
<div className="flex  h-screen">

<div className="flex-1 overflow-auto p-4">

{children}
<div><UserDashboard/></div></div>

    </div>)
}
export default layout;