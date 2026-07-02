import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.on("notification_count", (count) => {
      setCount(count);
    });

    socket.on("new_notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
      setCount(data.count);
    });

    socket.on("notifications_cleared", () => {
      setNotifications([]);
      setCount(0);
    });

    return () => {
      socket.off("notification_count");
      socket.off("new_notification");
      socket.off("notifications_cleared");
    };
  }, []);

  const sendNotification = () => {
    if (!message.trim()) return;
    socket.emit("send_notification", message);
    setMessage("");
  };

  const clearNotifications = () => {
    socket.emit("clear_notifications");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Real-Time Notifications</h1>
            <p style={styles.subtitle}>
              Socket.IO notification system with live updates across all users.
            </p>
          </div>

          <div style={styles.badge}>{count}</div>
        </div>

        <div style={styles.inputBox}>
          <input
            type="text"
            placeholder="Type notification message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendNotification()}
            style={styles.input}
          />

          <button onClick={sendNotification} style={styles.button}>
            Send
          </button>
        </div>

        <button onClick={clearNotifications} style={styles.clearBtn}>
          Clear Notifications
        </button>

        <div style={styles.list}>
          {notifications.length === 0 ? (
            <p style={styles.empty}>No notifications yet.</p>
          ) : (
            notifications.map((item, index) => (
              <div key={index} style={styles.notification}>
                <div>
                  <strong>🔔 New Notification</strong>
                  <p style={styles.message}>{item.message}</p>
                </div>
                <small style={styles.time}>{item.time}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #2563eb)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  card: {
    width: "min(680px, 100%)",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "25px",
  },
  title: {
    margin: 0,
    color: "#111827",
    fontSize: "38px",
    fontWeight: "800",
    lineHeight: "1.1",
  },
  subtitle: {
    color: "#475569",
    marginTop: "10px",
    marginBottom: 0,
    fontSize: "16px",
  },
  badge: {
    background: "#ef4444",
    color: "#fff",
    minWidth: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    fontWeight: "bold",
    fontSize: "22px",
    flexShrink: 0,
  },
  inputBox: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
  },
  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "15px",
  },
  button: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },
  clearBtn: {
    width: "100%",
    background: "#111827",
    color: "#fff",
    border: "none",
    padding: "13px",
    borderRadius: "12px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  list: {
    height: "350px",
    overflowY: "auto",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "14px",
    background: "#f8fafc",
  },
  empty: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: "140px",
    fontSize: "17px",
  },
  notification: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "14px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    borderLeft: "5px solid #2563eb",
  },
  message: {
    margin: "6px 0 0",
    color: "#334155",
  },
  time: {
    color: "#64748b",
    whiteSpace: "nowrap",
  },
};

export default App;