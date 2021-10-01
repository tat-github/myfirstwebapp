import React from "react";

const Navigation = ({onRouteChange, name, route}) =>{
    if(route === "register"){
        return(
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
                <p onClick={()=>onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'> Sign in </p>
            </nav>
        );
    }
    else{
        return(
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
                <p className='f3 dim black  pa3 pointer'> Hello {name}</p>
                <p onClick={()=>onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'> Sign out </p>
            </nav>
        );
    }
}

export default Navigation;