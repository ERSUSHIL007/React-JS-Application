import React, { useState, useEffect } from 'react';

function ObjectUpdateComponent() {

    const [carDetails, setCarDetails] = useState({
        year: 2026,
        make: 'Toyota',
        model: 'Camry'
    });

    function handleYearChange(event) {
        setCarDetails(carDetails => ({
            ...carDetails,
            year: event.target.value
        }))
    }

    function handleMakeChange(event) {
        setCarDetails(carDetails => ({
            ...carDetails,
            make: event.target.value
        }))
    }

    function handleModelChange(event) {
        setCarDetails(carDetails => ({
            ...carDetails,
            model: event.target.value
        }))
    }

    return (
      <div>
        <p>
          Car Details: {carDetails.year} {carDetails.make} {carDetails.model}
        </p>
        <label htmlFor="CarDetails">
          Car Manufacture Year:
          <input
            type="number"
            value={carDetails.year}
            onChange={handleYearChange}
          />
        </label>
        <br />
        <label htmlFor="CarDetails">
          Car Manufacturer:
          <input
            type="text"
            value={carDetails.make}
            onChange={handleMakeChange}
          />
        </label>
        <br />
        <label htmlFor="CarDetails">
          Car Model:
          <input
            type="text"
            value={carDetails.model}
            onChange={handleModelChange}
          />
        </label>
      </div>
    );
}

export default ObjectUpdateComponent