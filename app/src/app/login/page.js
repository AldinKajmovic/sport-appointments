"use client";

import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { LanguageContext } from '../context/LanguageContext';
import { Box, TextField, Button, Tooltip } from '@mui/material';
import './../globals.css';
import './LoginRegister.css';

const LoginRegister = () => {
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const { language, setLanguage } = useContext(LanguageContext);
    
    const [userRole, setUserRole] = useState(null);
    
    useEffect(() => {
        const loginCookie = getCookie('login-cookie');
        if (loginCookie) {
            const { user_role } = JSON.parse(decodeURIComponent(loginCookie.replace(/\+/g, ' ')));
            setUserRole(user_role);
        }
    }, []);

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:8000/login', data, { withCredentials: true });
            const loginCookie = getCookie('login-cookie');
            if (loginCookie) {
                const { user_role } = JSON.parse(decodeURIComponent(loginCookie.replace(/\+/g, ' ')));
                setUserRole(user_role);

                if (user_role) {
                    window.location.href = user_role === 'Admin' ? '/admin_panel' : '/homepage';
                }
            }
        } catch (error) {
            console.error("Error: ", error);
            router.push("/login");
        }
    };
    

    const handleLanguageChange = (lang) => setLanguage(lang);

    return (
        <div className='wrapper'>
            <div className='login'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>{language === 'en' ? 'Login' : 'Prijava'}</h1>

                    <Box display="flex" flexDirection="column" alignItems="center" marginTop="4vh">
                        <div className='input-box'>
                            <TextField
                                required
                                id="username"
                                label={language === 'en' ? 'Username' : 'Korisničko ime'}
                                variant="outlined"
                                {...register("username", { required: true })}
                            />
                        </div>

                        <div className='input-box'>
                            <TextField
                                required
                                type="password"
                                id="password"
                                label={language === 'en' ? 'Password' : 'Lozinka'}
                                variant="outlined"
                                {...register("password", { required: true })}
                            />
                        </div>
                        
                        <button type='submit'>
                            {language === 'en' ? 'Log In' : 'Prijavi se'}
                        </button>
                    </Box>

                    <div className='register-link'>
                        <p>
                            {language === 'en' ? "Don't have a profile?" : 'Nemaš profil?'}
                            <a href="/registration">
                                {language === 'en' ? ' Register!' : ' Registruj se!'}        
                            </a>
                        </p>
                    </div>

                    <div className='language-switcher'>
                        <Tooltip title="Change language to Bosnian" sx={{ margin: 0, padding: 0 }}>
                            <Button variant="text" onClick={() => handleLanguageChange('bs')}>BS</Button>
                        </Tooltip>
                        <Tooltip title="Change language to English" sx={{ margin: 0, marginLeft: '20px', marginRight: '20px', padding: 0 }}>
                            <Button variant="text" onClick={() => handleLanguageChange('en')}>EN</Button>
                        </Tooltip>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
