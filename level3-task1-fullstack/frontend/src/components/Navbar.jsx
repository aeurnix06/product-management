import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav
            style={{
                background: "#2563eb",
                color: "white",
                padding: "15px 40px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <h2>Product Management</h2>

            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <Link style={{ color: "white", textDecoration: "none" }} to="/">
                    Products
                </Link>

                {!user ? (
                    <>
                        <Link style={{ color: "white" }} to="/login">
                            Login
                        </Link>

                        <Link style={{ color: "white" }} to="/signup">
                            Signup
                        </Link>
                    </>
                ) : (
                    <>
                        <span>
                            {user.username} ({user.role})
                        </span>

                        <button
                            onClick={handleLogout}
                            style={{
                                padding: "8px 14px",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}