"use client";

import * as React from "react";
import { TextField, Autocomplete, Button, Box } from "@mui/material";
import axios from "axios";
import { colors } from '../../colors.js';
import AreaCard from "../components/cards/AreaCard.js";
import FilterModal from "../components/modals/FilterModalTeam.js";
import loader from '../assets/loading.gif';
import { Grid } from '@mui/material';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import TeamCard from "../components/cards/TeamCard.js";
import AddModal from "../components/modals/AddPlayerTeamModal"
import TeamModal from "../components/modals/TeamModal"


const content = {
    en: {
        team: "Team",
        search: "Search"
    },
    bs: {
        team: "Tim",
        search: "Pretraga"
    }
};

export default function SearchTeams() {
    const { language } = useContext(LanguageContext);
    const [team_id, setTeam] = React.useState('');
    const [listOfTeams, setListOfTeams] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const handleTeamChange = (event, value) => {
        setTeam(value ? value.name : '');
    };

    async function fetchData() {
        
        try {
            const response = await axios.get("http://localhost:8000/user/teams", { withCredentials: true });
            const transformedAreaRows = response.data.map(row => {
                const { team_id, ...rest } = row;
                return {
                    id: team_id,
                    ...rest
                };
            });
            setSearchResults(transformedAreaRows);
            setLoading(false);
            setListOfTeams(transformedAreaRows);
        } catch (error) {
            console.log("Error: " + error);
        }


    }

    
    const handleSubmit = async () => {
        try {
            const response = await axios.get("http://localhost:8000/search_teams", {
                withCredentials: true
            });
            const transformedTeamRows = response.data.map(row => {
                const { team_id, ...rest } = row;
                return {
                    id: team_id,
                    ...rest
                };
            });
            setSearchResults(transformedTeamRows);
        } catch (error) {
            console.log("Error: " + error);
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
                marginTop: '15vh'
    
            }}>

                <FilterModal setSearchResults={setSearchResults} />
                <AddModal/>
                <TeamModal></TeamModal>
            </Box>

            <Box sx={{ marginTop: '7vh', marginLeft: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {loading ? (
                    <Grid container justifyContent="center" alignItems="center" style={{ height: '78vh' }}>
                        <img src={loader.src} alt="Loading..." style={{ height: '10vh' }} />
                    </Grid>
                ) : (
                    searchResults.map(team => (
                        <TeamCard
                            key={team.id}
                            name={team.name}
                            leader={team.leader}
                            sport={team.sport}
                            foundation={team.foundation_date}
                            team_players={team.team_players}
                            style={{ flex: '1 1 50%', maxWidth: '50%' }}
                        />
                    ))
                )}
            </Box>
        </div>
    );
}
