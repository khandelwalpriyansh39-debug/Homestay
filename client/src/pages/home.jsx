import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const homes = [
    {
      id: 1,
      name: "New Fort",
      location: "Jaipur, Rajasthan, IND",
      price: "Rs7800 / night",
      distance: "1.0 km",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      name: "Silli Villa",
      location: "Jagatpura, Jaipur",
      price: "Rs5000 / night",
      distance: "1.0 km",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Maya Ghar",
      location: "Delhi",
      price: "Rs78500 / night",
      distance: "1.0 km",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Forest View",
      location: "Tamil Nadu",
      price: "Rs8000 / night",
      distance: "1.0 km",
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Aparnam Resort",
      location: "Agra",
      price: "Rs25000 / night",
      distance: "1.0 km",
      image:
        "https://images.unsplash.com/photo-1616594039964-ae9021a3fc06?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Homestay</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Home-list</li>
          <li>Add home</li>
          <li>Bookings</li>
        </ul>
        <div className="auth-buttons">
          <button className="auth-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="auth-btn" onClick={() => navigate("/signup")}>
            Signup
          </button>
        </div>
      </nav>

      {/* Home Content */}
      <div className="home-container">
        <h2 className="home-heading">Here are our registered homes 🏡</h2>

        <div className="card-scroll">
          {homes.map((home) => (
            <div key={home.id} className="home-card">
              <img src={home.image} alt={home.name} className="home-img" />
              <div className="home-info">
                <h3>{home.name}</h3>
                <p className="location">{home.location}</p>
                <p className="price">{home.price}</p>
                <p className="distance">Distance: {home.distance}</p>
                <div className="btn-group">
                  <button className="details-btn">Details</button>
                  <button className="book-btn">Book</button>
                  <button className="fav-btn">
                    <FaHome />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body, html, .home-page {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background-color: #fbf4f1;
          overflow-x: hidden;
        }

        /* Navbar */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 40px;
          background: linear-gradient(90deg, #a05d54, #c2877b);
          color: white;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
        }

        .logo {
          font-weight: 700;
          font-size: 20px;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 25px;
          margin: 0;
          padding: 0;
        }

        .nav-links li {
          cursor: pointer;
          transition: 0.3s;
        }

        .nav-links li:hover {
          text-decoration: underline;
        }

        .auth-buttons {
          display: flex;
          gap: 10px;
        }

        .auth-btn {
          background: transparent;
          border: 1px solid white;
          padding: 6px 14px;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .auth-btn:hover {
          background: white;
          color: #a05d54;
        }

        /* Home Container */
        .home-container {
          padding-top: 100px;
          text-align: center;
          overflow-x: hidden;
        }

        .home-heading {
          color: #a05d54;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 25px;
        }

        /* Horizontal Scroll Section */
        .card-scroll {
          display: flex;
          gap: 25px;
          overflow-x: auto;
          padding: 20px 40px;
          scroll-behavior: smooth;
        }

        .card-scroll::-webkit-scrollbar {
          height: 10px;
        }

        .card-scroll::-webkit-scrollbar-thumb {
          background: #c2877b;
          border-radius: 10px;
        }
          /* Horizontal Scroll Container */
.card-scroll {
  display: flex;
  gap: 25px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 20px 40px;
  scroll-behavior: smooth;
  width: 100%;
  box-sizing: border-box;
}

/* Ensure cards never cut off */
.card-scroll::after {
  content: "";
  flex: 0 0 40px; /* adds breathing space at the right end */
}

/* Scrollbar design */
.card-scroll::-webkit-scrollbar {
  height: 10px;
}
.card-scroll::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #a05d54, #c2877b);
  border-radius: 10px;
}
.card-scroll::-webkit-scrollbar-track {
  background: #f5e7e4;
}

/* Individual Cards */
.home-card {
  flex: 0 0 280px; /* fixed width so they align evenly */
  background: #fffaf9;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.home-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(160, 93, 84, 0.25);
}

/* Responsive: shrink slightly on small screens */
@media (max-width: 1200px) {
  .home-card {
    flex: 0 0 260px;
  }
}
@media (max-width: 768px) {
  .home-card {
    flex: 0 0 240px;
  }
  .card-scroll {
    padding: 10px 20px;
  }
}


        .card-scroll::-webkit-scrollbar-track {
          background: #f5e7e4;
        }

        /* Cards */
        .home-card {
          flex: 0 0 280px;
          background: #fffaf9;
          border-radius: 16px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .home-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 15px rgba(160, 93, 84, 0.25);
        }

        .home-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .home-info {
          padding: 15px;
        }

        .home-info h3 {
          margin: 10px 0 5px;
          color: #7b3e36;
          font-size: 18px;
        }

        .location {
          color: #7b7b7b;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .price {
          color: #d14d4d;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .distance {
          color: #8c6b68;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .btn-group {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        .details-btn, .book-btn, .fav-btn {
          border: none;
          padding: 8px 14px;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          transition: 0.3s;
        }

        .details-btn {
          background: linear-gradient(90deg, #a05d54, #c2877b);
        }

        .book-btn {
          background: #f9a66b;
        }

        .fav-btn {
          background: #c2877b;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .details-btn:hover {
          opacity: 0.85;
        }

        .book-btn:hover {
          background: #e68d52;
        }

        .fav-btn:hover {
          background: #a05d54;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .card-scroll {
            padding: 10px 20px;
          }

          .home-card {
            flex: 0 0 250px;
          }

          .home-heading {
            font-size: 22px;
          }
        }
          
      `}</style>
    </div>
  );
};

export default Home;
