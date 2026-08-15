import profilePic from './assets/hero.png';

function Card() {
    return (
        <div className="card">
            <img src={profilePic} alt="Card Image" />
            <h2>Card Title</h2>
            <p>This is the card content.</p>
        </div>
    );
}

export default Card