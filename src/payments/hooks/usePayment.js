// src/payments/hooks/usePayment.js
// The one hook every page in WeberTech should use to sell anything.
//
// Usage:
//   const { state, pay, reset } = usePayment();
//   pay({ method: "nestlink", product, phone, customer });
//
// `state.step` moves through: idle -> starting -> awaiting -> paid | failed

import { useCallback, useRef, useState } from "react";
import { startNestLinkPayment } from "../services/nestlink";
import { startIntaSendPayment } from "../services/intasend";
import { listenToOrder, pollOrderStatus } from "../services/orderStatus";

const initialState = {
  step: "idle", // idle | starting | awaiting | paid | failed
  orderId: null,
  method: null,
  message: "",
  checkoutUrl: null, // set for IntaSend — caller opens this URL
};

export function usePayment() {
  const [state, setState] = useState(initialState);
  const unsubscribeRef = useRef(null);

  const stopListening = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
  }, []);

  const watchOrder = useCallback((orderId) => {
    setState((s) => ({ ...s, step: "awaiting", orderId }));

    unsubscribeRef.current = listenToOrder(
      orderId,
      (data) => {
        if (data.status === "paid") {
          setState((s) => ({ ...s, step: "paid", message: "Payment confirmed!" }));
          stopListening();
        } else if (data.status === "failed") {
          setState((s) => ({ ...s, step: "failed", message: data.failReason || "Payment failed" }));
          stopListening();
        }
      },
      () => {
        // Realtime listener failed — fall back to polling
        pollOrderStatus(orderId, (data) => {
          if (data.status === "paid") {
            setState((s) => ({ ...s, step: "paid", message: "Payment confirmed!" }));
          } else if (data.status === "failed") {
            setState((s) => ({ ...s, step: "failed", message: data.failReason || "Payment failed" }));
          }
        });
      }
    );
  }, [stopListening]);

  const pay = useCallback(async ({ method, product, phone, email, firstName, lastName, customer }) => {
    setState({ ...initialState, step: "starting", method });
    try {
      if (method === "nestlink") {
        const { orderId } = await startNestLinkPayment({ phone, amount: product.price, product, customer });
        watchOrder(orderId);
      } else if (method === "intasend") {
        const { orderId, checkoutUrl } = await startIntaSendPayment({
          amount: product.price, email, phone, firstName, lastName, product, customer,
        });
        setState((s) => ({ ...s, orderId, checkoutUrl }));
        watchOrder(orderId);
      } else {
        throw new Error("Unknown or unavailable payment method");
      }
    } catch (err) {
      setState((s) => ({ ...s, step: "failed", message: err.message || "Payment failed to start" }));
    }
  }, [watchOrder]);

  const reset = useCallback(() => {
    stopListening();
    setState(initialState);
  }, [stopListening]);

  return { state, pay, reset };
}
