
import Sidebar from '../components/layout/Sidebar/Sidebar';
import { Navbar } from '../components/layout/index';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'; 
import { Menu } from 'lucide-react'; 

const MainLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <div className="hidden md:flex">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col">
                <header className="md:hidden p-4 border-b">
                    <Sheet>
                        <SheetTrigger><Menu /></SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <Sidebar />
                        </SheetContent>
                    </Sheet>
                </header>

                <Navbar />
                <main className="p-6 flex-1 bg-gray-50">{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;