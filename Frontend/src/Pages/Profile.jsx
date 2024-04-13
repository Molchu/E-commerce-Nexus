import React, { useState, useEffect } from 'react';
import './CSS/Profile.css';
import axios from 'axios';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        fecha_nacimiento: ''
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const response = await axios.get('http://localhost:4000/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                if (error.response.status === 401) {
                    console.error('Error al obtener la información del usuario:', error);
                    setLoading(false);
                }
            }
        };

        fetchUserInfo();
    }, []);

    const handleEdit = () => {
        setEditing(true);
        setNewUserInfo({
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
            telefono: user.telefono,
            fecha_nacimiento: user.fecha_nacimiento
        });
    };

    const handleConfirm = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            await axios.put('http://localhost:4000/userinfo', newUserInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Actualizar la información del usuario en el estado
            setUser(newUserInfo);
            setEditing(false);
        } catch (error) {
            console.error('Error al actualizar la información del usuario:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUserInfo({
            ...newUserInfo,
            [name]: value
        });
    };

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (!user) {
        return <p className="error">No se pudo cargar la información del usuario.</p>;
    }

    return (
        <div className="profile-container">
            <h1>Perfil de usuario</h1>
            {editing ? (
                <>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={newUserInfo.nombre} onChange={handleChange} />
                    <label>Apellido:</label>
                    <input type="text" name="apellido" value={newUserInfo.apellido} onChange={handleChange} />
                    <label>Correo electrónico:</label>
                    <input type="email" name="correo" value={newUserInfo.correo} onChange={handleChange} />
                    <label>Teléfono:</label>
                    <input type="tel" name="telefono" value={newUserInfo.telefono} onChange={handleChange} />
                    <label>Fecha de nacimiento:</label>
                    <input type="date" name="fecha_nacimiento" value={newUserInfo.fecha_nacimiento} onChange={handleChange} />
                    <button onClick={handleConfirm}>Confirmar</button>
                </>
            ) : (
                <>
                    <p>Nombre: {user.nombre}</p>
                    <p>Apellido: {user.apellido}</p>
                    <p>Correo electrónico: {user.correo}</p>
                    <p>Teléfono: {user.telefono}</p>
                    <p>Fecha de nacimiento: {user.fecha_nacimiento}</p>
                    <button onClick={handleEdit}>Editar</button>
                </>
            )}
        </div>
    );
};

export default Profile;