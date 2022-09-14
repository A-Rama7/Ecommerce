import Navbar from '../../components/Navbar/Navbar';
import "./ExpKeyboard.css";

const ExpKeyboard = () => {
    return (
        <>
            <div>
                <h1 className='h1'>Comment construire son clavier mécanique ?</h1>
                <h2 className='h2 lign'>Étape 1: Comment choisir son clavier ?</h2>
                <div className='partie_un'>
                    <div className='left'>
                        <img src='../imports/size_clavier.jpg' alt='size_clavier' className='img_dsc'/>
                    </div>
                    <div className='right'>
                        <h3 className='h3'> Quelle taille de clavier choisir ?</h3>
                        <ul className='ul'>
                            <li className='li'>1800-Compact (96%) : Un format de présentation super cool qui axe le groupe de navigation et écrase le pavé numérique avec le reste des touches. Vous ne pouvez trouver cette taille que par des achats groupés.</li>
                            <li className='li'>Sans pavé numérique : Une disposition commune qui coupe le pavé numérique tout en conservant le reste de la disposition du clavier.</li>
                            <li className='li'>75% : Similaire à la version sans clé, sauf que le groupe de navigation est placé verticalement pour gagner de la place. Amusant et confortable à utiliser.</li>
                            <li className='li'>65% : Cette disposition supprime la ligne de fonction et conserve une partie du groupe de navigation. C'est également la plus petite taille de clavier qui conserve les touches fléchées dédiées.</li>
                            <li className='li'>60% : La disposition de clavier personnalisée la plus courante. Il n'y a pas de ligne de fonction, de touches fléchées ou de groupe de navigation. Vous pouvez trouver facilement des touches pour clavier 60%.</li>
                            <li className='li'>40% : La plus petite taille sur laquelle vous pouvez encore taper. Il s'agit essentiellement d'un clavier à 60 %, sauf que vous enlevez les touches numériques. Vous devrez vous habituer à taper sur différentes couches pour utiliser cette taille. Une très longue période d'adaptation est nécessaire pour une mise en page à 40 %.</li>
                        </ul>
                        <h3 className='h3'> Choisir les caractéristiques</h3>
                        <ul className='ul'>
                            <li className='li'>Eclairage RGB : Si vous voulez un spectacle de lumières, le RGB est la solution. Il existe également différents types d'éclairage RVB, RVB sur chaque touche, éclairage latéral RVB et sous la coque. Tout dépend de la luminosité que vous voulez donner à votre installation.</li>
                            <li className='li'>Firmware QMK : Si vous avez besoin que votre clavier soit programmable pour pouvoir redéfinir les touches, le microprogramme QMK est indispensable. Tout le monde n'a pas besoin de QMK, mais c'est toujours un ajout intéressant.</li>
                            <li className='li'>Port USB : Le choix de la connectique USB peut être important. Nous recommandons l'USB-C car il est réversible. Vous n'avez pas à vous soucier de brancher le câble à l'envers. L'emplacement du port sur le clavier est également important en fonction de vos préférences.</li>
                        </ul>
                    </div>
                </div>
                <h2 className='h2 lign'>Étape 2: Choisir les pièces</h2>
                <div className='partie_deux'>
                    <div className=''>
                        <h3 className='h3'>Coque du clavier: </h3>
                        <ul className='ul'>
                            <li className='li'>Plaque : Aluminium, acier, laiton, fibre de carbone, POM...</li>
                            <li className='li'>Circuit imprimé PCB : Les tailles : 40%, 60%, 65%, 75%, TKL, 1800-Compact ou Full-Sized</li>
                            <li className='li'>Stabilisateurs : Options - GMK, Durock, Everglide, ZealPC</li>
                            <li className='li'>Switches : Cherry MX, Gateron, NovelKeys, ZealPC, et bien d'autres</li>
                            <li className='li'>Touches : Matériel : Fabricant ABS ou PBT : GMK, Tai Hao, Drop, et plus</li>
                        </ul>
                        <h3 className='h3'>Voici les éléments dont vous aurez besoin:</h3>
                        <ul className='ul'>
                            <li className='li'>PCB (circuit imprimé) : Le circuit imprimé est l'élément vital de votre clavier. C'est le cerveau et l'unité centrale. Le PCB que vous choisissez détermine la taille, les caractéristiques et la disposition de votre clavier.</li>
                            <li className='li'>Le boitier : Le boitier est ce qui maintient tout ensemble et le protège des éléments. Vous pouvez choisir différents matériaux de boîtier en fonction de la durabilité, de l'esthétique ou de la transparence que vous souhaitez donner à votre clavier.</li>
                            <li className='li'>Plaque : La plaque est un élément optionnel, mais elle maintient les interrupteurs en place et ajoute de la rigidité à l'ensemble. C'est absolument recommandé. Il existe différents choix de matériaux et de couleurs.</li>
                            <li className='li'>Stabilisateurs : Les stabilisateurs déterminent la sensation et la sonorité des touches les plus grandes lors de l'utilisation du clavier. Ne négligez pas cet élément, ils sont incroyablement importants.</li>
                            <li className='li'>Interrupteurs : Les interrupteurs sont essentiels pour personnaliser la sensation et le son de votre clavier. Il existe de nombreux types de commutateurs différents, mais ils se répartissent pour la plupart en trois catégories : linéaire, cliquable et tactile.</li>
                            <li className='li'>Les capuchons de touches : Cette partie définit vraiment l'esthétique de votre clavier. Lorsque vous vous asseyez pour taper, c'est avec les touches que vous interagissez le plus. Le profil, le design et la durabilité des touches sont très importants.</li>
                        </ul>
                    </div>
                    <div className='left'>
                    <img src='../imports/carac_clavier.jpg' alt='size_clavier' className='img_dsc'/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExpKeyboard;