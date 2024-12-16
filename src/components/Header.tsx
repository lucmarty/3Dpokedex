import React from 'react';
import SwitchButton from './SwitchButton';

const Header: React.FC = () => {

    return (
        <div className="sticky top-0 z-10 w-full bg-popover p-4 shadow-lg">
            <nav className="flex justify-around">
                <a href="/">
                    <span className='font-semibold text-destructive'>3D</span>
                    <span className='font-semibold text-foreground'>Pokedex</span>
                </a>
                <a href="/team" className="font-semibold text-foreground hover:text-muted-foreground">
                    Organisateur d'équipe
                </a>
                <SwitchButton />
            </nav>
        </div>
    );
};

export default Header;
