import { useState } from 'react'
import './App.css'
import BotegaLiquidityPoolInfo from './BotegaLiquidityPoolInfo';
import StakingClientDemo from './StakingClientDemo';
import ARNSRecordLookup from './ARNSRecordLookup';

function App() {
  return (
    <>
      <BotegaLiquidityPoolInfo />
      <StakingClientDemo />
      <ARNSRecordLookup />
    </>
  )
}

export default App
