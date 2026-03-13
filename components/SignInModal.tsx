"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { useLanguage } from "@/lib/useLanguage";

type Props = {
  onClose: () => void;
};

export function SignInModal({ onClose }: Props) {
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    await signInWithGoogle();
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setEmailError("");
    const { error } = await signInWithEmail(email.trim());
    setLoading(false);
    if (error) {
      setEmailError(error);
    } else {
      setEmailSent(true);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white rounded-t-2xl z-50 px-6 pt-6 pb-10">
        {/* Handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-200 rounded-full" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-900"
          aria-label="Close"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <h2 className="text-gray-900 text-xl font-light tracking-tight mt-2">
          {t("登录 DeeDao", "Sign in to DeeDao")}
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          {t("保存你喜欢的菜，个性化推荐", "Save favorites and get personalized picks")}
        </p>

        <div className="mt-6 space-y-3">
          {emailSent ? (
            <div className="text-center py-4">
              <p className="text-gray-900 text-base font-light">
                {t("邮件已发送！", "Check your email!")}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {t(
                  `我们已向 ${email} 发送了登录链接`,
                  `We sent a sign-in link to ${email}`
                )}
              </p>
            </div>
          ) : showEmailInput ? (
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("输入邮箱地址", "Enter your email")}
                className="w-full py-3 px-5 rounded-full border border-gray-200 text-sm text-gray-900 outline-none focus:shadow-sm focus:border-gray-300 transition-all"
                autoFocus
              />
              {emailError && (
                <p className="text-red-500 text-xs text-center">{emailError}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gray-900 text-white text-sm tracking-wider uppercase rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60"
              >
                {loading
                  ? t("发送中...", "SENDING...")
                  : t("发送登录链接", "SEND MAGIC LINK")}
              </button>
              <button
                type="button"
                onClick={() => setShowEmailInput(false)}
                className="w-full text-center text-gray-400 text-sm hover:text-gray-900 transition-colors"
              >
                {t("返回", "Go back")}
              </button>
            </form>
          ) : (
            <>
              {/* Google */}
              <button
                onClick={handleGoogle}
                className="flex items-center justify-center gap-3 w-full py-3 bg-white border border-gray-200 text-gray-900 text-sm rounded-full hover:bg-gray-50 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"/>
                </svg>
                {t("使用 Google 登录", "Continue with Google")}
              </button>

              {/* Email */}
              <button
                onClick={() => setShowEmailInput(true)}
                className="flex items-center justify-center w-full py-3 bg-white border border-gray-200 text-gray-900 text-sm rounded-full hover:bg-gray-50 transition-colors"
              >
                {t("使用邮箱登录", "Continue with Email")}
              </button>

              <p className="text-center text-gray-400 text-xs pt-1">
                {t(
                  "登录即代表你同意我们的服务条款",
                  "By signing in, you agree to our terms of service"
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
