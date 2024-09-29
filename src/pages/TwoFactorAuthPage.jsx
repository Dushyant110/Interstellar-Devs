


import React, { useState } from 'react';
import OtpInput from 'otp-input-react';
import { CgSpinner } from "react-icons/cg";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { auth } from '../firebase/firebaseConfig';
import { RecaptchaVerifier } from 'firebase/auth';

export default function TwoFactorAuthPage() {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(false);


    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        }
      }

    function onSignup() {
        setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh = "+" + ph;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success("OTP sended successfully!");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                setUser(res.user);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <div id="recaptcha-container"></div>
                {user ? (
                    <h1 className="text-center font-bold text-xl text-green-500">Login Success</h1>
                ) : (
                    <>
                        {!showOTP ? (
                            <>
                                <div className="text-black w-fit mx-auto p-4 rounded-full">
                                    <BsFillShieldLockFill size={30} />
                                </div>
                                <label
                                    htmlFor="otp"
                                    className="font-bold text-xl text-center block mb-4"
                                >
                                    Enter your OTP
                                </label>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                    autoFocus
                                    className="flex font-black justify-between gap-2"
                                />
                                <button onClick={onOTPVerify}
                                    className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md flex items-center justify-center"
                                >
                                    {loading && (
                                        <CgSpinner size={20} className="mt-1 animate-spin mr-2" />
                                    )}
                                    <span>Verify OTP</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="text-black w-fit mx-auto p-4 rounded-full">
                                    <BsTelephoneFill size={30} />
                                </div>
                                <label
                                    htmlFor="ph"
                                    className="font-bold text-xl text-center block mb-4"
                                >
                                    Verify your Phone Number
                                </label>
                                <PhoneInput
                                    country={"in"}
                                    value={ph}
                                    onChange={setPh}
                                    className="w-full"
                                />
                                <button onClick={onSignup}
                                    className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md flex items-center justify-center"
                                >
                                    {loading && (
                                        <CgSpinner size={20} className="mt-1 animate-spin mr-2" />
                                    )}
                                    <span>Send code via SMS</span>
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
