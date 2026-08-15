function Food() {
    const food1 = "Salads";
    const food2 = "Grams";

    return (
        <ul>
            <li>Food Items</li>
            <li>{food1}</li>
            <li>{food2.toUpperCase()}</li>
        </ul>
    );

}

export default Food