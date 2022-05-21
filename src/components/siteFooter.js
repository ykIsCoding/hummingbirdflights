import React,{ Component } from "react";
import {BsInstagram, BsFacebook, BsTwitter} from 'react-icons/bs'

export default class SiteFooter extends Component{
    render(){
        return(
            <div style={{background:"linear-gradient(90deg, rgba(84,106,255,1) 0%, rgba(32,188,255,1) 100%)",width:"100vw",overflowX:"hidden"}}>
                <div class="m-2 p-3 d-flex justify-content-center align-items-center">
                        <div class="m-2 d-flex flex-row justify-content-center">
                            <BsInstagram size={30} className="smi"/>
                            <BsTwitter size={30} className="smi"/>
                            <BsFacebook size={30} className="smi"/>
                        </div>
                        </div>
                    <div class="p-2 d-flex flex-row justify-content-center align-items-center">
                        Hummingbird Air Transit Corporation. All Rights Reserved.
                    </div>
                </div>
        )
    }
}