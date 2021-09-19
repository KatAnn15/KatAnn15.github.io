import * as React from 'react';
import BuilderWidget from './BuilderWidget';
import HeaderGlobal from '../../../Global/Header/HeaderGlobal/HeaderGlobal';
import "./BuilderPage.scss";

const BuilderPage: React.FC = () => {
    return (
        <div className="builder-page_wrapper">
            <HeaderGlobal/>
            <BuilderWidget/>
        </div>
    )
}

export default BuilderPage