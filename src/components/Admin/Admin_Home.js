import React from 'react';
import '../../App.css';
import DownloadCustomersData from './DownloadCustomersData';

const Admin_Home = () => {
    return (
        <div className='Admin_Home'>
            <h1>Bienvenue ADMIN !</h1>
            <p className='Admin_Home_graphique'>Une div avec des graphiques de vente par jour/mois/annee</p>

            <div className='Admin_Home_WorstBestSell'>
                <p className='Admin_Home_worstSell'>Une div avec les probleme de stock, article les moins vendu , cette div affichera les 4 produits avec le plus de stock et un lien vers l'affichage des articles</p>
                <p className='Admin_Home_bestSell'>Une div avec les meilleurs vente avec un bouton pour commander d'avantage de stock</p>
                <DownloadCustomersData />
            </div>
        </div>
    );
};

export default Admin_Home;