import React, { useState } from 'react';
import axios from 'axios';

const ContractInfo = () => {
    const [address, setAddress] = useState('');
    const [contractInfo, setContractInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchContractInfo = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`/api/technical-assessment/contract-info/${address}`);
            setContractInfo(response.data);
        } catch (error) {
            setError('Failed to fetch contract information');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contract-info-container">
            <h2>Smart Contract Information</h2>
            <div className="input-group">
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter contract address"
                    className="contract-input"
                />
                <button 
                    onClick={fetchContractInfo}
                    disabled={loading || !address}
                    className="fetch-button"
                >
                    {loading ? 'Loading...' : 'Fetch Info'}
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {contractInfo && (
                <div className="contract-details">
                    <h3>Contract Details</h3>
                    <div className="info-item">
                        <span>Address:</span>
                        <span>{contractInfo.address}</span>
                    </div>
                    <div className="info-item">
                        <span>Creator:</span>
                        <span>{contractInfo.creator}</span>
                    </div>
                    <div className="info-item">
                        <span>Deployment Time:</span>
                        <span>{new Date(contractInfo.timestamp * 1000).toLocaleString()}</span>
                    </div>
                    <div className="info-item">
                        <span>Network:</span>
                        <span>{contractInfo.network}</span>
                    </div>
                    <div className="info-item">
                        <span>Verified:</span>
                        <span>{contractInfo.isVerified ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="info-item">
                        <span>Creation Transaction:</span>
                        <span>{contractInfo.creationTxHash}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContractInfo; 