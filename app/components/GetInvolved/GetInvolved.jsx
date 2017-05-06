/*
 * GetInvolved.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import Nav from 'app/components/Nav/Nav';

class GetInvolved extends React.Component {
    render() {
        const { location } = this.props;
        return (
            <div className='page'>
                <Nav activePath={location.pathname} title='Get Involved' />
            </div>
        );
    }
}

export default GetInvolved;
