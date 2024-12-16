import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';


const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook pour la navigation
    const { setUser } = useUser(); // Récupère setUser correctement depuis le contexte


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Vérification simple des champs
        if (username === '' || password === '') {
            setErrorMessage('Tous les champs sont requis.');
            return;
        }

        // Logique de connexion
        try {
            const response = await fetch('http://localhost:5002/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser({
                    username: data.username,
                    isAdmin: data.isAdmin,
                })

                localStorage.setItem('token', data.token); // Stockage du token dans localStorage
                navigate('/'); // Redirection vers la page d'accueil
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Erreur lors de la connexion.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'appel API :', error);
            setErrorMessage('Erreur serveur. Veuillez réessayer plus tard.');
        }

        // Réinitialisation des champs après soumission
        setUsername('');
        setPassword('');
        setErrorMessage('');
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); // Redirection vers la page de registration
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-semibold text-center mb-6 text-black">Connexion</h2>
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="text-gray-700 bg-white w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="text-gray-700 bg-white w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200 mb-4"
                    >
                        Se connecter
                    </button>
                </form>
                <button
                    onClick={handleRegisterRedirect}
                    className="w-full py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-200"
                >
                    Créer un compte
                </button>
            </div>
        </div>
    );
};

export default Login;
