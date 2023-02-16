import React,{useCallback} from 'react';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import moment from 'moment';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
//  import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import { useMemo } from 'react';
// import {PoolStats} from '../../bomb-finance/BombFinance';
// import { Route, useRouteMatch  } from 'react-router-dom';
import useBank from '../../hooks/useBank';
// import {makeStyles} from '@material-ui/core/styles';
//  import Bank from '../Bank';
  import useBanks from '../../hooks/useBanks';
  import useStatsForPool from '../../hooks/useStatsForPool';
// import {Bank as BankEntity} from '../../bomb-finance';
import {useParams} from 'react-router-dom';
 import {CardActions,Button,Grid} from '@material-ui/core';
import useBombStats from '../../hooks/useBombStats';
import { roundAndFormatNumber } from '../../0x';
import usebShareStats from '../../hooks/usebShareStats';
import useBondStats from '../../hooks/useBondStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import CountUp from 'react-countup';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBombFinance from '../../hooks/useBombFinance';
import {useTransactionAdder} from '../../state/transactions/hooks';
// import {getDisplayBalance} from '../../utils/formatBalance';

// import useBondStats from '../../hooks/useBondStats';

// import HomeImage from '../../assets/img/background.jpg';
  import FarmCard from '../Farm/FarmCard';
//  import { createGlobalStyle } from 'styled-components';
   // import {useWallet} from 'use-wallet';
   // import UnlockWallet from '../../components/UnlockWallet';
   // import { Link } from 'react-router-dom';
// const BackgroundImage = createGlobalStyle`
//   body {
//     background: url(${HomeImage}) repeat !important;
//     background-size: cover !important;
//     background-color: #171923;
//   }
// `;

//  const useStyles = makeStyles((theme) => ({
//    gridItem: {
//      height: '100%',
//      [theme.breakpoints.up('md')]: {
//        height: '90px',
//      },
//    },
//  }));
const Welcome= ()=>{
   // let depositToken = bank.depositTokenName.toUpperCase();
   const [banks] = useBanks();
   const bombFinance = useBombFinance();
   const addTransaction = useTransactionAdder();
   // const handleBuyBonds = useCallback(
   //    async (amount: string) => {
   //      const tx = await bombFinance.buyBonds(amount);
   //      addTransaction(tx, {
   //        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
   //      });
   //    },
   //    [bombFinance, addTransaction],
   //  );
   const bondBalance = useTokenBalance(bombFinance?.BBOND);
   // const { path } = useRouteMatch();
   //  const {account} = useWallet();
   // const [poolAPRs, setPoolAPRs] = useState<PoolStats>();
   
    const activeBanks = banks.filter((bank) => !bank.finished);
   const bShareStats = usebShareStats();
   const bondStat = useBondStats();
   const boardroomAPR = useFetchBoardroomAPR();
   const totalStaked = useTotalStakedOnBoardroom();
   const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);
        const currentEpoch = useCurrentEpoch();
         const { to } = useTreasuryAllocationTimes();
         //   const stakedBalance = useStakedBalanceOnBoardroom();
         const cashStat = useCashPriceInEstimatedTWAP();
         const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
         const {bankId} = useParams();
           const bank = useBank(bankId);
           let statsOnPool = useStatsForPool(bank);
          const tBondStats = useBondStats();
          const bombStats = useBombStats();
          const bombPriceInDollars = useMemo(
            () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
            [bombStats],
          );
          const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
          const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
          
         const bSharePriceInDollars = useMemo(
            () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
            [bShareStats],
          );
          const bShareCirculatingSupply = useMemo(
            () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
            [bShareStats],
          );
          const tBondPriceInDollars = useMemo(
            () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
            [tBondStats],
          );
          const tBondCirculatingSupply = useMemo(
            () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
            [tBondStats],
          );
          const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
      // console.log(currentEpoch);
      const TVL = useTotalValueLocked();
      // const classes = useStyles();
        return ( 
            <div>
            <div className="first">
     <div className="head1">
        <div className="H1"><h1>Bomb Finance Summary</h1></div>
        <div className="h2">
        </div>
     </div>
<div className="hec1">
    <div className="comp1">
     <div className="sec1">
        <p id="l1">Current Supply</p>
        <p id="l2">Total Supply</p>
        <p id="l3">Price</p>
     </div>
     <div className="h5"></div>
     <div className="sec1-1">
        <p id="s1">$BOMB</p>
        <p id="s2">{roundAndFormatNumber(bombCirculatingSupply, 2)}</p>
        <p id="s3">{roundAndFormatNumber(bombTotalSupply, 2)}</p>
        <div className="sub1">
            <p id="s4">${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'}/</p>
            <p id="s5">BOMB</p>
        </div>
     </div>
     <div className="h6"></div>
     <div className="sec1-2">
        <p id="s6">$BSHARE</p>
        <p id="s7">{roundAndFormatNumber(bShareCirculatingSupply, 2)}</p>
        <p id="s8">{roundAndFormatNumber(bShareTotalSupply, 2)}</p>
        <div className="sub2">
            <p id="s9"> ${bSharePriceInDollars ? bSharePriceInDollars : '-.--'}/</p>
            <p id="s10">BSHARE</p>
        </div>
     </div>
     <div className="h7"></div>
     <div className="sec1-3">
        <p id="s11">$BBOND</p>
        <p id="s12">{roundAndFormatNumber(tBondCirculatingSupply, 2)}</p>
        <p id="s13">{roundAndFormatNumber(tBondTotalSupply, 2)}</p>
        <div className="sub3">
            <p id="s14">${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}/</p>
            <p id="s15">BBOND</p>
        </div>
     </div>
     <div className="h8"></div>
    </div>
     <div className="comp2">
     <div className="sec2">
        <h2 id="z1">Current Epoch</h2>
        <p id="z2">{Number(currentEpoch)}</p>
     </div>
     <div className="h9"></div>
     <div className="sec3">
        <p id="z3"> <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" /></p>
        <p id="z4">Next Epoch in</p>
     </div>
     <div className="h10"></div>
     <div className="sec4">
        <p id="z5">Live TWAP:</p>
        <p id="z5-1">{scalingFactor}</p>
        <p id="z6">TVL: <CountUp  end={TVL} separator="," prefix="$" />
        </p>
        <p id="z7">Last Epoch TWAP:1.22</p>
     </div>
     </div>
     </div>
    </div>
    <div className="second">
      <div className="x1">
      <p id="m1">Read Investment Strategy</p>
      <p id="m3">Invest Now</p>
      <div className="x3">
      <a href="https://discord.bomb.money"><p id="m4">Chat on Discord</p></a>
      <p id="m5">Read Docs</p>
      </div>
      <div className="x4">
      <p id="m6-1"></p>
      <p id="m6">Boardroom</p>
      <p id="m7">Recommended</p>
      <p id="m8">Stake BSHARE and earn BOMB every epoch</p>
      <p id="m9">TVL:$1,008430</p>
      <p id="m10"></p>
      <p id="m11">Total Staked:7232</p>
      <div className="sel-1">
         <div className="sel-1-1">
         <p id="c1">Daily Returns:</p>
         <p id="c2">{boardroomAPR.toFixed(2)}%</p>
         <p id="c3">Your Stake:</p>
         <p id="c4">{getDisplayBalance(totalStaked)}</p>
         <p id="c5"></p>
         <p id="c6">Earned:</p>
         <p id="c7">0.000</p>
         <p id="c8">=</p>
         </div>
         <div className="sel-1-2">
            <p id="c1-1">Deposit</p>
            <p id="c1-2">Withdraw</p>
            <p id="c1-3">Claim Rewards </p>
         </div>
      </div>
      </div>
      </div>
      <div className="x2">
       <p id="m2-1"></p>
       <p id="m2">Latest News</p>
      </div>
    </div>
    <div className="Third">
      <div className="box">
      <div className="k1">
         <p id="box-1"></p>
         <p id="j1">Bomb Farms</p>
         <p id="j2">Stake your LP tokens in our farms to start earning $BSHARE</p>
         <p id="j3">Claim All</p>
      </div>
      <div className="k2">
         <p id="j4">BOMB-BTCB</p>
         <p id="j5">Recommended</p>
        {/* activeBanks = banks.filter((bank) => !bank.finished); */}
         <p id="j6">Tvl:</p>
         {/* <Grid container spacing={3} style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                  {activeBanks
                    .filter((bank) => bank.sectionInUI === -3)
                    .map((bank) => (
                        // <useStatsForPool bank={bank} />
                         console.log(statsOnPool?.dailyAPR),
                         <FarmCard bank={bank} />
                    
                    ))}
                </Grid> */}
                 {/* <CardActions style={{ justifyContent: 'flex-end' }}>
          {!!account ? (
              <Button className="shinyButtonSecondary" component={Link} to={`/farm/${bank.contract}`}>
                  View
              </Button>
          ) : (
              <UnlockWallet />
          )}
        </CardActions> */}
         
         {/* <Typography>{bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%</Typography> */}
         {/* <p id="j6-1"></p> */}
         <p id="j7"></p>
      </div>
      <div className="k3">
         <p id="j8">Daily Returns:</p>
         <p id="j9">2%</p>
         <p id="j10">Your Stake:</p>
         <p id="j11">124.21</p>
         <p id="j12">=$1171.62</p>
         <p id="j13">Earned:</p>
         <p id="j14">6.4413</p>
         <p id="j15">=$298.88</p>
         <p id="j16">Deposit</p>
         <p id="j17">Withdraw</p>
         <p id="j18">Claim Rewards</p>
         <p id="j19"></p>
      </div>
      <div className="k4">
         <p id="i1">BSHARE-BNB</p>
         <p id="i2">Recommended</p>
         <p id="i3">TVL:$1,008,430</p>
         <p id="i4"></p>
      </div>
       <div className="k5">
         <p id="i5">Daily Returns:</p>
         <p id="i6">2%</p>
         <p id="i7">Your Stake:</p>
         <p id="i8">124.21</p>
         <p id="i9">=$1171.62</p>
         <p id="i10">Earned:</p>
         <p id="i11">6.4413</p>
         <p id="i12">=$298.88</p>
         <p id="i13">Deposit</p>
         <p id="i14">Withdraw</p>
         <p id="i15">Claim Rewards</p>
         <p id="i16"></p>
       </div>
      </div>
    </div>
    <div className="fourth">
      <div className="f1">
         <p className="box-2"></p>
         <p id="d1">Bonds</p>
         <p id="d2">BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</p>
         <p id="d3">Current Price:</p>
         <p id="d4">(BOMB)^2</p>
         <p id="d5">BBOND=</p>
         <p id="d6">{Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB</p>
         <p id="d7">Available to redeem:</p>
         <p id="d8">{`${getDisplayBalance(bondBalance)}`}</p>
         <p id="d9">PUrchase BBond</p>
         <p id="d10">Bomb is over peg</p>
         <p id="d11">Redeem Bomb</p>
         <p id="d12">purchase</p>
         <p id="d13">Redeem</p>
         <p id="d14"></p>
      </div>
    </div>
    </div>
        )
}

export default Welcome;