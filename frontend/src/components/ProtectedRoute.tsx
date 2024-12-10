import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

// Composant pour les routes protégées
const ProtectedRoute = ({ }: { children: JSX.Element }) => {
    const { user } = useUser(); // Récupère les informations de l'utilisateur depuis le contexte

    // Vérifie si l'utilisateur est connecté et est admin
    if (!user || !user.isAdmin) {
        // Redirige vers la page de login si non connecté ou non admin
        return <Navigate to="/admin" />;
        console.log("User est pas admin");
    }

    else {
        console.log("User est admin");
        return <Navigate to="/admin" />;
    }
};

export default ProtectedRoute;
