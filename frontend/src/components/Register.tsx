import React, { useState } from 'react';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (username === '' || email === '' || password === '') {
            setErrorMessage('Tous les champs sont requis.');
            return;
        }

        try {
            // Appel à l'API pour créer un utilisateur
            const response = await fetch('http://localhost:5002/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                setSuccessMessage('Compte créé avec succès !');
                setErrorMessage('');
                setUsername('');
                setEmail('');
                setPassword('');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Erreur lors de la création du compte.');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Erreur lors de l\'appel API:', error);
            setErrorMessage('Erreur serveur. Veuillez réessayer plus tard.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-semibold text-center mb-6 text-black">Créer un compte</h2>
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="text-gray-700 bg-white w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="text-gray-700 bg-white w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="text-gray-700 bg-white w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        S'inscrire
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
