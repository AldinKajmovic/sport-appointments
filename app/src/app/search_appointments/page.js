"use client"

import * as React from "react";
import { TextField, Autocomplete, Button, Box, Typography} from "@mui/material";
import axios from "axios";
import { colors } from '../../colors.js'
import AppointmentCard from "../components/cards/AppointmentCard.js";
import loader from '../assets/loading.gif';
import { Grid } from '@mui/material';
import Navbar from '../components/navbar/navbar'
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import AppointmentModal from "../components/modals/AppointmentModal"

const content = {
    en: {
        area: "Area",
        search: "Search",
        noResults: "No appointments found."
    },
    bs: {
        area: "Teren",
        search: "Pretraga",
        noResults: "Nema pronađenih termina."
    }
}

export default function SearchAppointments() {
    const { language } = useContext(LanguageContext);
    const [searchResults, setSearchResults] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const [team_id, setTeam] = React.useState('');
    const [listOfTeams, setListOfTeams] = React.useState([]);


    async function fetchData() {
        try {
            const response = await axios.get("http://localhost:8000/search_appointments", { withCredentials: true });

            if (response.data.length === 0 || response.data.detail === "No appointments found") {
                setSearchResults([]);
            } else {
                const transformedAppointmentRows = response.data.map(row => {
                    const { appointment_id, ...rest } = row;
                    return {
                        id: appointment_id,
                        ...rest
                    };
                });
                setSearchResults(transformedAppointmentRows);
            }
        } catch (error) {
            console.log("Error: " + error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>

            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
                flexGrow: 1, minWidth: 200,
                marginTop: '3vh'
            }}>
                <AppointmentModal></AppointmentModal>
            </Box>

            <Box sx={{ marginTop: '7vh', marginLeft: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {loading ? (
                    <Grid container justifyContent="center" alignItems="center" style={{ height: '78vh' }}>
                        <img src={loader.src} alt="Loading..." style={{ height: '10vh' }} />
                    </Grid>
                ) : searchResults.length === 0 ? (
                    <Grid container justifyContent="center" alignItems="center" style={{ height: '78vh' }}>
                        <Typography variant="h6">{content[language].noResults}</Typography>
                    </Grid>
                ) : (
                    searchResults.map(appointment => (
                        <AppointmentCard
                            key={appointment.id}
                            time={appointment.time}
                            area_name={appointment.area_name}
                            team_name={appointment.team_name}
                            sport_name={appointment.sport_name}
                            teamPlayerCount={appointment.teamPlayerCount}
                            maxPlayerCount={appointment.maxPlayerCount}
                            style={{ flex: '1 1 50%', maxWidth: '50%' }}
                            show="true"
                   
                        />
                    ))
                )}
            </Box>
        </div>
    );
}