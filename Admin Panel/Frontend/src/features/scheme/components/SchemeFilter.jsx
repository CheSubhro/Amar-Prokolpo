
import React from 'react';
import { Input } from '../../../components/ui/input';

const SchemeFilter = ({ onSearch }) => {
    return (
        <div className="mb-4">
            <Input 
                placeholder="Search schemes by name..." 
                className="max-w-sm"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
};

export default SchemeFilter;