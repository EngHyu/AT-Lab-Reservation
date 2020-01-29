import React, { Component } from 'react'
import { Col, Button } from 'reactstrap'
import { CancelOkBtn } from '../components'
import PropTypes from 'prop-types'

export default class Caution extends Component {
  static propTypes = {
    lang: PropTypes.exact({
      title: PropTypes.string.isRequired,
      warning: PropTypes.string.isRequired,
      warningTexts: PropTypes.array.isRequired,
      submit: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.exact({
          "cancel": PropTypes.string.isRequired,
          "modify": PropTypes.string.isRequired,
        })
      ]).isRequired
    })
  }

  render () {
    const {
      title,
      warning,
      warningTexts,
      submit,
    } = this.props.lang

    return (
      <Col md={{ size: 5 }}>
        <h4>{warning}</h4>
        <ol>
          {warningTexts.map(
            (ele, idx) => <li key={idx}>{ele}</li>
          )}
        </ol>
        {
          typeof(submit) === "string" &&
          <Button color='primary' block={true} >
            {submit}
          </Button>
        }
        {
          typeof(submit) === "object" &&
          <CancelOkBtn lang={submit} />
        }
      </Col>
    )
  }
}
