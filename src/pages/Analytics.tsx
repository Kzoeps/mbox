import React from "react";
import AnalyticCard from "../components/analytic-card";
import { Box } from "@chakra-ui/react";
import {FcMoneyTransfer} from 'react-icons/fc';
import {RiExchangeBoxLine} from 'react-icons/ri';
import {IoPricetagsOutline} from 'react-icons/io5';

export default function Analytics() {
    console.log('test')
    return <>
        <Box m={'auto'} >
            <AnalyticCard title="Total transaction amount" amount="Nu. 130,000" date="Feb 1st - Feb 28th">
                <FcMoneyTransfer size='2em' color='orange'/>
            </AnalyticCard> 
            <AnalyticCard title="Number of transactions" amount="4000" date="Feb 1st - Feb 28th">
                <RiExchangeBoxLine size='2em' color='orange'/>
            </AnalyticCard> 
            <AnalyticCard title="Highest transaction amount" amount="Nu. 8000" date="Feb 1st - Feb 28th">
                <IoPricetagsOutline size='2em' color='orange'/>
            </AnalyticCard> 
        </Box>
    </>
}