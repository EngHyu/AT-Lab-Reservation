import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { UserNavigation } from '../components'
import { Reserve, Modify, End } from '../containers'
import * as strings from '../strings'

export default class User extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.exact({
        lang: PropTypes.string.isRequired,
        floor: PropTypes.string.isRequired,
      })
    })
  }

  state = {
    activeTab: 0,
  }

  render () {
    const {
      floor,
      lang,
    } = this.props.match.params
    
    const {
      activeTab,
    } = this.state
    
    return (
      <div>
        {<UserNavigation lang={lang} floor={floor} />}

        {/*
        {<Reserve lang={strings[lang]} floor={floor} />}
        {<Modify lang={strings[lang]} floor={floor} />}
        {<End lang={strings[lang]} floor={floor} />}
        */}
        
        <Nav tabs>
          {["Reserve", "Modify", "End"].map((ele, idx) => (
              <NavItem key={idx}>
                <NavLink
                  active={activeTab===idx}
                  onClick={() => {
                    this.setState({
                      activeTab: idx,
                    })
                  }}
                >
                  {ele}
                </NavLink>
              </NavItem>
            )
          )}
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={0}>
            {<Reserve lang={strings[lang]} floor={floor} />}
          </TabPane>
          <TabPane tabId={1}>
            {<Modify lang={strings[lang]} floor={floor} />}
          </TabPane>
          <TabPane tabId={2}>
            {<End lang={strings[lang]} floor={floor} />}
          </TabPane>
        </TabContent>
      </div>
    )
  }
}