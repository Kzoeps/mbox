import React from "react";
import AnalyticCard from "../components/analytic-card";
import { Box } from "@chakra-ui/react";
import {FcMoneyTransfer} from 'react-icons/fc';
import {RiExchangeBoxLine} from 'react-icons/ri';

export default function Analytics() {
    console.log('test')
    return <>
        <Box m={'auto'} >
            <AnalyticCard title="Total transactions this month" amount="Nu. 130,000" date="Feb 1st - Feb 28th">
                <FcMoneyTransfer size='2em' color='orange'/>
            </AnalyticCard> 
            <AnalyticCard title="Transactions this month" amount="4000" date="Feb 1st - Feb 28th">
                <RiExchangeBoxLine size='2em' color='orange'/>
            </AnalyticCard> 
            <AnalyticCard title="Transactions this month" amount="4000" date="Feb 1st - Feb 28th">
                <RiExchangeBoxLine size='2em' color='orange'/>
            </AnalyticCard> 
        </Box>
    </>
}