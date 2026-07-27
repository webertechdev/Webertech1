// ─────────────────────────────────────────────────────────────────
//  WeberTech — api/reports/generate-daily-report.js
//  Automated daily report generation (call via cron job)
//  Generates AI-powered summaries of platform activity
// ─────────────────────────────────────────────────────────────────

const { db } = require("../_lib/firebaseAdmin");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Fetch today's data
    const ordersSnap = await db.collection("orders")
      .where("createdAt", ">=", today)
      .where("createdAt", "<", tomorrow)
      .get();

    const chatsSnap = await db.collection("chats")
      .where("updatedAt", ">=", today)
      .where("updatedAt", "<", tomorrow)
      .get();

    const orders = ordersSnap.docs.map(d => d.data());
    const chats = chatsSnap.docs.map(d => d.data());

    // Calculate metrics
    const paidOrders = orders.filter(o => o.status === "paid");
    const failedOrders = orders.filter(o => o.status === "failed");
    const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const avgOrderValue = paidOrders.length > 0 ? (totalRevenue / paidOrders.length).toFixed(0) : 0;

    // Module breakdown
    const modules = {};
    ["cyber", "academy", "electronics", "bundles", "dev", "hustle"].forEach(m => {
      const moduleOrders = orders.filter(o => o.type === m || o.productSlug?.includes(m));
      modules[m] = {
        orders: moduleOrders.length,
        revenue: moduleOrders.filter(o => o.status === "paid").reduce((sum, o) => sum + (o.amount || 0), 0),
      };
    });

    // Create report
    const report = {
      date: today.toISOString(),
      summary: {
        totalOrders: orders.length,
        paidOrders: paidOrders.length,
        failedOrders: failedOrders.length,
        totalRevenue,
        avgOrderValue,
        activeChats: chats.filter(c => c.status === "active").length,
        adminTakeovers: chats.filter(c => c.adminTakeover).length,
      },
      moduleBreakdown: modules,
      topProducts: getTopProducts(orders),
      insights: generateInsights(orders, chats, totalRevenue),
      createdAt: new Date(),
    };

    // Save to Firestore
    await db.collection("reports").add(report);

    // Send email notification (optional - integrate with SendGrid/Mailgun)
    console.log("[Daily Report] Generated for", today.toDateString());

    return res.status(200).json({ success: true, report });
  } catch (err) {
    console.error("[Daily Report] Error:", err);
    return res.status(500).json({ error: err.message });
  }
};

function getTopProducts(orders) {
  const products = {};
  orders.forEach(o => {
    if (!products[o.productTitle]) {
      products[o.productTitle] = { count: 0, revenue: 0 };
    }
    products[o.productTitle].count++;
    if (o.status === "paid") {
      products[o.productTitle].revenue += o.amount || 0;
    }
  });

  return Object.entries(products)
    .map(([title, data]) => ({ title, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
}

function generateInsights(orders, chats, totalRevenue) {
  const insights = [];

  if (totalRevenue > 50000) {
    insights.push("🚀 Strong revenue day! Keep up the momentum.");
  }
  if (orders.length > 20) {
    insights.push("📈 High order volume today. Consider scaling support.");
  }
  if (chats.filter(c => c.adminTakeover).length > 5) {
    insights.push("💬 Multiple admin takeovers detected. Customer issues may need attention.");
  }

  const failureRate = orders.filter(o => o.status === "failed").length / orders.length;
  if (failureRate > 0.1) {
    insights.push("⚠️ Payment failure rate above 10%. Check NestLink/IntaSend status.");
  }

  return insights;
}
