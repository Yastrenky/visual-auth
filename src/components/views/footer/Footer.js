import React, { PureComponent } from 'react';
import './footer.css';

class Footer extends PureComponent {
    render() {
        return (
            <div>
                <footer className="auth-footer">
                    <h5>Copyright © 2019 : <a href="https://www.directbravo.com"> Y.Bravo </a></h5>
                </footer>
            </div>
        );
    }
}

export default Footer;
