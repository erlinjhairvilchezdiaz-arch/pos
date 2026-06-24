import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { colors, fonts, FONT_IMPORT } from "../styles/theme";

function TicketStat({ label, value, sub, accent }) {
  return (
    <div style={{ position: "relative", background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 2, padding: "20px 22px 18px" }}>
      <div
        style={{
          position: "absolute", top: -7, left: 18, right: 18, height: 14,
          backgroundImage: "radial-gradient(circle 7px, #F4EFE3 7px, transparent 7.5px)",
          backgroundSize: "20px 14px", backgroundRepeat: "repeat-x", backgroundPosition: "left top",
        }}
      />
      <p style={{ fontFamily: fonts.body, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: colors.textSoft, margin: "0 0 8px", fontWeight: 600 }}>
        {label}
      </p>
      <p style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 600, color: accent || colors.plum, margin: 0, lineHeight: 1.1 }}>
        {value}
      </p>
      <p style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.textFaint, margin: "6px 0 0" }}>{sub}</p>
    </div>
  );
}

export default function Dashboard() {
  const { perfil } = useAuth();
  const [loading, setLoading] = useState(true);
  const [ventasHoy, setVentasHoy] = useState({ total: 0, cantidad: 0 });
  const [totalProductos, setTotalProductos] = useState(0);
  const [stockBajo, setStockBajo] = useState([]);
  const [cajaActual, setCajaActual] = useState(0);
  const [ventasRecientes, setVentasRecientes] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    setLoading(true);
    const hoyInicio = new Date();
    hoyInicio.setHours(0, 0, 0, 0);

    const [ventasRes, productosRes, stockBajoRes, cajaRes, ventasRecientesRes] = await Promise.all([
      supabase.from("ventas").select("total").gte("fecha", hoyInicio.toISOString()).eq("anulada", false),
      supabase.from("productos").select("id", { count: "exact", head: true }).eq("activo", true),
      supabase.from("productos").select("id, nombre, marca, stock, stock_minimo").eq("activo", true).order("stock", { ascending: true }).limit(50),
      supabase.from("caja_movimientos").select("monto"),
      supabase.from("ventas").select("id, fecha, total, metodo_pago").eq("anulada", false).order("fecha", { ascending: false }).limit(5),
    ]);

    if (ventasRes.data) {
      setVentasHoy({
        total: ventasRes.data.reduce((s, v) => s + Number(v.total), 0),
        cantidad: ventasRes.data.length,
      });
    }
    if (productosRes.count != null) setTotalProductos(productosRes.count);
    if (stockBajoRes.data) {
      setStockBajo(stockBajoRes.data.filter((p) => p.stock <= p.stock_minimo).slice(0, 5));
    }
    if (cajaRes.data) {
      setCajaActual(cajaRes.data.reduce((s, m) => s + Number(m.monto), 0));
    }
    if (ventasRecientesRes.data) setVentasRecientes(ventasRecientesRes.data);

    setLoading(false);
  }

  return (
    <div style={{ fontFamily: fonts.body, background: colors.bg, minHeight: "100vh", display: "flex", color: colors.text }}>
      <style>{FONT_IMPORT}</style>
      <Sidebar />

      <main style={{ flex: 1, padding: "32px 40px", maxWidth: 1040 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
          <div>
            <p style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 600, margin: 0, color: colors.plum }}>
              Hola, {perfil?.nombre || "..."}
            </p>
            <p style={{ fontSize: 13.5, color: colors.textSoft, margin: "4px 0 0" }}>
              {new Date().toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <button
            onClick={cargarDatos}
            style={{ fontSize: 12.5, color: colors.sageText, background: colors.sageBg, padding: "6px 14px", borderRadius: 20, fontWeight: 500, border: "none", cursor: "pointer" }}
          >
            <i className="ti ti-refresh" style={{ fontSize: 13, marginRight: 5 }} aria-hidden="true" />
            Actualizar
          </button>
        </div>

        {loading ? (
          <p style={{ color: colors.textFaint, fontSize: 13.5 }}>Cargando datos...</p>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
              <TicketStat label="Ventas de hoy" value={`S/ ${ventasHoy.total.toFixed(2)}`} sub={`${ventasHoy.cantidad} ventas`} />
              <TicketStat label="Productos registrados" value={totalProductos} sub="en catálogo" />
              <TicketStat label="Stock bajo" value={stockBajo.length} sub="necesitan reposición" accent={colors.red} />
              <TicketStat label="Caja actual" value={`S/ ${cajaActual.toFixed(2)}`} sub="saldo acumulado" accent={colors.sageText} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20 }}>
              <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 10, padding: "20px 22px" }}>
                <p style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 600, margin: "0 0 14px", color: colors.plum }}>
                  Ventas recientes
                </p>
                {ventasRecientes.length === 0 && <p style={{ fontSize: 13, color: colors.textFaint }}>Aún no hay ventas registradas.</p>}
                {ventasRecientes.map((s, i) => (
                  <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderTop: i === 0 ? "none" : `1px solid ${colors.borderLight}` }}>
                    <span style={{ fontSize: 12.5, color: colors.textFaint }}>
                      {new Date(s.fecha).toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span style={{ fontSize: 11.5, color: colors.sageText, background: colors.sageBg, padding: "3px 9px", borderRadius: 12, fontWeight: 500 }}>
                      {s.metodo_pago}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>S/ {Number(s.total).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 10, padding: "20px 22px" }}>
                <p style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 600, margin: "0 0 14px", color: colors.plum }}>
                  Stock bajo
                </p>
                {stockBajo.length === 0 && <p style={{ fontSize: 13, color: colors.textFaint }}>Todo el inventario está en buen nivel.</p>}
                {stockBajo.map((p, i) => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: i === 0 ? "none" : `1px solid ${colors.borderLight}` }}>
                    <div>
                      <p style={{ fontSize: 13.5, fontWeight: 500, margin: 0 }}>{p.nombre}</p>
                      <p style={{ fontSize: 11.5, color: colors.textFaint, margin: "2px 0 0" }}>{p.marca}</p>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: p.stock === 0 ? colors.red : colors.amber, background: p.stock === 0 ? colors.redBg : colors.amberBg, padding: "3px 10px", borderRadius: 12 }}>
                      {p.stock === 0 ? "Agotado" : `${p.stock} und.`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
