import * as React from 'react';

import Typography from '@mui/material/Typography';
import {PlayArrow, OpenInFull} from "@mui/icons-material";
import {Box} from "@mui/material";
import MPSnippet from "./MPSnippet";


interface MPSnippetContainerProps {
    style?: React.CSSProperties;
}

export default function MPSnippetContainer(props: MPSnippetContainerProps) {
    return (


        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={props.style}>
            <MPSnippet title="drums"/>
            <MPSnippet title="vocals"/>
            <MPSnippet title="guitar"/>
            <MPSnippet title="bass"/>
        </Box>


    );
}
