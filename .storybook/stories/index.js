import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Heading from 'components/presentation/heading'
import Calendar from 'components/presentation/calendar'
import Indicator from 'components/presentation/indicator'
import Button from 'components/presentation/button'
import BackButton from 'components/presentation/back-button'
import Tag from 'components/presentation/tag'
import Legend from 'components/presentation/legend'
import MildLegend from 'components/presentation/mild-legend'
import Logo from 'components/presentation/logo'
import Loading from 'components/presentation/loading'
import PieChartOld from 'components/presentation/charts/pie-chart-old'
import PieChart from 'components/presentation/charts/pie-chart'
import RelativeBars from 'components/presentation/charts/relative-bars'
import RelativeBarsChart from 'components/presentation/charts/relative-bars-chart'
import GaugeBarWidget from 'components/presentation/charts/gauge-bar-widget'
import GaugeBarGroup from 'components/presentation/charts/gauge-bar-group'
import BarChart from 'components/presentation/charts/barchart'
import Header from 'components/presentation/header'
import Footer from 'components/presentation/footer'

storiesOf('Heading', module)
  .add('Alpha heading', () => (
    <Heading type='alpha'>Alpha heading</Heading>
  ))
  .add('Beta heading', () => (
    <Heading type='beta'>Beta heading</Heading>
  ))
  .add('Gamma heading', () => (
    <Heading type='gamma'>Gamma heading</Heading>
  ))
  .add('Delta heading', () => (
    <Heading type='delta'>Delta heading</Heading>
  ))
  .add('Epsilon heading', () => (
    <Heading type='epsilon'>Epsilon heading</Heading>
  ))
  .add('Zeta heading', () => (
    <Heading type='zeta'>Zeta heading</Heading>
  ))

storiesOf('Calendar', module)
.add('simple', () => (
  <Calendar />
))

storiesOf('Indicator', module)
  .add('Yell indicator', () => (
    <Indicator type='yell' label='data'>10.000</Indicator>
  ))
  .add('Loud indicator', () => (
    <Indicator type='loud' label='Total calls'>235.542</Indicator>
  ))
  .add('Loud indicator with extra data', () => (
    <Indicator type='loud' label='Calls with pre-call objectives'>
      <span className='percent'>65</span>
      <span>%</span>
    </Indicator>
  ))
  .add('Noisy indicator', () => (
    <Indicator type='noisy' label='65%' />
  ))
  .add('Mild indicator', () => (
    <Indicator type='mild' label='Consent capture'>15.421</Indicator>
  ))
  .add('Mild indicator with extra data', () => (
    <span>
      <Indicator type='mild' label='Consent capture'>
        <span>5</span>
        <span className='data-unit'>min</span>
        <span>24</span>
        <span className='data-unit'>sec</span>
      </Indicator>
    </span>
  ))
  .add('Soft indicator', () => (
    <Indicator type='soft' label='Meeting Attendees'>254.698</Indicator>
  ))
  .add('Soft indicator inline', () => (
    <Indicator type='soft' label='Customer base' inline>124.754</Indicator>
  ))
  .add('Whisper indicator', () => (
    <Indicator type='whisper' label='Calls'>48.321</Indicator>
  ))
  .add('Hush indicator', () => (
    <Indicator type='hush' label='Category'>1.10</Indicator>
  ))

storiesOf('Buttons', module)
  .add('primary, normal, small button', () => (
    <Button label='Button' type='primary' style='normal' size='small' />
  ))
  .add('secondary, normal, small button', () => (
    <Button label='Button' type='secondary' style='normal' size='small' />
  ))
  .add('primary, flat, small button', () => (
    <Button label='Button' type='primary' style='flat' size='small' />
  ))
  .add('secondary, flat, small button', () => (
    <Button label='Button' type='secondary' style='flat' size='small' />
  ))
  .add('primary, normal, large button', () => (
    <Button label='Button' type='primary' style='normal' size='large' />
  ))
  .add('secondary, normal, large button', () => (
    <Button label='Button' type='secondary' style='normal' size='large' />
  ))
  .add('primary button with spinner', () => (
    <Button label='Button' type='primary' style='normal' size='small' loading />
  ))
  .add('secondary button with spinner', () => (
    <Button label='Button' type='secondary' style='normal' size='small' loading />
  ))
  .add('Logout button (mild button example)', () => (
    <Button label='Logout' className='mild-button' icon='logout' />
  ))
  .add('Close button (soft button example)', () => (
    <Button className='soft-button' icon='close' />
  ))
  .add('Info button (soft button example)', () => (
    <Button className='soft-button' icon='info' />
  ))
  .add('Back button', () => (
    <BackButton label='Back to users' />
  ))

storiesOf('Tag', module)
  .add('Tag', () => (
    <Tag label='Pharmacist' onClose={() => void 0} />
  ))
  .add('Non-closable tag', () => (
    <Tag label='Pharmacist' />
  ))

storiesOf('Legends', module)
  .add('Yell legend', () => (
    <Legend type='yell' value='100.000' label='Legend text'>
      <span>100.000</span>
    </Legend>
  ))
  .add('Loud legend', () => (
    <Legend type='loud' color='#00BCD4' label='Legend text'>
      <span>100.000</span>
    </Legend>
  ))
  .add('Mild legend', () => (
    <MildLegend color='#00BCD4' value='100.000' label='Amount' secondaryValue='70%' secondaryLabel='of category' />
  ))

storiesOf('Global elements', module)
  .add('Logo', () => (
    <div style={{ backgroundColor: '#000', display: 'inline-block'}}>
      <Logo />
    </div>
  ))
  .add('Loading', () => (
    <Loading />
  ))

storiesOf('Pie Chart', module)
  .add('simple', () => (
    <PieChartOld series={[{ data: [0.05, 0.11, 0.18, 0.25, 0.4] }]} />
  ))

storiesOf('Progress Arc Chart', module)
  .add('pink', () => (
    <PieChart value={62} color={'#E91E63'} />
  ))
  .add('green', () => (
    <PieChart value={65} width={234} height={234} />
  ))
  .add('blue', () => (
    <PieChart value={35} color={'#03A9F4'} width={234} height={234} />
  ))
  .add('two arcs', () => (
    <PieChart value={62} prevValue={11} width={169} height={169} />
  ))
  .add('background color', () => (
    <PieChart value={62} bgColor={'#00BCD4'} bgWidth={8} width={220} height={220} />
  ))

storiesOf('Relative Bars', module)
  .add('Relative Bars', () => (
    <RelativeBars label='HCP’s VISITED' value={22875} goal={20675} />
  ))
  .add('Relative Bars Chart', () => (
    <RelativeBarsChart label='HCP’s VISITED' value={22875} goal={20675} />
  ))

storiesOf('Gauge Bars', module)
  .add('Gaugebar Widget', () => (
    <GaugeBarWidget value={153738} total={234587} colors={['#00BCD4', '#CFD8DC']}>
      <Legend type='yell' color='#00BCD4' label='Total Calls'>
        <span>234587</span>
      </Legend>
      <Legend type='yell' color='#CFD8DC' label='Calls using CLM'>
        <span>153738</span>
        <span className='percent'>{`${(153738 / 234587).toFixed(2) * 100}%`}</span>
      </Legend>
    </GaugeBarWidget>
  ))
  .add('Gaugebar Group', () => (
    <GaugeBarGroup values={[14875, 14875]} totals={[24754, 24754]} />
  ))

const barChartItems = [{
  label: 'Face to face',
  value: 122648,
  percent: .86
}, {
  label: 'Webcast',
  value: 10654,
  percent: .12
}, {
  label: 'Remote',
  value: 8642,
  percent: .06
}, {
  label: 'Meetings',
  value: 6987,
  percent: .03
}]

storiesOf('Bar Chart', module)
  .add('simple', () => (
    <BarChart items={barChartItems} />
  ))


storiesOf('Header', module)
  .add('simple', () => (
    <Header username={'Sean James'} role={'admin'}/>
  ))

storiesOf('Footer', module)
  .add('simple', () => (
    <Footer />
  ))
