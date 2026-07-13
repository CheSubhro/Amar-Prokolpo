
import React from 'react';
import SchemeTable from '../features/scheme/components/SchemeTable';

const Schemes = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Schemes Management</h2>
            <SchemeTable /> 
        </div>
    );
};
export default Schemes;