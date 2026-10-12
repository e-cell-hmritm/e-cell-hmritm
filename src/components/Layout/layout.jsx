import React from 'react';

const Layout = ({ children, showCanvas = false }) => {
    return (
        <div className="relative min-h-screen selection:bg-primary/30">
            {showCanvas && <HeroCanvas />}
            <main className="relative z-10">
                {children}
            </main>

            {/* Decorative Orbs */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-20"></div>
            <div className="fixed bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-20"></div>
        </div>
    );
};

export default Layout;