import { render } from "@testing-library/react"
import { Component } from "react"
import PageTemplate from "./pageTemplate"

export default class AboutUsPage extends Component{
    render(){
        return(
            <PageTemplate>
                <div class="p-5">
                    <h3>About Us</h3>
                </div>
            </PageTemplate>
        )
    }
}