import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  saveUidToLocalStorage,
  signInWithGoogle,
  signInWithPhoneNum,
  verifyOTP,
} from "../firebase";
import { Mail, Lock, User, Phone, Building2, Eye, EyeOff, Loader2, Shield } from 'lucide-react';

export default function LogIn({ sw = false }) {
  const [Switch, setSwitch] = useState(sw ? "add-info" : "login");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [BusinessName, setBusinessName] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const [Mobile, setMobil] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();
  const signup = () => {
    let res = registerWithEmailAndPassword(email, password, name);
    console.log(res);
    // alert(res);
    saveUidToLocalStorage(res);
    setSwitch("login");
    history("/");
  };

  const login = () => {
    let res = logInWithEmailAndPassword(email, password);
    console.log(res);
    // alert(res);
    saveUidToLocalStorage(res.data);
    // history("/");
    window.location.href = "/";
    setSwitch("signup");
  };

  let [otpToggle, setotpToggle] = useState(false);
  let [otp, setOtp] = useState("");
  let [mobile, setMobile] = useState("");
  let [loading, setLoading] = useState(false);
  let [toggle, setToggle] = useState(true);

  let [phoneCode, setPhoneCode] = useState("+91");
  const handleGetOTP = async () => {
    setLoading(true);

    try {
      const res = await signInWithPhoneNum(phoneCode + mobile, "captcha");
      console.log(res);
      if (res) {
        setotpToggle(true);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      if (otp) {
        const res = await verifyOTP(otp);
        console.log(res);
        const user = res.data;
        // handleAuthResult(user, false);
        saveUidToLocalStorage(res.data);
        // history("/");
        window.location.href = "/";
      } else {
        alert("enter otp");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing Baba</h1>
          <p className="text-gray-600 text-lg">Ab Business Karo Tension Free</p>
        </div>

        {/* Main Auth Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100 bg-gray-50/50">
            <button
              onClick={() => setToggle(true)}
              className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-300 relative group ${
                toggle
                  ? 'text-blue-600 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
            >
              <Phone className="w-4 h-4 inline mr-2" />
              Mobile No.
              {toggle && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setToggle(false)}
              className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-300 relative group ${
                !toggle
                  ? 'text-blue-600 bg-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Email
              {!toggle && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full" />
              )}
            </button>
          </div>

          <div className="p-8">
            {toggle ? (
              /* Phone Authentication */
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Mobile Number
                  </label>
                  <div className="flex rounded-2xl border-2 border-gray-200 overflow-hidden focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
                    <select
                      name="code"
                      className="px-4 py-4 bg-gray-50 border-r-2 border-gray-200 text-gray-700 font-medium focus:outline-none"
                      onChange={(e) => setPhoneCode(e.target.value)}
                    >
                      <option value="+91">🇮🇳 +91</option>
                    </select>
                    <input
                      className="flex-1 px-4 py-4 focus:outline-none text-gray-900 placeholder-gray-500 bg-white"
                      id="number"
                      type="text"
                      placeholder="Enter your mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>

                <div id="captcha"></div>

                {otpToggle && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <Shield className="w-4 h-4 inline mr-2 text-green-600" />
                      Enter OTP
                    </label>
                    <input
                      className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-center text-lg tracking-widest font-semibold transition-all duration-300"
                      id="password"
                      type="password"
                      placeholder="Enter your OTP"
                      disabled={!otpToggle}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      OTP sent to {phoneCode} {mobile}
                    </p>
                  </div>
                )}

                <div className="pt-4">
                  {otpToggle ? (
                    <button
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                      ) : (
                        "Verify & Sign In"
                      )}
                    </button>
                  ) : (
                    <>
                      {loading ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-3" />
                          <span className="text-gray-600 font-medium">Sending OTP...</span>
                        </div>
                      ) : (
                        <button
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                          type="button"
                          onClick={handleGetOTP}
                        >
                          Send OTP
                        </button>
                      )}
                    </>
                  )}
                </div>
              </form>
            ) : Switch === "login" ? (
              /* Email Login */
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name="email"
                    className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 placeholder-gray-500 transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className="w-full px-4 py-4 pr-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 placeholder-gray-500 transition-all duration-300"
                      name="password"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={(e) => login()}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
                             <div className="mt-3 flex items-center space-x-2">
  <input
    type="checkbox"
    id="rememberMe"
    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
  />
  <label htmlFor="rememberMe" className="text-sm text-gray-600">
    Remember me for 30 days
  </label>
</div>


                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Don't have an account?</span>
                  </div>
                </div>

                <button
                  className="w-full border-2 border-gray-200 hover:border-blue-300 text-gray-700 font-semibold py-4 px-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-white hover:bg-blue-50"
                  onClick={() => setSwitch("signup")}
                >
                  Create New Account
                </button>
              </div>
            ) : (
              /* Email Signup */
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 placeholder-gray-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 placeholder-gray-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="Create a strong password"
                      className="w-full px-4 py-4 pr-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 placeholder-gray-500 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>



                <button
                  onClick={(e) => signup()}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  Create Account
                </button>
            

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                  </div>
                </div>

                <button
                  className="w-full border-2 border-gray-200 hover:border-blue-300 text-gray-700 font-semibold py-4 px-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-white hover:bg-blue-50"
                  onClick={() => setSwitch("login")}
                >
                  Sign In Instead
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}