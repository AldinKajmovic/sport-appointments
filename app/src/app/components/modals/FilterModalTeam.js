import React from "react";
import { Modal, Box, Autocomplete, TextField, Button} from "@mui/material";
import { colors } from '../../../colors.js';
import axios from "axios";
import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const content = {
    en: {
        filter: "Filters",
        leader: "Leader",
        sport: "Sport",
        search: "Search",
        close: "Close"
    },
    bs: {
        filter: "Filtri",
        leader: "Vođa",
        sport: "Sport",
        search: "Pretraga",
        close: "Zatvori"
    }
}

export default function FilterModal({setSearchResults}) {
    const { language } = useContext(LanguageContext);
    const [leaders, setLeaders] = React.useState([]);
    const [sports, setSports] = React.useState([]);
    const [selectedLeader, setselectedLeader] = React.useState(null);
    const [selectedSport, setSelectedSport] = React.useState(null);

    const [filterModal, setFilterModal] = React.useState(false);
    const showFilterModal = () => {
        setFilterModal(true);
    };

    const closeFilterModal = () => {
        setFilterModal(false);
    };

    const handleSubmit = async () => {
        const filters = {
            leader: selectedLeader ? selectedLeader : '',
            sport: selectedSport ? selectedSport : ''

        };
        
        try {
            const response = await axios.get("http://localhost:8000/search_teams", {
                params: filters,
                withCredentials: true
            });
            const transformedAreaRows = response.data.map(row => {
                const { team_id, ...rest } = row;
                return {
                    id: team_id,
                    ...rest
                };
            });
            setSearchResults(transformedAreaRows);
            closeFilterModal()
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    async function fetchData() {
        try {
            const response = await axios.get("http://localhost:8000/filter_data_team", { withCredentials: true });
            setLeaders(response.data.leaders);
            setSports(response.data.sports);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <Button variant="contained"
             sx={{
                    background: colors.CHILI_RED, 
                    color: colors.WHITE,
                    '&:hover': {
                    background: colors.WHITE,
                    color: colors.CHILI_RED}}} 
                onClick={showFilterModal}>
                {content[language].filter}
            </Button>
            <Modal open={filterModal} onClose={closeFilterModal}>
                <Box sx={modalStyle}>
                    <Autocomplete
                        options={leaders}
                        getOptionLabel={(option) => option || ""}
                        value={selectedLeader}
                        onChange={(event, value) => setselectedLeader(value)}
                        renderInput={(params) => <TextField {...params} label={content[language].leader} />}
                        sx={{ mb: 2 }} 
                    />
                    <Autocomplete
                        options={sports}
                        getOptionLabel={(option) => option || ""}
                        value={selectedSport}
                        onChange={(event, value) => setSelectedSport(value)}
                        renderInput={(params) => <TextField {...params} label={content[language].sport} />}
                        sx={{ mb: 2 }} 
                    />
               
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button variant="contained" onClick={handleSubmit}
                            sx={{
                                  background: colors.CHILI_RED, 
                                  color: colors.WHITE,
                                  '&:hover': {
                                    background: colors.WHITE,
                                    color: colors.CHILI_RED}}}>
                                {content[language].search}
                            </Button>
                            <Button id="close-button" variant="outlined" onClick={closeFilterModal} 
                                sx={{background: colors.WHITE, color: colors.CHILI_RED, borderColor: colors.WHITE,'&:hover': {borderColor: colors.CHILI_RED}}}>
                                {content[language].close}
                            </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}