"use client"

import type React from "react"
import { useState, useRef } from "react"
import { StakingClient } from "ao-js-sdk"

const StakingClientDemo: React.FC = () => {
  const [processId, setProcessId] = useState("")
  const [tokenProcessId, setTokenProcessId] = useState("")
  const [tokenAOConfig, setTokenAOConfig] = useState("")
  const [amount, setAmount] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const clientRef = useRef<StakingClient | null>(null)

  const getClient = () => {
    if (!clientRef.current || clientRef.current.getProcessId() !== processId) {
      const wallet = (window as any).arweaveWallet
      let parsedTokenAOConfig = undefined
      try {
        parsedTokenAOConfig = JSON.parse(tokenAOConfig)
      } catch (e) {
        throw new Error("tokenAOConfig must be valid JSON")
      }
      clientRef.current = new StakingClient({ processId, tokenProcessId, tokenAOConfig: parsedTokenAOConfig, wallet })
    }
    return clientRef.current
  }

  const handleStake = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const client = getClient()
      const success = await client.stake(amount)
      setResult(success ? "Stake successful!" : "Stake failed.")
    } catch (err: any) {
      setError(err?.message || "Error staking tokens.")
    } finally {
      setLoading(false)
    }
  }

  const handleUnstake = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const client = getClient()
      const success = await client.unstake("")
      setResult(success ? "Unstake successful!" : "Unstake failed.")
    } catch (err: any) {
      setError(err?.message || "Error unstaking tokens.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-emerald-400 to-teal-600 relative overflow-hidden">
      {/* Animated Sky Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating clouds */}
        <div className="absolute top-20 left-10 w-32 h-16 bg-white/20 rounded-full blur-sm animate-pulse opacity-60"></div>
        <div
          className="absolute top-40 right-20 w-24 h-12 bg-white/15 rounded-full blur-sm animate-pulse opacity-40"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-40 h-20 bg-white/10 rounded-full blur-sm animate-pulse opacity-30"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Lightning effects */}
        <div className="absolute top-1/4 right-1/3 w-1 h-20 bg-gradient-to-b from-yellow-300 to-transparent animate-pulse opacity-70"></div>
        <div
          className="absolute bottom-1/3 left-1/5 w-1 h-16 bg-gradient-to-b from-yellow-400 to-transparent animate-pulse opacity-50"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Serpentine flowing lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-10" viewBox="0 0 1000 1000">
            <path
              d="M100,500 Q300,200 500,500 T900,300"
              stroke="url(#emeraldGradient)"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M200,700 Q400,400 600,700 T1000,500"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
            <defs>
              <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-lg">
          {/* Main Dragon Container */}
          <div className="relative">
            {/* Rayquaza-inspired curved container */}
            <div className="bg-gradient-to-br from-emerald-800/90 to-emerald-900/95 backdrop-blur-xl rounded-[3rem] border-4 border-emerald-400/30 shadow-2xl shadow-emerald-500/20 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
              {/* Dragon Scale Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.3)_2px,transparent_2px)] bg-[length:20px_20px]"></div>
              </div>

              {/* Header - Rayquaza's Crown */}
              <div className="relative bg-gradient-to-r from-emerald-600/40 to-teal-600/40 p-8 border-b-4 border-emerald-400/20">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-emerald-400/5"></div>

                {/* Rayquaza Eyes */}
                <div className="absolute top-4 left-8 flex space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                  <div
                    className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>

                <div className="relative text-center">
                  <h1 className="text-4xl font-black text-emerald-100 mb-2 tracking-wider drop-shadow-lg">
                    Staking Client Demo
                  </h1>
                  <p className="text-emerald-300/80 text-sm font-medium">Master of the Ozone Layer</p>

                  {/* Dragon Energy Orbs */}
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-bounce shadow-lg shadow-yellow-400/50"></div>
                    <div
                      className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-bounce shadow-lg shadow-emerald-400/50"
                      style={{ animationDelay: "0.3s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-bounce shadow-lg shadow-yellow-400/50"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Form Section - Dragon's Body */}
              <div className="relative p-8 space-y-6">
                {/* Process ID - Emerald Scale */}
                <div className="group">
                  <label className="block text-emerald-200 font-bold mb-3 text-sm uppercase tracking-wider">
                    Process ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter Staking Process ID"
                      value={processId}
                      onChange={(e) => setProcessId(e.target.value)}
                      className="w-full bg-emerald-900/50 border-2 border-emerald-500/30 rounded-2xl px-6 py-4 text-emerald-100 placeholder-emerald-400/60 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300 group-hover:border-emerald-400/50 font-medium shadow-inner"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/0 to-teal-400/0 group-focus-within:from-emerald-400/10 group-focus-within:to-teal-400/10 pointer-events-none transition-all duration-300"></div>
                  </div>
                </div>

                {/* Token Process ID - Golden Scale */}
                <div className="group">
                  <label className="block text-emerald-200 font-bold mb-3 text-sm uppercase tracking-wider">
                    Token Process ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter Token Process ID"
                      value={tokenProcessId}
                      onChange={(e) => setTokenProcessId(e.target.value)}
                      className="w-full bg-yellow-900/30 border-2 border-yellow-500/30 rounded-2xl px-6 py-4 text-yellow-100 placeholder-yellow-400/60 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all duration-300 group-hover:border-yellow-400/50 font-medium shadow-inner"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/0 to-amber-400/0 group-focus-within:from-yellow-400/10 group-focus-within:to-amber-400/10 pointer-events-none transition-all duration-300"></div>
                  </div>
                </div>

                {/* Token AO Config - Mystic Runes */}
                <div className="group">
                  <label className="block text-emerald-200 font-bold mb-3 text-sm uppercase tracking-wider">
                    tokenAOConfig (JSON)
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder="Enter tokenAOConfig (JSON)"
                      value={tokenAOConfig}
                      onChange={(e) => setTokenAOConfig(e.target.value)}
                      rows={4}
                      className="w-full bg-teal-900/40 border-2 border-teal-500/30 rounded-2xl px-6 py-4 text-teal-100 placeholder-teal-400/60 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 transition-all duration-300 group-hover:border-teal-400/50 resize-none font-mono text-sm shadow-inner"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-400/0 to-cyan-400/0 group-focus-within:from-teal-400/10 group-focus-within:to-cyan-400/10 pointer-events-none transition-all duration-300"></div>
                  </div>
                </div>

                {/* Amount - Dragon's Treasure */}
                <div className="group">
                  <label className="block text-emerald-200 font-bold mb-3 text-sm uppercase tracking-wider">
                    Amount to stake
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Amount to stake"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-amber-900/30 border-2 border-amber-500/30 rounded-2xl px-6 py-4 text-amber-100 placeholder-amber-400/60 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all duration-300 group-hover:border-amber-400/50 font-medium text-xl shadow-inner"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 to-yellow-400/0 group-focus-within:from-amber-400/10 group-focus-within:to-yellow-400/10 pointer-events-none transition-all duration-300"></div>
                  </div>
                </div>

                {/* Dragon Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleStake}
                    disabled={loading || !processId || !tokenProcessId || !tokenAOConfig || !amount}
                    className="flex-1 relative group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed overflow-hidden shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40 transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/0 to-teal-300/0 group-hover:from-emerald-300/20 group-hover:to-teal-300/20 transition-all duration-300"></div>
                    <div className="relative flex items-center justify-center text-lg">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Processing...
                        </>
                      ) : (
                        <>Stake</>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={handleUnstake}
                    disabled={loading || !processId || !tokenProcessId || !tokenAOConfig}
                    className="flex-1 relative group bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed overflow-hidden shadow-lg shadow-yellow-500/30 hover:shadow-yellow-400/40 transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/0 to-amber-300/0 group-hover:from-yellow-300/20 group-hover:to-amber-300/20 transition-all duration-300"></div>
                    <div className="relative flex items-center justify-center text-lg">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Processing...
                        </>
                      ) : (
                        <>Unstake</>
                      )}
                    </div>
                  </button>
                </div>

                {/* Status Messages */}
                {error && (
                  <div className="mt-6 p-4 bg-red-900/40 border-2 border-red-500/40 rounded-2xl backdrop-blur-sm shadow-lg">
                    <div className="flex items-center text-red-200 font-bold">
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                {result && (
                  <div className="mt-6 p-4 bg-emerald-900/40 border-2 border-emerald-400/40 rounded-2xl backdrop-blur-sm shadow-lg">
                    <div className="flex items-center text-emerald-200 font-bold">
                      <span>{result}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Dragon Tail Footer */}
              <div className="relative bg-gradient-to-r from-emerald-800/60 to-teal-800/60 px-8 py-4 border-t-2 border-emerald-400/20">
                <div className="flex items-center justify-between text-emerald-300">
                  <div className="flex items-center space-x-2 font-bold text-sm">
                    <span>NEURAL LINK ACTIVE</span>
                  </div>
                  <div className="flex items-center space-x-2 font-bold text-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span>CONNECTED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Dragon Orbs */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-bounce shadow-lg shadow-yellow-400/50 opacity-80"></div>
            <div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-bounce shadow-lg shadow-emerald-400/50 opacity-80"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          {/* Bottom Dragon Signature */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-3 text-emerald-200 font-bold text-lg">
              <span>LEGENDARY DRAGON PROTOCOL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakingClientDemo
