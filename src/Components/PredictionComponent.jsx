import React, { useEffect, useState } from 'react';

const PredictionComponent = () => {
    const [data, setData] = useState([]);
    const [responseTable, setResponseTable] = useState([]);

    useEffect(() => {
        // Simulated data for testing
        const testData = [
            { tablename: 'Table1', 'column name': 'Column1', Values: '1,1,1,0,0,1,1,0,0,1,0,0,1,1,1,0,0,1,1,1,1,0,1,1,1,1,0,0,0,1' },
            { tablename: 'Table2', 'column name': 'Column2', Values: '1,0,1,1,0,0,1,0,1,1,0,1,1,1,0,1,1,0,0,1,1,0,0,0,1,1,1,0,1,1' }
            // Add more test data as needed
        ];

        // Sample prediction array
        const samplePredictions = [1, 0];

        // Combine testData and samplePredictions into a single array
        const combinedData = testData.map((obj, index) => ({ ...obj, prediction: samplePredictions[index] }));

        // Set combinedData as the data state for display purposes
        setData(combinedData);

        // Generate responseTable based on sample predictions
        const generatedTable = combinedData.map(obj => ({
            name: `${obj['column name']}`,
            isPrimary: obj.prediction === 1 ? 'Yes' : 'No'
        }));
        setResponseTable(generatedTable);
    }, []);

    return (
        <div className="container">
            <h2>Data Table</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name of Object</th>
                        <th>Is Primary Key?</th>
                    </tr>
                </thead>
                <tbody>
                    {responseTable.map((row, index) => (
                        <tr key={index}>
                            <td>{row.name}</td>
                            <td>{row.isPrimary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PredictionComponent;
