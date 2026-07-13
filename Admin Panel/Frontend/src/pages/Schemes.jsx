
import React,{useState} from 'react';
import SchemeTable from '../features/scheme/components/SchemeTable';
import AddScheme from '../features/scheme/components/AddScheme';
import { Button } from '../components/ui/button';

const Schemes = () => {

    const [isAdding, setIsAdding] = useState(false);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Schemes Management</h2>
                <Button onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? "Cancel" : "Add New Scheme"}
                </Button>
            </div>

            {isAdding ? <AddScheme /> : <SchemeTable />}
        </div>
    );
};
export default Schemes;