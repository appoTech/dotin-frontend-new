import React, { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import logo from "../assets/AppOpener.png";
import axios from "axios";
import "./ExpressPromote.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/";
const POLL_INTERVAL = 3000;
const MAX_POLLS = 10;
const PROMOTE_PRICE = 25;

// Load Cashfree SDK
const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree) {
      resolve(window.Cashfree);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => resolve(window.Cashfree);
    script.onerror = () => reject(new Error("Failed to load Cashfree SDK"));
    document.head.appendChild(script);
  });
};

const ExpressPromote = () => {
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const contextLink = params.get("link") || "";
  const fileInputRef = useRef(null);
  const pollTimerRef = useRef(null);
  const pollCountRef = useRef(0);

  const [form, setForm] = useState({
    title: "",
    linkUrl: contextLink,
    name: "",
    email: "",
    mobile: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState("form"); // "form" | "paying" | "success" | "pending"
  const [orderId, setOrderId] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    return () => {
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setResult({ success: false, message: "Image must be under 5MB" });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Poll payment status
  const pollPaymentStatus = useCallback((orderIdToPoll) => {
    pollCountRef.current = 0;

    const poll = async () => {
      pollCountRef.current++;

      try {
        const { data } = await axios.get(
          `${API_URL}payment/verify/${orderIdToPoll}`
        );

        if (data.order_status === "PAID") {
          setStep("success");
          setResult({ success: true, message: "Payment successful & promotion submitted! 🎉" });
          setSubmitting(false);
          return;
        }

        if (data.order_status === "EXPIRED" || data.order_status === "TERMINATED") {
          setStep("form");
          setResult({ success: false, message: "Payment failed or expired. Please try again." });
          setSubmitting(false);
          return;
        }

        if (pollCountRef.current < MAX_POLLS) {
          pollTimerRef.current = setTimeout(poll, POLL_INTERVAL);
        } else {
          setStep("pending");
          setSubmitting(false);
        }
      } catch (error) {
        setStep("form");
        setResult({ success: false, message: "Could not verify payment status." });
        setSubmitting(false);
      }
    };

    poll();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const { data } = await axios.post(`${API_URL}payment/createOrder`, {
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.mobile,
        amount: PROMOTE_PRICE,
        OrderType: "promotion",
        promotion_data: {
          title: form.title,
          linkUrl: form.linkUrl,
          imageUrl: null,
        },
      });

      if (!data.success || !data.payment_session_id) {
        throw new Error("Failed to create order");
      }

      setOrderId(data.order_id);

      setStep("paying");
      const Cashfree = await loadCashfreeSDK();
      const cashfree = Cashfree({ mode: "production" });

      cashfree
        .checkout({
          paymentSessionId: data.payment_session_id,
          redirectTarget: "_modal",
        })
        .then(() => {
          pollPaymentStatus(data.order_id);
        });
    } catch (error) {
      console.error("Payment Error:", error);
      setStep("form");
      setResult({
        success: false,
        message: error?.response?.data?.error || error.message || "Payment failed",
      });
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
    setStep("form");
    setResult(null);
    setSubmitting(false);
    setOrderId("");
    setImageUploaded(false);
    setUploadingImage(false);
    setForm({ title: "", linkUrl: "", name: "", email: "", mobile: "" });
    removeImage();
  };

  const handlePostPaymentUpload = async () => {
    if (!imageFile || !orderId) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("order_id", orderId);
      await axios.post(`${API_URL}payment/uploadImage`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUploaded(true);
    } catch (err) {
      setResult({
        success: false,
        message: err?.response?.data?.error || "Image upload failed. You can try again.",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  // ── Success Screen ──
  if (step === "success") {
    return (
      <div className="express-promote-bg">
        <div className="express-promote-wrapper">
          <div className="express-promote-card-success">
            <div className="express-promote-emoji">🎉</div>
            <h2 className="express-promote-success-heading">Promotion Submitted!</h2>
            <p className="express-promote-success-msg">
              {result?.message}
            </p>

            {!imageUploaded && (
              <div className="express-promote-form-group">
                <label className="express-promote-label">
                  📷 Add an image to your promotion <span style={{ color: "#64748b" }}>(optional)</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                {imagePreview ? (
                  <div className="express-promote-upload-preview">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="express-promote-preview-img"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="express-promote-remove-img"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="express-promote-upload-placeholder"
                  >
                    Click to select image
                  </button>
                )}
                {imageFile && (
                  <button
                    onClick={handlePostPaymentUpload}
                    disabled={uploadingImage}
                    className="express-promote-btn-primary"
                  >
                    {uploadingImage ? "Uploading..." : "Upload Image"}
                  </button>
                )}
              </div>
            )}

            {imageUploaded && (
              <div className="express-promote-alert-success">
                ✅ Image uploaded successfully!
              </div>
            )}

            {result && !result.success && (
              <div className="express-promote-alert-error">
                {result.message}
              </div>
            )}

            <div className="express-promote-actions">
              <button
                onClick={resetForm}
                className="express-promote-btn-primary"
              >
                Submit Another
              </button>
              <button
                onClick={() => window.location.href = "https://apposlash.com"}
                className="express-promote-btn-secondary"
              >
                Create Your Own QRPA
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Pending Screen ──
  if (step === "pending") {
    return (
      <div className="express-promote-bg">
        <div className="express-promote-wrapper">
          <div className="express-promote-card-success" style={{ borderColor: "#eab308" }}>
            <div className="express-promote-emoji">⏳</div>
            <h2 className="express-promote-success-heading">Payment Pending</h2>
            <p className="express-promote-success-msg" style={{ color: "#eab308" }}>
              Your payment is still being processed. Your promotion will be submitted once the payment is confirmed.
            </p>
            <div className="express-promote-actions">
              <button
                onClick={resetForm}
                className="express-promote-btn-secondary"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Form ──
  return (
    <div className="express-promote-bg">
      <div className="express-promote-wrapper">
        {/* Header */}
        <div className="express-promote-header">
          <img src={logo} alt="AppOpener" className="express-promote-logo" />
          <h1 className="express-promote-heading">Promote Your Link</h1>
        </div>

        {/* Paying indicator */}
        {step === "paying" && (
          <div className="express-promote-paying-indicator">
            <div className="express-promote-spinner" />
            <span>Processing payment...</span>
          </div>
        )}

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="express-promote-card"
        >
          {/* Title */}
          <div className="express-promote-form-group">
            <label className="express-promote-label">
              Title <span className="express-promote-required">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="My awesome link"
              className="express-promote-input"
            />
          </div>

          {/* Link URL */}
          <div className="express-promote-form-group">
            <label className="express-promote-label">
              Link URL <span className="express-promote-required">*</span>
            </label>
            <input
              type="url"
              name="linkUrl"
              value={form.linkUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com"
              className="express-promote-input"
            />
          </div>

          {/* Name, Email & Mobile */}
          <div className="express-promote-grid-2">
            <div className="express-promote-form-group" style={{ marginBottom: 0 }}>
              <label className="express-promote-label">
                Your Name <span className="express-promote-required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John"
                className="express-promote-input"
              />
            </div>
            <div className="express-promote-form-group" style={{ marginBottom: 0 }}>
              <label className="express-promote-label">
                Mobile <span className="express-promote-required">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
                placeholder="9876543210"
                className="express-promote-input"
              />
            </div>
          </div>

          <div className="express-promote-form-group">
            <label className="express-promote-label">
              Email <span className="express-promote-required">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className="express-promote-input"
            />
          </div>

          {/* Image note */}
          <div className="express-promote-note-box">
            <span>📷</span>
            <span>You can add an image to your promotion after payment</span>
          </div>

          {/* Price display */}
          <div className="express-promote-fee-box">
            <span className="express-promote-fee-label">Promotion Fee</span>
            <span className="express-promote-fee-value">₹{PROMOTE_PRICE}</span>
          </div>

          {/* Result message */}
          {result && (
            <div
              className={result.success ? "express-promote-alert-success" : "express-promote-alert-error"}
            >
              {result.message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="express-promote-btn-primary"
          >
            {submitting ? "Processing..." : `🚀 Pay ₹${PROMOTE_PRICE} & Submit`}
          </button>
        </form>

        {/* Back link */}
        <button
          onClick={() => history.goBack()}
          className="express-promote-btn-back"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default ExpressPromote;
