import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { FaFilter, FaMapMarkerAlt } from 'react-icons/fa';

function Properties({ API_URL }) {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ status: '', propertyType: '', minPrice: '', maxPrice: '', bedrooms: '', city: '' });
    const [showFilters, setShowFilters] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.searchResults) {
            setProperties(location.state.searchResults);
            setFilteredProperties(location.state.searchResults);
            setSearchQuery(location.state.searchQuery || '');
        } else {
            fetchProperties();
        }
    }, [location.state]);

    const fetchProperties = async () => {
        try {
            const response = await fetch(`${API_URL}/properties`);
            const data = await response.json();
            setProperties(data.properties || []);
            setFilteredProperties(data.properties || []);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...properties];
        if (filters.status) filtered = filtered.filter(p => p.status === filters.status);
        if (filters.propertyType) filtered = filtered.filter(p => p.propertyType === filters.propertyType);
        if (filters.minPrice) filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
        if (filters.maxPrice) filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));
        if (filters.bedrooms) filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
        if (filters.city) filtered = filtered.filter(p => p.location.city.toLowerCase().includes(filters.city.toLowerCase()));
        setFilteredProperties(filtered);
    };

    const resetFilters = () => {
        setFilters({ status: '', propertyType: '', minPrice: '', maxPrice: '', bedrooms: '', city: '' });
        setFilteredProperties(properties);
    };

    if (loading) {
        return <div className="skeleton" style={{ height: '300px', margin: '40px' }}></div>;
    }

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
            {searchQuery && (
                <div style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                    color: 'white', 
                    padding: '20px', 
                    borderRadius: '16px', 
                    marginBottom: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <FaMapMarkerAlt size={24} />
                    <div>
                        <strong>Showing properties in:</strong> {searchQuery}
                    </div>
                </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Properties for Sale & Rent ({filteredProperties.length})</h1>
                <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaFilter /> Filters
                </button>
            </div>
            
            {showFilters && (
                <div style={{ background: 'white', padding: '25px', borderRadius: '16px', marginBottom: '30px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
                        <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                            <option value="">All Status</option>
                            <option value="sale">For Sale</option>
                            <option value="rent">For Rent</option>
                        </select>
                        <select value={filters.propertyType} onChange={(e) => setFilters({...filters, propertyType: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                            <option value="">All Types</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="villa">Villa</option>
                            <option value="commercial">Commercial</option>
                        </select>
                        <input type="number" placeholder="Min Price" value={filters.minPrice} onChange={(e) => setFilters({...filters, minPrice: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                        <input type="number" placeholder="Max Price" value={filters.maxPrice} onChange={(e) => setFilters({...filters, maxPrice: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                        <select value={filters.bedrooms} onChange={(e) => setFilters({...filters, bedrooms: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                            <option value="">Bedrooms</option>
                            <option value="1">1+ BHK</option>
                            <option value="2">2+ BHK</option>
                            <option value="3">3+ BHK</option>
                        </select>
                        <input type="text" placeholder="City" value={filters.city} onChange={(e) => setFilters({...filters, city: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button onClick={applyFilters} className="btn-primary">Apply Filters</button>
                        <button onClick={resetFilters} className="btn-secondary">Reset</button>
                    </div>
                </div>
            )}
            
            {filteredProperties.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px' }}>
                    <p>No properties found in this area.</p>
                    <button onClick={() => window.history.back()} className="btn-primary" style={{ marginTop: '20px' }}>Try Another Location</button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                    {filteredProperties.map(property => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Properties;
