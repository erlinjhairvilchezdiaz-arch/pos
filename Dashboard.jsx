import React from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
`;

const lowStock = [
  { name: "Perfume Élite 50ml", marca: "Élite", stock: 2 },
  { name: "Crema hidratante Nivea", marca: "Nivea", stock: 1 },
  { name: "Aretes dorados pequeños", marca: "Bisutería Luna", stock: 3 },
  { name: "Blusa floral talla M", marca: "Vero Moda", stock: 0 },
];

const recentSales = [
  { hora: "11:42", cliente: "Mostrador", total: 58.0, metodo: "Efectivo" },
  { hora: "11:15", cliente: "Mostrador", total: 124.5, metodo: "Yape" },
  { hora: "10:50", cliente: "Mostrador", total: 32.0, metodo: "Efectivo" },
  { hora: "10:20", cliente: "Mostrador", total: 89.9, metodo: "Tarjeta" },
];

const navItems = [
  { icon: "ti-layout-dashboard", label: "Dashboard", active: true },
  { icon: "ti-package", label: "Inventario" },
  { icon: "ti-shopping-cart", label: "Ventas" },
  { icon: "ti-cash", label: "Caja" },
  { icon: "ti-chart-bar", label: "Reportes" },
];

function TicketStat({ label, value, sub, accent }) {
  return (
    <div
      style={{
        position: "relative",
        background: "#FFFDF8",
        border: "1px solid #E6DCC8",
        borderRadius: "2px",
        padding: "20px 22px 18px",
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -7,
          left: 18,
          right: 18,
          height: 14,
          backgroundImage:
            "radial-gradient(circle 7px, #F4EFE3 7px, transparent 7.5px)",
          backgroundSize: "20px 14px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "left top",
        }}
      />
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#8A7A5C",
          margin: "0 0 8px",
          fontWeight: 600,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "Fraunces, serif",
          fontSize: 30,
          fontWeight: 600,
          color: accent || "#3D2436",
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 12.5,
          color: "#9C9285",
          margin: "6px 0 0",
        }}
      >
        {sub}
      </p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#F4EFE3",
        minHeight: "100vh",
        display: "flex",
        color: "#2A211F",
      }}
    >
      <style>{FONTS}</style>

      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: "#3D2436",
          padding: "28px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flexShrink: 0,
        }}
      >
        <div style={{ padding: "0 8px 28px" }}>
          <p
            style={{
              fontFamily: "Fraunces, serif",
              fontWeight: 600,
              fontSize: 20,
              color: "#F4EFE3",
              margin: 0,
            }}
          >
            Casa Rosa
          </p>
          <p
            style={{
              fontSize: 11.5,
              color: "#C97B86",
              margin: "2px 0 0",
              letterSpacing: "0.04em",
            }}
          >
            Punto de venta
          </p>
        </div>

        {navItems.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 8,
              background: item.active ? "#C97B86" : "transparent",
              cursor: "pointer",
            }}
          >
            <i
              className={`ti ${item.icon}`}
              style={{
                fontSize: 18,
                color: item.active ? "#3D2436" : "#E3D5DB",
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: item.active ? "#3D2436" : "#E3D5DB",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}

        <div style={{ marginTop: "auto", padding: "12px 8px 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              borderTop: "1px solid #54364A",
              paddingTop: 16,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#C49A4A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 600,
                color: "#3D2436",
              }}
            >
              R
            </div>
            <div>
              <p style={{ fontSize: 13, color: "#F4EFE3", margin: 0, fontWeight: 500 }}>
                Rosa
              </p>
              <p style={{ fontSize: 11, color: "#A98E96", margin: 0 }}>
                Administradora
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "32px 40px", maxWidth: 1040 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 28,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: 26,
                fontWeight: 600,
                margin: 0,
                color: "#3D2436",
              }}
            >
              Buenos días, Rosa
            </p>
            <p style={{ fontSize: 13.5, color: "#8A7A5C", margin: "4px 0 0" }}>
              Jueves 19 de junio, 2026
            </p>
          </div>
          <div
            style={{
              fontSize: 12.5,
              color: "#7C8C6B",
              background: "#E8EEDC",
              padding: "6px 14px",
              borderRadius: 20,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <i className="ti ti-circle-filled" style={{ fontSize: 8 }} aria-hidden="true" />
            Caja abierta — 7:30 am
          </div>
        </div>

        {/* Stat cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <TicketStat label="Ventas de hoy" value="S/ 304.40" sub="14 ventas" />
          <TicketStat
            label="Productos registrados"
            value="386"
            sub="en 6 categorías"
          />
          <TicketStat
            label="Stock bajo"
            value="4"
            sub="necesitan reposición"
            accent="#A33C2D"
          />
          <TicketStat
            label="Caja actual"
            value="S/ 540.00"
            sub="efectivo en caja"
            accent="#5B7048"
          />
        </div>

        {/* Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20 }}>
          {/* Recent sales */}
          <div
            style={{
              background: "#FFFDF8",
              border: "1px solid #E6DCC8",
              borderRadius: 10,
              padding: "20px 22px",
            }}
          >
            <p
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: 16,
                fontWeight: 600,
                margin: "0 0 14px",
                color: "#3D2436",
              }}
            >
              Ventas recientes
            </p>
            {recentSales.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "11px 0",
                  borderTop: i === 0 ? "none" : "1px solid #F0E9DA",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12.5, color: "#9C9285", width: 42 }}>
                    {s.hora}
                  </span>
                  <span style={{ fontSize: 13.5, fontWeight: 500 }}>{s.cliente}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span
                    style={{
                      fontSize: 11.5,
                      color: "#7C8C6B",
                      background: "#E8EEDC",
                      padding: "3px 9px",
                      borderRadius: 12,
                      fontWeight: 500,
                    }}
                  >
                    {s.metodo}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600, width: 64, textAlign: "right" }}>
                    S/ {s.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Low stock */}
          <div
            style={{
              background: "#FFFDF8",
              border: "1px solid #E6DCC8",
              borderRadius: 10,
              padding: "20px 22px",
            }}
          >
            <p
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: 16,
                fontWeight: 600,
                margin: "0 0 14px",
                color: "#3D2436",
              }}
            >
              Stock bajo
            </p>
            {lowStock.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderTop: i === 0 ? "none" : "1px solid #F0E9DA",
                }}
              >
                <div>
                  <p style={{ fontSize: 13.5, fontWeight: 500, margin: 0 }}>{p.name}</p>
                  <p style={{ fontSize: 11.5, color: "#9C9285", margin: "2px 0 0" }}>
                    {p.marca}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: p.stock === 0 ? "#A33C2D" : "#C49A4A",
                    background: p.stock === 0 ? "#FAE4E0" : "#F7EBD3",
                    padding: "3px 10px",
                    borderRadius: 12,
                  }}
                >
                  {p.stock === 0 ? "Agotado" : `${p.stock} und.`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
