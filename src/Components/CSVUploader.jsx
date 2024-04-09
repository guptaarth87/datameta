import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import API_URL from '../_helper';
import axios from 'axios';
import './CheckForeignKey.css';

const CSVUploader = () => {
    const [csvData, setCSVData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [transformedData, setTransformedData] = useState([]);
    const [fileName, setFileName] = useState('');
    const [responseTable, setResponseTable] = useState([]);

    const handleCSVUpload = (data, fileInfo) => {
        setCSVData(data);
        if (data.length > 0) {
            const firstRow = data[0];
            const columnNames = Object.keys(firstRow);
            setColumns(columnNames);
        }
        setFileName(fileInfo.name);
    };

    const preprocessData = () => {
        if (csvData.length === 0) {
            console.log('No data to preprocess.');
            return;
        }

        const transformedRows = [];
        columns.forEach((column) => {
            const values = csvData.map((row) => row[column]).join(',');
            transformedRows.push({ 'Table Name': fileName, 'Column Name': column, 'Values': values });
        });

        setTransformedData(transformedRows);
    };

    const handlePrediction = async () => {
        const generatedData = transformedData.map((row) => ({
            'table': row['Table Name'],
            'column': row['Column Name'],
            'sample_data': row['Values']
        }));

        // Simulated API endpoint URL
        // const apiUrl = 'https://example.com/api/predict';

        try {
            // Simulated response data for testing
            let Prediction = []
            for (const item of generatedData) {
                try {
                    // Make a POST request for each object in the array
                    // const response = await axios.post(`${API_URL}/predict`, item);
                    // uncomment on real api
                    // console.log('Prediction Response:', response.data);
                    // Prediction.push(response.data.prediction)
                    
                    Prediction.push(1)

                    // Process the response here if needed
                    const samplePredictions = Prediction; // Sample predictions

                    const responseTableData = transformedData.map((obj, index) => ({
                        name: `${obj['Column Name']}`,
                        isPrimary: samplePredictions[index] === 1 ? 'Yes' : 'No'
                    }));
        
                    setResponseTable(responseTableData);
                } catch (error) {
                    console.error('Error making prediction:', error);
                }
            }
           
        } catch (error) {
            console.error('Error making prediction:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Upload  File</h2>
            <CSVReader
                onFileLoaded={handleCSVUpload}
                parserOptions={{ header: true, dynamicTyping: true, skipEmptyLines: true }}
            />
            <hr />
            <h3>Data</h3>
            <div className="table-container">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            {columns.map((columnName, index) => (
                                <th key={index}>{columnName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {csvData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((columnName, colIndex) => (
                                    <td key={colIndex}>{row[columnName]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
            <hr />
            <button className="btn btn-primary" onClick={preprocessData}>Preprocess Data</button>

            <h3 className="mt-5">Transformed Data</h3>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Column Name</th>
                            <th>Values</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transformedData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{row['Table Name']}</td>
                                <td>{row['Column Name']}</td>
                                <td>{row['Values']}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <hr />
            <button className="btn btn-primary" onClick={handlePrediction}>Make Prediction</button>

            <h3 className="mt-5">Prediction Results</h3>
            <div className="table-container">
            <div className="table-responsive">
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
            </div>
        </div>
    );
};

export default CSVUploader;
