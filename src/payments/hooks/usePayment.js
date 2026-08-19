// src/payments/hooks/usePayment.js
// WeberPay payment lifecycle: idle -> starting -> awaiting -> paid | failed.
// NestLink status is checked through our API, with bounded payment-only
// retries plus a visible manual refresh action.

import { useCallback, useRef, useState } from "react";
import { startNestLinkPayment } from "../services/nestlink";
import { startIntaSendPayment } from "../services/intasend";
import { fetchOrderStatusOnce, pollOrderStatus } from "../services/orderStatus";

const initialState = {
  step: "idle",
  orderId: null,
  method: null,
  message: "",
  checkoutUrl: null,
  checking: false,
  timedOut: false,
};

export function usePayment() {
  const [state, setState] = useState(initialState);
  const cleanupRef = useRef(null);

  const stopWatching = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  }, []);

  const applyStatus = useCallback((data) => {
    if (!data) return;

    if (data.status === "paid") {
      setState((s) => ({
        ...s,
        step: "paid",
        checking: false,
        timedOut: false,
        message: "Payment confirmed!",
      }));
      stopWatching();
      return;
    }

    if (data.status === "failed" || data.status === "cancelled") {
      setState((s) => ({
        ...s,
        step: "failed",
        checking: false,
        timedOut: false,
        message: data.failReason || data.message || "Payment failed. Please try again.",
      }));
      stopWatching();
      return;
    }

    setState((s) => ({
      ...s,
      step: "awaiting",
      checking: false,
      timedOut: Boolean(data.timedOut),
      message: data.message || "Payment is still pending. Complete the M-PESA prompt, then check again.",
    }));
  }, [stopWatching]);

  const startWatching = useCallback((orderId) => {
    stopWatching();
    setState((s) => ({
      ...s,
      step: "awaiting",
      orderId,
      checking: true,
      timedOut: false,
      message: "M-PESA prompt sent. Check your phone and enter your PIN.",
    }));
    cleanupRef.current = pollOrderStatus(orderId, applyStatus);
  }, [applyStatus, stopWatching]);

  const refreshStatus = useCallback(async () => {
    if (!state.orderId) return;

    stopWatching();
    setState((s) => ({ ...s, checking: true, timedOut: false }));
    try {
      const data = await fetchOrderStatusOnce(state.orderId);
      applyStatus(data);
      if (data.status === "pending") {
        cleanupRef.current = pollOrderStatus(state.orderId, applyStatus);
      }
    } catch (error) {
      setState((s) => ({
        ...s,
        step: "awaiting",
        checking: false,
        message: error.message || "Could not check payment status. Please try again.",
      }));
    }
  }, [applyStatus, state.orderId, stopWatching]);

  const pay = useCallback(async ({ method, product, phone, email, firstName, lastName, customer }) => {
    stopWatching();
    setState({ ...initialState, step: "starting", method });

    try {
      if (method === "nestlink") {
        const response = await startNestLinkPayment({
          phone,
          amount: product.price,
          product,
          customer,
        });
        if (!response?.orderId) throw new Error("NestLink did not return a payment order. Please try again.");
        startWatching(response.orderId);
      } else if (method === "intasend") {
        const response = await startIntaSendPayment({
          amount: product.price,
          email,
          phone,
          firstName,
          lastName,
          product,
          customer,
        });
        if (!response?.orderId) throw new Error("IntaSend did not return a payment order. Please try again.");
        setState((s) => ({ ...s, orderId: response.orderId, checkoutUrl: response.checkoutUrl || null }));
        startWatching(response.orderId);
      } else {
        throw new Error("Unknown or unavailable payment method");
      }
    } catch (error) {
      setState((s) => ({
        ...s,
        step: "failed",
        checking: false,
        message: error.message || "Payment failed to start. Please try again.",
      }));
    }
  }, [startWatching, stopWatching]);

  const reset = useCallback(() => {
    stopWatching();
    setState(initialState);
  }, [stopWatching]);

  return { state, pay, reset, refreshStatus };
}
