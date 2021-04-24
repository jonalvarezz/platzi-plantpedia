import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    flexShrink: 0,
  },
}))

export type TabItem = {
  label: string
  value: string
  content: React.ReactNode
}

type TabsProps = {
  tabs: TabItem[]
  currentTab: string
  onTabChange: (_: React.ChangeEvent<{}>, newValue: string) => void
}

export function VerticalTabs({ tabs, currentTab, onTabChange }: TabsProps) {
  const classes = useStyles()

  const { tabItems, tabPanels } = tabs.reduce<{
    tabItems: React.ReactNodeArray
    tabPanels: React.ReactNodeArray
  }>(
    (accumulator, tab, currentIndex) => {
      const { content, label, value } = tab
      accumulator.tabItems.push(
        <Tab
          key={value}
          label={label}
          value={value}
          {...a11yProps(currentIndex)}
        />
      )
      accumulator.tabPanels.push(
        <TabPanel
          key={value}
          value={value}
          isHidden={value !== currentTab}
          index={currentIndex}
        >
          {content}
        </TabPanel>
      )

      return accumulator
    },
    { tabItems: [], tabPanels: [] }
  )

  return (
    <section className="flex flex-grow">
      <Tabs
        orientation="vertical"
        value={currentTab}
        onChange={onTabChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {tabItems}
      </Tabs>
      {tabPanels}
    </section>
  )
}

type TabPanelProps = {
  index: string | number
  value: string | number
  isHidden: boolean
  children: React.ReactNode
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, isHidden, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={isHidden}
      className="flex-grow"
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {isHidden ? null : <div className="px-8 pt-3 pb-8">{children}</div>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}
