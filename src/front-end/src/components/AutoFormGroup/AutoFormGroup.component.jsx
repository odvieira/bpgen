import React from 'react'
import { Form, Col} from 'react-bootstrap'

import './AutoFormGroup.styles.scss'

const AutoFormGroup = ({elements, handleFunction, required, id}) => {
    return (
        <div className="auto-form-group">
            { 
                required === true ? 
                    elements.map( elem => {
                        return (
                            <Form.Row key={elem.label + elem.default} className='form-row'>
                                <Col>
                                    <Form.Label> { elem.label } </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control onChange={ (event) => id === undefined ?
                                            handleFunction(event, elem.label) :
                                            handleFunction(event, elem.label, id)
                                        }
                                        required
                                    />
                                </Col>
                            </Form.Row>
                        )
                    }) :
                    elements.map( elem => {
                        return (
                            <Form.Row key={elem.label + elem.default} className='form-row'>
                                <Col>
                                    <Form.Label> { elem.label } </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control onChange={ (event) => id === undefined ?
                                            handleFunction(event, elem.label) :
                                            handleFunction(event, elem.label, id)
                                        }
                                    />
                                </Col>
                            </Form.Row>
                        )
                    })
            }
        </div>
    )
}

export default AutoFormGroup