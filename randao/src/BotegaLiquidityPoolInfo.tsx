import React, { useState, useRef } from 'react';
import { BotegaLiquidityPoolClient } from 'ao-js-sdk';

function ResultDisplay({ value }: { value: any }) {
  const formatValue = (val: any): string => {
    if (val === null || val === undefined) return '-'
    if (typeof val === 'string') return val
    if (typeof val === 'number') return val.toLocaleString()
    if (typeof val === 'boolean') return val ? 'Yes' : 'No'
    if (Array.isArray(val)) return `${val.length} items`
    if (typeof val === 'object') return 'Object'
    return String(val)
  }

  const renderObject = (obj: any) => {
    const entries = Object.entries(obj)
    return (
      <div className="space-y-3">
        {entries.map(([key, value]) => (
          <div key={key} className="flex flex-col sm:flex-row gap-2 p-3 bg-gray-50 rounded-md">
            <div className="sm:w-1/3 min-w-0">
              <span className="font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
            </div>
            <div className="sm:w-2/3 min-w-0">
              <span className="text-gray-900 font-mono text-sm break-all">
                {formatValue(value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderArray = (arr: any[]) => {
    return (
      <div className="space-y-2">
        {arr.map((item, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-md">
            {typeof item === 'object' && item !== null ? renderObject(item) : formatValue(item)}
          </div>
        ))}
      </div>
    )
  }

  const renderContent = () => {
    if (typeof value === 'string') {
      return (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <span className="text-green-800 font-medium">{value}</span>
        </div>
      )
    }

    if (typeof value === 'number') {
      return (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <span className="text-blue-800 font-bold text-lg">{value.toLocaleString()}</span>
        </div>
      )
    }

    if (typeof value === 'boolean') {
      return (
        <div className={`p-4 border rounded-md ${value ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <span className={`font-medium ${value ? 'text-green-800' : 'text-red-800'}`}>
            {value ? 'Yes' : 'No'}
          </span>
        </div>
      )
    }

    if (Array.isArray(value)) {
      return renderArray(value)
    }

    if (typeof value === 'object' && value !== null) {
      return renderObject(value)
    }

    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
        <span className="text-gray-700">{String(value)}</span>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7c0-2.21-3.582-4-8-4s-8 1.79-8 4z" />
          </svg>
          Result
        </h3>
      </div>
      <div className="p-6">
        <div className="overflow-auto max-h-96">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

const BotegaLiquidityPoolInfo: React.FC = () => {
  const [processId, setProcessId] = useState("")
  const [quantity, setQuantity] = useState("")
  const [tokenId, setTokenId] = useState("")
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [walletSet, setWalletSet] = useState(false)
  const clientRef = useRef<BotegaLiquidityPoolClient | null>(null)

  const getClient = () => {
    if (!clientRef.current && processId) {
      clientRef.current = new BotegaLiquidityPoolClient(processId)
    }
    return clientRef.current
  }

  const handleSetWallet = () => {
    const wallet = (window as any).arweaveWallet
    const client = getClient()
    if (wallet && client) {
      client.setWallet(wallet)
      setWalletSet(true)
      setResult("Wallet set!")
      setError(null)
    } else {
      setError("No Arweave wallet found or processId not set.")
    }
  }

  const handleGetLPInfo = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const info = await getClient()?.getLPInfo()
      setResult(info)
    } catch (err: any) {
      setError(err?.message || "Error fetching LP info.")
    } finally {
      setLoading(false)
    }
  }

  const handleGetProcessId = () => {
    setError(null)
    setResult(getClient()?.getProcessId())
  }

  const handleGetProcessInfo = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const info = await getClient()?.getProcessInfo()
      setResult(info)
    } catch (err: any) {
      setError(err?.message || "Error fetching process info.")
    } finally {
      setLoading(false)
    }
  }

  const handleGetPrice = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const price = await getClient()?.getPrice(quantity, tokenId)
      setResult(price)
    } catch (err: any) {
      setError(err?.message || "Error fetching price.")
    } finally {
      setLoading(false)
    }
  }

  const handleGetPriceOfTokenAInTokenB = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const price = await getClient()?.getPriceOfTokenAInTokenB(quantity)
      setResult(price)
    } catch (err: any) {
      setError(err?.message || "Error fetching price of TokenA in TokenB.")
    } finally {
      setLoading(false)
    }
  }

  const handleGetPriceOfTokenBInTokenA = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const price = await getClient()?.getPriceOfTokenBInTokenA(quantity)
      setResult(price)
    } catch (err: any) {
      setError(err?.message || "Error fetching price of TokenB in TokenA.")
    } finally {
      setLoading(false)
    }
  }

  const handleGetTokenA = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const tokenA = await getClient()?.getTokenA()
      setResult(tokenA)
    } catch (err: any) {
      setError(err?.message || "Error fetching TokenA.")
    } finally {
      setLoading(false)
    }
  }

  const handleGetTokenB = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const tokenB = await getClient()?.getTokenB()
      setResult(tokenB)
    } catch (err: any) {
      setError(err?.message || "Error fetching TokenB.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 text-center">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7c0-2.21-3.582-4-8-4s-8 1.79-8 4z" />
              </svg>
              Botega Liquidity Pool Client
            </h2>
          </div>
        </div>

        {/* Connection Setup */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Connection Setup
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter Liquidity Pool Process ID"
                value={processId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProcessId(e.target.value)
                  clientRef.current = null
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                onClick={handleSetWallet} 
                disabled={!processId}
                className="sm:w-auto w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Set Wallet
              </button>
            </div>
            {walletSet && (
              <div className="flex items-center gap-2 text-green-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">Wallet Connected!</span>
              </div>
            )}
          </div>
        </div>

        {/* Basic Operations */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Basic Operations
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <button
                onClick={handleGetLPInfo}
                disabled={loading || !processId}
                className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7c0-2.21-3.582-4-8-4s-8 1.79-8 4z" />
                  </svg>
                )}
                Get LP Info
              </button>
              <button
                onClick={handleGetProcessId}
                disabled={loading || !processId}
                className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Get Process ID
              </button>
              <button
                onClick={handleGetProcessInfo}
                disabled={loading || !processId}
                className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7c0-2.21-3.582-4-8-4s-8 1.79-8 4z" />
                </svg>
                Get Process Info
              </button>
            </div>
          </div>
        </div>

        {/* Price Operations */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              Price Operations
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Quantity"
                value={quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input 
                type="text" 
                placeholder="Token ID" 
                value={tokenId} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenId(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="border-t border-gray-200 pt-4"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <button
                onClick={handleGetPrice}
                disabled={loading || !processId || !quantity || !tokenId}
                className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                )}
                Get Price
              </button>
              <button
                onClick={handleGetPriceOfTokenAInTokenB}
                disabled={loading || !processId || !quantity}
                className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                TokenA → TokenB
              </button>
              <button
                onClick={handleGetPriceOfTokenBInTokenA}
                disabled={loading || !processId || !quantity}
                className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                TokenB → TokenA
              </button>
              <button
                onClick={handleGetTokenA}
                disabled={loading || !processId}
                className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get TokenA
              </button>
              <button
                onClick={handleGetTokenB}
                disabled={loading || !processId}
                className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get TokenB
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* Result Display */}
        {result && <ResultDisplay value={typeof result === "string" ? { result } : result} />}
      </div>
    </div>
  )
}

export default BotegaLiquidityPoolInfo 