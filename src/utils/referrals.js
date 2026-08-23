import { collection, doc, getDoc, getDocs, limit, query, setDoc, where, serverTimestamp } from "firebase/firestore";

export const REFERRAL_COMMISSION_RATE = 0.10;

export const normalizeReferralCode = (value = "") => String(value || "").trim().toUpperCase();

export const referralCodeForUser = (uid = "") => `WEB${String(uid).replace(/[^a-zA-Z0-9]/g, "").substring(0, 8).toUpperCase()}`;

export const referralLinkForCode = (code = "") => {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/auth/register?ref=${encodeURIComponent(code)}`;
};

export async function findReferrerByCode(db, rawCode) {
  const code = normalizeReferralCode(rawCode);
  if (!code) return null;
  try {
    const snapshot = await getDocs(query(collection(db, "referrals"), where("code", "==", code), limit(1)));
    if (snapshot.empty) return null;
    const item = snapshot.docs[0];
    return { id: item.id, ...item.data() };
  } catch (error) {
    console.warn("Referral code lookup skipped:", error?.message || error);
    return null;
  }
}

export async function ensureReferralProfile(db, user, { referrerId = null, referredByCode = "" } = {}) {
  if (!user?.uid) return null;
  const referralRef = doc(db, "referrals", user.uid);
  const existing = await getDoc(referralRef).catch(() => null);
  const existingData = existing?.exists?.() ? existing.data() : {};
  const code = normalizeReferralCode(existingData.code) || referralCodeForUser(user.uid);
  const profile = {
    userId: user.uid,
    code,
    referrerId: existingData.referrerId || referrerId || null,
    referredByCode: existingData.referredByCode || normalizeReferralCode(referredByCode) || "",
    commissionRate: Number(existingData.commissionRate || REFERRAL_COMMISSION_RATE),
    createdAt: existingData.createdAt || serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  if (!existing?.exists?.() || referrerId || referredByCode) {
    await setDoc(referralRef, profile, { merge: true });
  }
  return { ...existingData, ...profile };
}

export function amountAsNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(String(value || "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function dateValue(value) {
  if (!value) return 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.toDate === "function") return value.toDate().getTime();
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
}

export function displayReferralName(user = {}) {
  return `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || "Customer";
}

export async function loadReferralSnapshot(db, userId) {
  if (!userId) return { profile: null, friends: [], earnings: [], totalEarnings: 0, referredRevenue: 0 };
  const profileSnap = await getDoc(doc(db, "referrals", userId)).catch(() => null);
  const profile = profileSnap?.exists?.() ? { id: profileSnap.id, ...profileSnap.data() } : null;
  const friendsSnap = await getDocs(query(collection(db, "users"), where("referredById", "==", userId))).catch(() => ({ docs: [] }));
  const friends = friendsSnap.docs.map(item => ({ id: item.id, ...item.data() }));
  const earningsSnap = await getDocs(query(collection(db, "referralEarnings"), where("referrerId", "==", userId))).catch(() => ({ docs: [] }));
  const earnings = earningsSnap.docs.map(item => ({ id: item.id, ...item.data() }));
  const ledgerTotal = earnings.reduce((sum, item) => sum + amountAsNumber(item.commissionAmount ?? item.earnedAmount), 0);
  const totalEarnings = earnings.length ? ledgerTotal : amountAsNumber(profile?.totalEarnings);
  const referredRevenue = earnings.reduce((sum, item) => sum + amountAsNumber(item.orderAmount ?? item.amount), 0);
  return { profile, friends, earnings, totalEarnings, referredRevenue };
}
