import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {PlayArrow, OpenInFull, UnfoldMore} from "@mui/icons-material";
import {Box, Collapse, IconButton} from "@mui/material";
import {useState} from "react";


interface MPSnippetProps {
    title: string;
}

export default function MPSnippet(props: MPSnippetProps) {

    const [isExpanded, setIsExpanded] = useState(false);

    return (

        <div style={{backgroundColor: 'lightblue', width:'100%', borderRadius:'6px', marginTop: '4px', marginBottom: '4px'}}>
            <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row" style={{flex:1}}>
                    <IconButton size="small">
                        <PlayArrow/>
                    </IconButton>

                    <Typography align="left" style={{flex:10, marginLeft:"10px", height:"100%", backgroundColor:"brown"}}>
                        {props.title}
                    </Typography>
                    <IconButton size="small" onClick={() => setIsExpanded(!isExpanded)}>
                        <UnfoldMore/>
                    </IconButton>
                </Box>
                <Collapse in={isExpanded} >
                    <Typography>Expanded!</Typography>
                    {/* WARNING THIS IS GETTING RENDERED EVEN IF 'in' IS FALSE*/}
                    {/*{isExpanded ? <Typography>Expanded!</Typography> : undefined}*/}
                </Collapse>
            </Box>
        </div>
        // <Accordion>
        //     <AccordionSummary
        //         expandIcon={<OpenInFull/>}
        //         aria-controls="panel1a-content"
        //         id="panel1a-header"
        //     >
        //         <PlayArrow/>
        //         <Typography>Play Song</Typography>
        //     </AccordionSummary>
        //     <AccordionDetails>
        //         <Typography>
        //             Expanded audio view
        //         </Typography>
        //     </AccordionDetails>
        // </Accordion>
    );
}
