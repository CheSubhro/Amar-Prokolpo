
import React from 'react';
import { Separator } from '../../ui/separator';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-background border-t">
            <div className="max-w-7xl mx-auto px-4 py-8">

                <Separator className="my-6" />

                <div className="text-center text-sm text-muted-foreground">
                © {currentYear} Amar Prokolpo. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;