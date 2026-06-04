import Link from "next/link";
import { Fragment } from "react";
import MainLayout from "@/components/MainLayout";

const HomePage = () =>{
    return( 
        <Fragment>
            <MainLayout>
				<div className="page-content bg-light">    
					<div className="main-slider-wrapper">
						<div className="slider-inner">
							<h4>Hello start code from here....</h4>
						</div>
					</div>
				</div>							
            </MainLayout>
        </Fragment>
    )
}
export default HomePage;