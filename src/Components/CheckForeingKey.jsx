import React, { useState } from 'react';
import API_URL from '../_helper';
import axios from 'axios';
import './CheckForeignKey.css';

const CheckForeignKey = () => {
    const [csvFiles, setCsvFiles] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [transformedData, setTransformedData] = useState([]);
    const [responseTable, setResponseTable] = useState([]);

    const handleFileUpload = (event) => {
        const files = event.target.files;
        const fileNamesArray = Array.from(files).map(file => file.name);
        setFileNames(fileNamesArray);

        if (files.length > 0) {
            const fileReaders = [];
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const csvData = e.target.result;
                    setCsvFiles(prevState => [...prevState, csvData]);
                };
                reader.readAsText(file);
                fileReaders.push(reader);
            }
        }
    };
    const preprocessData = () => {
        if (csvFiles.length < 2 || csvFiles.length > 3) {
            alert('Please upload either two or three CSV files.');
            return;
        }
    
        const combinations = [];
        for (let i = 0; i < csvFiles.length; i++) {
            for (let j = 0; j < csvFiles.length; j++) {
                if (i !== j) {
                    combinations.push({ tableA: fileNames[i], tableB: fileNames[j] });
                }
            }
        }
    
        const transformedRows = [];
        combinations.forEach((combination) => {
            const tableA = combination.tableA;
            const tableB = combination.tableB;
            const tableAData = csvFiles[fileNames.indexOf(tableA)];
            const tableBData = csvFiles[fileNames.indexOf(tableB)];
    
            const rowsA = tableAData.split('\n');
            const rowsB = tableBData.split('\n');
    
            const headersA = rowsA[0].split(',');
            const headersB = rowsB[0].split(',');
    
            for (let i = 1; i < headersA.length; i++) {
                for (let j = 1; j < headersB.length; j++) {
                    const columnIndexA = headersA.indexOf(headersA[i]);
                    const columnIndexB = headersB.indexOf(headersB[j]);
    
                    const valuesA = rowsA.slice(1).map(row => row.split(',')[columnIndexA]);
                    const valuesB = rowsB.slice(1).map(row => row.split(',')[columnIndexB]);
    
                    // Limit sample data to 40 records
                    const truncatedValuesA = valuesA.slice(0, 40).join(', ');
    
                    const sampleData = `${truncatedValuesA}`;
                    transformedRows.push({
                        'Table Name': tableA,
                        'Column Name': headersA[i],
                        'Reference Table Name': tableB,
                        'Reference Column Name': headersB[j],
                        'Sample Data': sampleData
                    });
                }
            }
        });
    
        setTransformedData(transformedRows);
    };

    const handlePredictions = async () => {
        
        const predictions = [];

        console.log('Transformed Data:', transformedData);

        for (const obj of transformedData) {
            try {
                const response = await axios.post(`${API_URL}/predict`, obj);
                console.log('Prediction Response:', response.data.prediction);
                predictions.push(response.data.prediction);
            } catch (error) {
                console.error('Error making prediction:', error);
            }
        }

        const newResponseTable = transformedData.map((obj, index) => ({
            'Column Name': obj['Column Name'],
            'Reference Column Name': obj['Reference Column Name'],
            'Is ForeignKey': predictions[index] === 1 ? 'Yes' : 'No'
        }));

        setResponseTable(newResponseTable);
    };
    
    
    return (
        <div className="container mt-5">
            <h2>Check Foreign Key</h2>
            <div>
                <label htmlFor="csvFiles">Upload CSV Files:</label>
                <input type="file" id="csvFiles" accept=".csv" multiple onChange={handleFileUpload} />
            </div>
            <hr />
            <button className="btn btn-primary" onClick={preprocessData}>Preprocess Data</button>

            <h3 className="mt-5">Transformed Data</h3>
            <div className="table-container">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Table Name</th>
                            <th>Column Name</th>
                            <th>Reference Table Name</th>
                            <th>Reference Column Name</th>
                            <th>Sample Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transformedData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{row['Table Name']}</td>
                                <td>{row['Column Name']}</td>
                                <td>{row['Reference Table Name']}</td>
                                <td>{row['Reference Column Name']}</td>
                                <td>{row['Sample Data']}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
            <hr />
            <button className="btn btn-primary" onClick={handlePredictions}>Make Predictions</button>

            <h3 className="mt-5">Response Table</h3>
            <div className="table-container">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Column Name</th>
                            <th>Reference Column Name</th>
                            <th>Is ForeignKey</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responseTable.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{row['Column Name']}</td>
                                <td>{row['Reference Column Name']}</td>
                                <td>{row['Is ForeignKey']}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default CheckForeignKey;
