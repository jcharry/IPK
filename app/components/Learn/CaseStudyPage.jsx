/*
 * CaseStudyPage.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';

class CaseStudyPage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { location } = this.props;
        return (
            <div>
                <h1>{location.pathname}</h1>
            </div>
        );
    }
}

export default CaseStudyPage;
