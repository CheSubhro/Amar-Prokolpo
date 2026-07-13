
import React, { useEffect, useState } from 'react';
import { useScheme } from '../../../hooks/useScheme';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import SchemeFilter from './SchemeFilter';

const SchemeTable = () => {

    const { schemes, loading, getSchemes } = useScheme();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getSchemes();
    }, []);

    const filteredSchemes = Array.isArray(schemes) 
        ? schemes.filter(s => s.title?.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    return (
        <div>
            <SchemeFilter onSearch={setSearchQuery} />
            <div className="border rounded-xl">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>
                        ) : filteredSchemes.length > 0 ? (
                            filteredSchemes.map((scheme) => (
                                <TableRow key={scheme.id}> 
                                    <TableCell className="font-medium">{scheme.title}</TableCell> 
                                    <TableCell>
                                        {scheme.category?.name || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={scheme.status === "Active" ? "default" : "secondary"}>
                                            {scheme.status || "N/A"}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={3}>No schemes found.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default SchemeTable;
